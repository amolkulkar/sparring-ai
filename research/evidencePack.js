import { callLLM } from "../agents/llm.js";
import { runSearches } from "./tavily.js";

// Step 1: Ask LLM to generate smart search queries for this idea
export async function planSearchQueries(idea) {
  const prompt = `You are a research assistant helping stress-test a startup idea.

Startup idea: "${idea}"

Generate 5 targeted search queries to find:
1. Direct competitors already doing this
2. Similar startups that failed and why
3. Real customer complaints about this type of product
4. Market size and adoption barriers
5. Big tech companies that could crush this

Return ONLY a JSON array of 5 strings. Example:
["query 1", "query 2", "query 3", "query 4", "query 5"]

No explanation. Just the JSON array.`;

  const raw = await callLLM([{ role: "user", content: prompt }], 500);
  const clean = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(clean);
  } catch {
    // Fallback queries if LLM doesn't return valid JSON
    return [
      `${idea} competitors startups`,
      `${idea} startup failed reasons`,
      `${idea} customer complaints problems`,
      `${idea} market challenges barriers`,
      `${idea} existing solutions alternatives`,
    ];
  }
}

// Step 2: Run searches and structure findings into Evidence Pack
export async function buildEvidencePack(idea, send) {
  send("status", { message: "🔍 Planning research queries..." });
  const queries = await planSearchQueries(idea);

  send("status", { message: `🌐 Searching web for real data... (${queries.length} searches)` });
  send("queries", { queries });

  const searchResults = await runSearches(queries);

  // Flatten all results into one context string
  const rawContext = searchResults
    .map((result, i) => {
      const sources = (result.results || [])
        .slice(0, 3)
        .map((s) => `- ${s.title}: ${s.content?.slice(0, 200) || s.snippet || ""}`)
        .join("\n");
      return `Search ${i + 1}: "${queries[i]}"\n${sources}`;
    })
    .join("\n\n");

  send("status", { message: "🧠 Building evidence pack from search results..." });

  // Ask LLM to structure findings
  const structurePrompt = `You are analyzing web research about this startup idea: "${idea}"

Here is raw search data:
${rawContext}

Extract and structure this into a JSON evidence pack. Return ONLY this JSON:
{
  "competitors": [
    {"name": "...", "description": "...", "threat": "high/medium/low"}
  ],
  "failureCases": [
    {"company": "...", "whatFailed": "...", "lesson": "..."}
  ],
  "customerComplaints": [
    {"complaint": "...", "risk": "..."}
  ],
  "marketRisks": [
    {"risk": "...", "evidence": "..."}
  ],
  "incumbentThreats": [
    {"company": "...", "threat": "..."}
  ]
}

Use only real information from the search data. If nothing found for a category, return empty array.
Return ONLY the JSON. No explanation.`;

  const raw = await callLLM([{ role: "user", content: structurePrompt }], 1000);
  const clean = raw.replace(/```json|```/g, "").trim();

  try {
    const pack = JSON.parse(clean);
    send("evidencePack", { pack });
    return pack;
  } catch {
    // Return minimal pack if parsing fails
    const fallback = {
      competitors: [],
      failureCases: [],
      customerComplaints: [],
      marketRisks: [],
      incumbentThreats: [],
    };
    send("evidencePack", { pack: fallback });
    return fallback;
  }
}