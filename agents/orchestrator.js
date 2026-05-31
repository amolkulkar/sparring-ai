import { buildEvidencePack } from "../research/evidencePack.js";
import { vcAttack } from "./personas/vc.js";
import { userAttack } from "./personas/user.js";
import { founderAttack } from "./personas/founder.js";
import { generateWeaknessReport } from "../reports/weaknessReport.js";

// THE AGENT LOOP
// This is what makes it agentic:
// 1. Single input → autonomous multi-step execution
// 2. Each step reads previous step output
// 3. Agent decides research strategy autonomously
// 4. Self-terminates with synthesized report
// Human only involved to optionally defend

export async function runSparringAgent(idea, send) {
  send("start", { idea });

  // ── PHASE 1: RESEARCH ─────────────────────────────────
  // Agent autonomously decides what to research
  // and builds evidence pack from real web data
  send("phase", { phase: "research", label: "Researching your market..." });

  const evidencePack = await buildEvidencePack(idea, send);

  send("status", {
    message: `✅ Research complete — found ${evidencePack.competitors.length} competitors, ${evidencePack.failureCases.length} failure cases`,
  });

  // ── PHASE 2: VC ATTACK ────────────────────────────────
  send("phase", { phase: "vc", label: "💼 Skeptical VC is attacking..." });
  send("status", { message: "💼 VC analyzing business model with real competitor data..." });

  const vc = await vcAttack(idea, evidencePack);
  send("attack", { persona: "vc", personaName: "Skeptical VC", text: vc });

  // ── PHASE 3: USER ATTACK ──────────────────────────────
  // Reads VC attack before attacking — context-aware
  send("phase", { phase: "user", label: "😤 Cynical User is attacking..." });
  send("status", { message: "😤 User reading VC attack and finding different angle..." });

  const user = await userAttack(idea, evidencePack, vc);
  send("attack", { persona: "user", personaName: "Cynical User", text: user });

  // ── PHASE 4: RIVAL FOUNDER ATTACK ─────────────────────
  // Reads BOTH previous attacks — most context-aware step
  send("phase", { phase: "founder", label: "⚔️ Rival Founder is attacking..." });
  send("status", { message: "⚔️ Rival Founder reading VC + User attacks, finding execution gaps..." });

  const founder = await founderAttack(idea, evidencePack, vc, user);
  send("attack", { persona: "founder", personaName: "Rival Founder", text: founder });

  // ── PHASE 5: AUTONOMOUS SYNTHESIS ─────────────────────
  // Agent decides when it's done and generates report
  send("phase", { phase: "report", label: "📋 Synthesizing Weakness Report..." });
  send("status", { message: "📋 Agent synthesizing all attacks + evidence into Weakness Report..." });

  const report = await generateWeaknessReport(idea, evidencePack, {
    vc,
    user,
    founder,
  });

  send("report", { weaknesses: report });
  send("status", { message: "✅ Agent complete — your Weakness Report is ready" });
}