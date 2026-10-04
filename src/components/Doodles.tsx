import { motion } from "motion/react";
import type { CSSProperties } from "react";

type P = { className?: string; style?: CSSProperties; color?: string };

const draw = {
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true },
  transition: { duration: 1.1, ease: "easeInOut" as const, delay: 0.3 },
};

/** Four-point star. The site's bullet, sticker and full stop. */
export function Star({ className = "", style, color = "currentColor" }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <path d="M24 2c1.6 12.4 7.6 18.4 22 22-14.4 3.6-20.4 9.6-22 22C22.400 33.600 16.400 27.600 2 24 16.400 20.400 22.400 14.400 24 2z" fill={color} />
    </svg>
  );
}

/** Hand-drawn curved arrow that draws itself when it scrolls in. */
export function Arrow({ className = "", style, color = "currentColor" }: P) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} style={style} aria-hidden>
      <motion.path d="M6 12c30-10 78-2 92 48" stroke={color} strokeWidth="2.6" strokeLinecap="round" {...draw} />
      <motion.path d="M84 50l15 12 7-19" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...draw} transition={{ ...draw.transition, delay: 1.1, duration: 0.4 }} />
    </svg>
  );
}

/** Straight-ish arrow pointing down, for the timeline. */
export function DownArrow({ className = "", color = "currentColor" }: P) {
  return (
    <svg viewBox="0 0 30 70" fill="none" className={className} aria-hidden>
      <motion.path d="M15 3c-4 16 5 30 0 58" stroke={color} strokeWidth="2.4" strokeLinecap="round" {...draw} />
      <motion.path d="M6 50l9 13 9-14" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...draw} transition={{ ...draw.transition, delay: 1.1, duration: 0.4 }} />
    </svg>
  );
}

/** Imperfect underline. */
export function Scribble({ className = "", color = "currentColor" }: P) {
  return (
    <svg viewBox="0 0 300 18" fill="none" preserveAspectRatio="none" className={className} aria-hidden>
      <motion.path d="M3 11c40-8 78 6 118-1s70-7 104-2 48 4 72-2" stroke={color} strokeWidth="3.4" strokeLinecap="round" {...draw} />
    </svg>
  );
}

/** A tiny browser window. */
export function MiniBrowser({ className = "", style }: P) {
  return (
    <div className={`rounded-lg border-[1.5px] border-ink bg-ivory ${className}`} style={style} aria-hidden>
      <div className="flex gap-1 border-b-[1.5px] border-ink px-2 py-1.5">
        <i className="block size-1.5 rounded-full bg-coral" />
        <i className="block size-1.5 rounded-full bg-butter" />
        <i className="block size-1.5 rounded-full bg-sage" />
      </div>
      <div className="space-y-1.5 p-2">
        <i className="block h-3 w-3/4 rounded-sm bg-ink" />
        <i className="block h-1 w-full rounded-sm bg-ink/25" />
        <i className="block h-1 w-2/3 rounded-sm bg-ink/25" />
        <i className="mt-2 block h-3 w-9 rounded-full bg-coral" />
      </div>
    </div>
  );
}

/** A small cluster of pixels. */
export function Pixels({ className = "", color = "currentColor" }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {[
        [0, 10], [10, 0], [10, 10], [10, 20], [20, 10], [20, 20], [30, 20], [20, 30],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="9" height="9" fill={color} />
      ))}
    </svg>
  );
}

/** A pointer arrow, the old-fashioned kind. */
export function Pointer({ className = "", style }: P) {
  return (
    <svg viewBox="0 0 28 34" className={className} style={style} aria-hidden>
      <path d="M3 2l21 13-9.500 2.200 5.500 11-4.200 2-5.300-11L3 26z" fill="#FBF6EC" stroke="#2A2320" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
