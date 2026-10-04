import { Reveal } from "../components/Motion";
import { certifications, education } from "../data/resume";

/** A quiet spread. Nothing moves here on purpose. */
export function Education() {
  return (
    <section className="bg-paper px-5 py-24 md:px-12 md:py-32" aria-label="Education and certifications">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="label mb-8 text-ink-soft">07 — Education</p>
          <Reveal>
            {/* a page from a campus notebook */}
            <div className="ruled soft-shadow relative rounded-r-2xl border-l-[10px] border-coral bg-ivory py-[36px] pl-8 pr-6 md:pl-12">
              <span aria-hidden className="absolute inset-y-0 left-5 w-px bg-coral/50 md:left-8" />
              <h2 className="serif m-0 text-[2.6rem] leading-[72px] md:text-[3.4rem]">Where I studied</h2>
              {education.map((e) => (
                <div key={e.school} className="pt-[36px]">
                  <h3 className="display m-0 text-[1.55rem] leading-[36px] md:text-[1.9rem]">{e.school}</h3>
                  <p className="m-0 leading-[36px]">{e.detail}</p>
                  <p className="label m-0 leading-[36px] text-ink-soft">
                    {e.when}
                    {e.note && <span className="ml-3 whitespace-nowrap rounded-sm bg-butter px-1.5 py-0.5 text-ink">{e.note}</span>}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div>
          <p className="label mb-8 text-ink-soft">08 — Certifications</p>
          <ul className="m-0 flex list-none flex-wrap gap-6 p-0 md:gap-8">
            {certifications.map((c) => (
              <li
                key={c.title}
                className="grid size-[11.5rem] place-items-center rounded-full border-[1.5px] border-ink p-2 transition-transform duration-500 ease-[var(--ease-soft)] rotate-(--r) hover:rotate-0 md:size-[13rem]"
                style={{ background: c.color, "--r": `${c.rotate}deg` } as React.CSSProperties}
                data-cursor="COLLECTED"
              >
                <div className="grid size-full place-items-center rounded-full border-[1.5px] border-dashed border-ink px-5 text-center">
                  <div>
                    <p className="label">{c.by}</p>
                    <p className="serif my-2 text-[1.45rem] leading-[1.02] md:text-[1.65rem]">{c.title}</p>
                    <p className="label">{c.meta}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[38ch] font-mono text-[12px] text-ink-soft">
            Stamps, not logos. I didn't want to redraw anyone's trademark badly.
          </p>
        </div>
      </div>
    </section>
  );
}
