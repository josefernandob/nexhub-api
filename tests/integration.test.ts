import "dotenv/config";
import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";
import { app } from "../src/app";
import { db } from "../src/lib/db";
import { issueToken } from "../src/lib/security";

test("preflight permite o frontend publicado no cadastro", async () => {
  await request(app)
    .options("/api/auth/register")
    .set("Origin", "https://nexhub-alpha.vercel.app")
    .set("Access-Control-Request-Method", "POST")
    .set("Access-Control-Request-Headers", "content-type")
    .expect(204)
    .expect(
      "Access-Control-Allow-Origin",
      "https://nexhub-alpha.vercel.app",
    );
});

test("fluxo persistente: cadastro, moderação, recomendação, conexão, conversa e reunião", async () => {
  const ids: string[] = [];
  const profileIds: string[] = [];
  const senha = "Teste-local-2026!";
  const call = (token: string) => ({ Authorization: `Bearer ${token}` });
  try {
    const admin = await db.user.create({
      data: {
        email: `${randomUUID()}@integration.test`,
        name: "Teste administrador",
        phone: "81900000000",
        role: "ADMIN",
        passwordHash: await bcrypt.hash(senha, 4),
        termsVersion: "test",
      },
    });
    ids.push(admin.id);
    const a = issueToken(admin);
    const base = {
      nome: "Teste integração",
      senha,
      confirmarSenha: senha,
      telefone: "81900000000",
      termos: true,
      setores: ["SaaS"],
    };
    await request(app).get("/api/startups").expect(401);
    await request(app)
      .post("/api/auth/register")
      .send({
        ...base,
        email: `${randomUUID()}@integration.test`,
        role: "ADMIN",
      })
      .expect(400);
    const s = (
      await request(app)
        .post("/api/auth/register")
        .send({
          ...base,
          email: `${randomUUID()}@integration.test`,
          role: "STARTUP",
          startup: "Startup teste",
          estagio: "MVP",
          captacao: "Até R$500k",
        })
        .expect(201)
    ).body;
    ids.push(s.user.id);
    const i = (
      await request(app)
        .post("/api/auth/register")
        .send({
          ...base,
          email: `${randomUUID()}@integration.test`,
          role: "INVESTOR",
          tipo: "Anjo",
          ticket: "Até R$50k",
        })
        .expect(201)
    ).body;
    ids.push(i.user.id);
    const st = s.access_token,
      it = i.access_token;
    const sp = (
      await request(app).get("/api/auth/me").set(call(st)).expect(200)
    ).body.startup;
    const ip = (
      await request(app).get("/api/auth/me").set(call(it)).expect(200)
    ).body.investor;
    profileIds.push(sp.id, ip.id);
    await request(app).get("/api/recommendations").set(call(it)).expect(409);
    await request(app).get("/api/admin/metrics").set(call(it)).expect(403);
    await request(app)
      .patch("/api/profile")
      .set(call(st))
      .send({ role: "ADMIN" })
      .expect(400);
    const text =
      "Apresentação fictícia para verificar o fluxo completo de aprovação e interação.";
    await request(app)
      .patch("/api/profile")
      .set(call(st))
      .send({ description: text })
      .expect(200);
    await request(app)
      .patch("/api/profile")
      .set(call(it))
      .send({ bio: text })
      .expect(200);
    for (const [kind, id] of [
      ["startup", sp.id],
      ["investor", ip.id],
    ])
      await request(app)
        .patch(`/api/admin/profiles/${kind}/${id}`)
        .set(call(a))
        .send({
          status: "APPROVED",
          reason: "Verificação automática de integração.",
        })
        .expect(200);
    const rec = (
      await request(app)
        .get("/api/recommendations?limit=100")
        .set(call(it))
        .expect(200)
    ).body;
    assert.ok(rec.items.some((x: any) => x.id === sp.id && x.match === 100));
    await request(app).put(`/api/favorites/${sp.id}`).set(call(it)).expect(204);
    const fav = (
      await request(app)
        .get("/api/startups?favorites=true")
        .set(call(it))
        .expect(200)
    ).body;
    assert.equal(fav.items[0].id, sp.id);
    assert.equal(fav.items[0].passwordHash, undefined);
    const c = (
      await request(app)
        .post("/api/connections")
        .set(call(it))
        .send({
          startupId: sp.id,
          introduction: "Gostaria de conversar sobre a startup.",
        })
        .expect(201)
    ).body;
    await request(app)
      .patch(`/api/connections/${c.id}`)
      .set(call(it))
      .send({ action: "accept" })
      .expect(403);
    await request(app)
      .patch(`/api/connections/${c.id}`)
      .set(call(st))
      .send({ action: "accept" })
      .expect(200);
    const msg = {
      text: "Mensagem fictícia persistida.",
      clientId: randomUUID(),
    };
    const m = (
      await request(app)
        .post(`/api/connections/${c.id}/messages`)
        .set(call(it))
        .send(msg)
        .expect(201)
    ).body;
    const retry = (
      await request(app)
        .post(`/api/connections/${c.id}/messages`)
        .set(call(it))
        .send(msg)
        .expect(201)
    ).body;
    assert.equal(m.id, retry.id);
    await request(app)
      .get(`/api/connections/${c.id}/messages`)
      .set(call(a))
      .expect(404);
    const meeting = {
      title: "Reunião teste",
      startsAt: new Date(Date.now() + 86400000).toISOString(),
      duration: 30,
      location: "Sala fictícia para teste",
    };
    const mt = (
      await request(app)
        .post(`/api/connections/${c.id}/meetings`)
        .set(call(it))
        .send(meeting)
        .expect(201)
    ).body;
    await request(app)
      .patch(`/api/meetings/${mt.id}`)
      .set(call(it))
      .send({ action: "confirm" })
      .expect(403);
    await request(app)
      .patch(`/api/meetings/${mt.id}`)
      .set(call(st))
      .send({ action: "confirm" })
      .expect(200);
    const clash = (
      await request(app)
        .post(`/api/connections/${c.id}/meetings`)
        .set(call(it))
        .send(meeting)
        .expect(201)
    ).body;
    await request(app)
      .patch(`/api/meetings/${clash.id}`)
      .set(call(st))
      .send({ action: "confirm" })
      .expect(409);
    await request(app).post("/api/auth/logout").set(call(it)).expect(204);
    await request(app).get("/api/auth/me").set(call(it)).expect(401);
  } finally {
    await db.auditLog.deleteMany({
      where: { actorId: { in: ids }, targetId: { in: profileIds } },
    });
    await db.user.deleteMany({
      where: { id: { in: ids }, email: { endsWith: "@integration.test" } },
    });
    await db.$disconnect();
  }
});
