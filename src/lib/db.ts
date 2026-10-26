import "dotenv/config";
import { readFileSync } from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL)
  throw new Error("Configure DATABASE_URL no .env.");
const url = new URL(process.env.DATABASE_URL);
for (const key of ["sslmode", "sslrootcert", "sslcert", "sslkey", "schema"])
  url.searchParams.delete(key);
const adapter = new PrismaPg(
  {
    connectionString: url.toString(),
    ssl: {
      ...(process.env.DATABASE_CA_PATH
        ? { ca: readFileSync(process.env.DATABASE_CA_PATH, "utf8") }
        : {}),
      rejectUnauthorized: true,
    },
    max: 5,
    connectionTimeoutMillis: 12000,
  },
  { schema: "nexhub" },
);
export const db = new PrismaClient({ adapter });
