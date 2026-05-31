import dotenv from "dotenv";
dotenv.config();

// Search the web using Tavily API
export async function tavilySearch(query, maxResults = 5) {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      search_depth: "advanced",
      max_results: maxResults,
      include_answer: true,
      include_raw_content: false,
    }),
  });

  if (!res.ok) {
    throw new Error(`Tavily search failed: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

// Run multiple searches in parallel
export async function runSearches(queries) {
  const results = await Promise.allSettled(
    queries.map((q) => tavilySearch(q, 4))
  );

  return results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);
}