import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Headline, Magnetic, Reveal } from "../components/Motion";
import { MiniBrowser, Pixels, Star } from "../components/Doodles";
import { me } from "../data/resume";
import { useFinePointer } from "../lib/hooks";

/** A decorative object that travels in from far away as the section scrolls into place. */
function Gather({
  p,
  from,
  rotate,
  className,
  children,
}: {
  p: MotionValue<number>;
  from: [number, number];
  rotate: number;
  className: string;
  children: ReactNode;
}) {
  const x = useTransform(p, [0, 1], [from[0], 0]);
  const y = useTransform(p, [0, 1], [from[1], 0]);
  const r = useTransform(p, [0, 1], [rotate * 6, rotate]);
  return (
    <motion.div aria-hidden className={`absolute hidden md:block ${className}`} style={{ x, y, rotate: r }}>
      <div className="animate-drift-slow">{children}</div>
    </motion.div>
  );
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const settled = useTransform(() => 1);
  // everything that was scattered across the page comes back together here
  const p = fine && !reduce ? smooth : settled;

  return (
    <section
      id="contact"
      ref={ref}
      data-tone="plum"
      className="relative overflow-hidden bg-butter px-5 pb-10 pt-28 md:px-12 md:pt-44"
    >
      <Gather p={p} from={[-700, -500]} rotate={-9} className="left-[64%] top-[12%]">
        <span className="paper-shadow block rounded-full border-[1.5px] border-ink bg-pink px-4 py-2 font-mono">&lt;div&gt;</span>
      </Gather>
      <Gather p={p} from={[600, -700]} rotate={7} className="right-[8%] top-[16%]">
        <MiniBrowser className="paper-shadow w-32" />
      </Gather>
      <Gather p={p} from={[-400, -900]} rotate={12} className="left-[72%] top-[33%]">
        <Star className="size-14 text-coral" />
      </Gather>
      <Gather p={p} from={[800, -300]} rotate={-6} className="right-[30%] top-[52%]">
        <span className="paper-shadow grid size-16 place-items-center rounded-full border-[1.5px] border-ink bg-ivory font-mono text-lg">{"{ }"}</span>
      </Gather>
      <Gather p={p} from={[300, -1000]} rotate={-14} className="right-[10%] top-[58%]">
        <Pixels className="size-11 text-plum" />
      </Gather>

      <div className="relative mx-auto max-w-[1400px]">
        <p className="label mb-8">11 — Contact</p>
        <Headline text={"Let's make\n*something*\ngood."} className="text-[clamp(3.4rem,14vw,13.5rem)]" />

        <Reveal className="mt-12 flex flex-col items-start gap-5 md:mt-16 md:flex-row md:items-center md:gap-8">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${me.email}`}
              data-cursor="SAY HI"
              className="paper-shadow inline-block rounded-full border-[1.5px] border-ink bg-ivory px-6 py-4 font-mono text-[15px] transition-transform active:scale-95 md:px-8 md:py-5 md:text-[1.25rem]"
            >
              {me.email}
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href={me.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN GITHUB ↗"
              className="inline-block rounded-full border-[1.5px] border-ink bg-ink px-6 py-4 font-mono text-[15px] text-ivory transition-transform active:scale-95 md:px-8 md:py-5 md:text-[1.25rem]"
            >
              {me.githubLabel} <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        </Reveal>

        <p className="mt-8 font-mono text-[12px] text-ink/70">yes, i care about the hover state. try the buttons.</p>

        <footer className="label mt-24 flex flex-col gap-2 border-t-[1.5px] border-ink pt-5 md:mt-36 md:flex-row md:justify-between">
          <span>© 2026 Shubhi Singh</span>
          <span>{me.location}</span>
          <span className="group relative" tabIndex={0}>
            Built with React + too much attention to detail
            <span className="pointer-events-none absolute bottom-full right-0 mb-1 whitespace-nowrap normal-case tracking-normal opacity-0 transition-opacity duration-300 group-hover:opacity-70 group-focus:opacity-70">
              you read the footer. of course you did.
            </span>
          </span>
        </footer>
      </div>
    </section>
  );
}
