import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateMatch } from "../src/domain/matchmaking";
import { registerSchema, password } from "../src/domain/validation";
const startup = {
  sectors: ["IA"],
  stage: "MVP",
  needs: ["INVESTMENT", "Tecnologia"],
  fundingMin: 0,
  fundingMax: 500000,
  ask: 100000,
};
const investor = {
  interests: ["IA"],
  stages: ["MVP"],
  specialties: [],
  availability: null,
  ticketMin: 50000,
  ticketMax: 200000,
  role: "INVESTOR",
};
test("match alto explica segmento, estágio, finalidade e aporte", () => {
  const m = calculateMatch(startup, investor);
  assert.equal(m.score, 100);
  assert.equal(m.reasons.length, 4);
});
test("trocar segmento e estágio reduz classificação", () => {
  assert.equal(
    calculateMatch(startup, {
      ...investor,
      interests: ["Fintech"],
      stages: ["Escala"],
    }).score,
    35,
  );
});
test("mentor sem ticket financeiro é compatível por especialidade", () => {
  assert.equal(
    calculateMatch(startup, {
      ...investor,
      role: "MENTOR",
      specialties: ["Tecnologia"],
      availability: 8,
      ticketMin: null,
      ticketMax: null,
    }).score,
    100,
  );
});
test("mentor não recebe pontos para startup que só busca aporte", () => {
  assert.equal(
    calculateMatch(
      { ...startup, needs: ["INVESTMENT"] },
      { ...investor, role: "MENTOR" },
    ).score,
    0,
  );
});
test("ticket mínimo maior que captação não recebe pontos financeiros", () => {
  assert.equal(
    calculateMatch(startup, { ...investor, ticketMin: 200000 }).score,
    75,
  );
});
test("cadastro não pode promover usuário a administrador", () => {
  const parsed = registerSchema.safeParse({
    role: "ADMIN",
    nome: "Admin",
    email: "a@example.com",
    senha: "Senha12345",
    confirmarSenha: "Senha12345",
    telefone: "81999999999",
    termos: true,
    setores: ["IA"],
  });
  assert.equal(parsed.success, false);
});
test("senha bcrypt respeita limite em bytes também em UTF-8", () => {
  assert.equal(password.safeParse("á".repeat(40)).success, false);
});
