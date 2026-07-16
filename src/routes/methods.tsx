import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/methods")({
  head: () => ({
    meta: [
      { title: "Prompt Methods — SYNTHECS Academy" },
      {
        name: "description",
        content:
          "18 prompt engineering frameworks — RTF, RCTCO, Chain-of-Thought, Tree-of-Thoughts, ReAct, Reflexion and more — with structure and production-grade examples.",
      },
      { property: "og:title", content: "Prompt Methods — SYNTHECS Academy" },
      {
        property: "og:description",
        content:
          "18 battle-tested prompt frameworks with structure and real examples.",
      },
    ],
  }),
  component: MethodsPage,
});

type Method = {
  code: string;
  name: string;
  expands: string;
  when: string;
  structure: string[];
  example: string;
};

const methods: Method[] = [
  {
    code: "01",
    name: "RTF",
    expands: "Role · Task · Format",
    when: "Simple one-shot requests where you just need a clean, formatted answer.",
    structure: [
      "Role — who the AI should act as",
      "Task — what to do, in one sentence",
      "Format — how the output should look",
    ],
    example: `Role: You are a staff SRE reviewing a postmortem.
Task: Extract the root cause, contributing factors, and 3 concrete follow-up actions from the incident log below.
Format: Markdown with sections "Root cause", "Contributing factors", "Actions" (each action starts with an owner tag like [team-payments]).

<incident log pasted here>`,
  },
  {
    code: "02",
    name: "RTCFE",
    expands: "Role · Task · Context · Format · Example",
    when: "When the model keeps missing tone, audience or edge cases. Adding one gold example fixes 80% of drift.",
    structure: [
      "Role — persona",
      "Task — the goal",
      "Context — audience, product, constraints",
      "Format — output shape",
      "Example — one gold-standard sample",
    ],
    example: `Role: Growth PM writing a changelog entry.
Task: Turn the merged PR description into a customer-facing changelog line.
Context: B2B analytics product, readers are data engineers, tone dry and specific — no "we're excited".
Format: One line, verb-first, under 120 chars, ends with the affected surface in brackets.
Example: "Added incremental sync for BigQuery sources; backfills now resume from last watermark. [Sources]"

PR: <paste here>`,
  },
  {
    code: "03",
    name: "RCTCO",
    expands: "Role · Context · Task · Constraints · Output",
    when: "Production system prompts where constraints matter more than creativity.",
    structure: [
      "Role — persona and expertise",
      "Context — background the model needs",
      "Task — precise instruction",
      "Constraints — what NOT to do, hard limits",
      "Output — exact schema / format",
    ],
    example: `Role: Senior support engineer for a Postgres-hosted SaaS.
Context: The user pasted a slow query and EXPLAIN ANALYZE output. They cannot alter the schema this quarter.
Task: Diagnose the bottleneck and propose safe optimizations.
Constraints: No schema changes. No new extensions. Suggest at most 2 indexes; justify each with the plan node it targets.
Output: JSON — { "diagnosis": string, "indexes": [{ "sql": string, "targets_node": string, "expected_gain": string }], "risks": string[] }`,
  },
  {
    code: "04",
    name: "Chain-of-Thought",
    expands: "Think step-by-step",
    when: "Math, logic, debugging, multi-hop reasoning. Forces working before the answer.",
    structure: [
      "State the problem precisely",
      'Instruct: "Reason step by step before answering."',
      "Ask for the final answer on a separate line",
    ],
    example: `A SaaS charges $29/mo per seat with a 15% annual discount. A customer has 12 seats, upgrades to 20 seats on day 45 of a 90-day quarter, and pays annually.

Reason step by step: prorate the seat upgrade for the remaining quarter, then compute the new annualized bill assuming the seat count stays at 20.

Give the final invoice amount on a line starting with "Answer:".`,
  },
  {
    code: "05",
    name: "Few-Shot",
    expands: "Learn from 2–5 examples",
    when: "Classification, formatting, or style-matching where rules are hard to describe but easy to demonstrate.",
    structure: [
      "1–2 sentence instruction",
      "3–5 input → output pairs covering edge cases",
      "The real input at the end, output left blank",
    ],
    example: `Classify each customer message by intent: BILLING, BUG, FEATURE_REQUEST, or CHURN_RISK.

"Card was charged twice last night" → BILLING
"Export to CSV crashes on files >2GB" → BUG
"Can we get SSO with Okta?" → FEATURE_REQUEST
"Evaluating Snowflake instead, our contract ends in March" → CHURN_RISK
"Loved the new dashboard, one small nit though — filters reset on refresh" → BUG

"Renewal quote came in 40% higher, leadership is asking why" →`,
  },
  {
    code: "06",
    name: "ReAct",
    expands: "Reason + Act (with tools)",
    when: "Agents that call tools, search or APIs. Interleaves thinking with actions.",
    structure: [
      "Thought — what to do next and why",
      "Action — tool call with arguments",
      "Observation — the tool's result",
      "Repeat until Thought produces a Final Answer",
    ],
    example: `Question: Did our checkout p95 latency regress after yesterday's deploy, and if so, which service is the likely culprit?

Thought: I need the deploy time, then p95 latency before/after for /checkout, then per-service latency deltas.
Action: deploys.list(service="checkout", since="24h")
Observation: prod deploy at 2026-07-15T14:12Z
Thought: Compare /checkout p95 in the 2h windows before and after.
Action: metrics.p95(route="/checkout", windows=["12:00-14:00","14:12-16:12"])
Observation: 220ms → 480ms
Thought: Regression confirmed. Break down by downstream service.
Action: traces.topSlowSpans(route="/checkout", since="14:12Z", limit=3)
Observation: payments-svc p95 60→310ms; inventory-svc unchanged; fraud-svc unchanged
Final Answer: Yes — p95 doubled after the 14:12 deploy; payments-svc is the source (60ms → 310ms).`,
  },
  {
    code: "07",
    name: "Tree-of-Thoughts",
    expands: "Branch, evaluate, prune",
    when: "Open-ended problems with multiple valid paths — architecture choices, strategy, complex planning.",
    structure: [
      "Generate N distinct candidate approaches",
      "Score each against explicit criteria",
      "Expand the top-scoring branch(es) one level deeper",
      "Return the winning path with its trade-offs",
    ],
    example: `Problem: Choose a rate-limiting strategy for a public API serving 50k RPS with bursty per-tenant traffic.

Generate 3 distinct candidate approaches (name + one-line mechanism).
Score each 1–5 on: fairness across tenants, memory cost, ease of ops, burst tolerance.
Expand the highest-scoring approach: describe data structures, failure modes, and rollout plan.
Return: chosen approach + why the other two lost.`,
  },
  {
    code: "08",
    name: "Self-Consistency",
    expands: "Sample many, vote",
    when: "High-stakes reasoning where a single Chain-of-Thought is unreliable. Trades tokens for accuracy.",
    structure: [
      "Ask for the answer with CoT",
      "Sample the same prompt N times at temperature > 0",
      "Take the majority answer; discard outlier reasoning",
    ],
    example: `Solve this and show reasoning. I will run this prompt 5 times and take the majority.

Question: A pipeline processes events at 1200/s. A new filter drops 18% of events but adds 4ms of CPU per accepted event. Given a 16-vCPU box with prior CPU headroom of 35%, can it hold the load? Show your working, then give a yes/no on the last line.`,
  },
  {
    code: "09",
    name: "Self-Refine",
    expands: "Draft → critique → rewrite",
    when: "Writing, code, or designs that benefit from a second pass. Cheaper than multi-agent, better than single-shot.",
    structure: [
      "Draft — produce a first version",
      "Critique — list specific weaknesses against named criteria",
      "Refine — rewrite addressing every critique point",
    ],
    example: `Task: Write a 120-word product update announcing per-row RLS in our warehouse product.

Step 1 (Draft): produce version 1.
Step 2 (Critique): score version 1 on clarity, specificity, jargon load, and CTA strength. List every weakness as a bullet.
Step 3 (Refine): rewrite addressing every bullet. Output only the final version.`,
  },
  {
    code: "10",
    name: "Step-Back",
    expands: "Abstract first, then answer",
    when: "The literal question hides the real problem. Force the model to name the general principle before applying it.",
    structure: [
      "Restate the question at a higher level of abstraction",
      "State the principle / formula / rule that governs it",
      "Apply that principle to the specific instance",
    ],
    example: `Question: Our React app re-renders the entire product list when a single item's quantity changes. Why, and how do we fix it?

Step 1: What is the general principle in React about when a component re-renders?
Step 2: Which specific violation of that principle causes list-wide re-renders on a single-item update?
Step 3: Apply the principle to fix our case. Show the minimal code change.`,
  },
  {
    code: "11",
    name: "Least-to-Most",
    expands: "Decompose, then solve in order",
    when: "Problems too big to solve in one shot. Break into sub-problems where each answer feeds the next.",
    structure: [
      "List the sub-problems in dependency order",
      "Solve sub-problem 1, carry the answer forward",
      "Solve each next sub-problem using prior answers",
      "Compose the final answer",
    ],
    example: `Goal: Migrate a 2TB Postgres table to a partitioned version with zero downtime.

Step A: List the sub-problems in dependency order (schema design, backfill, cutover, verification, rollback).
Step B: Solve each in turn — the output of one is input to the next.
Step C: Produce the final runbook as an ordered checklist with rollback branches.`,
  },
  {
    code: "12",
    name: "Reflexion",
    expands: "Try, fail, remember, retry",
    when: "Agent loops. After a failed attempt, the model writes a lesson to memory and retries — often solving on attempt 2 or 3.",
    structure: [
      "Attempt — produce a solution and run it",
      "Reflect — if it failed, write a short lesson naming the root cause",
      "Retry — attempt again with the lesson prepended to context",
    ],
    example: `Task: Write a SQL query that returns the 7-day rolling median of daily active users.

Attempt 1: <your query>
[Executed] → Error: "PERCENTILE_CONT is not an aggregate over window frame in Postgres 14".

Reflect: In one sentence, what did I assume wrong? Store as a lesson.
Retry: Prepend the lesson and produce a new query that respects it.`,
  },
  {
    code: "13",
    name: "Skeleton-of-Thought",
    expands: "Outline first, then fill",
    when: "Long-form writing or reports. Cuts latency and drift by planning the skeleton before expanding each node.",
    structure: [
      "Produce a numbered skeleton — one line per section",
      "Expand each section independently in parallel",
      "Stitch into the final document",
    ],
    example: `Task: Write a technical RFC for adopting SQLite-per-tenant in our multi-tenant SaaS.

Step 1: Produce a skeleton — 6–8 top-level sections, one sentence each (Motivation, Prior art, Design, Migration, Risks, Ops, Rollback, Open questions).
Step 2: Expand each section to ~150 words. Do not reference sections you haven't expanded yet.
Step 3: Emit the full RFC in order.`,
  },
  {
    code: "14",
    name: "Program-of-Thought",
    expands: "Reason in code, not prose",
    when: "Anything numeric, statistical, or with precise units. Prose reasoning drifts; code doesn't.",
    structure: [
      "Model the problem as a small Python program",
      "Print intermediate values (not just the final answer)",
      "State the final answer as a comment after the code",
    ],
    example: `Question: A cohort of 4,821 users signs up in January. 62% activate within 7 days. Of activated users, weekly retention is 88%, 79%, 71%, 66%. How many are still active at end of week 4?

Write a short Python program that computes this step by step, prints each week's active count, and ends with a comment "# Answer: N".`,
  },
  {
    code: "15",
    name: "Persona Pattern",
    expands: "Deep, specific persona",
    when: "Tone-critical writing, roleplay, expert Q&A. Generic personas (like 'helpful assistant') produce generic output.",
    structure: [
      "Name the persona and their years of experience",
      "Give 2–3 opinions or biases they hold",
      "State what they refuse to do",
      "Then give the task",
    ],
    example: `You are Ana, a principal security engineer with 14 years in fintech. You believe most "AI security" advice is theater, you distrust vendor whitepapers, and you always ask "what's the blast radius?" before "what's the exploit?". You refuse to recommend a tool you haven't seen fail in production.

Task: Review the attached threat model for our new webhook signing scheme and tell me what a real attacker does first.`,
  },
  {
    code: "16",
    name: "Contrastive",
    expands: "Show good AND bad examples",
    when: "Style, tone, or quality bars. The model learns the boundary faster from a rejected example than from 3 accepted ones.",
    structure: [
      "State the task",
      "Show 1–2 GOOD examples with a reason",
      "Show 1–2 BAD examples with the specific reason they're bad",
      "Give the real input",
    ],
    example: `Task: Write a Jira bug title.

GOOD: "Checkout /confirm returns 500 when coupon and gift card are both applied" — specific route, specific trigger.
GOOD: "iOS 17 keyboard covers password field on signup after autofill" — platform, version, exact UX.
BAD: "Checkout broken" — no scope, not actionable.
BAD: "Users are complaining about the app" — vague, no signal.

Now write the title for this report: <paste user report>`,
  },
  {
    code: "17",
    name: "Rubric-Based",
    expands: "Grade against explicit criteria",
    when: "Evaluating outputs (yours or someone else's) with consistency. Turns 'is this good?' into a scored answer.",
    structure: [
      "Define 3–6 criteria with 1–5 scales and anchors",
      "Score each criterion with a one-line justification",
      "Sum or weight to a final score",
      "List the top 2 improvements to raise the score",
    ],
    example: `Grade this landing page hero copy against the rubric:

Criteria (1–5 each):
- Specificity: 1 = generic, 5 = names the exact user + outcome
- Believability: 1 = hype, 5 = evidence-backed
- Reading ease: 1 = jargon, 5 = 8th-grade
- Differentiation: 1 = could be any competitor, 5 = only we can say this

Score each, justify in one line, sum to /20, then list the 2 edits that would gain the most points.

Copy: "The AI-powered platform that transforms how modern teams collaborate."`,
  },
  {
    code: "18",
    name: "Meta-Prompting",
    expands: "Ask the AI to write the prompt",
    when: "You know the outcome you want but not the best prompt shape. Let the model draft the prompt, then use it.",
    structure: [
      "Describe the end goal, the target model, and success criteria",
      "Ask the model to produce a prompt that achieves it",
      "Ask it to also list 3 failure modes the prompt guards against",
    ],
    example: `I need a prompt I can reuse to turn raw Zoom transcripts into weekly customer-insight digests for our product team. Success = the digest surfaces 3–5 concrete quotes tied to product themes, no fluff, under 300 words.

Write me the prompt (targeting GPT-5). Then list 3 failure modes it explicitly guards against and how.`,
  },
];

function MethodsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 backdrop-blur-md bg-black/50 border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-2.5 bg-brand rounded-[1px]" />
          <span className="text-sm font-extrabold tracking-tighter">SYNTHECS</span>
        </Link>
        <div className="hidden md:flex items-center gap-10 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/methods" className="text-white">Methods</Link>
          <Link to="/trainer" className="hover:text-white transition-colors">Trainer</Link>
        </div>
        <Link
          to="/trainer"
          className="text-[11px] font-mono uppercase tracking-widest border border-white/15 px-4 py-2 rounded-sm hover:bg-white hover:text-black transition-colors"
        >
          Try Trainer →
        </Link>
      </nav>

      <section className="pt-40 pb-16 px-6 max-w-5xl mx-auto">
        <div className="text-xs font-mono text-brand-light mb-6 tracking-widest">
          [ CURRICULUM / {String(methods.length).padStart(2, "0")} PROMPT FRAMEWORKS ]
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6">
          The methods that
          <br />
          make prompts work.
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl font-light">
          {methods.length} battle-tested frameworks for structuring prompts.
          Learn the shape, when to use it, and see a production-grade example
          you can steal.
        </p>
      </section>

      <section className="px-6 max-w-5xl mx-auto pb-32 space-y-px bg-white/10 border border-white/10">
        {methods.map((m, i) => (
          <motion.article
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="bg-black p-8 md:p-12 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12"
          >
            <div className="md:w-40">
              <div className="text-xs font-mono text-zinc-500 mb-3">{m.code}</div>
              <div className="text-3xl font-extrabold tracking-tighter">{m.name}</div>
              <div className="text-xs font-mono text-brand-light mt-2">{m.expands}</div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  When to use
                </div>
                <p className="text-zinc-300 font-light">{m.when}</p>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  Structure
                </div>
                <ul className="space-y-1.5 text-zinc-300 font-light">
                  {m.structure.map((s) => (
                    <li key={s} className="flex gap-3">
                      <span className="text-brand-light font-mono">›</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  Example
                </div>
                <pre className="bg-zinc-950 border border-white/5 rounded-sm p-5 text-xs md:text-sm text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap">
{m.example}
                </pre>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
          <Link to="/" className="text-xl font-extrabold tracking-tighter text-white normal-case">SYNTHECS</Link>
          <div>Try what you learned in the <Link to="/trainer" className="text-white hover:text-brand-light">Trainer →</Link></div>
        </div>
      </footer>
    </div>
  );
}
