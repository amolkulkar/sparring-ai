import { callLLM } from "../agents/llm.js";

export async function generateWeaknessReport(idea, evidencePack, attacks) {
  const prompt = `You are a startup advisor synthesizing a sparring session about this idea: "${idea}"

THREE ADVERSARIAL ATTACKS:

VC Attack: "${attacks.vc}"

User Attack: "${attacks.user}"

Rival Founder Attack: "${attacks.founder}"

EVIDENCE FROM REAL WEB RESEARCH:
- Competitors found: ${evidencePack.competitors.map(c => c.name).join(", ") || "none"}
- Failed companies: ${evidencePack.failureCases.map(f => f.company).join(", ") || "none"}
- Key market risks: ${evidencePack.marketRisks.map(r => r.risk).join(", ") || "none"}

Synthesize the top 3 critical weaknesses revealed. Return ONLY this JSON:
[
  {
    "title": "3-5 word weakness title",
    "severity": "high/medium/low",
    "risk": "One clear sentence explaining the risk",
    "fix": "One actionable thing the founder should do about this"
  }
]

Rank by severity. Use real data from the evidence pack. No explanation. Just the JSON array.`;

  const raw = await callLLM([{ role: "user", content: prompt }], 800);
  const clean = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(clean);
  } catch {
    return [
      {
        title: "Report generation failed",
        severity: "high",
        risk: "Could not parse weakness report. Check API response.",
        fix: "Try again with a more detailed idea description.",
      },
    ];
  }
}