import { useState } from "react";
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
        <div className="relative mt-12 rounded-[28px] bg-paper px-4 py-10 md:mt-16 md:rounded-[44px] md:px-12 md:py-16">
          <Star className="absolute right-6 top-6 size-6 text-coral" />
          <span className="label absolute bottom-5 right-6 text-ink-soft">fig. 1 — desk, lightly tidied</span>
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
