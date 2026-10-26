import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { authRoutes } from "./routes/auth";
import { profiles } from "./routes/profiles";
import { interactions } from "./routes/interactions";
import { admin } from "./routes/admin";
import { authenticateJWT } from "./lib/security";
import { errorHandler } from "./lib/errors";
import {
  sectors,
  stages,
  specialties,
  fundingRanges,
  ticketRanges,
  TERMS_VERSION,
} from "./domain/catalog";
const app = express();
app.set("trust proxy", 1);
const frontendOrigins = [
  "https://nexhub-alpha.vercel.app",
  ...(process.env.FRONTEND_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim()),
];

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin: frontendOrigins,
  }),
);
app.use(express.json({ limit: "100kb" }));
app.use(
  "/api",
  rateLimit({
    windowMs: 60000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Muitas requisições. Aguarde um minuto." },
  }),
);
app.get("/api/catalog", (_req, res) =>
  res.json({
    sectors,
    stages,
    specialties,
    fundingRanges: Object.keys(fundingRanges),
    ticketRanges: Object.keys(ticketRanges),
    termsVersion: TERMS_VERSION,
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api", authenticateJWT, profiles, interactions);
app.use("/api/admin", admin);

app.get("/health", (req, res) => {
  return res.json({ status: "OK", service: "Nexhub API", version: "1.0.0" });
});
app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});
app.use(errorHandler);

export { app };
