import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/animations")({
  component: AnimationsPreview,
});

// 1. Blur-in cinematic (текущий)
function BlurWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, filter: "blur(24px)", scale: 1.06 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ delay, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
}

// 2. Mask reveal — шторка снизу вверх
function MaskWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom pb-[0.1em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}

// 3. Clip split — разъезжается из центра по горизонтали
function ClipSplitWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      initial={{ letterSpacing: "-0.15em", opacity: 0, clipPath: "inset(0 50% 0 50%)" }}
      animate={{ letterSpacing: "-0.02em", opacity: 1, clipPath: "inset(0 0% 0 0%)" }}
      transition={{ delay, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
}

// 4. Glitch / scramble
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01#@$%&";
function ScrambleWord({ text, delay = 0 }: { text: string; delay?: number }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    let frame = 0;
    const total = 24;
    const start = performance.now() + delay * 1000;
    let raf = 0;
    const tick = (t: number) => {
      if (t < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const revealed = Math.floor((frame / total) * text.length);
      const next = text
        .split("")
        .map((c, i) =>
          i < revealed ? c : c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join("");
      setOut(next);
      if (frame < total) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay]);
  return <span className="inline-block">{out}</span>;
}

function Demo({
  n,
  label,
  desc,
  render,
}: {
  n: number;
  label: string;
  desc: string;
  render: (key: number) => React.ReactNode;
}) {
  const [key, setKey] = useState(0);
  return (
    <div className="border border-white/10 rounded-lg p-8 bg-zinc-950 flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-light">
            Вариант 0{n}
          </div>
          <div className="text-xl font-bold mt-1">{label}</div>
          <div className="text-sm text-zinc-500 mt-1 max-w-md">{desc}</div>
        </div>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="text-[11px] font-mono uppercase tracking-widest border border-white/15 px-3 py-1.5 rounded-sm hover:bg-white hover:text-black transition-colors"
        >
          ↻ Replay
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center py-8 min-h-[220px]">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] text-center">
          {render(key)}
        </h1>
      </div>
    </div>
  );
}

function AnimationsPreview() {
  return (
    <div className="min-h-screen bg-black text-white font-sans px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
            Animation Lab
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Выбери анимацию для SYNTHECS ACADEMY
          </h1>
          <p className="text-zinc-500 max-w-2xl">
            Нажми ↻ Replay чтобы посмотреть эффект снова. Скажи мне номер варианта, и я
            применю его на главной.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Demo
            n={1}
            label="Blur-in cinematic (текущий)"
            desc="Слова проступают из размытия с лёгким зумом. Плавно, кинематографично."
            render={(k) => (
              <div key={k}>
                <div className="block"><BlurWord text="SYNTHECS" /></div>
                <div className="block text-white/80"><BlurWord text="ACADEMY" delay={0.35} /></div>
              </div>
            )}
          />
          <Demo
            n={2}
            label="Mask reveal (шторка)"
            desc="Слова выезжают снизу вверх из-под невидимой маски. Резко, чётко, премиум."
            render={(k) => (
              <div key={k}>
                <div className="block"><MaskWord text="SYNTHECS" /></div>
                <div className="block text-white/80"><MaskWord text="ACADEMY" delay={0.25} /></div>
              </div>
            )}
          />
          <Demo
            n={3}
            label="Clip split"
            desc="Слова разъезжаются из центра с расширением букв. Архитектурно, широко."
            render={(k) => (
              <div key={k}>
                <div className="block"><ClipSplitWord text="SYNTHECS" /></div>
                <div className="block text-white/80"><ClipSplitWord text="ACADEMY" delay={0.3} /></div>
              </div>
            )}
          />
          <Demo
            n={4}
            label="Glitch / scramble"
            desc="Буквы быстро скремблятся случайными символами и оседают в финальный текст. Техно-вайб."
            render={(k) => (
              <div key={k}>
                <div className="block"><ScrambleWord text="SYNTHECS" /></div>
                <div className="block text-white/80"><ScrambleWord text="ACADEMY" delay={0.3} /></div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
