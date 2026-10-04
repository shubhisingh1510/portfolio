import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useFinePointer } from "../lib/hooks";

// colours from the TerraBridge X screens
const tb = { ink: "#0A0E14", panel: "#0F1620", line: "#1E2832", text: "#E8EDF2", dim: "#8B9AAB" };
const sensors = [
  { name: "SAR", color: "#5EE6C5", filter: "grayscale(1) contrast(1.7) brightness(.85)" },
  { name: "Optical", color: "#FF8A4C", filter: "none" },
  { name: "Multispectral", color: "#7C9CFF", filter: "hue-rotate(150deg) saturate(2.2)" },
];

// "imagery" is drawn with CSS: no image files, nothing fetched
const scenes = [
  {
    query: "flooded farmland",
    bg: "radial-gradient(ellipse at 32% 62%, #1f3d5c 0 27%, transparent 29%), radial-gradient(ellipse at 72% 30%, #27496b 0 17%, transparent 19%), repeating-linear-gradient(115deg, #4f6b3f 0 6px, #62803f 6px 12px)",
  },
  {
    query: "river delta",
    bg: "radial-gradient(circle at 100% 100%, #1b3a57 0 46%, transparent 47%), linear-gradient(128deg, transparent 0 44%, #2b587c 44% 50%, transparent 50%), linear-gradient(100deg, transparent 0 58%, #2b587c 58% 61%, transparent 61%), #86804f",
  },
  {
    query: "city grid",
    bg: "repeating-linear-gradient(0deg, #a39f95 0 2px, transparent 2px 13px), repeating-linear-gradient(90deg, #a39f95 0 2px, transparent 2px 17px), linear-gradient(135deg, #5f5d58, #77705f)",
  },
];

export function TerraMini() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const [pick, setPick] = useState(0);
  const [typed, setTyped] = useState(scenes[0].query);
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(52), { stiffness: 90, damping: 16 });
  const rz = useSpring(useMotionValue(-24), { stiffness: 90, damping: 16 });

  // type the query out, one character at a time
  useEffect(() => {
    const q = scenes[pick].query;
    if (reduce) return setTyped(q);
    let i = 0;
    setTyped("");
    const id = window.setInterval(() => {
      i += 1;
      setTyped(q.slice(0, i));
      if (i >= q.length) window.clearInterval(id);
    }, 38);
    return () => window.clearInterval(id);
  }, [pick, reduce]);

  const move = (e: RPointerEvent) => {
    if (!fine || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rz.set(-24 + ((e.clientX - r.left) / r.width - 0.5) * 22);
    rx.set(52 - ((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const reset = () => {
    rx.set(52);
    rz.set(-24);
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      className="overflow-hidden rounded-[24px] border"
      style={{ background: tb.panel, borderColor: tb.line, color: tb.text }}
      data-cursor="PLAY"
    >
      <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: tb.line }}>
        <span className="label" style={{ color: tb.dim }}>
          query
        </span>
        <span className="min-h-[1.4em] flex-1 font-mono text-[13px]" aria-live="polite">
          {typed}
          <i className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-blink bg-[#5EE6C5]" />
        </span>
        <span className="label hidden sm:block" style={{ color: tb.dim }}>
          text → image
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 px-4 pt-3">
        {scenes.map((s, i) => (
          <button
            key={s.query}
            aria-pressed={pick === i}
            onClick={() => setPick(i)}
            className="label rounded-full border px-3 py-1.5 transition-colors"
            style={{
              borderColor: pick === i ? tb.text : tb.line,
              background: pick === i ? tb.text : "transparent",
              color: pick === i ? tb.ink : tb.dim,
            }}
          >
            {s.query}
          </button>
        ))}
      </div>

      {/* a tilted table of tiles: each row is one place, each column one sensor */}
      <div className="grid h-[18rem] place-items-center md:h-[23rem]" style={{ perspective: 900 }}>
        <motion.div
          className="grid w-[50%] grid-cols-3 gap-2.5 md:w-[42%]"
          style={{ rotateX: rx, rotateZ: rz, transformStyle: "preserve-3d" }}
          role="img"
          aria-label={`Nine image tiles. The row for "${scenes[pick].query}" is lifted, showing the same place as seen by SAR, optical and multispectral sensors.`}
        >
          {scenes.map((scene, r) =>
            sensors.map((sensor) => {
              const hit = r === pick;
              return (
                <motion.div
                  key={`${r}-${sensor.name}`}
                  className="relative aspect-square overflow-hidden rounded-md"
                  animate={{ z: hit ? 46 : 0, opacity: hit ? 1 : 0.32 }}
                  transition={{ type: "spring", stiffness: 170, damping: 18 }}
                  style={{ boxShadow: hit ? `0 0 0 1.5px ${sensor.color}, 0 18px 30px -8px ${sensor.color}66` : `0 0 0 1px ${tb.line}` }}
                >
                  <div className="absolute inset-0" style={{ background: scene.bg, filter: sensor.filter }} />
                </motion.div>
              );
            }),
          )}
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-1 border-t px-4 py-3" style={{ borderColor: tb.line, background: tb.panel }}>
        {sensors.map((s) => (
          <span key={s.name} className="label flex items-center gap-1.5" style={{ color: tb.dim }}>
            <i className="size-2 rounded-full" style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
        <span className="ml-auto font-mono text-[10px]" style={{ color: tb.dim }}>
          css-drawn tiles · illustrative
        </span>
      </div>
    </div>
  );
}
