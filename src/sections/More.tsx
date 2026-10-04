import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Headline, Reveal } from "../components/Motion";
import { moreProjects } from "../data/resume";

const washes = ["var(--color-powder)", "var(--color-butter)", "var(--color-lavender)"];

/** An index, like the back pages of a magazine. Rows open to show the detail. */
export function More() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-5 py-24 md:px-12 md:py-36" aria-labelledby="more-title">
      <div className="mx-auto max-w-[1400px]">
        <p className="label mb-8 text-ink-soft">04 — More things I've built</p>
        <div id="more-title">
          <Headline text={"Also on\n*the shelf.*"} className="text-[clamp(2.8rem,9vw,8rem)]" />
        </div>
        <Reveal>
          <p className="mt-6 max-w-[46ch] text-ink-soft">
            Recent builds that aren't on the résumé yet. Less frontend, more "what happens if I try this".
          </p>
        </Reveal>

        <ul className="m-0 mt-12 list-none border-t-[1.5px] border-ink p-0 md:mt-16">
          {moreProjects.map((p, i) => {
            const isOpen = open === i;
            return (
              <li key={p.name} className="relative border-b-[1.5px] border-ink">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 origin-top"
                  style={{ background: washes[i % washes.length] }}
                  initial={false}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                />
                <div className="relative px-1 md:px-5">
                  <h3 className="m-0">
                    <button
                      aria-expanded={isOpen}
                      aria-controls={`more-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      data-cursor={isOpen ? "CLOSE" : "OPEN"}
                      className="grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-5 text-left md:grid-cols-[5rem_1fr_1.2fr_auto] md:py-7"
                    >
                      <span className="label text-ink-soft">{String(i + 7).padStart(2, "0")}</span>
                      <span className="display text-[clamp(1.8rem,4.6vw,3.8rem)]">{p.name}</span>
                      <span className="col-start-2 text-[0.95rem] leading-snug text-ink-soft md:col-start-3 md:text-[1.05rem]">
                        {p.line}
                      </span>
                      <motion.span
                        aria-hidden
                        className="col-start-3 row-start-1 font-mono text-2xl md:col-start-4"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                      >
                        +
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`more-${i}`}
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                      >
                        <dl className="m-0 grid gap-x-10 gap-y-5 pb-8 md:grid-cols-[5rem_1fr_1fr] md:pb-10">
                          <div className="md:col-start-2">
                            <dt className="label mb-1.5 text-ink-soft">What I built</dt>
                            <dd className="m-0 leading-[1.55]">{p.built}</dd>
                          </div>
                          <div>
                            <dt className="label mb-1.5 text-ink-soft">Why it's interesting</dt>
                            <dd className="m-0 leading-[1.55]">{p.why}</dd>
                          </div>
                          <div className="md:col-start-2">
                            <dt className="label mb-2 text-ink-soft">Tech</dt>
                            <dd className="m-0 flex flex-wrap gap-1.5">
                              {p.tech.map((t) => (
                                <span key={t} className="label rounded-full border border-ink px-2.5 py-1">
                                  {t}
                                </span>
                              ))}
                            </dd>
                          </div>
                          <div>
                            <dt className="label mb-2 text-ink-soft">Link</dt>
                            <dd className="m-0 font-mono text-[13px]">
                              {p.link ? (
                                <a
                                  href={p.link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  data-cursor="OPEN GITHUB ↗"
                                  className="underline decoration-[1.5px] underline-offset-4"
                                >
                                  {p.link.label} ↗
                                </a>
                              ) : (
                                <span className="text-ink-soft">not public yet</span>
                              )}
                            </dd>
                          </div>
                        </dl>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
