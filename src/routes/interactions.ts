import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { HttpError } from "../lib/errors";
import { paging, uuid } from "../domain/validation";

export const interactions = Router();
const memberWhere = (id: string) => ({
  OR: [{ startup: { ownerId: id } }, { investor: { ownerId: id } }],
});
async function connectionFor(
  tx: any,
  id: string,
  userId: string,
  active = false,
) {
  const c = await tx.connection.findFirst({
    where: { id, ...memberWhere(userId) },
    include: {
      startup: { include: { owner: { select: { active: true } } } },
      investor: { include: { owner: { select: { active: true } } } },
    },
  });
  if (!c) throw new HttpError(404, "Conexão indisponível.");
  if (
    active &&
    (c.status !== "ACCEPTED" ||
      !c.startup.owner.active ||
      !c.investor.owner.active)
  )
    throw new HttpError(409, "A conexão precisa estar ativa.");
  return c;
}
const notify = (tx: any, userId: string, type: string, resourceId: string) =>
  tx.notification.create({ data: { userId, type, resourceId } });
interactions.get("/connections", async (req, res) => {
  const { page, limit } = paging.parse(req.query);
  res.json({
    items: await db.connection.findMany({
      where: memberWhere(req.user!.userId),
      include: {
        startup: { select: { id: true, name: true } },
        investor: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    page,
    limit,
  });
});
interactions.post("/connections", async (req, res) => {
  const v = z
    .object({
      startupId: uuid,
      investorId: uuid.optional(),
      purpose: z.enum(["INVESTMENT", "MENTORSHIP"]).default("INVESTMENT"),
      introduction: z.string().trim().min(10).max(500),
    })
    .parse(req.body);
  const userId = req.user!.userId;
  const result = await db.$transaction(
    async (tx) => {
      const s = await tx.startup.findUnique({
        where: { id: v.startupId },
        include: { owner: true },
      });
      const i = v.investorId
        ? await tx.investor.findUnique({
            where: { id: v.investorId },
            include: { owner: true },
          })
        : await tx.investor.findUnique({
            where: { ownerId: userId },
            include: { owner: true },
          });
      if (
        !s ||
        !i ||
        s.status !== "APPROVED" ||
        i.status !== "APPROVED" ||
        !s.owner.active ||
        !i.owner.active
      )
        throw new HttpError(
          409,
          "Ambos os perfis precisam estar ativos e aprovados.",
        );
      if (s.ownerId !== userId && i.ownerId !== userId)
        throw new HttpError(403, "Você não participa deste par.");
      if (
        v.purpose === "INVESTMENT" &&
        (!["INVESTOR", "BOTH"].includes(i.owner.role) ||
          !s.needs.includes("INVESTMENT"))
      )
        throw new HttpError(400, "Finalidade de investimento incompatível.");
      if (
        v.purpose === "MENTORSHIP" &&
        (!["MENTOR", "BOTH"].includes(i.owner.role) ||
          !s.needs.some((n) => n !== "INVESTMENT"))
      )
        throw new HttpError(400, "Finalidade de mentoria incompatível.");
      const old = await tx.connection.findUnique({
        where: { startupId_investorId: { startupId: s.id, investorId: i.id } },
      });
      if (old && ["PENDING", "ACCEPTED"].includes(old.status))
        throw new HttpError(
          409,
          "Já existe solicitação ou conexão para este par.",
        );
      if (old && Date.now() - old.updatedAt.getTime() < 7 * 86400000)
        throw new HttpError(409, "Aguarde 7 dias para um novo convite.");
      const data = {
        requestedBy: userId,
        purpose: v.purpose,
        introduction: v.introduction,
        status: "PENDING" as const,
      };
      const c = old
        ? await tx.connection.update({ where: { id: old.id }, data })
        : await tx.connection.create({
            data: { startupId: s.id, investorId: i.id, ...data },
          });
      await notify(
        tx,
        s.ownerId === userId ? i.ownerId : s.ownerId,
        "CONNECTION_REQUEST",
        c.id,
      );
      return c;
    },
    { isolationLevel: "Serializable" },
  );
  res.status(201).json(result);
});
interactions.patch("/connections/:id", async (req, res) => {
  const id = uuid.parse(req.params.id);
  const userId = req.user!.userId;
  const { action } = z
    .object({ action: z.enum(["accept", "decline", "cancel", "close"]) })
    .parse(req.body);
  const result = await db.$transaction(
    async (tx) => {
      const c = await connectionFor(tx, id, userId);
      if (action === "close" && c.status !== "ACCEPTED")
        throw new HttpError(409, "Conexão não está ativa.");
      if (action !== "close" && c.status !== "PENDING")
        throw new HttpError(409, "Solicitação já respondida.");
      if (["accept", "decline"].includes(action) && c.requestedBy === userId)
        throw new HttpError(403, "Somente o destinatário pode responder.");
      if (action === "cancel" && c.requestedBy !== userId)
        throw new HttpError(403, "Somente o remetente pode cancelar.");
      if (
        action === "accept" &&
        (!c.startup.owner.active ||
          !c.investor.owner.active ||
          c.startup.status !== "APPROVED" ||
          c.investor.status !== "APPROVED")
      )
        throw new HttpError(409, "Perfis não estão elegíveis.");
      const status = (
        {
          accept: "ACCEPTED",
          decline: "DECLINED",
          cancel: "CANCELLED",
          close: "CLOSED",
        } as const
      )[action];
      const result = await tx.connection.update({
        where: { id },
        data: {
          status,
          ...(action === "accept" && !c.acceptedAt
            ? { acceptedAt: new Date() }
            : {}),
        },
      });
      if (action === "close")
        await tx.meeting.updateMany({
          where: {
            connectionId: id,
            status: { in: ["PROPOSED", "CONFIRMED"] },
            startsAt: { gt: new Date() },
          },
          data: { status: "CANCELLED", cancelReason: "Conexão encerrada" },
        });
      await notify(
        tx,
        c.startup.ownerId === userId ? c.investor.ownerId : c.startup.ownerId,
        "CONNECTION_" + status,
        id,
      );
      return result;
    },
    { isolationLevel: "Serializable" },
  );
  res.json(result);
});
interactions.get("/connections/:id/messages", async (req, res) => {
  const id = uuid.parse(req.params.id);
  await connectionFor(db, id, req.user!.userId);
  const { page, limit } = paging.parse(req.query);
  res.json({
    items: await db.message.findMany({
      where: { connectionId: id },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    page,
    limit,
  });
});
interactions.post("/connections/:id/messages", async (req, res) => {
  const id = uuid.parse(req.params.id),
    userId = req.user!.userId;
  const v = z
    .object({ text: z.string().trim().min(1).max(2000), clientId: uuid })
    .parse(req.body);
  const message = await db.$transaction(
    async (tx) => {
      const c = await connectionFor(tx, id, userId, true);
      const previous = await tx.message.findUnique({
        where: {
          senderId_clientId: { senderId: userId, clientId: v.clientId },
        },
      });
      if (previous) {
        if (previous.connectionId !== id || previous.text !== v.text)
          throw new HttpError(409, "Identificador de envio já utilizado.");
        return previous;
      }
      const m = await tx.message.create({
        data: { connectionId: id, senderId: userId, ...v },
      });
      await notify(
        tx,
        c.startup.ownerId === userId ? c.investor.ownerId : c.startup.ownerId,
        "MESSAGE",
        id,
      );
      return m;
    },
    { isolationLevel: "Serializable" },
  );
  res.status(201).json(message);
});
interactions.get("/meetings", async (req, res) => {
  const { page, limit } = paging.parse(req.query);
  res.json({
    items: await db.meeting.findMany({
      where: { connection: memberWhere(req.user!.userId) },
      orderBy: { startsAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    page,
    limit,
  });
});
interactions.post("/connections/:id/meetings", async (req, res) => {
  const id = uuid.parse(req.params.id),
    userId = req.user!.userId;
  const v = z
    .object({
      title: z.string().trim().min(3).max(120),
      startsAt: z.iso.datetime({ offset: true }),
      duration: z.union([
        z.literal(15),
        z.literal(30),
        z.literal(45),
        z.literal(60),
        z.literal(90),
      ]),
      timezone: z
        .string()
        .refine((v) => {
          try {
            new Intl.DateTimeFormat("pt-BR", { timeZone: v });
            return true;
          } catch {
            return false;
          }
        })
        .default("America/Fortaleza"),
      location: z.string().trim().min(5).max(2048),
    })
    .parse(req.body);
  const startsAt = new Date(v.startsAt);
  if (startsAt <= new Date())
    throw new HttpError(400, "Escolha uma data futura.");
  const m = await db.$transaction(
    async (tx) => {
      const c = await connectionFor(tx, id, userId, true);
      const m = await tx.meeting.create({
        data: {
          connectionId: id,
          organizerId: userId,
          title: v.title,
          startsAt,
          endsAt: new Date(+startsAt + v.duration * 60000),
          timezone: v.timezone,
          location: v.location,
        },
      });
      await notify(
        tx,
        c.startup.ownerId === userId ? c.investor.ownerId : c.startup.ownerId,
        "MEETING_PROPOSED",
        m.id,
      );
      return m;
    },
    { isolationLevel: "Serializable" },
  );
  res.status(201).json(m);
});
interactions.patch("/meetings/:id", async (req, res) => {
  const id = uuid.parse(req.params.id),
    userId = req.user!.userId;
  const v = z
    .object({
      action: z.enum(["confirm", "cancel", "complete"]),
      reason: z.string().trim().min(10).max(500).optional(),
    })
    .parse(req.body);
  const meeting = await db.$transaction(
    async (tx) => {
      const m = await tx.meeting.findUnique({ where: { id } });
      if (!m) throw new HttpError(404, "Reunião indisponível.");
      const c = await connectionFor(
        tx,
        m.connectionId,
        userId,
        v.action !== "cancel",
      );
      if (v.action === "confirm") {
        if (m.status !== "PROPOSED" || m.startsAt <= new Date())
          throw new HttpError(409, "Reunião não pode ser confirmada.");
        if (m.organizerId === userId)
          throw new HttpError(403, "A contraparte deve confirmar.");
        const collision = await tx.meeting.findFirst({
          where: {
            id: { not: id },
            status: "CONFIRMED",
            startsAt: { lt: m.endsAt },
            endsAt: { gt: m.startsAt },
            connection: {
              OR: [{ startupId: c.startupId }, { investorId: c.investorId }],
            },
          },
        });
        if (collision)
          throw new HttpError(
            409,
            "Conflito de agenda. Escolha outro horário.",
          );
      } else if (v.action === "complete") {
        if (m.organizerId !== userId)
          throw new HttpError(403, "Somente o organizador pode concluir.");
        if (m.status !== "CONFIRMED" || m.endsAt > new Date())
          throw new HttpError(409, "Reunião ainda não pode ser concluída.");
      } else if (!v.reason || !["PROPOSED", "CONFIRMED"].includes(m.status))
        throw new HttpError(
          409,
          "Informe motivo e selecione uma reunião ativa.",
        );
      const status = (
        {
          confirm: "CONFIRMED",
          cancel: "CANCELLED",
          complete: "COMPLETED",
        } as const
      )[v.action];
      const changed = await tx.meeting.update({
        where: { id },
        data: { status, ...(v.reason ? { cancelReason: v.reason } : {}) },
      });
      await notify(
        tx,
        c.startup.ownerId === userId ? c.investor.ownerId : c.startup.ownerId,
        "MEETING_" + status,
        id,
      );
      return changed;
    },
    { isolationLevel: "Serializable" },
  );
  res.json(meeting);
});
interactions.get("/notifications", async (req, res) => {
  const { page, limit } = paging.parse(req.query);
  res.json({
    items: await db.notification.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    page,
    limit,
  });
});
interactions.patch("/notifications/:id", async (req, res) => {
  const changed = await db.notification.updateMany({
    where: { id: uuid.parse(req.params.id), userId: req.user!.userId },
    data: { read: true },
  });
  if (!changed.count) throw new HttpError(404, "Notificação indisponível.");
  res.status(204).end();
});
