import { Fragment } from "react";
import { motion } from "motion/react";
import { Headline } from "../components/Motion";
import { DownArrow } from "../components/Doodles";
import { timeline } from "../data/resume";

export function Timeline() {
  return (
    <section className="bg-paper px-5 py-24 md:px-12 md:py-36" data-tone="plum" aria-labelledby="timeline-title">
      <div className="mx-auto max-w-[1100px]">
        <p className="label mb-8 text-ink-soft">05 — How I got here</p>
        <div id="timeline-title">
          <Headline text={"Not really\n*a timeline.*"} className="text-[clamp(2.8rem,9vw,8rem)]" />
        </div>

        <ol className="m-0 mt-14 list-none p-0 md:mt-20">
          {timeline.map((t, i) => (
            <Fragment key={t.stage}>
              <motion.li
                className="grid gap-4 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-12"
                initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -18% 0px" }}
                transition={{ type: "spring", stiffness: 80, damping: 16 }}
              >
                <h3 className={`m-0 ${i % 2 ? "md:order-2" : "md:text-right"}`}>
                  <span
                    className="display inline-block px-3 py-1.5 text-[clamp(2rem,5.6vw,4.4rem)]"
                    style={{ background: t.color, transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
                  >
                    {t.stage}
                  </span>
                </h3>
                <ul className={`m-0 list-none space-y-3 p-0 md:pt-3 ${i % 2 ? "md:order-1 md:text-right" : ""}`}>
                  {t.items.map((it) => (
                    <li key={it.what} className="leading-snug">
                      {it.when && <span className="label mr-2 text-ink-soft">{it.when}</span>}
                      <span>{it.what}</span>
                    </li>
                  ))}
                </ul>
              </motion.li>
              {i < timeline.length - 1 && (
                <li aria-hidden className="flex justify-start py-3 pl-6 md:justify-center md:py-5 md:pl-0">
                  <DownArrow className="h-14 text-ink md:h-16" />
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
