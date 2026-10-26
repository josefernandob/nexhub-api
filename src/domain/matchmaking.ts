type StartupInput = {
  sectors: string[];
  stage: string;
  needs: string[];
  fundingMin: unknown;
  fundingMax: unknown;
  ask?: unknown;
};
type InvestorInput = {
  interests: string[];
  stages: string[];
  specialties: string[];
  availability: number | null;
  ticketMin: unknown;
  ticketMax: unknown;
  role: string;
};

// Pure function: the same profiles always produce the same explainable result.
// Funding is a total round; an individual investor may contribute part of it.
export function calculateMatch(startup: StartupInput, investor: InvestorInput) {
  const reasons: string[] = [];
  let common = 0;
  if (startup.sectors.some((s) => investor.interests.includes(s))) {
    common += 40;
    reasons.push("Setor de interesse em comum");
  }
  if (investor.stages.includes(startup.stage)) {
    common += 25;
    reasons.push("Estágio compatível");
  }
  let investment = 0;
  let mentorship = 0;
  const investmentReasons = [...reasons];
  const mentorshipReasons = [...reasons];
  if (
    ["INVESTOR", "BOTH"].includes(investor.role) &&
    startup.needs.includes("INVESTMENT")
  ) {
    investment = common + 10;
    investmentReasons.push("Busca investimento");
    const targetMax =
      startup.ask != null
        ? Number(startup.ask)
        : startup.fundingMax == null
          ? Infinity
          : Number(startup.fundingMax);
    if (investor.ticketMin != null && Number(investor.ticketMin) <= targetMax) {
      investment += 25;
      investmentReasons.push("Aporte pode participar da captação");
    }
  }
  if (
    ["MENTOR", "BOTH"].includes(investor.role) &&
    startup.needs.some((n) => n !== "INVESTMENT")
  ) {
    const requested = startup.needs.filter((n) => n !== "INVESTMENT");
    const covered = requested.filter((n) =>
      investor.specialties.includes(n),
    ).length;
    mentorship = common + Math.round((25 * covered) / requested.length);
    if (covered)
      mentorshipReasons.push("Especialidade atende à necessidade de mentoria");
    if ((investor.availability || 0) > 0) {
      mentorship += 10;
      mentorshipReasons.push("Disponibilidade de mentoria informada");
    }
  }
  const purpose = mentorship > investment ? "MENTORSHIP" : "INVESTMENT";
  return {
    score: Math.max(investment, mentorship),
    purpose,
    reasons: purpose === "MENTORSHIP" ? mentorshipReasons : investmentReasons,
    method: "rules-v1",
    investmentScore: investment,
    mentorshipScore: mentorship,
  };
}
