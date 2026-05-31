import { callLLM } from "../llm.js";

export async function vcAttack(idea, evidencePack, previousAttacks = []) {
  const competitorList = evidencePack.competitors
    .map((c) => `${c.name}: ${c.description}`)
    .join("\n") || "No direct competitors found";

  const failureList = evidencePack.failureCases
    .map((f) => `${f.company}: ${f.whatFailed}`)
    .join("\n") || "No failure cases found";

  const incumbents = evidencePack.incumbentThreats
    .map((i) => `${i.company}: ${i.threat}`)
    .join("\n") || "No incumbent threats found";

  const prompt = `You are a brutally skeptical Venture Capitalist who has seen 10,000 pitches and funded 12. You have access to REAL research about this startup idea.

STARTUP IDEA: "${idea}"

REAL COMPETITOR DATA:
${competitorList}

REAL FAILURE CASES:
${failureList}

INCUMBENT THREATS:
${incumbents}

Your job: Find the single most fatal business flaw. Reference SPECIFIC competitors or failure cases from the data above. Be sharp and direct.

Rules:
- Cite at least one real competitor or failure case by name
- Focus on: market defensibility, business model, why this will die
- 3-4 sentences maximum
- End with ONE devastating question
- Do NOT be generic — use the real data

Attack now:`;

  return await callLLM([{ role: "user", content: prompt }], 600);
}