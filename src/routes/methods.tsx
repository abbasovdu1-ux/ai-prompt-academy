import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/methods")({
  head: () => ({
    meta: [
      { title: "Prompt Methods — SYNTHETIX Academy" },
      {
        name: "description",
        content:
          "Core prompt engineering frameworks: RTF, RTCFE, RCTCO, Chain-of-Thought, Few-Shot, ReAct — with structure, examples and when to use each.",
      },
      { property: "og:title", content: "Prompt Methods — SYNTHETIX Academy" },
      {
        property: "og:description",
        content:
          "Learn RTF, RTCFE, RCTCO, Chain-of-Thought, Few-Shot and ReAct with concrete examples.",
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
    example: `Role: You are a senior copywriter.
Task: Write 3 headlines for a productivity app aimed at students.
Format: Numbered list, max 8 words each, no emojis.`,
  },
  {
    code: "02",
    name: "RTCFE",
    expands: "Role · Task · Context · Format · Example",
    when: "When the model keeps missing tone, audience or edge cases. Adding an example fixes 80% of drift.",
    structure: [
      "Role — persona",
      "Task — the goal",
      "Context — audience, product, constraints",
      "Format — output shape",
      "Example — one gold-standard sample",
    ],
    example: `Role: Landing page copywriter.
Task: Write a hero subheadline.
Context: SaaS for indie devs, tone is dry and confident, avoid buzzwords.
Format: One sentence, under 90 chars.
Example: "Ship your side project before your motivation runs out."`,
  },
  {
    code: "03",
    name: "RCTCO",
    expands: "Role · Context · Task · Constraints · Output",
    when: "Production prompts where constraints matter more than creativity. Great for system prompts.",
    structure: [
      "Role — persona and expertise",
      "Context — background the model needs",
      "Task — precise instruction",
      "Constraints — what NOT to do, limits",
      "Output — exact schema / format",
    ],
    example: `Role: Senior frontend engineer, 10+ years in React.
Context: The user is building a dark-themed AI education site with Tailwind.
Task: Suggest a component structure for the pricing page.
Constraints: No new dependencies. No inline styles. Accessible (WCAG AA).
Output: Bullet list of components with a one-line purpose each.`,
  },
  {
    code: "04",
    name: "Chain-of-Thought",
    expands: "Think step-by-step",
    when: "Math, logic, multi-step reasoning, debugging. Forces the model to show working before answering.",
    structure: [
      "State the problem clearly",
      'Instruct: "Reason step by step before answering."',
      "Ask for the final answer on a separate line",
    ],
    example: `A shop sells pens at $2 and notebooks at $5. A customer buys 3 pens and 2 notebooks and pays with a $20 bill.

Reason step by step, then give the final change on a line starting with "Answer:".`,
  },
  {
    code: "05",
    name: "Few-Shot",
    expands: "Learn from 2–5 examples",
    when: "Classification, formatting, or style-matching tasks where rules are hard to describe but easy to demonstrate.",
    structure: [
      "1–2 sentence instruction",
      "3–5 input → output pairs",
      "The real input at the end, output left blank",
    ],
    example: `Classify each message as SPAM or OK.

"You won a free iPhone!!! Click here" → SPAM
"Hey, are we still on for lunch?" → OK
"URGENT: verify your bank details now" → SPAM
"Meeting moved to 3pm, sorry" → OK

"Congratulations, claim your $500 prize" →`,
  },
  {
    code: "06",
    name: "ReAct",
    expands: "Reason + Act (with tools)",
    when: "Agents that use tools, search or APIs. Interleaves thinking with tool calls.",
    structure: [
      "Thought — what to do next and why",
      "Action — tool call with arguments",
      "Observation — the tool's result",
      "Repeat until Thought produces a Final Answer",
    ],
    example: `Question: What's the weather in the capital of France right now?

Thought: I need the capital of France, then its weather.
Action: search("capital of France")
Observation: Paris
Thought: Now fetch current weather for Paris.
Action: weather("Paris")
Observation: 14°C, cloudy
Thought: I have enough.
Final Answer: Paris — 14°C, cloudy.`,
  },
];

function MethodsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 backdrop-blur-md bg-black/50 border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-2.5 bg-brand rounded-[1px]" />
          <span className="text-sm font-extrabold tracking-tighter">SYNTHETIX</span>
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
          [ CURRICULUM / PROMPT FRAMEWORKS ]
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6">
          The methods that
          <br />
          make prompts work.
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl font-light">
          Six battle-tested frameworks for structuring prompts. Learn the shape,
          when to use it, and see a working example you can steal.
        </p>
      </section>

      <section className="px-6 max-w-5xl mx-auto pb-32 space-y-px bg-white/10 border border-white/10">
        {methods.map((m, i) => (
          <motion.article
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
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
          <Link to="/" className="text-xl font-extrabold tracking-tighter text-white normal-case">SYNTHETIX</Link>
          <div>Try what you learned in the <Link to="/trainer" className="text-white hover:text-brand-light">Trainer →</Link></div>
        </div>
      </footer>
    </div>
  );
}
