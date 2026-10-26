import { db } from "../src/lib/db";
async function main() {
  await db.$queryRaw`SELECT 1`;
  console.log("Conexão Prisma e certificado verificados.");
  console.log({
    users: await db.user.count(),
    startups: await db.startup.count(),
    professionals: await db.investor.count(),
  });
}
main()
  .catch((e) => {
    console.error("Verificação falhou:", e.code || e.name);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
