import { useRef, useState, type ReactNode, type PointerEvent as RPointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Headline, Magnetic, Reveal, Tilt } from "../components/Motion";
import { Star } from "../components/Doodles";
import { useFinePointer } from "../lib/hooks";
import { CodeDojoMini } from "../minis/CodeDojoMini";
import { SakhiMini } from "../minis/SakhiMini";
import { AbhayMini } from "../minis/AbhayMini";
import { MaatriMini } from "../minis/MaatriMini";
import { TerraMini } from "../minis/TerraMini";
import { NestMini } from "../minis/NestMini";

type Project = {
  title: string;
  subtitle: string;
  about: string;
  built: string[];
  tech: string[];
  link?: { href: string; label: string };
  note?: string;
  bg: string;
  fg: string;
  accent: string;
  tone: string;
  /** how strong the paper highlight is; dark pages want much less */
  light?: number;
  /** the miniature is phone-shaped, so keep its frame narrow */
  narrow?: boolean;
  titleStyle?: React.CSSProperties;
  mini: ReactNode;
};

const projects: Project[] = [
  {
    title: "CodeDojo",
    subtitle: "Gamified coding learning platform",
    about: "A place to learn DSA and DAA that behaves more like a game than a textbook, and actually runs the code you write.",
    built: [
      "AI-powered topic explanations",
      "500+ problems across five languages",
      "XP, a leaderboard and an avatar picker",
      "Real-time 1v1 battle mode over Firestore",
    ],
    tech: ["React", "Firebase", "OpenRouter AI", "Judge0 API"],
    link: { href: "https://github.com/shubhisingh1510/Codedojo-", label: "Codedojo-" },
    bg: "var(--color-powder)",
    fg: "var(--color-ink)",
    accent: "var(--color-ink)",
    tone: "ink",
    mini: <CodeDojoMini />,
  },
  {
    title: "Sakhi",
    subtitle: "Women-focused seller marketplace",
    about: "The seller side of a marketplace for women, in a desi-feminine palette of rose, cream, gold and plum.",
    built: [
      "React component architecture for the seller registration flow",
      "Seven Indian languages, with translated UI strings",
      "OTP and Google sign-in onboarding",
      "Custom category dropdowns",
    ],
    tech: ["React", "Multilingual UI", "OTP / Google Sign-In"],
    note: "In progress.",
    bg: "#F3DADA",
    fg: "#3B1A28",
    accent: "#7A2540",
    tone: "plum",
    narrow: true,
    titleStyle: { fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.02em" },
    mini: <SakhiMini />,
  },
  {
    title: "Abhay / Maatri X",
    subtitle: "Rural maternal health dashboard",
    about: "A dashboard for ASHA and ANM rural healthcare workers. Health data, without the hospital-software feeling.",
    built: [
      "The custom “Reading Nook” colour palette",
      "A rebuilt choropleth-style heatmap for regional health data",
      "Malayalam, added as the seventh supported language",
      "UI screens for ten feature concepts, and a sticky-nav fix across a multi-screen presentation",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Multilingual UI"],
    bg: "#E9F4EE",
    fg: "#223E5B",
    accent: "#E77858",
    tone: "navy",
    titleStyle: { fontFamily: '"Playfair Display Variable", serif', fontWeight: 600, letterSpacing: "-0.02em" },
    mini: <AbhayMini />,
  },
  {
    title: "Maatri",
    subtitle: "Foundational maternal health platform",
    about: "Where the maternal health work started: a registry, a profile, and a mascot drawn by hand.",
    built: [
      "A styled mother registry form and profile page",
      "Reading Nook palette with Playfair Display and DM Sans",
      "An original hand-illustrated SVG mascot, a pregnant woman in Indian cultural dress, for the landing page",
    ],
    tech: ["HTML", "CSS", "SVG illustration"],
    link: { href: "https://github.com/shubhisingh1510/Maatri", label: "Maatri" },
    bg: "#F2E7D3",
    fg: "#223E5B",
    accent: "#E77858",
    tone: "coral",
    titleStyle: { fontFamily: '"Playfair Display Variable", serif', fontWeight: 600, letterSpacing: "-0.02em" },
    mini: <MaatriMini />,
  },
  {
    title: "TerraBridge X",
    subtitle: "Cross-modal satellite imagery retrieval",
    about: "A hackathon UI aimed at ISRO use-cases: describe a place in words, find it across the sensors that have seen it.",
    built: ["A NASA / Apple-inspired dark aesthetic", "3D CSS transforms for the imagery", "The retrieval interface itself"],
    tech: ["HTML", "CSS 3D transforms", "JavaScript"],
    bg: "#0A0E14",
    fg: "#E8EDF2",
    accent: "#5EE6C5",
    tone: "ivory",
    light: 0.05,
    mini: <TerraMini />,
  },
  {
    title: "NEST",
    subtitle: "Recent frontend + product design experiment",
    about:
      "A concept for the Samsung PRISM Agentic AI challenge: an agent for the home that turns passive screen time into things a child does in the real world. I treated the product site as a piece of storytelling.",
    built: [
      "A long-form product site with a live demo mode",
      "A warm editorial system: ivory, blush, butter, sage and powder blue, with hand-made SVG objects",
      "Six interface languages",
      "Motion used only where it shows cause and effect",
    ],
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Motion"],
    link: { href: "https://github.com/shubhisingh1510/samsungprismhack", label: "samsungprismhack" },
    note: "A project and design exploration, not client work.",
    bg: "#DDE8D7",
    fg: "#292724",
    accent: "#C4826A",
    tone: "coral",
    titleStyle: { fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "-0.01em" },
    mini: <NestMini />,
  },
];

/** A sticker on the corner of each miniature. Hover the project and its corner peels back. */
function PeelSticker({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={open}
      aria-label="Peel the sticker"
      onClick={() => setOpen((o) => !o)}
      data-cursor="PEEL"
      className="peel absolute -right-2 -top-8 z-20 size-[76px] rotate-[9deg] md:-right-7 md:-top-10"
      style={{ "--flap": `color-mix(in srgb, ${p.accent} 62%, #fff)` } as React.CSSProperties}
    >
      {/* what was under it all along */}
      <span className="absolute inset-0 rounded-[11px] bg-ivory text-ink">
        <span className="absolute bottom-[9px] right-[5px] origin-center -rotate-45 font-mono text-[8.5px] leading-none tracking-wider">
          {String(index + 1).padStart(2, "0")}/06
        </span>
      </span>
      <span className="peel-face absolute inset-0 rounded-[11px] p-2 text-left" style={{ background: p.accent, color: p.bg }}>
        <span className="block font-mono text-[8.5px] uppercase leading-tight tracking-widest">
          no.
          <br />
          {String(index + 1).padStart(2, "0")}
        </span>
        <Star className="absolute left-2 top-9 size-4" />
      </span>
      <span className="peel-flap" />
    </button>
  );
}

function Spread({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const flip = index % 2 === 1;
  // each project arrives like a page being laid on the table
  const rotate = useTransform(scrollYProgress, [0, 1], [flip ? 2.5 : -2.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const still = !fine || reduce;

  // paper, not a 3D object: things shift a few pixels against the pointer, each at its own speed
  const mx = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 });
  const labelX = useTransform(mx, (v) => v * 9);
  const titleX = useTransform(mx, (v) => v * 4);
  const miniX = useTransform(mx, (v) => v * -5);
  const miniY = useTransform(my, (v) => v * -4);
  const move = (e: RPointerEvent) => {
    if (still || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const rest = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={ref}
      data-tone={p.tone}
      className="relative mx-2.5 mb-5 overflow-hidden rounded-[28px] px-5 py-14 md:mx-6 md:mb-8 md:rounded-[48px] md:px-14 md:py-24"
      style={{ background: p.bg, color: p.fg, rotate: still ? 0 : rotate, scale: still ? 1 : scale }}
      onPointerMove={move}
      onPointerLeave={rest}
    >
      <div aria-hidden className="lit pointer-events-none absolute inset-0" style={{ "--light": p.light ?? 0.24 } as React.CSSProperties} />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <motion.p className="label flex items-center gap-3 opacity-70" style={{ x: labelX }}>
            <span className="shrink-0 whitespace-nowrap">Project {String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 shrink-0 bg-current md:w-10" />
            <span>{p.subtitle}</span>
          </motion.p>

          <motion.div style={{ x: titleX }}>
          <Headline
            as="h3"
            text={p.title}
            className="mt-5 normal-case text-[clamp(3rem,7.4vw,6.6rem)] leading-[0.95]"
            style={p.titleStyle}
          />
          </motion.div>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[42ch] text-[1.08rem] leading-[1.55]">{p.about}</p>
            <ul className="m-0 mt-6 list-none space-y-2.5 p-0">
              {p.built.map((b) => (
                <li key={b} className="flex gap-3 text-[0.97rem] leading-snug">
                  <Star className="mt-[5px] size-3 shrink-0" color={p.accent} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <ul className="m-0 mt-7 flex list-none flex-wrap gap-1.5 p-0" aria-label="Technology">
              {p.tech.map((t) => (
                <li key={t} className="label rounded-full border border-current px-2.5 py-1 opacity-80">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              {p.link && (
                <Magnetic>
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="VIEW PROJECT →"
                    className="label inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium transition-transform active:scale-95"
                    style={{ background: p.fg, color: p.bg }}
                  >
                    github / {p.link.label} <span aria-hidden>↗</span>
                  </a>
                </Magnetic>
              )}
              {p.note && <span className="font-mono text-[12px] opacity-70">{p.note}</span>}
            </div>
          </Reveal>
        </div>

        <motion.div
          className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}
          initial={{ opacity: 0, y: 50, rotate: flip ? -3 : 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
        >
          <motion.div className={`group/mini relative ${p.narrow ? "mx-auto max-w-[25rem]" : ""}`} style={{ x: miniX, y: miniY }}>
            {/* the shadow it casts on the page; it deepens a little when you reach for it */}
            <span
              aria-hidden
              className="absolute inset-x-[7%] -bottom-4 h-12 rounded-[50%] bg-[#2a2320] opacity-25 blur-2xl transition-opacity duration-500 group-hover/mini:opacity-45"
            />
            <Tilt max={4}>{p.mini}</Tilt>
            <PeelSticker p={p} index={index} />
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative pt-16 md:pt-24">
      <div className="mx-auto max-w-[1400px] px-5 pb-14 md:px-12 md:pb-20">
        <p className="label mb-8 text-ink-soft">03 — Selected work</p>
        <div className="grid items-end gap-6 md:grid-cols-12">
          <Headline text={"Things I\nactually *built.*"} className="text-[clamp(3rem,11vw,10.5rem)] md:col-span-9" />
          <Reveal className="md:col-span-3">
            <p className="text-ink-soft">
              Six projects, six small worlds. None of these are screenshots. Every one is a working miniature, so click
              around.
            </p>
          </Reveal>
        </div>
      </div>
      {projects.map((p, i) => (
        <div id={`proj-${i}`} key={p.title}>
          <Spread p={p} index={i} />
        </div>
      ))}
    </section>
  );
}
