import { db } from "../src/lib/db";
import bcrypt from "bcrypt";
import { randomBytes, createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { parse } from "dotenv";
import { Role } from "@prisma/client";
import { TERMS_VERSION, stages } from "../src/domain/catalog";

// Deterministic IDs + empty updates: rerunning never overwrites user edits.
function id(label: string) {
  const h = createHash("sha256")
    .update("nexhub-demo-v1:" + label)
    .digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
}
const startupData = [
  {
    slug: "colheita-digital",
    name: "Colheita Digital",
    sectors: ["Fintech"],
    tags: ["Agritech", "Trade"],
    stage: "Tração",
    ask: 18000,
    growth: "+22% (fictício)",
    valuation: 1200000,
    color: "#E4572E",
    description:
      "Demonstração fictícia: marketplace B2B que conecta pequenos produtores rurais à rede de mercados e automatiza operações comerciais.",
  },
  {
    slug: "vortice-capital",
    name: "Vórtice Capital",
    sectors: ["Fintech", "SaaS"],
    tags: ["Fintech", "SaaS"],
    stage: "Tração",
    ask: 8000,
    growth: "+41% (fictício)",
    valuation: 800000,
    color: "#2451B7",
    description:
      "Demonstração fictícia: plataforma de crédito para profissionais autônomos com análise de dados de faturamento. Sem oferta real de crédito.",
  },
  {
    slug: "nuvia-health",
    name: "Nuvia Health",
    sectors: ["Healthtech"],
    tags: ["Healthtech", "B2B"],
    stage: "MVP",
    ask: null,
    growth: "15 pilotos (fictício)",
    valuation: 500000,
    color: "#14162B",
    description:
      "Demonstração fictícia: solução de telemedicina voltada à saúde mental corporativa. Cadastro usado exclusivamente para testar o Nexhub.",
  },
  {
    slug: "edla",
    name: "Edla",
    sectors: ["IA", "Edtech"],
    tags: ["Edtech", "IA"],
    stage: "Tração",
    ask: 32000,
    growth: "+18% (fictício)",
    valuation: 2000000,
    color: "#1F8A5A",
    description:
      "Demonstração fictícia: plataforma de aprendizagem corporativa com trilhas adaptativas para capacitação de equipes e treinamento de vendas.",
  },
];
const professionals = [
  {
    email: "investidor@nexhub.example",
    name: "Ana Investidora Demo",
    role: Role.INVESTOR,
    interests: ["Fintech", "SaaS", "IA"],
    specialties: [],
    availability: null,
  },
  {
    email: "mentora@nexhub.example",
    name: "Beatriz Mentora Demo",
    role: Role.MENTOR,
    interests: ["Healthtech", "Edtech", "IA"],
    specialties: ["Tecnologia", "Estratégia"],
    availability: 8,
  },
  {
    email: "ambos@nexhub.example",
    name: "Carlos Investidor Mentor Demo",
    role: Role.BOTH,
    interests: ["Fintech", "Edtech", "SaaS"],
    specialties: ["Captação", "Marketing"],
    availability: 12,
  },
];
async function main() {
  if (process.env.NODE_ENV === "production")
    throw new Error("Seed demonstrativo não permitido em produção.");
  const file = ".env.demo";
  const saved = existsSync(file) ? parse(readFileSync(file)) : {};
  const password = saved.DEMO_PASSWORD || randomBytes(24).toString("base64url");
  if (!saved.DEMO_PASSWORD)
    writeFileSync(
      file,
      `# Credenciais fictícias locais. Não enviar ao Git.\nDEMO_PASSWORD="${password}"\nADMIN_EMAIL=admin@nexhub.example\nINVESTOR_EMAIL=investidor@nexhub.example\nMENTOR_EMAIL=mentora@nexhub.example\nSTARTUP_EMAIL=colheita-digital@nexhub.example\n`,
    );
  const hash = await bcrypt.hash(password, 12);
  const user = async (email: string, name: string, role: Role) => {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing && !existing.isDemo)
      throw new Error(
        "Colisão com conta não demonstrativa; seed interrompido.",
      );
    return db.user.upsert({
      where: { email },
      update: {},
      create: {
        id: id(email),
        email,
        name,
        role,
        passwordHash: hash,
        phone: "81900000000",
        termsVersion: TERMS_VERSION,
        isDemo: true,
      },
    });
  };
  for (const s of startupData) {
    const u = await user(
      `${s.slug}@nexhub.example`,
      `${s.name} — Responsável Demo`,
      Role.STARTUP,
    );
    await db.startup.upsert({
      where: { ownerId: u.id },
      update: {},
      create: {
        id: id(s.slug),
        ownerId: u.id,
        ...s,
        fundingRange: "Até R$500k",
        fundingMin: 0,
        fundingMax: 500000,
        needs: ["INVESTMENT", "Tecnologia", "Captação"],
        status: "APPROVED",
        city: "Recife",
        state: "PE",
        pitchUrl: "https://example.com/pitch-demo",
        canvas: {
          clientes: "Empresas e pessoas do público alvo fictício.",
          valor: "Proposta de valor para demonstração acadêmica.",
          canais: "Plataforma digital e relacionamento com parceiros.",
          relacionamento: "Atendimento digital de demonstração.",
          receitas: "Assinatura simulada para validar o modelo.",
          recursos: "Equipe e infraestrutura de demonstração.",
          atividades: "Desenvolvimento e suporte do produto fictício.",
          parcerias: "Parceiros fictícios do ecossistema local.",
          custos: "Hospedagem, desenvolvimento e operação simulados.",
        },
      },
    });
  }
  for (const p of professionals) {
    const u = await user(p.email, p.name, p.role);
    await db.investor.upsert({
      where: { ownerId: u.id },
      update: {},
      create: {
        id: id(p.email + "-profile"),
        ownerId: u.id,
        name: p.name,
        interests: p.interests,
        stages: [...stages],
        specialties: p.specialties,
        availability: p.availability,
        type: p.role === "MENTOR" ? null : "Anjo",
        ticketRange: p.role === "MENTOR" ? null : "Até R$50k",
        ticketMin: p.role === "MENTOR" ? null : 0,
        ticketMax: p.role === "MENTOR" ? null : 50000,
        status: "APPROVED",
        bio: "Perfil inteiramente fictício para testar recomendações, conexões e comunicação no projeto acadêmico Nexhub.",
        city: "Recife",
        state: "PE",
      },
    });
  }
  const admin = await user(
    "admin@nexhub.example",
    "Administrador Demo",
    Role.ADMIN,
  );
  await db.auditLog.upsert({
    where: { id: id("seed-audit") },
    update: {},
    create: {
      id: id("seed-audit"),
      actorId: admin.id,
      action: "DEMO_SEED",
      targetId: "demo-v1",
      reason:
        "Criação de perfis sintéticos aprovados para demonstração acadêmica.",
    },
  });
  const startup = await db.startup.findUniqueOrThrow({
    where: { slug: "colheita-digital" },
  });
  const investor = await db.investor.findUniqueOrThrow({
    where: { ownerId: id("investidor@nexhub.example") },
  });
  const c = await db.connection.upsert({
    where: {
      startupId_investorId: { startupId: startup.id, investorId: investor.id },
    },
    update: {},
    create: {
      id: id("demo-connection"),
      startupId: startup.id,
      investorId: investor.id,
      requestedBy: investor.ownerId,
      purpose: "INVESTMENT",
      introduction:
        "Convite fictício para conhecer a oportunidade de demonstração.",
      status: "ACCEPTED",
      acceptedAt: new Date(),
    },
  });
  await db.message.upsert({
    where: {
      senderId_clientId: {
        senderId: investor.ownerId,
        clientId: id("message-client"),
      },
    },
    update: {},
    create: {
      connectionId: c.id,
      senderId: investor.ownerId,
      clientId: id("message-client"),
      text: "Olá! Esta é uma conversa fictícia para demonstrar a comunicação no Nexhub.",
    },
  });
  await db.meeting.upsert({
    where: { id: id("demo-meeting") },
    update: {},
    create: {
      id: id("demo-meeting"),
      connectionId: c.id,
      organizerId: investor.ownerId,
      title: "Apresentação fictícia da startup",
      startsAt: new Date(Date.now() + 3 * 86400000),
      endsAt: new Date(Date.now() + 3 * 86400000 + 30 * 60000),
      location: "Sala de demonstração acadêmica",
      status: "PROPOSED",
    },
  });
  console.log(
    "Seed concluído: 4 startups, 3 profissionais e 1 administrador. Credenciais somente em .env.demo.",
  );
}
main()
  .catch((e) => {
    console.error("Seed interrompido:", e.code || e.name);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
