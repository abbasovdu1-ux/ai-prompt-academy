import { motion } from "framer-motion";

type LogoProps = {
  size?: number;
  className?: string;
  animate?: boolean;
};

/**
 * Synthecs logo mark — a stacked geometric "S" built from two offset arcs
 * inside a rounded square. Uses the --brand token so it stays theme-aware.
 */
export function Logo({ size = 28, className = "", animate = true }: LogoProps) {
  const Wrapper = animate ? motion.div : "div";
  const wrapperProps = animate
    ? {
        whileHover: { rotate: 90 },
        transition: { type: "spring" as const, stiffness: 200, damping: 15 },
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="synthecs-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(var(--brand-h, 220) 90% 65%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--brand-h, 220) 90% 45%)" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Rounded square backdrop with brand color */}
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          className="fill-brand"
        />
        {/* Inner "S" glyph — two mirrored arcs */}
        <path
          d="M22 10.5c-1.2-1.6-3.2-2.5-5.4-2.5-3.2 0-5.6 1.9-5.6 4.6 0 2.4 1.7 3.7 5.2 4.4l1.6.3c3.2.6 4.2 1.4 4.2 2.9 0 1.7-1.7 2.8-4.2 2.8-2.2 0-4-.8-5.2-2.3"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Corner accent dot */}
        <circle cx="25" cy="7" r="1.8" fill="white" fillOpacity="0.9" />
      </svg>
    </Wrapper>
  );
}
