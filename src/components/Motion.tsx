import { useRef, type CSSProperties, type ReactNode, type PointerEvent as RPointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useFinePointer } from "../lib/hooks";

const ease = [0.2, 0.7, 0.2, 1] as const;

/** Headline that reveals word by word. `*word*` sets a word in the italic serif, `\n` breaks the line. */
export function Headline({
  text,
  as = "h2",
  className = "",
  delay = 0,
  style,
}: {
  text: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const Tag = motion[as];
  let n = 0;
  return (
    <Tag
      className={`display ${className}`}
      style={style}
      aria-label={text.replace(/\*/g, "").replace(/\n/g, " ")}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {text.split("\n").map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((word, wi) => {
            const italic = word.startsWith("*");
            const i = n++;
            return (
              <span key={wi}>
                <span className="mask">
                  <motion.span
                    className={`inline-block ${italic ? "serif-it" : ""}`}
                    variants={{
                      hidden: { y: "115%", rotate: 5 },
                      show: { y: 0, rotate: 0, transition: { duration: 0.85, ease, delay: delay + i * 0.07 } },
                    }}
                  >
                    {word.replace(/\*/g, "")}
                  </motion.span>
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Quiet fade-and-rise as an element scrolls into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Pulls its child a little toward the pointer. Used on the buttons that matter. */
export function Magnetic({ children, strength = 0.3, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const active = fine && !reduce;

  const move = (e: RPointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div ref={ref} className={`inline-block ${className}`} style={{ x, y }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}

/** Tilts its child toward the pointer by a few degrees, like something you could pick up. */
export function Tilt({ children, max = 5, className = "" }: { children: ReactNode; max?: number; className?: string }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const active = fine && !reduce;

  const move = (e: RPointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <div ref={ref} className={className} style={{ perspective: 1100 }} onPointerMove={move} onPointerLeave={reset}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>{children}</motion.div>
    </div>
  );
}
