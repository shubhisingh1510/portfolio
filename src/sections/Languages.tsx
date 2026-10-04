import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { languages, obsessions } from "../data/resume";
import { Reveal } from "../components/Motion";
import { useEffect, useRef } from "react";
import { Torch } from "../components/Torch";

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

// things written on the wall in the dark. Phones get the first few, in the gaps the layout leaves.
const secrets = [
  { t: "react", cls: "serif-it text-[2.6rem] md:text-[4.2rem] left-[8%] bottom-[15%] md:bottom-auto md:left-[55%] md:top-[13%]", r: -8 },
  { t: "motion", cls: "serif-it text-[2.2rem] md:text-[3.4rem] left-[56%] bottom-[19%] md:bottom-auto md:left-[76%] md:top-[30%]", r: 5 },
  { t: "css", cls: "font-mono text-[1.1rem] md:text-[1.6rem] right-[8%] top-[5%] md:right-auto md:left-[66%] md:top-[53%]", r: -3 },
  { t: "build", cls: "display text-[1.6rem] md:text-[2.6rem] left-[34%] bottom-[5%] md:bottom-auto md:left-[85%] md:top-[60%]", r: 7 },
  { t: "ui", cls: "display text-[1.4rem] md:text-[2rem] left-[76%] bottom-[6%] md:bottom-auto md:left-[90%] md:top-[11%]", r: -6, ring: true },
  { t: "explore →", cls: "serif-it hidden text-[2.4rem] md:block md:left-[50%] md:top-[70%]", r: -4 },
  { t: "component systems", cls: "label hidden md:block md:left-[70%] md:top-[7%]", r: 3 },
  { t: "it's always the padding.", cls: "hidden font-mono text-[12px] md:block md:left-[60%] md:top-[89%]", r: -2 },
  { t: "z-index: 9999; /* sorry */", cls: "hidden font-mono text-[12px] md:block md:left-[79%] md:top-[82%]", r: 4 },
  { t: "you found this 👀", cls: "hidden font-mono text-[12px] md:block md:left-[34%] md:top-[90%]", r: -5 },
];

function Secrets() {
  return (
    <>
      {secrets.map((s) => (
        <span key={s.t} className={`absolute whitespace-nowrap leading-none text-butter ${s.cls}`} style={{ transform: `rotate(${s.r}deg)` }}>
          {s.t}
          {s.ring && (
            <svg viewBox="0 0 100 60" fill="none" className="absolute -inset-x-5 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2.5rem)]" preserveAspectRatio="none">
              <path d="M50 6C22 4 5 16 6 31c1 16 24 24 48 23 24-1 41-11 40-26C93 13 70 3 38 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </span>
      ))}
      <svg viewBox="0 0 120 80" fill="none" className="absolute hidden w-24 text-butter md:block md:left-[45%] md:top-[80%]">
        <path d="M112 14C80 4 34 12 20 58" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M34 50L19 62l-6-19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 48 48" className="absolute right-[14%] top-[22%] size-5 text-coral md:left-[62%] md:right-auto md:top-[36%] md:size-7">
        <path d="M24 2c1.6 12.4 7.6 18.4 22 22-14.4 3.6-20.4 9.6-22 22C22.4 33.6 16.4 27.6 2 24 16.4 20.4 22.4 14.4 24 2z" fill="currentColor" />
      </svg>
    </>
  );
}

/** One word at a time, rolling over. The dark around it is hiding things; a torch finds them. */
export function Currently() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % obsessions.length), 2100);
    return () => window.clearInterval(id);
  }, []);
  const colors = ["bg-butter", "bg-pink", "bg-lavender", "bg-powder", "bg-sage"];
  // the cursor says what to do for a moment, then gets out of the way
  const [hint, setHint] = useState(false);
  const hintTimer = useRef<number | undefined>(undefined);
  const showHint = () => {
    setHint(true);
    window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHint(false), 2400);
  };
  useEffect(() => () => window.clearTimeout(hintTimer.current), []);
  useEffect(() => {
    window.dispatchEvent(new Event("cursor:refresh"));
  }, [hint]);

  return (
    <section
      className="relative overflow-hidden bg-ink px-5 pb-44 pt-24 text-ivory md:px-12 md:py-36"
      data-tone="butter"
      data-cursor={hint ? "MOVE TO EXPLORE" : undefined}
      onPointerEnter={(e) => e.pointerType === "mouse" && showHint()}
      aria-labelledby="cur-title"
    >
      <Torch>
        <Secrets />
      </Torch>
      <div className="relative mx-auto max-w-[1400px]">
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
          <span className="mt-1 block text-ivory/35 md:hidden">it's dark in here. drag a finger around.</span>
        </p>
      </div>
    </section>
  );
}
