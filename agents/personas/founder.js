import { callLLM } from "../llm.js";

export async function founderAttack(idea, evidencePack, vcAttack, userAttack) {
  const competitors = evidencePack.competitors
    .map((c) => `${c.name} (threat: ${c.threat}): ${c.description}`)
    .join("\n") || "No competitors found";

  const failures = evidencePack.failureCases
    .map((f) => `${f.company}: ${f.lesson}`)
    .join("\n") || "No failure lessons found";

  const prompt = `You are a rival founder who has already built something similar. You know EVERY pitfall. You've read what the VC and User said — now find what BOTH of them missed.

STARTUP IDEA: "${idea}"

REAL COMPETITORS IN THIS SPACE:
${competitors}

LESSONS FROM FAILED STARTUPS:
${failures}

WHAT THE VC SAID:
${vcAttack}

WHAT THE USER SAID:
${userAttack}

Your job: Find the EXECUTION gap that neither the VC nor the user caught. Think about: technical debt, go-to-market traps, team/timing issues, scaling nightmares.

Rules:
- Must attack a DIFFERENT angle from both VC and User attacks above
- Reference specific competitors or failure lessons by name
- Show you've already solved what they haven't figured out
- 3-4 sentences maximum
- End with ONE question that reveals you're ahead of them
- Be confident and slightly threatening

Attack now:`;

  return await callLLM([{ role: "user", content: prompt }], 600);
}