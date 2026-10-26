import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res
      .status(400)
      .json({
        error: "Confira os campos informados.",
        fields: error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
    return;
  }
  if (error instanceof HttpError) {
    res.status(error.status).json({ error: error.message });
    return;
  }
  if (error.code === "P2002") {
    res.status(409).json({ error: "Registro já existente." });
    return;
  }
  if (error.code === "P2025") {
    res.status(404).json({ error: "Registro não encontrado." });
    return;
  }
  if (error.code === "P2034") {
    res
      .status(409)
      .json({
        error:
          "O registro mudou durante a operação. Atualize e tente novamente.",
      });
    return;
  }
  if (error.type === "entity.parse.failed") {
    res.status(400).json({ error: "JSON inválido." });
    return;
  }
  console.error("Falha interna:", error.code || error.name || "unknown");
  res.status(500).json({ error: "Não foi possível concluir a operação." });
};
