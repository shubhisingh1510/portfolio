import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { seeded } from "../lib/hooks";

// The "Reading Nook" palette, taken from the Abhay screens.
const nook = { mint: "#E9F4EE", cream: "#F2E7D3", peach: "#EBCBB0", coral: "#F69176", deep: "#E77858", navy: "#223E5B", white: "#FCF8F3" };
const ramp = [nook.mint, nook.cream, nook.peach, nook.coral, nook.deep];

// an invented district: X is a block, . is nothing
const shape = [".XXX..", "XXXXX.", "XXXXXX", ".XXXXX", "..XXX."];

const metrics = ["Check-ups due", "High-risk", "Follow-ups"];
const titles: Record<string, { label: string; title: string; visits: string }> = {
  en: { label: "English", title: "Today's home visits", visits: "visits" },
  hi: { label: "हिंदी", title: "आज की गृह भेंट", visits: "भेंट" },
  ml: { label: "മലയാളം", title: "ഇന്നത്തെ ഗൃഹസന്ദർശനങ്ങൾ", visits: "സന്ദർശനം" },
};

export function AbhayMini() {
  const [metric, setMetric] = useState(0);
  const [lang, setLang] = useState("en");
  const [hover, setHover] = useState<number | null>(null);
  const [done, setDone] = useState([true, false, false]);

  const blocks = useMemo(() => {
    const out: { r: number; c: number; v: number[] }[] = [];
    const rnd = seeded(31);
    shape.forEach((row, r) =>
      [...row].forEach((ch, c) => {
        if (ch === "X") out.push({ r, c, v: metrics.map(() => Math.floor(rnd() * 5)) });
      }),
    );
    return out;
  }, []);

  const t = titles[lang];
  const focus = hover === null ? null : blocks[hover];

  return (
    <div
      className="overflow-hidden rounded-[24px] border-[1.5px] shadow-[4px_5px_0_#223E5B]"
      style={{ background: nook.white, borderColor: nook.navy, color: nook.navy }}
      data-cursor="PLAY"
    >
      <div className="flex flex-wrap items-center gap-2 border-b-[1.5px] px-4 py-3" style={{ borderColor: nook.navy }}>
        <span className="label">Abhay · ASHA / ANM</span>
        <div role="group" aria-label="Dashboard language" className="ml-auto flex gap-1">
          {Object.entries(titles).map(([code, v]) => (
            <button
              key={code}
              lang={code}
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
              className="rounded-full border px-2.5 py-1 text-[12px] leading-none transition-colors"
              style={{ borderColor: nook.navy, background: lang === code ? nook.navy : "transparent", color: lang === code ? nook.white : nook.navy }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 p-4 md:grid-cols-[1.25fr_1fr]">
        <div>
          <div role="tablist" aria-label="Map layer" className="mb-3 flex flex-wrap gap-1">
            {metrics.map((m, i) => (
              <button
                key={m}
                role="tab"
                aria-selected={metric === i}
                onClick={() => setMetric(i)}
                className="label rounded-md px-2 py-1 transition-colors"
                style={{ background: metric === i ? nook.peach : "transparent" }}
              >
                {m}
              </button>
            ))}
          </div>
          <div
            className="grid gap-[5px]"
            style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
            onPointerLeave={() => setHover(null)}
            role="img"
            aria-label={`Choropleth-style map of ${blocks.length} blocks, shaded by ${metrics[metric]}. Sample data.`}
          >
            {blocks.map((b, i) => (
              <motion.div
                key={i}
                onPointerEnter={() => setHover(i)}
                className="aspect-square border-[1.5px]"
                style={{
                  gridRow: b.r + 1,
                  gridColumn: b.c + 1,
                  borderColor: hover === i ? nook.navy : "transparent",
                  borderRadius: `${30 + ((i * 17) % 30)}% ${40 + ((i * 11) % 25)}% ${35 + ((i * 7) % 30)}% ${45 + ((i * 13) % 20)}%`,
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                animate={{ backgroundColor: ramp[b.v[metric]] }}
                transition={{ scale: { delay: 0.2 + i * 0.025, type: "spring", stiffness: 260, damping: 18 }, backgroundColor: { duration: 0.45 } }}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="label">low</span>
            {ramp.map((c) => (
              <i key={c} className="block h-2.5 w-6 rounded-full" style={{ background: c, outline: `1px solid ${nook.navy}22` }} />
            ))}
            <span className="label">high</span>
          </div>
          <p className="mt-2 min-h-[1.2rem] font-mono text-[11px]" style={{ color: "#4A5D70" }} aria-live="polite">
            {focus
              ? `block ${String((hover ?? 0) + 1).padStart(2, "0")} · ${metrics[metric].toLowerCase()}: level ${focus.v[metric] + 1} of 5`
              : "hover a block · sample data, not real records"}
          </p>
        </div>

        <div className="rounded-2xl p-4" style={{ background: nook.mint }}>
          <AnimatePresence mode="wait">
            <motion.h4
              key={lang}
              lang={lang}
              className="m-0 min-h-[3.6rem] text-[1.45rem] leading-[1.2]"
              style={{ fontFamily: '"Playfair Display Variable", serif', fontWeight: 600 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {t.title}
            </motion.h4>
          </AnimatePresence>
          <ul className="m-0 mt-2 list-none space-y-1.5 p-0">
            {["Block 04", "Block 09", "Block 15"].map((name, i) => (
              <li key={name}>
                <button
                  aria-pressed={done[i]}
                  onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13px] transition-colors"
                  style={{ background: nook.white }}
                >
                  <span
                    className="grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] text-[11px]"
                    style={{ borderColor: nook.navy, background: done[i] ? nook.coral : "transparent" }}
                  >
                    {done[i] && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        ✓
                      </motion.span>
                    )}
                  </span>
                  <span style={{ textDecoration: done[i] ? "line-through" : "none", opacity: done[i] ? 0.55 : 1 }}>{name}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[11px]" style={{ color: "#4A5D70" }}>
            {done.filter(Boolean).length}/3 <span lang={lang}>{t.visits}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
