import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/learn")({
  component: LearnPage,
  head: () => ({
    meta: [
      { title: "Interactive Lessons — Synthecs Academy" },
      {
        name: "description",
        content:
          "Learn to write better AI prompts through short interactive lessons. Read the idea, see before/after, then rewrite a real prompt yourself.",
      },
      { property: "og:title", content: "Interactive Prompt Lessons — Synthecs" },
      {
        property: "og:description",
        content:
          "Bite-sized lessons that teach you to write prompts that actually work. With live AI feedback.",
      },
    ],
  }),
});

type Lesson = {
  id: string;
  level: "Basics" | "Structure" | "Reasoning" | "Style";
  title: string;
  hook: string;
  idea: string;
  before: string;
  after: string;
  why: string[];
  task: {
    brief: string;
    starter: string;
    checklist: { label: string; test: (s: string) => boolean }[];
  };
};

const has = (kw: string[]) => (s: string) =>
  kw.some((k) => s.toLowerCase().includes(k.toLowerCase()));
const minLen = (n: number) => (s: string) => s.trim().length >= n;
const hasNumberedList = (s: string) =>
  /(^|\n)\s*(\d+[.)]|[-*])\s+\S/m.test(s);

const LESSONS: Lesson[] = [
  {
    id: "specificity",
    level: "Basics",
    title: "Be specific, not polite",
    hook: "The #1 fix for bad answers.",
    idea:
      "AI is not a mind-reader. 'Write me something about marketing' gives generic slop. Add who it's for, what it should do, how long, and in what tone. Specifics beat manners every time.",
    before: "Write me a post about our new coffee shop.",
    after:
      "Write a 120-word Instagram caption for the opening day of a specialty coffee shop in Almaty. Audience: 22–30 y.o. locals who love aesthetic cafes. Tone: warm, a little playful, no emojis. End with an invite to visit on Saturday.",
    why: [
      "Length is fixed (120 words) — no rambling.",
      "Audience is named — the model picks the right vocabulary.",
      "Tone rules are explicit — 'warm, playful, no emojis'.",
      "There's a clear ending — an invite. AI knows when to stop.",
    ],
    task: {
      brief:
        "Rewrite this vague prompt: 'Give me some ideas for my YouTube channel about cooking.' Add audience, format, length and tone.",
      starter: "",
      checklist: [
        { label: "Names an audience (who watches)", test: has(["audience", "for ", "beginner", "student", "mom", "family", "gen z", "аудитор", "для "]) },
        { label: "Specifies format (list / script / titles)", test: has(["list", "titles", "script", "ideas", "format", "список", "заголовк", "сценар"]) },
        { label: "Specifies length or count", test: (s) => /\b(\d+)\b/.test(s) },
        { label: "Specifies tone or style", test: has(["tone", "style", "casual", "funny", "тон", "стил", "весел", "серьёз"]) },
        { label: "At least 25 words", test: minLen(120) },
      ],
    },
  },
  {
    id: "role",
    level: "Structure",
    title: "Give the AI a role",
    hook: "One line that changes the whole answer.",
    idea:
      "The first sentence should tell the AI WHO it is. 'You are a senior nutritionist' produces a very different reply than 'You are a fitness bro on Instagram'. Role sets vocabulary, level of detail, and the type of advice.",
    before: "Help me eat better.",
    after:
      "You are a registered dietitian who works with busy office workers. I sit 8 hours a day, skip breakfast, and eat takeout for lunch. Build me a realistic 5-day meal plan I can prep on Sunday in under 90 minutes. Cheap ingredients, no fish.",
    why: [
      "Role → 'registered dietitian' means evidence-based advice, not gym-bro tips.",
      "Context → your actual life ('sit 8 hours, skip breakfast') so the plan fits YOU.",
      "Constraints → 'under 90 minutes', 'no fish', 'cheap' — realistic answers.",
      "Deliverable → '5-day meal plan' is a concrete artifact, not a lecture.",
    ],
    task: {
      brief:
        "Add a role + context + one constraint to: 'Help me write a resignation letter.'",
      starter: "You are ",
      checklist: [
        { label: "Starts with a role ('You are…')", test: (s) => /you are|ты\s*—|ты\s+/i.test(s) },
        { label: "Gives personal context", test: has(["i ", "my ", "мой", "меня", "я ", "работаю"]) },
        { label: "Includes at least one constraint", test: has(["must", "don't", "no ", "under", "keep", "не ", "без ", "коротк"]) },
        { label: "At least 30 words", test: minLen(150) },
      ],
    },
  },
  {
    id: "format",
    level: "Structure",
    title: "Pin the output format",
    hook: "Ask for a table, get a table.",
    idea:
      "If you don't say what the output should look like, you get a wall of text. Say it explicitly: 'Return a markdown table with columns X, Y, Z' or 'Give me exactly 3 bullet points, max 15 words each'. Format = usable output.",
    before: "Compare iPhone 15 and Samsung S24.",
    after:
      "Compare iPhone 15 and Samsung S24 as a markdown table. Rows: Price, Camera, Battery life, Ecosystem, Best for. Keep each cell under 12 words. End with a one-sentence verdict for a first-time smartphone buyer.",
    why: [
      "The exact shape (table, rows) means the answer is instantly scannable.",
      "'Under 12 words per cell' kills fluff.",
      "The verdict is scoped ('first-time buyer') — no wishy-washy 'it depends'.",
    ],
    task: {
      brief:
        "Rewrite: 'Tell me about 3 books on habits.' — force a specific format with fields.",
      starter: "",
      checklist: [
        { label: "Names a format (table / list / JSON)", test: has(["table", "list", "json", "bullet", "таблиц", "списк"]) },
        { label: "Says what fields/columns to include", test: has(["column", "field", "row", "with:", "include", "колонк", "поле", "включ"]) },
        { label: "Has a length limit somewhere", test: has(["word", "sentence", "under", "max", "слов", "предлож", "макс"]) },
        { label: "Includes a numbered/bulleted structure request", test: (s) => hasNumberedList(s) || has(["1.", "2.", "3."])(s) || has(["numbered", "bullet", "нумеров"])(s) },
      ],
    },
  },
  {
    id: "examples",
    level: "Style",
    title: "Show, don't tell (Few-shot)",
    hook: "Two examples > two paragraphs of rules.",
    idea:
      "When 'tone' or 'style' is hard to describe, just paste 1–3 examples of what good looks like. The AI copies the pattern. This is the fastest way to get brand-voice writing, tweet style, or specific joke rhythm.",
    before: "Write funny tweets about being a developer.",
    after:
      "Write 5 tweets about being a developer, in the exact style of these examples:\n\nExample 1: 'my code works and i don't know why. my code doesn't work and i don't know why.'\n\nExample 2: 'git commit -m \"final\" git commit -m \"final for real\" git commit -m \"final final v2\"'\n\nEach tweet: max 200 chars, lowercase, no hashtags, no emojis.",
    why: [
      "Two concrete examples define 'funny' better than any adjective.",
      "Style rules (lowercase, no hashtags) lock the vibe.",
      "'Max 200 chars' fits Twitter without needing to explain why.",
    ],
    task: {
      brief:
        "Add 1–2 examples to: 'Write me product descriptions for a sneaker store.' Give a sample sentence in the tone you want.",
      starter: "",
      checklist: [
        { label: "Contains at least one example", test: has(["example", "e.g.", "like this:", "\"", "пример"]) },
        { label: "Explicit tone or style rule", test: has(["tone", "style", "voice", "lowercase", "no ", "тон", "стил"]) },
        { label: "Says how many outputs you want", test: (s) => /\b\d+\b/.test(s) },
        { label: "At least 40 words", test: minLen(200) },
      ],
    },
  },
  {
    id: "cot",
    level: "Reasoning",
    title: "Ask it to think step by step",
    hook: "Fixes math, logic and 'why did it lie?'",
    idea:
      "For anything with reasoning — math, planning, comparing options — add 'Think step by step before answering'. The model literally becomes more accurate because it writes its reasoning out first. This is called Chain-of-Thought.",
    before: "I have $500. Should I buy a used MacBook or a new Chromebook for uni?",
    after:
      "I have $500 for a uni laptop. I mainly write essays, browse, watch lectures, and occasionally edit photos in Lightroom. I'll use it for 3 years.\n\nThink step by step:\n1) List what each option (used 2020 MacBook Air ~$450 vs new Chromebook ~$400) actually does for my use case.\n2) Weigh trade-offs (battery, repairability, software).\n3) Then give a final recommendation with a one-line reason.",
    why: [
      "Step-by-step forces the model to compare apples to apples, not just pick.",
      "Numbered steps mean the answer has a shape you can follow.",
      "Final recommendation is scoped ('one-line reason') — no essay.",
    ],
    task: {
      brief:
        "Turn this into a step-by-step reasoning prompt: 'Should I take a job offer at $70k with commute or stay at $60k remote?'",
      starter: "",
      checklist: [
        { label: "Explicitly asks to reason step by step", test: has(["step by step", "think through", "reason", "по шагам", "пошагово", "рассужд"]) },
        { label: "Lists what to consider (numbered)", test: (s) => hasNumberedList(s) },
        { label: "Asks for a final recommendation", test: has(["final", "recommend", "decision", "verdict", "рекоменд", "итог", "решен"]) },
        { label: "Includes personal context", test: minLen(180) },
      ],
    },
  },
  {
    id: "constraints",
    level: "Structure",
    title: "Say what NOT to do",
    hook: "Constraints are 50% of a good prompt.",
    idea:
      "The AI will happily add clichés, filler, hedging ('as an AI…'), and 20 bullet points you didn't ask for. Explicit negative rules — 'no clichés, no filler intro, no summary at the end, no more than 5 bullets' — save you hours of editing.",
    before: "Write me a cover letter for a marketing job at Nike.",
    after:
      "Write me a cover letter for a Junior Brand Marketing role at Nike. Use my background: 2 years running social for a local streetwear brand, built one campaign that hit 3M views.\n\nRules:\n– No 'I am writing to express my interest…' opener.\n– No clichés like 'passionate', 'team player', 'go-getter'.\n– Max 220 words.\n– Open with a specific story, not a summary of my resume.\n– End with a single concrete ask.",
    why: [
      "Killing the corporate opener alone raises quality 50%.",
      "Banning clichés forces real, specific words.",
      "A word cap ('220 words') stops the AI from padding.",
    ],
    task: {
      brief:
        "Rewrite: 'Write me a birthday message for my sister.' Add at least 3 negative rules (things the AI must NOT do).",
      starter: "",
      checklist: [
        { label: "Contains explicit 'do not' rules", test: has(["no ", "don't", "avoid", "without", "не ", "без ", "избег"]) },
        { label: "At least 3 rules listed", test: (s) => (s.match(/(^|\n)\s*[-–*]|no |don't|avoid/gi) || []).length >= 3 },
        { label: "Includes personal detail about the sister", test: minLen(180) },
        { label: "Specifies length", test: has(["word", "sentence", "line", "short", "слов", "коротк", "предлож"]) },
      ],
    },
  },
];

const LEVELS = ["All", "Basics", "Structure", "Reasoning", "Style"] as const;

function LearnPage() {
  const [filter, setFilter] = useState<(typeof LEVELS)[number]>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(
    () => (filter === "All" ? LESSONS : LESSONS.filter((l) => l.level === filter)),
    [filter]
  );

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
            Synthecs / Learn
          </span>
        </Link>
        <div className="flex items-center gap-6 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          <Link to="/library" className="hover:text-white">Library</Link>
          <Link to="/methods" className="hover:text-white">Methods</Link>
          <Link to="/trainer" className="hover:text-white">Trainer</Link>
          <Link
            to="/"
            className="border border-white/15 px-4 py-2 rounded-sm hover:bg-white hover:text-black transition-colors"
          >
            ← Home
          </Link>
        </div>
      </nav>

      <section className="relative pt-32 pb-12 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-6">
          <span className="w-8 h-px bg-zinc-600" />
          <span>Interactive Lessons · {LESSONS.length} total</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
          Learn to talk to AI <br />
          <span className="text-zinc-500">the way pros do.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-zinc-400 text-sm md:text-base leading-relaxed">
          Short lessons. Each one: the idea in plain English, a real before/after,
          and a task you rewrite yourself with instant feedback. No jargon.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {LEVELS.map((lv) => (
            <button
              key={lv}
              onClick={() => setFilter(lv)}
              className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                filter === lv
                  ? "bg-white text-black border-white"
                  : "border-white/15 text-zinc-400 hover:border-white/40"
              }`}
            >
              {lv}
            </button>
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-10 max-w-6xl mx-auto pb-32 space-y-4">
        {list.map((lesson, i) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            index={i}
            open={openId === lesson.id}
            onToggle={() => setOpenId(openId === lesson.id ? null : lesson.id)}
          />
        ))}
      </section>
    </main>
  );
}

function LessonCard({
  lesson,
  index,
  open,
  onToggle,
}: {
  lesson: Lesson;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const [input, setInput] = useState(lesson.task.starter);
  const results = lesson.task.checklist.map((c) => ({
    label: c.label,
    passed: c.test(input),
  }));
  const passedCount = results.filter((r) => r.passed).length;
  const total = results.length;
  const done = passedCount === total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="border border-white/10 bg-white/[0.02]"
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-6 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              {String(index + 1).padStart(2, "0")} · {lesson.level}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {lesson.title}
          </h2>
          <p className="text-zinc-400 mt-2 text-sm">{lesson.hook}</p>
        </div>
        <div className="flex flex-col items-end gap-2 pt-1">
          <span className="text-[10px] font-mono text-zinc-500">
            {open ? "COLLAPSE" : "OPEN"}
          </span>
          <div
            className={`text-xs font-mono px-2 py-1 border ${
              done
                ? "border-emerald-400/50 text-emerald-300"
                : "border-white/15 text-zinc-500"
            }`}
          >
            {passedCount}/{total}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-6 md:p-8 space-y-8">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                  The idea
                </div>
                <p className="text-zinc-200 leading-relaxed">{lesson.idea}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-red-500/20 bg-red-500/5 p-5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-red-300/80 mb-3">
                    ✗ Weak prompt
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-zinc-300 font-mono leading-relaxed">
                    {lesson.before}
                  </pre>
                </div>
                <div className="border border-emerald-400/20 bg-emerald-400/5 p-5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 mb-3">
                    ✓ Strong prompt
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-zinc-100 font-mono leading-relaxed">
                    {lesson.after}
                  </pre>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3">
                  Why it works
                </div>
                <ul className="space-y-2">
                  {lesson.why.map((w, i) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-300">
                      <span className="text-zinc-600 font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-8">
                <div className="text-[10px] font-mono uppercase tracking-widest text-brand-light mb-3">
                  Your turn
                </div>
                <p className="text-zinc-200 mb-4">{lesson.task.brief}</p>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={6}
                  placeholder="Type your improved prompt here…"
                  className="w-full bg-black border border-white/15 focus:border-white/40 outline-none p-4 text-sm text-zinc-100 font-mono leading-relaxed resize-y"
                />
                <div className="mt-4 grid gap-2">
                  {results.map((r) => (
                    <div
                      key={r.label}
                      className={`flex items-center gap-3 text-sm font-mono ${
                        r.passed ? "text-emerald-300" : "text-zinc-500"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 border flex items-center justify-center text-[10px] ${
                          r.passed
                            ? "border-emerald-400 bg-emerald-400/20"
                            : "border-white/20"
                        }`}
                      >
                        {r.passed ? "✓" : ""}
                      </span>
                      <span>{r.label}</span>
                    </div>
                  ))}
                </div>
                {done && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 border border-emerald-400/30 bg-emerald-400/5 p-4 text-sm text-emerald-200"
                  >
                    Nailed it. Try it on your favourite AI —{" "}
                    <Link to="/trainer" className="underline hover:text-white">
                      or run it through the Trainer
                    </Link>{" "}
                    to see a pro version.
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
