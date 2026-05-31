import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { runSparringAgent } from "./agents/orchestrator.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("."));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Sparring agent is ready" });
});

// Main sparring endpoint — streams progress back to frontend
app.post("/api/spar", async (req, res) => {
  const { idea } = req.body;

  if (!idea || idea.trim().length < 10) {
    return res.status(400).json({ error: "Please provide a proper startup idea" });
  }

  // Set up SSE (Server Sent Events) for streaming status updates
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Helper to stream updates to frontend
  const send = (type, data) => {
    res.write(`data: ${JSON.stringify({ type, ...data })}\n\n`);
  };

  try {
    await runSparringAgent(idea.trim(), send);
    send("done", { message: "Agent complete" });
  } catch (err) {
    console.error("Agent error:", err);
    send("error", { message: err.message || "Agent encountered an error" });
  } finally {
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`\n🥊 Sparring agent running at http://localhost:${PORT}`);
  console.log(`   Press Ctrl+C to stop\n`);
});