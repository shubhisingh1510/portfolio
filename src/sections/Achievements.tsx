import { motion } from "motion/react";
import { Headline, Reveal } from "../components/Motion";
import { Star } from "../components/Doodles";
import { clippings, leadership } from "../data/resume";

/** The hackathon result, as a ticket. Hover it and the stub starts to tear. */
function Ticket() {
  return (
    <motion.div
      className="relative flex max-w-[44rem] flex-col sm:flex-row"
      initial="rest"
      whileHover="hover"
      whileInView="in"
      viewport={{ once: true }}
      data-cursor="ADMIT ONE"
    >
      <motion.div
        className="relative flex-1 rounded-l-2xl rounded-r-2xl border-[1.5px] border-ink bg-butter p-6 sm:rounded-r-none sm:border-r-0 md:p-8"
        variants={{ rest: { rotate: -2, y: 30, opacity: 0 }, in: { rotate: -2, y: 0, opacity: 1 }, hover: { rotate: -1 } }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
      >
        <p className="label flex items-center gap-2">
          <Star className="size-3" /> Hackathon · 2026
        </p>
        <p className="display mt-4 text-[clamp(1.9rem,4.4vw,3.3rem)]">
          SheBuilds Chennai <span className="serif-it">×</span> CCCL
        </p>
        <p className="mt-2 font-mono text-[13px]">Code &amp; Challenge 3.0</p>
        <p className="mt-5 max-w-[30ch] leading-snug">Advanced to the national-level final round.</p>
        <p className="label mt-6 text-ink-soft">Admit one · final round</p>
      </motion.div>

      <motion.div
        className="relative -mt-px grid place-items-center rounded-2xl border-[1.5px] border-dashed border-ink bg-coral px-7 py-6 text-center sm:-ml-px sm:mt-0 sm:rounded-l-none sm:border-l-[1.5px]"
        style={{ transformOrigin: "0% 100%" }}
        variants={{ rest: { rotate: -2, y: 30, opacity: 0 }, in: { rotate: -2, y: 0, opacity: 1 }, hover: { rotate: 7, x: 10, y: -6 } }}
        transition={{ type: "spring", stiffness: 160, damping: 12 }}
      >
        <div>
          <p className="label">Top</p>
          <p className="display text-[4.2rem] leading-none">50</p>
          <p className="label">of 700+ teams</p>
          <p className="label mt-1 opacity-70">nationwide</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Achievements() {
  return (
    <section className="px-5 py-24 md:px-12 md:py-36" aria-labelledby="ach-title">
      <div className="mx-auto max-w-[1400px]">
        <p className="label mb-8 text-ink-soft">06 — Achievements</p>
        <div id="ach-title">
          <Headline text={"Kept the\n*ticket stub.*"} className="text-[clamp(2.8rem,9vw,8rem)]" />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Ticket />
          </div>

          <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:gap-0">
            {clippings.map((c, i) => (
              <motion.li
                key={c.by}
                className="soft-shadow relative border border-ink/15 p-5 lg:max-w-[24rem] lg:[&:nth-child(2)]:-mt-4 lg:[&:nth-child(2)]:ml-16 lg:[&:nth-child(3)]:-mt-3 lg:[&:nth-child(3)]:ml-4"
                style={{ background: c.color }}
                initial={{ opacity: 0, y: 30, rotate: c.rotate * 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: c.rotate }}
                whileHover={{ rotate: 0, scale: 1.03, zIndex: 3 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 16, delay: i * 0.08 }}
              >
                <p className="label flex justify-between border-b border-ink/30 pb-2 text-ink-soft">
                  <span>{c.by}</span>
                  <span>{c.year}</span>
                </p>
                <p className="serif mt-3 text-[1.8rem] leading-[1.02]">{c.title}</p>
                <p className="mt-2 text-[0.92rem] leading-snug">{c.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-20 border-t-[1.5px] border-ink pt-8 md:mt-28">
          <h3 className="label m-0 text-ink-soft">Leadership &amp; organisations</h3>
          <ul className="m-0 mt-6 grid list-none gap-8 p-0 md:grid-cols-3">
            {leadership.map((l) => (
              <li key={l.org}>
                <p className="serif text-[1.5rem] leading-[1.1]">{l.org}</p>
                <p className="label mt-2 text-ink-soft">{l.when}</p>
                <p className="mt-2 text-[0.95rem] leading-snug text-ink-soft">{l.what}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
