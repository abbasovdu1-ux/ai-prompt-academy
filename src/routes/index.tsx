import { createFileRoute } from "@tanstack/react-router";
import courseText from "@/assets/course-text.jpg";
import courseVisual from "@/assets/course-visual.jpg";
import courseLogic from "@/assets/course-logic.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const courses = [
  {
    tag: "LLM Fundamentals",
    title: "Advanced Text Engineering",
    desc: "Master few-shot prompting, system instructions, and persona crafting for GPT-4 and Claude 3.",
    lessons: "12 Lessons",
    level: "Intermediate",
    img: courseText,
  },
  {
    tag: "Visual Synthesis",
    title: "Midjourney & Stable Diffusion",
    desc: "Technical control over aspect ratios, stylization, and structural consistency in image generation.",
    lessons: "18 Lessons",
    level: "Advanced",
    img: courseVisual,
  },
  {
    tag: "Logic & Reasoning",
    title: "Logical Chain Architectures",
    desc: "Building reliable reasoning loops and recursive prompts for complex problem solving.",
    lessons: "8 Lessons",
    level: "Pro",
    img: courseLogic,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-surface-low text-foreground font-sans selection:bg-brand/30">
      <nav className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-border bg-surface-low/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="size-8 bg-brand rounded-sm rotate-45 flex items-center justify-center">
            <div className="size-3 bg-white -rotate-45" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">SYNTHETIX</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#curriculum" className="hover:text-brand transition-colors">Curriculum</a>
          <a href="#lab" className="hover:text-brand transition-colors">Prompt Lab</a>
          <a href="#community" className="hover:text-brand transition-colors">Community</a>
          <button className="px-5 py-2 bg-white text-black rounded-full hover:bg-brand hover:text-white transition-all cursor-pointer">
            Join Academy
          </button>
        </div>
      </nav>

      <section className="relative px-6 md:px-8 pt-24 pb-32 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand-light text-xs font-semibold mb-6">
            <span className="size-1.5 rounded-full bg-brand-light animate-pulse" />
            NEW: LLAMA 3 MASTERCLASS
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
            The Art of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">
              Whispering
            </span>{" "}
            to Machines
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Master the grammar of the future. From latent space architecture to chain-of-thought
            engineering — learn to control AI with surgical precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-brand text-white rounded-lg font-bold hover:bg-brand-light transition-all shadow-lg shadow-brand/20">
              Start Free Course
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-surface-mid border border-border rounded-lg font-bold hover:bg-surface-high transition-all">
              View Library
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-brand/10 blur-[120px] rounded-full -z-0" />
      </section>

      <section id="curriculum" className="px-6 md:px-8 py-20 bg-surface-mid/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
            <div className="max-w-md">
              <h2 className="font-display text-3xl font-bold mb-4 uppercase tracking-wider">
                Curriculums
              </h2>
              <p className="text-muted-foreground/80">
                Deep-dive tracks curated by leading AI researchers and creative directors.
              </p>
            </div>
            <a href="#" className="text-brand-light text-sm font-semibold border-b border-brand/30 pb-1">
              View All Tracks
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((c) => (
              <div
                key={c.title}
                className="group bg-surface-mid border border-border rounded-2xl p-6 hover:border-brand/50 transition-all"
              >
                <div className="w-full aspect-video bg-surface-low rounded-lg mb-6 overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    width={1200}
                    height={720}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-brand-light mb-2">
                  {c.tag}
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{c.desc}</p>
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>{c.lessons}</span>
                  <span className="px-2 py-1 rounded bg-white/5 border border-border">
                    {c.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lab" className="px-6 md:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-high/50 rounded-3xl border border-border p-8 md:p-16 overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl font-bold mb-6">The Prompt Lab</h2>
                <p className="text-muted-foreground mb-8">
                  Don't start from scratch. Our repository contains 5,000+ battle-tested prompts
                  for coding, creative writing, and data analysis.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Token-efficient structures",
                    "Version-controlled iterations",
                    "One-click copy to clipboard",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className="size-2 rounded-full bg-brand" />
                      <span className="text-sm text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-brand hover:text-white transition-all">
                  Enter the Lab
                </button>
              </div>
              <div className="relative">
                <div className="bg-surface-low rounded-xl border border-border p-6 font-mono text-xs md:text-sm leading-relaxed text-foreground/80 shadow-2xl rotate-1">
                  <div className="flex gap-1.5 mb-4">
                    <div className="size-2.5 rounded-full bg-red-500/50" />
                    <div className="size-2.5 rounded-full bg-yellow-500/50" />
                    <div className="size-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-brand-light font-bold italic">// SYSTEM_ROLE</span>
                  <br />
                  Act as a Senior Systems Architect.
                  <br />
                  <br />
                  <span className="text-brand-light font-bold italic">// TASK</span>
                  <br />
                  Analyze the following architecture for scalability bottlenecks.
                  <br />
                  Use a <span className="text-yellow-400">first-principles</span> approach.
                  <br />
                  <br />
                  <span className="text-brand-light font-bold italic">// CONSTRAINTS</span>
                  <br />
                  1. No buzzwords.
                  <br />
                  2. Maximum 300 tokens.
                  <br />
                  3. Use markdown tables for comparisons.
                </div>
                <div className="absolute -bottom-4 -right-4 size-32 bg-brand/30 blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="community" className="px-6 md:px-8 py-12 border-t border-border mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-white/20 rounded-sm rotate-45" />
            <span className="font-display font-bold tracking-tight text-muted-foreground">
              SYNTHETIX AI
            </span>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-8 text-xs font-medium text-muted-foreground/80 justify-center">
            <a href="#">Privacy Policy</a>
            <a href="#">Course Access</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground/40">
            © 2026 Synthetix Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
