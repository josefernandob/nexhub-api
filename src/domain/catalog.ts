export const sectors = [
  "Fintech",
  "Healthtech",
  "Edtech",
  "SaaS",
  "IA",
  "Mobilidade",
  "E-commerce",
  "Outros",
] as const;
export const stages = ["Ideação", "MVP", "Tração", "Escala"] as const;
export const specialties = [
  "Estratégia",
  "Tecnologia",
  "Marketing",
  "Finanças",
  "Captação",
  "Operações",
] as const;
export const fundingRanges: Record<string, [number, number | null]> = {
  "Até R$500k": [0, 500000],
  "R$500k - 2M": [500000, 2000000],
  "R$2M - 10M": [2000000, 10000000],
  "Acima de R$10M": [10000000, null],
};
export const ticketRanges: Record<string, [number, number | null]> = {
  "Até R$50k": [0, 50000],
  "R$50k - 200k": [50000, 200000],
  "R$200k - 1M": [200000, 1000000],
  "Acima de R$1M": [1000000, null],
};
export const TERMS_VERSION = "2026-10-19";
