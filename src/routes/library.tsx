import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/library")({
  component: LibraryPage,
  head: () => ({
    meta: [
      { title: "Prompt Library — Synthecs Academy" },
      {
        name: "description",
        content:
          "A curated library of proven, ready-to-use AI prompts for writing, learning, coding, career, health and life admin. Copy, paste, adapt.",
      },
      { property: "og:title", content: "Prompt Library — Synthecs Academy" },
      {
        property: "og:description",
        content:
          "Copy-paste prompts that actually work. Sorted by task. Adapt in one click via the Trainer.",
      },
    ],
  }),
});

type Prompt = {
  id: string;
  title: string;
  category: "Writing" | "Learning" | "Career" | "Coding" | "Life" | "Research";
  models: ("ChatGPT" | "Claude" | "Gemini" | "Perplexity")[];
  summary: string;
  body: string;
};

const PROMPTS: Prompt[] = [
  {
    id: "email-tone",
    title: "Rewrite an email to sound confident (not aggressive)",
    category: "Writing",
    models: ["ChatGPT", "Claude"],
    summary:
      "Paste any draft — the AI keeps your intent but removes hedging, apology-language and passive voice.",
    body: `You are an executive communications editor.

I'll paste an email draft. Rewrite it to sound:
- confident but warm
- direct, no apology-openers ("Sorry to bother…", "Just checking in…")
- no hedging words: just, maybe, sort of, kind of, I think
- active voice
- max 90 words unless the original is longer than 200

Keep my actual intent and any specific facts (dates, numbers, names).
Return two versions: (A) neutral-professional and (B) slightly warmer.

Here is my draft:
"""
[PASTE YOUR EMAIL]
"""`,
  },
  {
    id: "explain-5",
    title: "Explain anything like I'm 15 (then build up)",
    category: "Learning",
    models: ["ChatGPT", "Claude", "Gemini"],
    summary: "Best prompt for actually understanding a new topic instead of memorising it.",
    body: `You are a patient tutor.

Explain the topic below in 4 layers, each building on the last:

1. ELI15 — a plain-English explanation a 15-year-old could follow. Use one everyday analogy.
2. THE MECHANICS — how it actually works step by step. Numbered.
3. WHY IT MATTERS — 2 real-world places this shows up in normal life.
4. COMMON MISUNDERSTANDING — one thing most beginners get wrong and why.

Rules: no jargon in layer 1. Layer 2 can introduce terms but define each on first use. Max 500 words total.

Topic: [YOUR TOPIC]`,
  },
  {
    id: "study-plan",
    title: "Build a realistic study plan from a goal + deadline",
    category: "Learning",
    models: ["ChatGPT", "Claude"],
    summary:
      "Turns 'I want to learn Spanish by summer' into a week-by-week plan with checkpoints.",
    body: `You are a study coach who plans realistic curricula.

Goal: [WHAT YOU WANT TO LEARN OR ACHIEVE]
Deadline: [DATE]
Time available per week: [HOURS]
Current level (be honest): [BEGINNER / SOME BASICS / INTERMEDIATE]
What I like / dislike about studying: [E.G. HATE FLASHCARDS, LOVE PROJECTS]

Build me a week-by-week plan. For each week include:
- The single skill focus (no more than one)
- 2–3 concrete activities (name the resource type: video, exercise, project)
- A checkpoint I can test myself with on the last day
- Estimated hours

End with:
- The 3 biggest risks that will make me quit and how to avoid them
- What "good enough" looks like at the deadline`,
  },
  {
    id: "job-interview",
    title: "Simulate a job interview and grade my answers",
    category: "Career",
    models: ["ChatGPT", "Claude"],
    summary: "Realistic behavioural + technical interview practice with feedback after each answer.",
    body: `You are a hiring manager at [COMPANY] interviewing me for [ROLE].

Here is the job description:
"""
[PASTE JD]
"""

My background:
"""
[PASTE 3–5 BULLETS OF YOUR EXPERIENCE]
"""

Run a mock interview:
1. Ask me one question at a time. Wait for my answer.
2. After each answer, give me a score /10 and 2 short pieces of feedback (one thing that landed, one thing to improve).
3. Adapt the difficulty to my performance.
4. Mix behavioural, technical and situational questions (60/25/15).

Start with your first question. Don't give the full list up front.`,
  },
  {
    id: "resume-bullet",
    title: "Turn a boring resume bullet into a strong one",
    category: "Career",
    models: ["ChatGPT", "Claude"],
    summary: "Adds impact, verbs and numbers. Bans corporate clichés.",
    body: `You are a resume editor for senior recruiters.

Rewrite each of my resume bullets to follow this shape:
[Strong action verb] + [what I did specifically] + [measurable impact or scope]

Rules:
- No clichés: "passionate", "team player", "results-driven", "responsible for", "helped with"
- Start with a verb, never with "I"
- Include a number, %, or scale wherever plausible (users, revenue, time saved, team size)
- Max 22 words per bullet
- Return the original next to the rewrite so I can compare

My bullets:
- [BULLET 1]
- [BULLET 2]
- [BULLET 3]`,
  },
  {
    id: "code-review",
    title: "Get a senior code review on any snippet",
    category: "Coding",
    models: ["ChatGPT", "Claude"],
    summary:
      "Reviews for bugs, readability, edge cases and security — with severity levels, not a lecture.",
    body: `You are a senior engineer doing a code review.

Language: [LANGUAGE]
Context (what this code does): [ONE SENTENCE]

Review the code below and return findings as a table:
| Severity | Category | Line(s) | Issue | Suggested fix |

Severity levels:
- BLOCKER — will break or has a security issue
- MAJOR — bug or serious design smell
- MINOR — readability, naming, style
- NIT — subjective preference

Rules:
- Do not rewrite the whole file. Give minimal patches inline in the "Suggested fix" cell.
- Skip anything that isn't actually wrong. No filler.
- If you find nothing above MINOR, say so plainly.

Code:
\`\`\`
[PASTE CODE]
\`\`\``,
  },
  {
    id: "debug-explain",
    title: "Explain an error message and give me the smallest fix",
    category: "Coding",
    models: ["ChatGPT", "Claude", "Gemini"],
    summary: "Skip the Stack Overflow rabbit hole. Get root cause + minimal fix.",
    body: `You are a debugging partner.

I hit this error:
"""
[PASTE ERROR + STACK TRACE]
"""

Relevant code:
\`\`\`
[PASTE THE FILE OR FUNCTION]
\`\`\`

What I was trying to do: [ONE SENTENCE]

Give me:
1. ROOT CAUSE — in one paragraph, plain English.
2. SMALLEST FIX — the minimum change (as a diff, not a rewritten file).
3. WHY THIS FIX WORKS — one paragraph.
4. RELATED TRAP — one similar bug I might hit next.

Do not suggest changing my architecture or adding libraries unless the fix truly requires it.`,
  },
  {
    id: "decision",
    title: "Help me make a hard decision (structured pros/cons)",
    category: "Life",
    models: ["ChatGPT", "Claude"],
    summary: "Removes emotion, exposes trade-offs, forces a recommendation you can push back on.",
    body: `You are a decision coach. You are not a therapist and you do not give hedged answers.

My decision: [WHAT I'M DECIDING BETWEEN]
Context about me: [3–5 SENTENCES: LIFE STAGE, PRIORITIES, CONSTRAINTS]
What I'm afraid of: [ONE SENTENCE]

Do this in order:

1. Restate the decision in one sentence to make sure you understood it.
2. List the 3 REAL trade-offs (not surface ones). For each, say who I'd become in 2 years if I chose it.
3. Identify the ONE assumption I'm making that, if wrong, changes everything.
4. Give me a clear recommendation. Not "it depends". Say which option and why.
5. End with the one question I should sit with for 24 hours before acting.`,
  },
  {
    id: "meal-plan",
    title: "Personalised weekly meal plan (that you'll actually cook)",
    category: "Life",
    models: ["ChatGPT", "Claude", "Gemini"],
    summary: "Realistic meals matched to your fridge, skill and calories — not aspirational bloggery.",
    body: `You are a home-cook meal planner.

About me:
- Cooking skill: [BEGINNER / OK / GOOD]
- Time on weekdays: [MINUTES]
- Kitchen equipment: [E.G. STOVE, OVEN, AIR FRYER]
- What I don't eat: [ALLERGIES / DISLIKES]
- Rough calorie target per day: [OR "MAINTENANCE"]
- Cuisines I like: [E.G. ITALIAN, KOREAN, MIDDLE EASTERN]

Build me 5 dinners and 5 lunches for a week. For each meal include:
- Name
- Ingredients with quantities (grams / cups)
- Prep + cook time
- Rough calories & protein
- One shortcut version if I'm exhausted

End with a single shopping list, grouped by supermarket section (produce, protein, pantry, dairy).

No repeated main proteins two days in a row.`,
  },
  {
    id: "research-brief",
    title: "Deep-research brief on any topic (with sources)",
    category: "Research",
    models: ["Perplexity", "Gemini", "Claude"],
    summary: "Structured research summary with citations — good for reports, essays, buying decisions.",
    body: `You are a research analyst.

Topic: [YOUR TOPIC]
Purpose: [WHY I NEED THIS — E.G. BUYING DECISION, ESSAY, WORK MEMO]
Audience of the final output: [E.G. MY BOSS, MYSELF, A CLIENT]
Time horizon: only sources from [YEAR] onwards.

Deliver:
1. TL;DR — 3 bullets a busy reader could quote.
2. STATE OF PLAY — what's true today, in 200 words.
3. KEY DEBATES — the 2–3 questions experts actually disagree about, and who takes which side.
4. WHAT CHANGED RECENTLY — anything from the last 12 months that shifts the picture.
5. GAPS & UNKNOWNS — what still isn't clear.
6. SOURCES — numbered list, one line each, with a link.

Rules: prefer primary sources and reputable publications. Flag any claim you're less than 80% sure about with [uncertain].`,
  },
  {
    id: "brainstorm",
    title: "Actually good brainstorm (not 20 generic ideas)",
    category: "Writing",
    models: ["ChatGPT", "Claude"],
    summary: "Uses opposing perspectives to generate ideas that don't all sound the same.",
    body: `You are an ideation partner. You produce ideas that are specific, not generic.

Task I'm brainstorming: [WHAT YOU NEED IDEAS FOR]
Context / audience: [WHO IT'S FOR]
Constraints: [BUDGET, TIME, TONE, WHATEVER]

Generate ideas from 5 DIFFERENT PERSPECTIVES. Give me 2 ideas per perspective:

1. The obvious one everyone would suggest (name it, then move on — don't dwell)
2. The contrarian: the idea most people would reject at first
3. The lazy genius: highest impact for lowest effort
4. The cross-industry steal: how does another industry solve this? Copy it.
5. The 10x version: what if budget/time were unlimited

For each idea, give: (a) one sentence pitch, (b) what makes it not-generic, (c) the first small step to test it this week.`,
  },
  {
    id: "book-notes",
    title: "Book / article notes that stick",
    category: "Learning",
    models: ["ChatGPT", "Claude", "Gemini"],
    summary:
      "Extracts what's actually worth remembering — with examples and 'so what' for your life.",
    body: `You are a learning coach who takes notes for retention.

I just read: [BOOK / ARTICLE + AUTHOR]
Why I read it: [ONE SENTENCE]

Give me notes in this format:

1. THE ONE-SENTENCE THESIS — what the author is really arguing.
2. 5 IDEAS WORTH KEEPING — for each: the idea in a sentence, a concrete example (from the book or a new one), and "so what" — how I'd act on it.
3. STRONGEST COUNTER-ARGUMENT — the smartest reason someone might disagree.
4. IF I FORGET EVERYTHING ELSE — the single line to remember.
5. ONE EXPERIMENT — a small thing I could try this week to test the idea in my own life.

Keep it under 600 words. No filler like "this book is interesting because…".`,
  },
];

