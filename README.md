# Sparring 🥊
### An agentic AI that researches real competitors and destroys your startup idea before the market does.

> Built by Amol Kulkarni (AI Engineer, Atria) for the OpenAI × Outskill AI Builders Hackathon 2026.  
> Version 2 — now with real web research, proper backend, and structured agent architecture.

---

## What Is This?

You have a startup idea. You pitch it to friends. They say "amazing!" You pitch it to family. They say "so proud!" Then the first real investor tears it apart in 90 seconds flat.

The problem isn't your idea. It's that **nobody gave you honest, informed feedback before you got there.**

Sparring fixes that. You submit your idea once. An autonomous agent:

1. **Researches the real market** — searches the web for actual competitors, failed startups, customer complaints, and incumbent threats
2. **Attacks as a Skeptical VC** — using real competitor data it found, not generic AI advice
3. **Attacks as a Cynical User** — referencing actual complaints found about similar products
4. **Attacks as a Rival Founder** — reads both previous attacks and finds the execution gap they both missed
5. **Synthesizes a Weakness Report** — ranked by severity, with actionable fixes and citations

You never click anything after step 1. The agent runs the whole loop.

---

## Demo

**Live:** [your-netlify-url.netlify.app]

Try it with this idea:
> "An AI tool that helps remote teams run better standups by summarizing Slack activity and suggesting agenda items automatically."

Watch the agent find real competitors, cite actual failure cases, and deliver attacks you didn't see coming.

---

## How It Actually Works

```
User types idea (once)
        ↓
Agent plans 5 research queries autonomously
        ↓
Tavily searches the real web in parallel
        ↓
LLM structures raw results → Evidence Pack
{competitors, failureCases, customerComplaints, marketRisks}
        ↓
Skeptical VC → attacks business model using real competitor data
        ↓
Cynical User → reads VC attack → attacks adoption using real complaints
        ↓
Rival Founder → reads both attacks → finds execution gap both missed
        ↓
Agent synthesizes → Weakness Report with severity + fixes
        ↓
Done. Human never prompted between steps.
```

The key thing that makes this agentic: **context accumulates between steps.** The Rival Founder literally receives the VC attack and User attack as input before generating its own. Each step builds on the previous one. The agent decides when it's done.

---

## Tech Stack

```
Backend       Node.js + Express     Agent loop, API orchestration
Frontend      Vanilla HTML/CSS/JS   Clean UI, zero framework overhead
Research      Tavily API            Real-time web search
AI Brain      Groq (Llama 3.3-70b)  LLM reasoning and generation
Streaming     Server Sent Events    Live progress updates to UI
Built with    OpenAI Codex          Used to write and iterate the agent architecture
Hosting       Netlify + GitHub      Auto-deploy on push
```

No React. No TypeScript. No unnecessary complexity.  
One backend, one frontend, eight focused files.

---

## Project Structure

```
sparring/
  server.js                 ← Express server, SSE streaming
  index.html                ← Frontend UI
  package.json
  .env                      ← API keys (never committed)

  agents/
    orchestrator.js         ← Main agent loop (the brain)
    llm.js                  ← Single LLM caller, easy to swap models
    personas/
      vc.js                 ← Skeptical VC attack logic
      user.js               ← Cynical User attack logic
      founder.js            ← Rival Founder attack logic

  research/
    tavily.js               ← Web search wrapper
    evidencePack.js         ← Query planner + evidence structurer

  reports/
    weaknessReport.js       ← Final synthesis and ranking
```

Each file does one thing. If you want to swap Groq for OpenAI, you change one file. If you want to add a new persona, you add one file and update the orchestrator. That's the point of the structure.

---

## Why This Is Actually Agentic

I want to be straight about this because "agentic AI" gets thrown around a lot.

**Not agentic:** User prompts → AI responds → repeat. That's a chatbot.

**Agentic (what we built):**
- Single goal given once
- Agent autonomously decides research strategy
- Uses a real tool (web search) to gather external data
- Passes structured context between reasoning steps
- Each step adapts based on what previous steps found
- Self-terminates with a synthesized deliverable
- Human only enters the loop to optionally defend

What it doesn't do (honest): browse autonomously, retry on failure, spawn sub-agents, or have persistent memory across sessions. Those are real limitations. This is an MVP built in 7 days, not AutoGPT.

---

## How To Run It Locally

**Requirements:** Node.js v18+, a Tavily API key, a Groq API key

```bash
# Clone the repo
git clone https://github.com/amolkulkar/sparring-ai
cd sparring-ai

# Install dependencies
npm install

# Add your API keys
cp .env.example .env
# Edit .env with your keys

# Run
node server.js

# Open browser
http://localhost:3000
```

**Get free API keys:**
- Tavily: [app.tavily.com](https://app.tavily.com) — 1000 free searches/month, no card
- Groq: [console.groq.com](https://console.groq.com) — completely free, no card

---

## .env.example

```
GROQ_API_KEY=your_groq_key_here
TAVILY_API_KEY=your_tavily_key_here
PORT=3000
```

---

## What I Learned Building This

I'll be real — I'm not a senior engineer and I built this in a hackathon week. Here's what actually surprised me:

**The hardest part was prompt engineering, not code.**
Getting the VC persona to cite actual competitors from the evidence pack (instead of hallucinating) took more iteration than building the entire Express server. Getting the Rival Founder to genuinely read and build on the previous two attacks — not just repeat them — took serious prompt work.

**SSE was new to me.**
Streaming real-time status updates from server to frontend using Server Sent Events was something I hadn't built before. The result (watching each pipeline step light up as the agent progresses) is worth it.

**The evidence pack transforms everything.**
When attacks cite "Preuve AI already does X" or "DimeADozen failed because Y" — that's the moment it stops feeling like a chatbot. Real data grounds everything.

**I used this tool on itself.**
The Sparring idea was submitted to this hackathon. I had no way to stress-test it honestly before submitting. Sparring found real competitors I didn't know existed. That's probably the right signal that it works.

---

## What's Missing (Honest)

- No persistent sessions — refresh loses everything
- No user accounts or saved reports
- No shareable report links
- Attacks are sequential, not parallel (slower than it could be)
- Mobile UI could use more work
- Needs a proper backend deployment (currently localhost only)
- API keys in .env means you need to self-host to run live

All solvable. This is a working prototype, not a production product.

---

## What's Next

If this gets traction after the hackathon:

- **Industry-specific personas** — SaaS VC attacks differently than consumer VC
- **Shareable report links** — send your Weakness Report to cofounders
- **Async mode** — submit idea, get report emailed in 10 minutes
- **Defense mode** — defend each weakness, agent attacks your defense
- **History** — save and compare reports across idea iterations

---

## Built During

**OpenAI × Outskill AI Builders Hackathon 2026**  
Cohort 01 · May 25–31, 2026  
1,000 builders selected from 10,000 applications  
Built in approximately 7 days

---

## About

**Amol Kulkarni** — AI Engineer at Atria, Bengaluru.

I build things with AI. Sometimes they work. This one did.

[LinkedIn](https://linkedin.com/in/amolkulkarni) · [GitHub](https://github.com/amolkulkar)

---

*#AIBuildersHackathon #Outskill #OpenAI #Codex #BuildInPublic*