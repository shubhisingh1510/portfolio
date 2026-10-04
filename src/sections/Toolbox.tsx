import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Headline, Reveal } from "../components/Motion";
import { Arrow, Star } from "../components/Doodles";
import { tools, type Tool } from "../data/resume";

const shapes: Record<Tool["shape"], string> = {
  note: "rounded-[3px] px-5 pb-6 pt-4 shadow-[2px_4px_0_rgb(42_35_32/0.16)]",
  tag: "rounded-full border-[1.5px] border-ink px-5 py-3",
  key: "paper-shadow rounded-xl border-[1.5px] border-ink px-5 py-4",
  tape: "px-6 py-3 [clip-path:polygon(0_0,97%_4%,100%_100%,3%_96%)]",
  card: "paper-shadow rounded-md border-[1.5px] border-ink px-5 py-4",
};

function Thing({ tool, open, setOpen }: { tool: Tool; open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <motion.li
      layout
      className="relative list-none"
      style={{ marginTop: tool.lift ?? 0, zIndex: open ? 5 : 1 }}
      initial={{ opacity: 0, y: 30, rotate: tool.rotate }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={open ? { rotate: 0, scale: 1.06 } : { rotate: tool.rotate, scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
    >
      <button
        type="button"
        aria-expanded={open}
        onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(true)}
        data-cursor="PLAY"
        className={`block max-w-[17rem] text-left ${shapes[tool.shape]}`}
        style={{ background: tool.color }}
      >
        <span className="display block text-[1.7rem] md:text-[2.1rem]">{tool.name}</span>
        <AnimatePresence initial={false}>
          {open && (
            <motion.span
              key="note"
              className="block overflow-hidden font-mono text-[13px] leading-snug"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="block pt-2">{tool.note}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.li>
  );
}

/** A decorative star. It is only decorative. */
function DeskStar() {
  const [clicks, setClicks] = useState(0);
  const [say, setSay] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const click = () => {
    const n = clicks + 1;
    setClicks(n);
    const line = n === 5 ? "you really clicked that?" : n === 9 ? "respect." : null;
    if (!line) return;
    setSay(line);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSay(null), 2600);
  };

  return (
    <div className="absolute right-5 top-5 flex items-center gap-2">
      <AnimatePresence>
        {say && (
          <motion.span
            key={say}
            role="status"
            className="font-mono text-[11px] text-ink-soft"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            {say}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        aria-label="A star"
        onClick={click}
        className="grid size-8 place-items-center rounded-full"
        animate={{ rotate: clicks * 45 }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 14 }}
      >
        <Star className="size-6 text-coral" />
      </motion.button>
    </div>
  );
}

export function Toolbox() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="stack" data-tone="coral" className="relative px-5 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="label mb-8 text-ink-soft">02 — My frontend brain</p>
        <div className="grid items-end gap-6 md:grid-cols-12">
          <Headline text={"What's on\n*the desk.*"} className="text-[clamp(2.8rem,9vw,8rem)] md:col-span-8" />
          <Reveal className="relative md:col-span-4">
            <p className="max-w-[30ch] text-ink-soft">
              No skill bars. I don't know what 87% of React would even mean. Pick things up instead.
            </p>
            <Arrow className="mt-2 hidden w-20 rotate-[60deg] text-ink md:block" />
          </Reveal>
        </div>

        {/* the desk */}
        <div className="lit relative mt-12 rounded-[28px] bg-paper px-4 py-10 shadow-[inset_0_-18px_30px_-22px_rgb(42_35_32/0.18)] md:mt-16 md:rounded-[44px] md:px-12 md:py-16" style={{ "--light": 0.5 } as React.CSSProperties}>
          <DeskStar />
          <span className="label group absolute bottom-5 right-6 text-ink-soft" tabIndex={0}>
            <span className="group-hover:hidden group-focus:hidden">fig. 1 — desk, lightly tidied</span>
            <span className="hidden group-hover:inline group-focus:inline">fig. 1 — it did not look like this before</span>
          </span>
          <ul className="m-0 flex flex-wrap items-start gap-x-5 gap-y-6 p-0 pb-8 md:gap-x-9 md:gap-y-10">
            {tools.map((tool) => (
              <Thing
                key={tool.name}
                tool={tool}
                open={open === tool.name}
                setOpen={(v) => setOpen(v ? tool.name : (cur) => (cur === tool.name ? null : cur))}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
