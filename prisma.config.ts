import "dotenv/config";
import { defineConfig } from "prisma/config";
import { resolve } from "node:path";
const url = new URL(
  process.env.DATABASE_URL || "postgresql://localhost/nexhub",
);
url.searchParams.set("schema", "nexhub");
url.searchParams.set("sslmode", "require");
if (process.env.DATABASE_CA_PATH)
  url.searchParams.set("sslrootcert", resolve(process.env.DATABASE_CA_PATH));
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
  datasource: { url: url.toString() },
});
