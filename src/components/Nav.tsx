import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

/** A strip of paper pinned to the top of the page. It straightens up once you start reading. */
export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 80));

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? "" : cur));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...links.map((l) => l.id)]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5">
      <motion.nav
        aria-label="Primary"
        className="paper-shadow pointer-events-auto relative flex items-center gap-1 overflow-hidden rounded-[10px] border-[1.5px] border-ink bg-ivory px-1.5 py-1.5"
        initial={{ y: -80, rotate: -6 }}
        animate={{ y: 0, rotate: scrolled ? 0 : -1.5, scale: scrolled ? 0.96 : 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 18, delay: scrolled ? 0 : 1.1 }}
      >
        <a href="#top" className="label rounded-md px-2.5 py-1.5 font-medium" data-cursor="TOP ↑">
          Shubhi<span className="text-coral">✦</span>
        </a>
        <span aria-hidden className="h-4 w-px bg-ink/25" />
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            aria-current={active === l.id ? "true" : undefined}
            className="label relative rounded-md px-2 py-1.5 md:px-3"
          >
            {active === l.id && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 rounded-md bg-butter"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{l.label}</span>
          </a>
        ))}
        <motion.span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-coral" style={{ scaleX: progress }} />
      </motion.nav>
    </header>
  );
}
