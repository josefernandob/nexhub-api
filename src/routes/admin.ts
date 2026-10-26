import { Router } from "express";
import { z } from "zod";
import { checkRoles } from "../lib/security";
import { db } from "../lib/db";
import { HttpError } from "../lib/errors";
import { paging, uuid } from "../domain/validation";

export const admin = Router();
admin.use(checkRoles(["ADMIN"]));
admin.get("/profiles", async (req, res) => {
  const { page, limit } = paging.parse(req.query);
  const status = z
    .enum(["PENDING", "APPROVED", "REJECTED"])
    .parse(req.query.status || "PENDING");
  const [startups, investors] = await Promise.all([
    db.startup.findMany({
      where: { status },
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.investor.findMany({
      where: { status },
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);
  res.json({ startups, investors, page, limit });
});
admin.patch("/profiles/:kind/:id", async (req, res) => {
  const kind = z.enum(["startup", "investor"]).parse(req.params.kind),
    id = uuid.parse(req.params.id);
  const { status, reason } = z
    .object({
      status: z.enum(["APPROVED", "REJECTED"]),
      reason: z.string().trim().min(10).max(1000),
    })
    .parse(req.body);
  await db.$transaction(
    async (tx) => {
      const profile =
        kind === "startup"
          ? await tx.startup.findUnique({ where: { id } })
          : await tx.investor.findUnique({ where: { id } });
      if (!profile) throw new HttpError(404, "Perfil não encontrado.");
      if (profile.status !== "PENDING")
        throw new HttpError(409, "Perfil já analisado.");
      if (profile.ownerId === req.user!.userId)
        throw new HttpError(403, "Não é permitido analisar o próprio perfil.");
      if (status === "APPROVED") {
        const description =
          "description" in profile ? profile.description : profile.bio;
        if (description.trim().length < 50)
          throw new HttpError(
            400,
            "O perfil precisa de apresentação com pelo menos 50 caracteres.",
          );
      }
      const data = { status, moderationReason: reason };
      if (kind === "startup") await tx.startup.update({ where: { id }, data });
      else await tx.investor.update({ where: { id }, data });
      await tx.auditLog.create({
        data: {
          actorId: req.user!.userId,
          action: `${kind}.${status}`,
          targetId: id,
          reason,
        },
      });
      await tx.notification.create({
        data: {
          userId: profile.ownerId,
          type: "PROFILE_" + status,
          resourceId: id,
        },
      });
    },
    { isolationLevel: "Serializable" },
  );
  res.json({ message: "Análise registrada." });
});
admin.get("/metrics", async (_req, res) => {
  const [matches, conversations, meetings, startups, investors] =
    await Promise.all([
      db.connection.count({ where: { acceptedAt: { not: null } } }),
      db.connection.count({ where: { messages: { some: {} } } }),
      db.meeting.count({
        where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
      }),
      db.startup.count({
        where: { status: "APPROVED", owner: { active: true } },
      }),
      db.investor.count({
        where: { status: "APPROVED", owner: { active: true } },
      }),
    ]);
  res.json({
    matches,
    conversations,
    meetings,
    startups,
    investors,
    scope: "all-time",
    meetingDefinition:
      "Reuniões atualmente confirmadas ou concluídas; canceladas excluídas.",
  });
});
admin.get("/audit", async (req, res) => {
  const { page, limit } = paging.parse(req.query);
  res.json({
    items: await db.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    page,
    limit,
  });
});
