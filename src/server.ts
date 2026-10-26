import "dotenv/config";
import { app } from "./app";
import { db } from "./lib/db";

const PORT = process.env.PORT || 3333;

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor Nexhub rodando na porta ${PORT}`);
});
for (const signal of ["SIGINT", "SIGTERM"] as const)
  process.on(signal, () => {
    server.close(() => {
      void db.$disconnect().finally(() => process.exit(0));
    });
  });
