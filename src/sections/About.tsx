import { Headline, Reveal } from "../components/Motion";
import { Scribble } from "../components/Doodles";

const tags = [
  { t: "React", c: "bg-powder", pos: "left-[66%] top-[10%]", r: "-8deg", slow: false },
  { t: "UI", c: "bg-butter", pos: "right-[10%] top-[0%]", r: "6deg", slow: true },
  { t: "Motion", c: "bg-pink", pos: "right-[3%] top-[44%]", r: "-4deg", slow: false },
  { t: "Systems", c: "bg-sage", pos: "left-[50%] bottom-[4%]", r: "5deg", slow: true },
  { t: "UX", c: "bg-lavender", pos: "left-[74%] top-[70%]", r: "10deg", slow: false },
];

export function About() {
  return (
    <section id="about" className="relative px-5 py-24 md:px-12 md:py-40">
      <div className="relative mx-auto max-w-[1400px]">
        <p className="label mb-8 text-ink-soft">01 — About</p>

        <div className="relative">
          <Headline
            text={"I like making\nwebsites that\nfeel like\n*something.*"}
            className="text-[clamp(2.9rem,10.5vw,10rem)]"
          />
          <Scribble className="mt-1 h-4 w-[52%] text-coral md:w-[34%]" />

          {/* drifting labels: desktop only, they would crowd a phone */}
          {tags.map((tag) => (
            <span
              key={tag.t}
              aria-hidden
              style={{ "--r": tag.r } as React.CSSProperties}
              className={`label absolute hidden rounded-full border-[1.5px] border-ink px-3 py-1.5 lg:block ${tag.c} ${tag.pos} ${
                tag.slow ? "animate-drift-slow" : "animate-drift"
              }`}
            >
              {tag.t}
            </span>
          ))}
        </div>

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-6 md:col-start-6 lg:col-span-5 lg:col-start-7">
            <p className="text-[1.15rem] leading-[1.6] md:text-[1.3rem]">
              I'm a B.Tech Computer Science student at VIT Vellore, and the part of the stack I keep coming back to is
              the part people touch. I've built React and Firebase products, interfaces that work in seven Indian
              languages, design systems with their own palettes and type, and a fair number of hackathon projects.
            </p>
            <p className="mt-5 text-ink-soft">
              I care about digital products that are efficient, scalable and rooted in the culture of the people using
              them. I also care, a lot, about the hover state.
            </p>
            <ul className="label mt-8 flex flex-wrap gap-2 lg:hidden" aria-label="Focus areas">
              {tags.map((tag) => (
                <li key={tag.t} className={`rounded-full border-[1.5px] border-ink px-3 py-1.5 ${tag.c}`}>
                  {tag.t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
