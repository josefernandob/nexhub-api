import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { professional } from "../lib/security";
import { HttpError } from "../lib/errors";
import { calculateMatch } from "../domain/matchmaking";
import { paging, profileEdit, uuid } from "../domain/validation";

export const profiles = Router();
const money = (v: unknown) =>
  v == null
    ? "Não informado"
    : Number(v).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      });
export function startupCard(
  s: any,
  match: any = null,
  favorite = false,
  connection: any = null,
) {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    initials: s.name
      .split(" ")
      .slice(0, 2)
      .map((x: string) => x[0])
      .join(""),
    color: s.color,
    category: s.sectors[0],
    sectors: s.sectors,
    tags: s.tags,
    description: s.description,
    stage: s.stage,
    ask: money(s.ask),
    fundingRange: s.fundingRange,
    growth: s.growth || "Não informado",
    valuation: money(s.valuation),
    match: match?.score ?? null,
    matchDetails: match,
    favorited: favorite,
    connection: connection
      ? {
          id: connection.id,
          status: connection.status,
          requestedBy: connection.requestedBy,
        }
      : null,
    needs: s.needs,
    city: s.city,
    state: s.state,
    website: s.website,
    status: s.status,
    isDemo: s.owner?.isDemo || false,
  };
}
const investorCard = (i: any, match: any = null) => ({
  id: i.id,
  name: i.name,
  role: i.owner.role,
  company: i.company,
  type: i.type,
  interests: i.interests,
  stages: i.stages,
  ticketRange: i.ticketRange,
  specialties: i.specialties,
  availability: i.availability,
  bio: i.bio,
  city: i.city,
  state: i.state,
  status: i.status,
  match: match?.score ?? null,
  matchDetails: match,
  isDemo: i.owner.isDemo,
});

