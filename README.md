# Sparring 🥊
### An agentic AI that destroys your startup idea before the market does.

---

## The Honest Problem

Every founder has experienced this:

You come up with an idea. You pitch it to your friends. They say *"wow that's brilliant!"* You pitch it to your family. They say *"so proud of you!"* You pitch it to your colleagues. They nod politely.

Then you pitch it to your first real investor — and they tear it apart in 90 seconds.

The problem isn't that your idea is bad. The problem is **nobody gave you honest feedback before you got there.**

YC has office hours. Accelerators have mentors. But what about the 99% of builders who don't have access to a brutal, honest, knowledgeable person who will tell them exactly what's wrong with their idea at 11pm when they're building?

That's what Sparring is.

---

## What It Actually Does

You type your startup idea. One time. That's it.

Then an autonomous agent takes over:

**Round 1 — Skeptical VC attacks**
The agent becomes a venture capitalist who has seen 10,000 pitches. It finds the fatal flaw in your business model — the market size delusion, the defensibility gap, the "why hasn't this been built before" question you've been avoiding.

**Round 2 — Cynical User attacks**
The agent switches persona. Now it's a busy, skeptical potential customer who doesn't want to change their habits, doesn't trust new tools, and always asks "why wouldn't I just use Google/Excel/WhatsApp for this?" It attacks a completely different angle from Round 1.

**Round 3 — Rival Founder attacks**
The agent reads BOTH previous attacks and finds what they missed. It becomes a competitor who has already built something similar and knows every execution pitfall, every go-to-market trap, every scaling nightmare you haven't thought about yet.

**Final — Weakness Report generated automatically**
The agent synthesizes all 3 rounds into your top 3 critical weaknesses, ranked by severity. No button click. It just does it.

You can defend each attack as it happens. The agent rebuts your defense. That's the loop.

---

## Why This Is Actually Agentic

I want to be honest about this because "agentic AI" gets thrown around a lot.

Most AI tools are just chatbots — you prompt, they respond, you prompt again. That's not an agent.

Sparring is agentic because:

**1. Single input, autonomous multi-step execution**
You give it one goal ("attack this idea") and the agent figures out the steps, executes them in sequence, and terminates with a deliverable. You don't prompt each round.

**2. Context memory across rounds**
Each persona reads the previous attacks before generating its own. The Rival Founder literally knows what the VC and User said and is instructed to find what they missed. The agent is building on its own output.

**3. Adaptive persona switching**
The agent decides how to attack based on accumulated context — not a fixed script. Round 3 is always different from Round 1 because the agent has learned from the session.

**4. Autonomous termination + synthesis**
The agent knows when it's done (after 3 rounds) and automatically generates the report. It doesn't wait for you to ask.

**Human in the loop only where it matters** — you can defend each attack, which feeds back into the agent's rebuttal. Everything else is autonomous.

---

## Tech Stack

```
Frontend     →  Vanilla HTML + CSS + JS (single file, zero dependencies)
AI Engine    →  Any API which is strong enough
Agent Loop   →  Custom async sequential pipeline with context passing
Hosting      →  Netlify (deployed from GitHub)
Built with   →  OpenAI Codex (used for writing and iterating the agent loop)
```

No framework. No backend. No database. One file.

This was a deliberate choice — the agentic logic is the product, not the infrastructure. A single HTML file that anyone can download, open, and run locally is more honest than a bloated Next.js app that does the same thing.

---

## How to Run It

### Option 1 — Just open the file
Download `index.html`. Double click it. Opens in your browser. Works immediately in demo mode with realistic mock responses.

### Option 2 — With live AI (needs API key)

Get a free API key from one of:
- [console.groq.com](https://console.groq.com) — completely free, no card needed
- [console.anthropic.com](https://console.anthropic.com) — $5 free credits on new accounts
- [aistudio.google.com](https://aistudio.google.com) — Gemini free tier

Open `index.html` in any text editor. Find this line near the bottom:

```javascript
const API_KEY = "API_KEY_HERE";
```

Replace it with your key. Save. Open in browser.

### Option 3 — Clone and run
```bash
git clone https://github.com/amolkulkarni/sparring-ai
cd sparring-ai
# open index.html in browser
```

---

## Demo

**Live:** [sparring-ai.netlify.app](https://sparring-ai.netlify.app)

**Try it with this idea:**
> "An app that helps people track their daily water intake using AI reminders and gamification to build healthy habits."

Watch what happens.

---

## What I Learned Building This

I'm going to be real — I'm not a senior engineer. I built this in one day during a hackathon. Here's what I actually learned:

**The hardest part wasn't the code.** It was figuring out what "agentic" actually means in practice. There's a huge gap between "AI that responds to prompts" and "AI that autonomously executes a multi-step plan." The difference is context passing between steps and autonomous decision-making about what to do next.

**Prompt engineering is real engineering.** Getting the VC persona to ask a genuinely devastating question (not a generic one), and getting the Rival Founder to actually read and build on the VC's attack — that took more iteration than the UI did.

**Demo mode was a good decision.** Building realistic mock responses means anyone can experience the product without an API key. The concept lands even without live AI.

**The idea came from a real pain.** I submitted this to a hackathon. To get shortlisted I had to write down my idea. I had no way to stress-test it honestly before submitting. I wished Sparring existed. That's probably the right signal.

---

## What's Missing (Honest)

- No persistent storage — sessions don't save
- No user accounts
- The mock responses are good but not personalized to your specific industry
- No way to share your Weakness Report with a link
- Mobile UI could be better
- Needs a real backend to hide the API key properly

These are all solvable. This is an MVP built in a hackathon week.

---

## What's Next

If this gets traction:

- **Industry-specific personas** — a SaaS VC attacks differently than a consumer VC
- **Save + share reports** — get a shareable link to your Weakness Report
- **Async mode** — submit your idea, get your report emailed in 10 minutes
- **Community** — see how other founders defended the same attacks

---

## Built During

**OpenAI × Outskill AI Builders Hackathon 2026**
Cohort 01 · May 25–31, 2026
1,000 builders selected from 10,000 applications

---

## About Me

**Amol Kulkarni** — AI Engineer at Atria, Bengaluru.

I build things with AI. Sometimes they work.

[LinkedIn](https://linkedin.com/in/amolkulkarni) · [GitHub](https://github.com/amolkulkarni)

---

*#AIBuildersHackathon #Outskill #OpenAI #Codex*