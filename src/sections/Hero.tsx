import { useMemo, useRef, type ReactNode, type PointerEvent as RPointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { Arrow, MiniBrowser, Pixels, Pointer, Star } from "../components/Doodles";
import { seeded, useFinePointer } from "../lib/hooks";

const lines: { text: string; italic?: boolean }[] = [
  { text: "I make" },
  { text: "interfaces", italic: true },
  { text: "feel alive." },
];

/** A sticker on the poster: drifts against the pointer, can be picked up and thrown. */
function Sticker({
  children,
  className,
  depth,
  rotate,
  delay,
  mx,
  my,
  area,
  draggable,
}: {
  children: ReactNode;
  className: string;
  depth: number;
  rotate: number;
  delay: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  area: React.RefObject<HTMLElement | null>;
  draggable: boolean;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={`absolute z-10 ${className}`} style={{ x, y }}>
      <motion.div
        initial={{ scale: 0, rotate: rotate - 40, opacity: 0 }}
        animate={{ scale: 1, rotate, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 13, delay }}
        whileHover={{ rotate: rotate + 7, scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        drag={draggable}
        dragConstraints={area}
        dragElastic={0.25}
        data-cursor={draggable ? "DRAG ME" : undefined}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // pointer position across the hero, -1..1, smoothed
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 16 });
  // the one sticker that follows the cursor around, lazily
  const fx = useSpring(useMotionValue(0), { stiffness: 38, damping: 12 });
  const fy = useSpring(useMotionValue(0), { stiffness: 38, damping: 12 });
  const headX = useTransform(mx, (v) => v * -10);
  const headY = useTransform(my, (v) => v * -6);

  const move = (e: RPointerEvent) => {
    if (!fine || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    fx.set(e.clientX - r.left + 26);
    fy.set(e.clientY - r.top + 30);
  };

  // where each letter starts before it finds its place
  const scatter = useMemo(() => {
    const rnd = seeded(7);
    return lines.map((l) =>
      [...l.text].map(() => ({ x: (rnd() - 0.5) * 260, y: (rnd() - 0.5) * 200, r: (rnd() - 0.5) * 70 })),
    );
  }, []);

  let n = 0;
  const s = { mx, my, area: ref, draggable: fine };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={move}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-28 md:px-12 md:pb-14"
    >
      <motion.p
        className="label mb-6 flex items-center gap-2 md:mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <span className="inline-block size-2 rounded-full bg-coral" />
        Shubhi Singh
      </motion.p>

      <motion.h1
        aria-label="I make interfaces feel alive."
        className="display relative z-[5] text-[clamp(3.5rem,15vw,14.5rem)]"
        style={{ x: headX, y: headY }}
      >
        {lines.map((line, li) => (
          <span key={li} aria-hidden className={`block whitespace-nowrap ${line.italic ? "serif-it -my-[0.04em] text-plum" : ""}`}>
            {[...line.text].map((ch, ci) => {
              const from = scatter[li][ci];
              const i = n++;
              return (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={reduce ? false : { x: from.x, y: from.y, rotate: from.r, opacity: 0 }}
                  animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 70, damping: 13, delay: 0.25 + i * 0.035 }}
                  whileHover={{ y: -10, rotate: ci % 2 ? 5 : -5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              );
            })}
          </span>
        ))}
      </motion.h1>

      <div className="relative z-[5] mt-8 grid gap-6 md:mt-12 md:grid-cols-12 md:items-end">
        <motion.div
          className="md:col-span-6 lg:col-span-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <p className="serif text-[1.7rem] leading-[1.05] md:text-[2.1rem]">B.Tech CSE @ VIT Vellore</p>
          <p className="mt-3 max-w-[34ch] text-ink-soft">
            I build playful, thoughtful and slightly obsessive interfaces, from hackathon products to full React
            experiences.
          </p>
        </motion.div>
        <motion.p
          className="label text-ink-soft md:col-span-6 md:text-right lg:col-span-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          12.9692° N, 79.1559° E · Vellore
          <br />
          scroll, and please hover things ↓
        </motion.p>
      </div>

      {/* stickers. Phones get three; the poster gets all of them. */}
      <Sticker {...s} depth={-26} rotate={-9} delay={1.35} className="right-[6%] top-[15%] md:right-[30%] md:top-[14%]">
        <span className="paper-shadow block rounded-full border-[1.5px] border-ink bg-pink px-4 py-2 font-mono text-[13px] md:text-base">
          &lt;div&gt;
        </span>
      </Sticker>
      <Sticker {...s} depth={20} rotate={8} delay={1.45} className="right-[7%] top-[30%] md:right-[9%] md:top-[19%]">
        <MiniBrowser className="paper-shadow w-24 md:w-36" />
      </Sticker>
      <Sticker {...s} depth={-14} rotate={12} delay={1.55} className="left-[58%] top-[22%] md:left-[57%] md:top-[44%]">
        <Star className="size-9 text-coral md:size-14" />
      </Sticker>
      <Sticker {...s} depth={30} rotate={-6} delay={1.65} className="hidden md:block md:left-[58%] md:top-[12%]">
        <span className="paper-shadow grid size-16 place-items-center rounded-full border-[1.5px] border-ink bg-butter font-mono text-lg">
          {"{ }"}
        </span>
      </Sticker>
      <Sticker {...s} depth={16} rotate={5} delay={1.75} className="hidden md:block md:right-[5%] md:top-[52%]">
        <span className="paper-shadow flex gap-1 border-[1.5px] border-ink bg-ivory p-1.5">
          {["bg-butter", "bg-pink", "bg-lavender", "bg-powder", "bg-sage"].map((c) => (
            <i key={c} className={`block h-9 w-5 ${c}`} />
          ))}
        </span>
      </Sticker>
      <Sticker {...s} depth={-34} rotate={-14} delay={1.85} className="hidden lg:block lg:right-[24%] lg:top-[40%]">
        <Pixels className="size-10 text-lavender" />
      </Sticker>
      <Sticker {...s} depth={12} rotate={-4} delay={2.05} className="hidden md:block md:right-[20%] md:bottom-[30%]">
        <span className="relative block bg-butter px-4 pb-4 pt-3 font-mono text-[13px] leading-tight shadow-[2px_3px_0_rgb(42_35_32/0.18)]">
          hover me
          <br />
          (the letters too)
          <Arrow className="absolute -left-20 top-6 w-20 -scale-x-100 text-ink" />
        </span>
      </Sticker>

      {fine && !reduce && (
        <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-20" style={{ x: fx, y: fy }}>
          <Pointer className="w-5 rotate-[8deg] opacity-70" />
        </motion.div>
      )}
    </section>
  );
}
