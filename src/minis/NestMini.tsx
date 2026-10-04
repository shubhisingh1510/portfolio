import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// NEST's own tokens
const nest = { ivory: "#FFF9F2", ink: "#292724", blush: "#F4DDE2", butter: "#F5E8B5", sage: "#DDE8D7", powder: "#DCEAF2", clay: "#C4826A", honey: "#E6CF7A", umber: "#6B5A4E" };

const moments = [
  { label: "watching", line: "A video is playing. NEST does nothing." },
  { label: "a pause", line: "The video reaches a natural pause. Now it may knock." },
  { label: "a dare", line: "It dares the child to try what they just watched. The lamp joins in." },
  { label: "the room", line: "Screen dims. The living room is the game now." },
];

const spring = { type: "spring", stiffness: 160, damping: 18 } as const;

export function NestMini() {
  const [step, setStep] = useState(0);
  const m = moments[step];

  return (
    <div
      className="overflow-hidden rounded-[24px] border-[1.5px]"
      style={{ background: nest.ivory, borderColor: nest.ink, color: nest.ink, boxShadow: `4px 5px 0 ${nest.ink}` }}
      data-cursor="PLAY"
    >
      <svg viewBox="0 0 400 230" className="block w-full" role="img" aria-label={`A living room. ${m.line}`}>
        <rect width="400" height="230" fill={nest.ivory} />
        <rect y="168" width="400" height="62" fill={nest.blush} />
        <ellipse cx="205" cy="200" rx="120" ry="17" fill={nest.sage} />

        {/* lamp, and its light */}
        <motion.circle cx="330" cy="72" fill={nest.butter} animate={{ r: step >= 2 ? 78 : 0, opacity: step >= 2 ? 0.85 : 0 }} transition={spring} />
        <rect x="328" y="92" width="4" height="92" fill={nest.umber} />
        <ellipse cx="330" cy="186" rx="16" ry="4" fill={nest.umber} />
        <motion.path d="M310 92l8-34h24l8 34z" animate={{ fill: step >= 2 ? nest.honey : "#EADFC9" }} />

        {/* tv on its console */}
        <rect x="44" y="150" width="150" height="26" rx="4" fill={nest.clay} />
        <rect x="60" y="62" width="118" height="80" rx="7" fill={nest.ink} />
        <motion.rect x="66" y="68" width="106" height="68" rx="3" animate={{ fill: step === 3 ? "#4A4540" : nest.powder }} />
        <rect x="114" y="142" width="10" height="9" fill={nest.ink} />
        {step === 0 && (
          <g>
            {/* a tower being built on screen */}
            {[0, 1, 2].map((i) => (
              <motion.rect
                key={i}
                x={104}
                width="30"
                height="13"
                rx="3"
                fill={[nest.clay, nest.honey, "#A9BFA0"][i]}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 118 - i * 15, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.5, duration: 0.5, repeat: Infinity, repeatDelay: 2.4, repeatType: "reverse" }}
              />
            ))}
          </g>
        )}
        {(step === 1 || step === 2) && (
          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ transformOrigin: "119px 102px" }} transition={spring}>
            <rect x="109" y="90" width="7" height="24" rx="2" fill={nest.ink} />
            <rect x="122" y="90" width="7" height="24" rx="2" fill={nest.ink} />
          </motion.g>
        )}

        {/* the dare: a tower of cushions, now in the real room */}
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={220 - i * 3}
            width={52 + i * 6}
            height="17"
            rx="8"
            fill={[nest.clay, nest.honey, "#A9BFA0"][2 - i]}
            initial={false}
            animate={step === 3 ? { y: 186 - (2 - i) * 18 - 17, opacity: 1, rotate: [0, i % 2 ? 3 : -3, 0] } : { y: 120, opacity: 0, rotate: 0 }}
            transition={{ ...spring, delay: step === 3 ? (2 - i) * 0.22 : 0 }}
          />
        ))}
      </svg>

      {/* the knock */}
      <div className="relative border-t-[1.5px] px-5 py-4" style={{ borderColor: nest.ink }}>
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              className="absolute -top-16 left-5 rounded-2xl border-[1.5px] px-4 py-2.5 font-serif text-[1.15rem] leading-tight"
              style={{ background: nest.butter, borderColor: nest.ink }}
              initial={{ y: 20, opacity: 0, rotate: -6 }}
              animate={{ y: 0, opacity: 1, rotate: -2 }}
              exit={{ y: 10, opacity: 0 }}
              transition={spring}
            >
              knock knock. <em>dare you</em> to build that tower.
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {moments.map((mm, i) => (
            <button
              key={mm.label}
              onClick={() => setStep(i)}
              aria-pressed={step === i}
              aria-label={`Moment ${i + 1}: ${mm.label}`}
              className="h-2.5 rounded-full border-[1.5px] transition-all duration-300"
              style={{ width: step === i ? 34 : 10, borderColor: nest.ink, background: step === i ? nest.ink : "transparent" }}
            />
          ))}
          <span className="label ml-2" style={{ color: nest.umber }}>
            {m.label}
          </span>
          <button
            onClick={() => setStep((s) => (s + 1) % moments.length)}
            className="label ml-auto rounded-full border-[1.5px] px-3.5 py-1.5 transition-transform active:scale-95"
            style={{ borderColor: nest.ink, background: nest.blush }}
          >
            {step === 3 ? "again ↺" : "next moment →"}
          </button>
        </div>
        <p className="mt-3 min-h-[2.8rem] text-[14px] leading-snug" aria-live="polite">
          {m.line}
        </p>
        <p className="font-serif text-[1.5rem] leading-none">
          small moments. <em>bigger worlds.</em>
        </p>
      </div>
    </div>
  );
}
