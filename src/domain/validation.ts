import { z } from "zod";
import {
  sectors,
  stages,
  specialties,
  fundingRanges,
  ticketRanges,
} from "./catalog";
export const password = z
  .string()
  .min(8)
  .max(72)
  .refine((v) => Buffer.byteLength(v, "utf8") <= 72, "Senha excede 72 bytes.");
export const email = z.string().trim().toLowerCase().email().max(254);
const https = z
  .string()
  .url()
  .refine((v) => new URL(v).protocol === "https:", "Use um link HTTPS.");
export const optionalUrl = z.union([https.max(2048), z.literal("")]).optional();
export const registerSchema = z
  .object({
    nome: z.string().trim().min(2).max(120),
    email,
    senha: password,
    confirmarSenha: z.string(),
    telefone: z
      .string()
      .transform((v) => v.replace(/\D/g, ""))
      .pipe(z.string().regex(/^\d{10,13}$/)),
    termos: z.literal(true),
    role: z.enum(["STARTUP", "INVESTOR", "MENTOR", "BOTH"]),
    startup: z.string().trim().min(2).max(120).optional(),
    estagio: z.enum(stages).optional(),
    setores: z
      .array(z.enum(sectors))
      .min(1)
      .max(8)
      .transform((v) => [...new Set(v)]),
    captacao: z
      .string()
      .refine((v) => v in fundingRanges)
      .optional(),
    tipo: z.enum(["Anjo", "VC", "Family Office", "Corporate"]).optional(),
    ticket: z
      .string()
      .refine((v) => v in ticketRanges)
      .optional(),
    fundo: z.string().trim().max(120).optional(),
    pitchDeck: optionalUrl,
    stages: z
      .array(z.enum(stages))
      .min(1)
      .default([...stages]),
    specialties: z.array(z.enum(specialties)).default([]),
    availability: z.number().int().min(1).max(160).optional(),
  })
  .superRefine((v, c) => {
    if (v.senha !== v.confirmarSenha)
      c.addIssue({
        code: "custom",
        path: ["confirmarSenha"],
        message: "As senhas não coincidem.",
      });
    if (v.role === "STARTUP" && (!v.startup || !v.estagio || !v.captacao))
      c.addIssue({
        code: "custom",
        message: "Informe startup, estágio e captação.",
      });
    if (["INVESTOR", "BOTH"].includes(v.role) && (!v.tipo || !v.ticket))
      c.addIssue({ code: "custom", message: "Informe tipo e ticket." });
    if (
      ["MENTOR", "BOTH"].includes(v.role) &&
      (!v.specialties.length || !v.availability)
    )
      c.addIssue({
        code: "custom",
        message: "Informe especialidades e disponibilidade.",
      });
  });
export const paging = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
export const uuid = z.string().uuid();
export const profileEdit = z
  .object({
    description: z.string().trim().max(2000).optional(),
    bio: z.string().trim().max(2000).optional(),
    city: z.string().trim().max(120).optional(),
    state: z
      .string()
      .regex(/^[A-Z]{2}$/)
      .optional(),
    needs: z
      .array(z.enum(["INVESTMENT", ...specialties]))
      .min(1)
      .optional(),
    stages: z.array(z.enum(stages)).min(1).optional(),
    website: optionalUrl,
    pitchUrl: optionalUrl,
    canvas: z.record(z.string(), z.string().max(3000)).optional(),
    materialsPublic: z.boolean().optional(),
  })
  .strict();