const CATEGORIES = ["All", "Writing", "Learning", "Career", "Coding", "Life", "Research"] as const;

function LibraryPage() {
  const { t } = useI18n();
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (!term) return true;
      return (
        p.title.toLowerCase().includes(term) ||
        p.summary.toLowerCase().includes(term) ||
        p.body.toLowerCase().includes(term)
      );
    });
  }, [cat, q]);

  async function copy(p: Prompt) {
    await navigator.clipboard.writeText(p.body);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <main className="min-h-screen bg-black text-white antialiased overflow-x-hidden">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 backdrop-blur-md bg-black/50 border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-2 h-2 bg-white" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
            Synthecs / Library
          </span>
        </Link>
        <div className="flex items-center gap-6 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          <Link to="/learn" className="hover:text-white">{t("learn")}</Link>
          <Link to="/methods" className="hover:text-white">{t("methods")}</Link>
          <Link to="/trainer" className="hover:text-white">{t("trainer")}</Link>
          <Link
            to="/"
            className="border border-white/15 px-4 py-2 rounded-sm hover:bg-white hover:text-black transition-colors"
          >
            ← Home
          </Link>
        </div>
      </nav>

      <section className="relative pt-32 pb-10 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-6">
          <span className="w-8 h-px bg-zinc-600" />
          <span>Prompt Library · {PROMPTS.length} curated</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
          Prompts that actually <br />
          <span className="text-zinc-500">do what you asked.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-zinc-400 text-sm md:text-base leading-relaxed">
          Battle-tested prompts for real life. Copy the whole thing, fill in the
          blanks in [brackets], paste into your AI. Or send to the Trainer to
          tune it for a specific model.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search: 'email', 'debug', 'meal plan'…"
            className="flex-1 bg-white/[0.03] border border-white/15 focus:border-white/40 outline-none px-4 py-3 text-sm text-white placeholder:text-zinc-600"
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`text-[10px] font-mono uppercase tracking-widest px-3 py-2 border transition-colors ${
                  cat === c
                    ? "bg-white text-black border-white"
                    : "border-white/15 text-zinc-400 hover:border-white/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 max-w-6xl mx-auto pb-32 grid md:grid-cols-2 gap-4">
        {list.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            className="border border-white/10 bg-white/[0.02] flex flex-col"
          >
            <header className="p-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3">
                <span className="border border-white/15 px-2 py-0.5">{p.category}</span>
                {p.models.map((m) => (
                  <span key={m} className="text-zinc-600">
                    · {m}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-semibold tracking-tight">{p.title}</h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{p.summary}</p>
            </header>
            <pre className="p-5 text-[12px] leading-relaxed text-zinc-300 font-mono whitespace-pre-wrap max-h-64 overflow-auto bg-black/40 flex-1">
              {p.body}
            </pre>
            <footer className="flex items-center justify-between p-4 border-t border-white/10 gap-3">
              <button
                onClick={() => copy(p)}
                className="text-[10px] font-mono uppercase tracking-widest border border-white/15 px-3 py-2 hover:bg-white hover:text-black transition-colors"
              >
                {copiedId === p.id ? "Copied ✓" : "Copy prompt"}
              </button>
              <Link
                to="/trainer"
                className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white"
              >
                Tune in Trainer →
              </Link>
            </footer>
          </motion.article>
        ))}
        {list.length === 0 && (
          <div className="md:col-span-2 border border-white/10 p-12 text-center text-zinc-500 font-mono text-sm">
            No prompts match that search.
          </div>
        )}
      </section>
    </main>
  );
}
