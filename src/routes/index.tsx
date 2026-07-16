import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useRef, useEffect } from "react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function SplitHeading() {
  const words = ["The", "Art", "of", "Whispering", "to", "Machines"];
  return (
    <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9] flex flex-wrap justify-center gap-x-4 gap-y-2">
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -60 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={
            w === "Whispering"
              ? "inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light"
              : "inline-block"
          }
          style={{ transformPerspective: 800 }}
        >
          {w}
        </motion.span>
      ))}
    </h1>
  );
}

function TiltCard({ children, i }: { children: React.ReactNode; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className="group bg-surface-mid border border-border rounded-2xl p-6 hover:border-brand/50 transition-colors will-change-transform"
    >
      {children}
    </motion.div>
  );
}

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const blobScale = useTransform(heroProgress, [0, 1], [1, 1.6]);

  const { scrollYProgress } = useScroll();
  const progressBar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Cursor-follow orb
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set(e.clientX - 250);
      my.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  const labRef = useRef<HTMLElement>(null);
  const { scrollYProgress: labProgress } = useScroll({
    target: labRef,
    offset: ["start end", "end start"],
  });
  const labRotate = useTransform(labProgress, [0, 1], [-15, 15]);
  const labY = useTransform(labProgress, [0, 1], [80, -80]);

  return (
    <div className="min-h-screen bg-surface-low text-foreground font-sans selection:bg-brand/30 overflow-x-hidden">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progressBar }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand to-brand-light origin-left z-[100]"
      />

      {/* Cursor orb */}
      <motion.div
        style={{ x: smx, y: smy }}
        className="pointer-events-none fixed top-0 left-0 size-[500px] rounded-full bg-brand/10 blur-[120px] z-0 hidden md:block"
      />

      <nav className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-border bg-surface-low/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <motion.div
            animate={{ rotate: [45, 225, 45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="size-8 bg-brand rounded-sm flex items-center justify-center"
          >
            <div className="size-3 bg-white -rotate-45" />
          </motion.div>
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

      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative px-6 md:px-8 pt-24 pb-32 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand-light text-xs font-semibold mb-6"
          >
            <span className="size-1.5 rounded-full bg-brand-light animate-pulse" />
            NEW: LLAMA 3 MASTERCLASS
          </motion.div>
          <SplitHeading />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Master the grammar of the future. From latent space architecture to chain-of-thought
            engineering — learn to control AI with surgical precision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 bg-brand text-white rounded-lg font-bold transition-colors shadow-lg shadow-brand/30 hover:bg-brand-light"
            >
              Start Free Course
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 py-4 bg-surface-mid border border-border rounded-lg font-bold hover:bg-surface-high transition-colors"
            >
              View Library
            </motion.button>
          </motion.div>
        </div>

        {/* Animated blobs */}
        <motion.div
          style={{ scale: blobScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-brand/15 blur-[120px] rounded-full -z-0"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 size-64 bg-brand-light/20 blur-[100px] rounded-full -z-0"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 size-72 bg-brand/20 blur-[100px] rounded-full -z-0"
        />

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/40 text-xs font-mono uppercase tracking-widest"
        >
          Scroll ↓
        </motion.div>
      </motion.section>

      {/* Marquee */}
      <div className="border-y border-border py-6 overflow-hidden bg-surface-mid/20">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap font-display text-2xl md:text-3xl font-bold text-muted-foreground/40"
        >
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16">
              {["PROMPT ENGINEERING", "★", "LLM MASTERY", "★", "AGENT DESIGN", "★", "RAG SYSTEMS", "★", "GENERATIVE ART", "★"].map(
                (t, i) => (
                  <span key={i} className={t === "★" ? "text-brand" : ""}>
                    {t}
                  </span>
                ),
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Curriculum */}
      <section id="curriculum" className="px-6 md:px-8 py-24 bg-surface-mid/30 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex items-end justify-between mb-12 gap-6 flex-wrap"
          >
            <div className="max-w-md">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider">
                Curriculums
              </h2>
              <p className="text-muted-foreground/80">
                Deep-dive tracks curated by leading AI researchers and creative directors.
              </p>
            </div>
            <a href="#" className="text-brand-light text-sm font-semibold border-b border-brand/30 pb-1">
              View All Tracks
            </a>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <TiltCard key={c.title} i={i}>
                <div className="w-full aspect-video bg-surface-low rounded-lg mb-6 overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    width={1200}
                    height={720}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Lab */}
      <section id="lab" ref={labRef} className="px-6 md:px-8 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-high/50 rounded-3xl border border-border p-8 md:p-16 overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">The Prompt Lab</h2>
                <p className="text-muted-foreground mb-8">
                  Don't start from scratch. Our repository contains 5,000+ battle-tested prompts
                  for coding, creative writing, and data analysis.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Token-efficient structures",
                    "Version-controlled iterations",
                    "One-click copy to clipboard",
                  ].map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <div className="size-2 rounded-full bg-brand" />
                      <span className="text-sm text-foreground/80">{f}</span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-brand hover:text-white transition-colors"
                >
                  Enter the Lab
                </motion.button>
              </motion.div>
              <motion.div
                style={{ rotate: labRotate, y: labY, transformPerspective: 1000 }}
                className="relative"
              >
                <div className="bg-surface-low rounded-xl border border-border p-6 font-mono text-xs md:text-sm leading-relaxed text-foreground/80 shadow-2xl shadow-brand/20">
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
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 size-40 bg-brand/40 blur-3xl -z-10"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <footer id="community" className="px-6 md:px-8 py-12 border-t border-border mt-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [45, 405] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="size-6 bg-white/20 rounded-sm"
            />
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
