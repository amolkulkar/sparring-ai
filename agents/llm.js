import dotenv from "dotenv";
dotenv.config();

export async function callLLM(messages, maxTokens = 800) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: maxTokens,
      temperature: 0.8,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Groq error: ${err.error?.message || res.status}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}