import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { languages, obsessions } from "../data/resume";
import { Reveal } from "../components/Motion";
import { useEffect } from "react";

/** Pick a language and the page says hello in it. */
export function Languages() {
  const [i, setI] = useState(1);
  const cur = languages[i];
  return (
    <section className="px-5 py-24 md:px-12 md:py-36" data-tone="coral" aria-labelledby="lang-title">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p id="lang-title" className="label mb-8 text-ink-soft">
            09 — Languages (the human kind)
          </p>
          <div className="flex min-h-[1.25em] items-center overflow-hidden text-[clamp(4.4rem,17vw,15rem)] leading-none" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={cur.lang}
                lang={cur.lang}
                dir={cur.dir}
                className={`m-0 ${cur.lang === "en" ? "display" : "font-bold leading-[1.25]"}`}
                initial={{ y: "70%", opacity: 0, rotate: 4 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: "-60%", opacity: 0, rotate: -4 }}
                transition={{ duration: 0.38, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {cur.hello}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <ul className="m-0 list-none border-t-[1.5px] border-ink p-0 lg:col-span-5">
          {languages.map((l, n) => (
            <li key={l.name} className="border-b-[1.5px] border-ink">
              <button
                aria-pressed={i === n}
                onClick={() => setI(n)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setI(n)}
                onFocus={() => setI(n)}
                data-cursor={l.hello}
                className="relative flex w-full items-baseline justify-between gap-4 px-2 py-4 text-left"
              >
                {i === n && (
                  <motion.span layoutId="lang-pick" className="absolute inset-0 bg-pink" transition={{ type: "spring", stiffness: 320, damping: 30 }} />
                )}
                <span className="display relative text-[clamp(1.7rem,3.6vw,2.6rem)]">{l.name}</span>
                <span className="label relative text-right">{l.level}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** One word at a time, rolling over. */
export function Currently() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % obsessions.length), 2100);
    return () => window.clearInterval(id);
  }, []);
  const colors = ["bg-butter", "bg-pink", "bg-lavender", "bg-powder", "bg-sage"];

  return (
    <section className="overflow-hidden bg-ink px-5 py-24 text-ivory md:px-12 md:py-36" data-tone="butter" aria-labelledby="cur-title">
      <div className="mx-auto max-w-[1400px]">
        <p id="cur-title" className="label mb-6 text-ivory/60">
          10 — Currently obsessed with
        </p>
        <p className="sr-only">{obsessions.join(", ")}</p>
        <div aria-hidden className="flex h-[1.05em] items-center overflow-hidden text-[clamp(2.7rem,11.5vw,11rem)]">
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              className="display block whitespace-nowrap"
              initial={{ y: "100%", rotate: 3 }}
              animate={{ y: 0, rotate: 0 }}
              exit={{ y: "-100%", rotate: -3 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {i % 2 ? <span className="serif-it text-butter">{obsessions[i].toLowerCase()}</span> : obsessions[i]}
              <span className="text-coral">.</span>
            </motion.span>
          </AnimatePresence>
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center gap-2">
          {obsessions.map((o, n) => (
            <span
              key={o}
              className={`label rounded-full px-3 py-1.5 transition-colors duration-500 ${
                n === i ? `${colors[n]} text-ink` : "border border-ivory/30 text-ivory/70"
              }`}
            >
              {o}
            </span>
          ))}
        </Reveal>
        <p className="mt-10 font-mono text-[12px] text-ivory/50">
          this probably didn't need an animation. okay maybe it did.
        </p>
      </div>
    </section>
  );
}
