import "dotenv/config";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { db } from "./db";
import { HttpError } from "./errors";
import { Role } from "@prisma/client";

const secret = process.env.JWT_SECRET;
if (!secret || secret.length < 32)
  throw new Error("JWT_SECRET precisa de pelo menos 32 caracteres.");
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: Role; email: string };
    }
  }
}
export function issueToken(
  user: { id: string; tokenVersion: number },
  remember = false,
) {
  return jwt.sign({ ver: user.tokenVersion }, secret!, {
    subject: user.id,
    algorithm: "HS256",
    expiresIn: remember ? "7d" : "1d",
    issuer: "nexhub-api",
    audience: "nexhub-web",
  });
}
export const authenticateJWT: RequestHandler = async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer "))
    throw new HttpError(401, "Entre para continuar.");
  let payload: jwt.JwtPayload;
  try {
    const value = jwt.verify(header.slice(7), secret!, {
      algorithms: ["HS256"],
      issuer: "nexhub-api",
      audience: "nexhub-web",
    });
    if (typeof value === "string" || !value.sub) throw new Error();
    payload = value;
  } catch {
    throw new HttpError(401, "Sessão inválida ou expirada.");
  }
  const user = await db.user.findUnique({ where: { id: payload.sub! } });
  if (!user?.active || user.tokenVersion !== payload.ver)
    throw new HttpError(401, "Sessão inválida ou expirada.");
  req.user = { userId: user.id, role: user.role, email: user.email };
  next();
};
export const checkRoles =
  (roles: readonly string[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role))
      throw new HttpError(403, "Você não tem permissão para esta ação.");
    next();
  };
export const professional = checkRoles(["INVESTOR", "MENTOR", "BOTH"]);