profiles.get("/startups", async (req, res) => {
  const { page, limit } = paging.parse(req.query);
  const q = z
    .string()
    .max(120)
    .parse(req.query.q || "");
  const category = z
    .string()
    .max(40)
    .parse(req.query.category || "Todos");
  const investor = await db.investor.findUnique({
    where: { ownerId: req.user!.userId },
    include: { owner: true },
  });
  const where: any = {
    status: "APPROVED",
    owner: { active: true },
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(category === "Todos"
      ? {}
      : category === "Estágio MVP+"
        ? { stage: { in: ["MVP", "Tração", "Escala"] } }
        : { sectors: { has: category } }),
  };
  if (req.query.favorites === "true")
    where.favorites = { some: { userId: req.user!.userId } };
  const [rows, total] = await db.$transaction([
    db.startup.findMany({
      where,
      include: {
        owner: { select: { isDemo: true } },
        favorites: { where: { userId: req.user!.userId } },
        connections: investor ? { where: { investorId: investor.id } } : false,
      },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.startup.count({ where }),
  ]);
  res.json({
    items: rows.map((s: any) =>
      startupCard(
        s,
        investor
          ? calculateMatch(s, { ...investor, role: investor.owner.role })
          : null,
        s.favorites.length > 0,
        s.connections?.[0],
      ),
    ),
    total,
    page,
    limit,
  });
});
profiles.get("/investors", async (req, res) => {
  const { page, limit } = paging.parse(req.query);
  const rows = await db.investor.findMany({
    where: { status: "APPROVED", owner: { active: true } },
    include: { owner: { select: { role: true, isDemo: true } } },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
  });
  res.json({ items: rows.map((i) => investorCard(i)), page, limit });
});
profiles.get("/recommendations", async (req, res) => {
  const { page, limit } = paging.parse(req.query);
  const own = await db.user.findUniqueOrThrow({
    where: { id: req.user!.userId },
    include: { startup: true, investor: true },
  });
  let items: any[] = [];
  if (own.startup) {
    if (own.startup.status !== "APPROVED")
      throw new HttpError(
        409,
        "Seu perfil precisa ser aprovado para receber recomendações.",
      );
    const rows = await db.investor.findMany({
      where: {
        status: "APPROVED",
        owner: { active: true },
        connections: {
          none: {
            startupId: own.startup.id,
            status: { in: ["PENDING", "ACCEPTED"] },
          },
        },
      },
      include: { owner: { select: { role: true, isDemo: true } } },
    });
    items = rows.map((i) =>
      investorCard(
        i,
        calculateMatch(own.startup!, { ...i, role: i.owner.role }),
      ),
    );
  } else if (own.investor) {
    if (own.investor.status !== "APPROVED")
      throw new HttpError(
        409,
        "Seu perfil precisa ser aprovado para receber recomendações.",
      );
    const rows = await db.startup.findMany({
      where: {
        status: "APPROVED",
        owner: { active: true },
        connections: {
          none: {
            investorId: own.investor.id,
            status: { in: ["PENDING", "ACCEPTED"] },
          },
        },
      },
      include: {
        owner: { select: { isDemo: true } },
        favorites: { where: { userId: own.id } },
      },
    });
    items = rows.map((s) =>
      startupCard(
        s,
        calculateMatch(s, { ...own.investor!, role: own.role }),
        s.favorites.length > 0,
      ),
    );
  }
  items = items
    .filter((i) => i.match >= 40)
    .sort((a, b) => b.match - a.match || a.id.localeCompare(b.id));
  res.json({
    items: items.slice((page - 1) * limit, page * limit),
    total: items.length,
    page,
    limit,
    method: "rules-v1",
  });
});
profiles.get("/startups/:id", async (req, res) => {
  const id = uuid.parse(req.params.id);
  const s = await db.startup.findUnique({
    where: { id },
    include: {
      owner: { select: { active: true, isDemo: true } },
      connections: {
        where: { investor: { ownerId: req.user!.userId }, status: "ACCEPTED" },
      },
    },
  });
  if (
    !s ||
    !s.owner.active ||
    (s.ownerId !== req.user!.userId &&
      req.user!.role !== "ADMIN" &&
      s.status !== "APPROVED")
  )
    throw new HttpError(404, "Perfil indisponível.");
  const allowed =
    s.ownerId === req.user!.userId ||
    req.user!.role === "ADMIN" ||
    s.materialsPublic ||
    s.connections.length > 0;
  res.json({
    ...startupCard(s),
    materials: {
      restricted: !allowed,
      pitchUrl: allowed ? s.pitchUrl : null,
      canvas: allowed ? s.canvas : null,
    },
  });
});
profiles.get("/investors/:id", async (req, res) => {
  const i = await db.investor.findUnique({
    where: { id: uuid.parse(req.params.id) },
    include: { owner: { select: { role: true, active: true, isDemo: true } } },
  });
  if (
    !i ||
    !i.owner.active ||
    (i.ownerId !== req.user!.userId &&
      req.user!.role !== "ADMIN" &&
      i.status !== "APPROVED")
  )
    throw new HttpError(404, "Perfil indisponível.");
  res.json(investorCard(i));
});
profiles.patch("/profile", async (req, res) => {
  const v = profileEdit.parse(req.body);
  if (req.user!.role === "STARTUP") {
    const { bio, stages, ...data } = v;
    await db.startup.update({
      where: { ownerId: req.user!.userId },
      data: { ...data, status: "PENDING" },
    });
  } else if (["INVESTOR", "MENTOR", "BOTH"].includes(req.user!.role)) {
    const { bio, city, state, stages } = v;
    await db.investor.update({
      where: { ownerId: req.user!.userId },
      data: { bio, city, state, stages, status: "PENDING" },
    });
  } else throw new HttpError(403, "Perfil não editável.");
  res.json({ message: "Alterações salvas e enviadas para análise." });
});
profiles.put("/favorites/:id", professional, async (req, res) => {
  const id = uuid.parse(req.params.id);
  if (
    !(await db.startup.findFirst({
      where: { id, status: "APPROVED", owner: { active: true } },
    }))
  )
    throw new HttpError(404, "Perfil indisponível.");
  await db.favorite.upsert({
    where: { userId_startupId: { userId: req.user!.userId, startupId: id } },
    create: { userId: req.user!.userId, startupId: id },
    update: {},
  });
  res.status(204).end();
});
profiles.delete("/favorites/:id", professional, async (req, res) => {
  await db.favorite.deleteMany({
    where: { userId: req.user!.userId, startupId: uuid.parse(req.params.id) },
  });
  res.status(204).end();
});
