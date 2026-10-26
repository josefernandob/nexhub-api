import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { randomBytes, createHash, randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { rateLimit } from "express-rate-limit";
import { db } from "../lib/db";
import { HttpError } from "../lib/errors";
import { issueToken, authenticateJWT } from "../lib/security";
import { registerSchema, email, password } from "../domain/validation";
import { fundingRanges, ticketRanges, TERMS_VERSION } from "../domain/catalog";

export const authRoutes = Router();
authRoutes.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 40,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Muitas tentativas. Aguarde 15 minutos." },
  }),
);
const digest = (value: string) =>
  createHash("sha256").update(value).digest("hex");
const publicUser = (u: {
  id: string;
  name: string;
  email: string;
  role: string;
}) => ({ id: u.id, name: u.name, email: u.email, role: u.role });

authRoutes.post("/register", async (req, res) => {
  const v = registerSchema.parse(req.body);
  const hash = await bcrypt.hash(v.senha, 12);
  const user = await db.$transaction(async (tx) => {
    const account = await tx.user.create({
      data: {
        name: v.nome,
        email: v.email,
        passwordHash: hash,
        phone: v.telefone,
        role: v.role,
        termsVersion: TERMS_VERSION,
      },
    });
    if (v.role === "STARTUP") {
      const [min, max] = fundingRanges[v.captacao!];
      await tx.startup.create({
        data: {
          ownerId: account.id,
          slug: randomUUID(),
          name: v.startup!,
          sectors: v.setores,
          stage: v.estagio!,
          fundingRange: v.captacao!,
          fundingMin: min,
          fundingMax: max,
          pitchUrl: v.pitchDeck || null,
        },
      });
    } else {
      const range = v.ticket ? ticketRanges[v.ticket] : null;
      await tx.investor.create({
        data: {
          ownerId: account.id,
          name: v.nome,
          company: v.fundo || null,
          type: v.tipo || null,
          interests: v.setores,
          stages: v.stages,
          ticketRange: v.ticket || null,
          ticketMin: range?.[0] ?? null,
          ticketMax: range?.[1] ?? null,
          specialties: v.specialties,
          availability: v.availability ?? null,
        },
      });
    }
    return account;
  });
  res
    .status(201)
    .json({
      user: publicUser(user),
      access_token: issueToken(user),
      message: "Cadastro salvo. Complete o perfil para análise.",
    });
});
// Keep a constant cost for unknown accounts as well as invalid passwords.
const dummyHash = bcrypt.hashSync("invalid-login-placeholder", 12);
authRoutes.post("/login", async (req, res) => {
  const v = z
    .object({
      email,
      senha: z.string().min(1).max(128),
      manterConectado: z.boolean().default(false),
    })
    .parse(req.body);
  const user = await db.user.findUnique({ where: { email: v.email } });
  const valid = await bcrypt.compare(v.senha, user?.passwordHash || dummyHash);
  if (!user?.active || !valid)
    throw new HttpError(401, "E-mail ou senha inválidos.");
  res.json({
    user: publicUser(user),
    access_token: issueToken(user, v.manterConectado),
  });
});
authRoutes.get("/me", authenticateJWT, async (req, res) => {
  const user = await db.user.findUniqueOrThrow({
    where: { id: req.user!.userId },
    include: { startup: true, investor: true },
  });
  res.json({
    ...publicUser(user),
    startup: user.startup,
    investor: user.investor,
  });
});
authRoutes.post("/logout", authenticateJWT, async (req, res) => {
  await db.user.update({
    where: { id: req.user!.userId },
    data: { tokenVersion: { increment: 1 } },
  });
  res.status(204).end();
});
authRoutes.post("/forgot-password", async (req, res) => {
  const v = z
    .object({
      metodo: z.enum(["E-mail", "Telefone"]).default("E-mail"),
      contato: z.string().min(1),
    })
    .parse(req.body);
  if (v.metodo === "Telefone")
    throw new HttpError(
      501,
      "Recuperação por telefone depende de provedor SMS e ainda não está disponível. Use e-mail.",
    );
  const address = email.parse(v.contato);
  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM)
    throw new HttpError(
      503,
      "Envio de e-mail ainda não configurado. Contate a equipe.",
    );
  const user = await db.user.findUnique({ where: { email: address } });
  if (user?.active) {
    const token = randomBytes(32).toString("hex");
    const record = await db.resetToken.create({
      data: {
        userId: user.id,
        tokenHash: digest(token),
        expiresAt: new Date(Date.now() + 30 * 60 * 1000),
      },
    });
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      ...(process.env.SMTP_USER
        ? {
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            },
          }
        : {}),
    });
    try {
      await transport.sendMail({
        from: process.env.SMTP_FROM,
        to: user.email,
        subject: "Nexhub — redefinir senha",
        text: `Abra o link em até 30 minutos: ${process.env.FRONTEND_ORIGIN || "http://localhost:5173"}/redefinir-senha?token=${token}`,
      });
    } catch {
      await db.resetToken.delete({ where: { id: record.id } });
      console.error("Falha no envio SMTP; nenhum segredo registrado.");
    }
  }
  res.json({
    message: "Se houver uma conta com esse e-mail, enviaremos as instruções.",
  });
});
authRoutes.post("/reset-password", async (req, res) => {
  const v = z
    .object({ token: z.string().regex(/^[a-f0-9]{64}$/), senha: password })
    .parse(req.body);
  const hash = await bcrypt.hash(v.senha, 12);
  await db.$transaction(async (tx) => {
    const token = await tx.resetToken.findUnique({
      where: { tokenHash: digest(v.token) },
    });
    if (!token || token.usedAt || token.expiresAt <= new Date())
      throw new HttpError(400, "Link inválido ou expirado.");
    const consumed = await tx.resetToken.updateMany({
      where: { id: token.id, usedAt: null, expiresAt: { gt: new Date() } },
      data: { usedAt: new Date() },
    });
    if (consumed.count !== 1)
      throw new HttpError(400, "Link inválido ou expirado.");
    await tx.user.update({
      where: { id: token.userId },
      data: { passwordHash: hash, tokenVersion: { increment: 1 } },
    });
    await tx.resetToken.updateMany({
      where: { userId: token.userId, usedAt: null },
      data: { usedAt: new Date() },
    });
  });
  res.json({ message: "Senha alterada. Entre novamente." });
});
