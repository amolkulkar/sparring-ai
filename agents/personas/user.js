import { callLLM } from "../llm.js";

export async function userAttack(idea, evidencePack, vcAttack) {
  const complaints = evidencePack.customerComplaints
    .map((c) => `"${c.complaint}" → Risk: ${c.risk}`)
    .join("\n") || "No specific complaints found";

  const marketRisks = evidencePack.marketRisks
    .map((r) => `${r.risk}: ${r.evidence}`)
    .join("\n") || "No market risks found";

  const prompt = `You are a busy, cynical potential customer who has been burned by overpromised tech products. You always ask "why wouldn't I just use what I already have?"

STARTUP IDEA: "${idea}"

REAL CUSTOMER COMPLAINTS ABOUT SIMILAR PRODUCTS:
${complaints}

REAL MARKET RISKS:
${marketRisks}

WHAT THE VC ALREADY SAID:
${vcAttack}

Your job: Attack from a DIFFERENT angle than the VC. Focus on the real user experience problems. Reference specific complaints from the data.

Rules:
- Find a NEW angle the VC didn't cover
- Reference at least one real complaint or market risk
- Focus on: switching cost, trust, habit change, pricing, "why not just use X"
- 3-4 sentences maximum  
- End with ONE practical objection as a question
- Be real and human, not corporate

Attack now:`;

  return await callLLM([{ role: "user", content: prompt }], 600);
}