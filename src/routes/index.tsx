import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const modules = [
  {
    tag: "01 / BASIC SYNTHESIS",
    title: "Prompt Engineering I",
    desc: "The fundamental linguistics of LLM interaction and basic latent space navigation.",
  },
  {
    tag: "02 / ARCHITECTURE",
    title: "System Instructions",
    desc: "Designing persistent personas and autonomous agent frameworks with high reliability.",
  },
  {
    tag: "03 / DATA MODELS",
    title: "Context Windowing",
    desc: "Advanced strategies for RAG, vector injection, and managing long-form synthetic memory.",
  },
  {
    tag: "04 / INTEGRATION",
    title: "API Orchestration",
    desc: "Bridging the gap between raw prompts and production-ready software deployments.",
  },
];

function SplitWord({
  text,
  delay = 0,
  from = "bottom",
}: {
  text: string;
  delay?: number;
  from?: "top" | "bottom";
}) {
  const y = from === "top" ? -80 : 80;
  return (
    <span className="inline-block">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.035, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block will-change-transform"
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}



function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroP, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroP, [0, 1], [1, 0]);
  const glowScale = useTransform(heroP, [0, 1], [1, 1.6]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Cursor orb
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set(e.clientX - 250);
      my.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);

  const labRef = useRef<HTMLElement>(null);
  const { scrollYProgress: labP } = useScroll({
    target: labRef,
    offset: ["start end", "end start"],
  });
  const labY = useTransform(labP, [0, 1], [100, -100]);
  const labRot = useTransform(labP, [0, 1], [-6, 6]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand/30 overflow-x-hidden">

      {/* Cursor orb */}
      <motion.div
        style={{ x: smx, y: smy }}
        className="pointer-events-none fixed top-0 left-0 size-[500px] rounded-full bg-brand/10 blur-[120px] z-0 hidden md:block"
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 backdrop-blur-md bg-black/50 border-b border-white/5">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="size-2.5 bg-brand rounded-[1px]"
          />
          <span className="text-sm font-extrabold tracking-tighter">SYNTHETIX</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
          <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
          <a href="#lab" className="hover:text-white transition-colors">Prompt Lab</a>
          <a href="#footer" className="hover:text-white transition-colors">System</a>
        </div>
        <a
          href="#curriculum"
          className="text-[11px] font-mono uppercase tracking-widest border border-white/15 px-4 py-2 rounded-sm hover:bg-white hover:text-black transition-colors"
        >
          Enroll →
        </a>
      </nav>

      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        <motion.div
          style={{ scale: glowScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-brand/10 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 size-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center space-y-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="size-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">
              Academy 2.0 Live
            </span>
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-[0.9]">
            <SplitWord text="SYNTHETIX" from="top" />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
              <SplitWord text="ACADEMY" delay={0.5} from="bottom" />

            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="max-w-xl mx-auto text-zinc-400 text-lg md:text-xl font-light leading-relaxed"
          >
            Master the architecture of synthetic intelligence through high-fidelity curricula
            and hands-on prompt engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.a
              href="#curriculum"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-white text-black font-bold rounded-sm hover:bg-brand-light transition-colors"
            >
              Begin Mastery
            </motion.a>
            <motion.a
              href="#curriculum"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border border-white/10 backdrop-blur-md rounded-sm hover:bg-white/5 transition-colors"
            >
              View Curriculum
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center space-y-2 opacity-40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono">
            Scroll to Explore
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </motion.section>

      {/* Curriculum */}
      <section id="curriculum" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              The Mastery Path
            </h2>
            <p className="text-zinc-500 max-w-md">
              Four specialized tracks designed to transition you from prompt hobbyist to
              synthetic architect.
            </p>
          </div>
          <div className="text-sm font-mono text-brand-light">[ 04 Modules Available ]</div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ backgroundColor: "rgb(9,9,11)" }}
              className="bg-black p-10 group relative overflow-hidden"
            >
              <div className="text-xs font-mono text-zinc-500 mb-8">{m.tag}</div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-brand-light transition-colors">
                {m.title}
              </h3>
              <p className="text-zinc-400 font-light mb-12">{m.desc}</p>
              <a
                href="#"
                className="text-sm border-b border-white/20 pb-1 hover:border-white transition-all inline-block"
              >
                Explore Syllabus →
              </a>
              <motion.div
                className="absolute -bottom-16 -right-16 size-40 bg-brand/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Prompt Lab */}
      <section
        id="lab"
        ref={labRef}
        className="py-32 bg-zinc-950 border-y border-white/5 px-6 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Prompt Lab</h2>
              <p className="text-zinc-400 font-light">
                Our proprietary sandbox where you stress-test prompts against multiple model
                architectures in real-time.
              </p>
              <ul className="space-y-4 font-mono text-sm text-zinc-500">
                {[
                  "Multi-model Parallel Testing",
                  "Latency & Token Analysis",
                  "Versioned Prompt History",
                ].map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <span className="size-1 bg-brand rounded-full" /> {f}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              style={{ y: labY, rotateX: labRot, transformPerspective: 1200 }}
              className="lg:col-span-3"
            >
              <div className="bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-brand/10">
                <div className="bg-zinc-900 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="size-2.5 rounded-full bg-zinc-700" />
                    <div className="size-2.5 rounded-full bg-zinc-700" />
                    <div className="size-2.5 rounded-full bg-zinc-700" />
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 tracking-tighter">
                    PROMPT_EXECUTOR_V.4.2
                  </div>
                </div>
                <div className="p-8 font-mono text-sm leading-relaxed">
                  <div className="text-green-400 mb-2 font-bold">USER_INPUT:</div>
                  <div className="text-zinc-300 pl-4 mb-6">
                    Design a website for my AI-powered study assistant project.
                  </div>
                  <div className="text-brand-light mb-2 font-bold">SYSTEM_OUTPUT:</div>
                  <div className="text-zinc-400 border-l-2 border-brand/30 pl-4 py-1 mb-6 space-y-2">
                    <p className="italic">
                      "You are a high-level frontend developer with deep experience shipping AI
                      products. For an AI study assistant, structure the site as follows:"
                    </p>
                    <ul className="not-italic list-decimal pl-5 text-zinc-500 space-y-1">
                      <li>Hero with a live prompt demo of the assistant</li>
                      <li>Feature grid: flashcards, summaries, Q&amp;A tutor</li>
                      <li>Social proof from students + universities</li>
                      <li>Pricing tuned for academic tiers, CTA to try free</li>
                    </ul>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="text-zinc-600"
                  >
                    _
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-40 -right-40 size-[500px] bg-brand/20 blur-[140px] rounded-full pointer-events-none"
        />
      </section>

      {/* Footer */}
      <footer id="footer" className="py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
          <div className="text-xl font-extrabold tracking-tighter">SYNTHETIX</div>
          <div className="flex items-center gap-8 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#lab" className="hover:text-white transition-colors">Prompt Lab</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">System Status</a>
          </div>
          <div className="text-[10px] font-mono text-zinc-600">
            © 2026 SYNTHETIX INTELLECTUAL UNITS.
          </div>
        </div>
      </footer>
    </div>
  );
}
