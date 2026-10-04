import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "../lib/hooks";

/**
 * One cursor for the whole page. Any element can change it:
 *   data-cursor="VIEW PROJECT →"   turns the dot into a labelled pill
 *   data-tone="coral"              recolours the dot while inside that section
 */
const tones: Record<string, { bg: string; fg: string }> = {
  ink: { bg: "var(--color-ink)", fg: "var(--color-ivory)" },
  coral: { bg: "var(--color-coral)", fg: "var(--color-ink)" },
  plum: { bg: "var(--color-plum)", fg: "var(--color-ivory)" },
  butter: { bg: "var(--color-butter)", fg: "var(--color-ink)" },
  ivory: { bg: "var(--color-ivory)", fg: "var(--color-ink)" },
  navy: { bg: "#223E5B", fg: "#FCF8F3" },
};

export function Cursor() {
  const fine = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.35 });
  const [label, setLabel] = useState<string | null>(null);
  const [tone, setTone] = useState("ink");
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const read = (target: EventTarget | null) => {
      const el = target instanceof Element ? target : null;
      setLabel(el?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? null);
      setTone(el?.closest("[data-tone]")?.getAttribute("data-tone") ?? "ink");
    };
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      read(e.target);
    };
    // scrolling moves content under a still pointer, so re-read what is there
    // also fired as "cursor:refresh" by anything that changes its own data-cursor while hovered
    const scroll = () => read(document.elementFromPoint(x.get(), y.get()));
    const press = () => setDown(true);
    const release = () => setDown(false);
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("cursor:refresh", scroll);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("cursor:refresh", scroll);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      root.removeEventListener("pointerleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;
  const c = tones[tone] ?? tones.ink;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <div
        className="label flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full"
        style={{
          background: c.bg,
          color: c.fg,
          height: label ? 34 : 14,
          maxWidth: label ? 260 : 14,
          minWidth: 14,
          padding: label ? "0 14px" : 0,
          transform: `translate(-50%, -50%) scale(${down ? 0.82 : 1})`,
          transition:
            "max-width .35s var(--ease-soft), height .25s var(--ease-soft), padding .25s var(--ease-soft), background .3s, transform .15s",
        }}
      >
        <span style={{ opacity: label ? 1 : 0, transition: "opacity .2s .08s" }}>{label}</span>
      </div>
    </motion.div>
  );
}
