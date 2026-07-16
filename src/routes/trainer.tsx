import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/trainer")({
  component: Trainer,
  head: () => ({
    meta: [
      { title: "Prompt Trainer — Synthecs Academy" },
      {
        name: "description",
        content:
          "Interactive prompt trainer. Enter a task, pick an AI model, and get a model-tuned prompt with expert tips.",
      },
    ],
  }),
});

const MODELS = [
  { id: "chatgpt", label: "ChatGPT", sub: "OpenAI · GPT-5", accent: "from-emerald-400/40 to-emerald-600/10" },
  { id: "claude", label: "Claude", sub: "Anthropic · Sonnet", accent: "from-orange-400/40 to-orange-600/10" },
  { id: "gemini", label: "Gemini", sub: "Google · 2.5 Pro", accent: "from-sky-400/40 to-sky-600/10" },
  { id: "midjourney", label: "Midjourney", sub: "Image · v6", accent: "from-fuchsia-400/40 to-fuchsia-600/10" },
  { id: "perplexity", label: "Perplexity", sub: "Research", accent: "from-cyan-400/40 to-cyan-600/10" },
];

type Result = { improved: string; tips: string[] };

function Trainer() {
  const { t } = useI18n();
  const [task, setTask] = useState("");
  const [model, setModel] = useState("chatgpt");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canSubmit = task.trim().length > 3 && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, model }),
      });
      if (!res.ok) {
        if (res.status === 429) throw new Error("Rate limit reached. Try again shortly.");
        if (res.status === 402) throw new Error("AI credits exhausted. Add credits to continue.");
        throw new Error(await res.text());
      }
      const data = (await res.json()) as Result;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function copyImproved() {
    if (!result) return;
    await navigator.clipboard.writeText(result.improved);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
            Synthecs / Trainer
          </span>
        </Link>
        <Link
          to="/"
          className="text-[11px] font-mono uppercase tracking-widest border border-white/15 px-4 py-2 rounded-sm hover:bg-white hover:text-black transition-colors"
        >
          ← Home
        </Link>
      </nav>

      <section className="relative pt-32 pb-16 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-6">
          <span className="w-8 h-px bg-zinc-600" />
          <span>Module / Interactive Trainer</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
          Rewrite your prompt <br />
          <span className="text-zinc-500">tuned to any model.</span>
        </h1>
        <p className="mt-6 max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed">
          Describe what you want. Pick the AI you plan to use. We rewrite it into a
          production-grade prompt and explain why it works.
        </p>
      </section>

      <section className="relative px-6 md:px-10 max-w-6xl mx-auto pb-32">
        <form onSubmit={handleSubmit} className="border border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <div className="p-6 md:p-8 border-b border-white/10">
            <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-3">
              01 / Your task
            </label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. Write a landing page hero for a fintech startup targeting Gen Z..."
              rows={4}
              className="w-full bg-transparent text-white text-base md:text-lg placeholder:text-zinc-600 focus:outline-none resize-none font-light leading-relaxed"
            />
          </div>

          <div className="p-6 md:p-8 border-b border-white/10">
            <label className="block text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-4">
              02 / Target AI
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {MODELS.map((m) => {
                const active = model === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setModel(m.id)}
                    className={`relative overflow-hidden text-left p-4 border transition-all ${
                      active
                        ? "border-white bg-white text-black"
                        : "border-white/10 hover:border-white/30 text-white"
                    }`}
                  >
                    {active && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${m.accent} pointer-events-none opacity-30`}
                      />
                    )}
                    <div className="relative">
                      <div className="text-sm font-semibold">{m.label}</div>
                      <div className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${
                        active ? "text-black/60" : "text-zinc-500"
                      }`}>
                        {m.sub}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 md:p-8 flex items-center justify-between gap-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-600">
              {task.trim().length} chars · {model}
            </div>
            <button
              type="submit"
              disabled={!canSubmit}
              className="text-xs font-mono uppercase tracking-widest bg-white text-black px-6 py-3 rounded-sm hover:bg-zinc-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? "Synthesizing..." : "Improve prompt →"}
            </button>
          </div>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-300 font-mono"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 border border-white/10 p-8 font-mono text-xs text-zinc-500"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white animate-pulse" />
                <span>Analyzing task · Matching model profile · Rewriting...</span>
              </div>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid md:grid-cols-[1.4fr_1fr] gap-4"
            >
              <div className="border border-white/15 bg-white/[0.03]">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">
                    Improved prompt · for {model}
                  </div>
                  <button
                    onClick={copyImproved}
                    className="text-[10px] font-mono uppercase tracking-widest border border-white/15 px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>
                <pre className="p-6 text-sm text-zinc-100 whitespace-pre-wrap font-mono leading-relaxed">
                  {result.improved}
                </pre>
              </div>

              <div className="border border-white/10 bg-black">
                <div className="p-4 border-b border-white/10 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">
                  Why it works
                </div>
                <ol className="p-6 space-y-4">
                  {result.tips.map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex gap-3 text-sm text-zinc-300 leading-relaxed"
                    >
                      <span className="text-[10px] font-mono text-zinc-600 mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{tip}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
