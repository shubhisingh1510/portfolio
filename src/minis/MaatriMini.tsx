import { useState } from "react";
import { motion } from "motion/react";

const nook = { mint: "#E9F4EE", cream: "#F2E7D3", peach: "#EBCBB0", coral: "#F69176", navy: "#223E5B", white: "#FCF8F3", skin: "#D9A27E", hair: "#1A3148" };
const playfair = { fontFamily: '"Playfair Display Variable", serif' };

/** A small redrawing of the Maatri mascot idea: a pregnant woman in a sari. She breathes. */
function Mascot() {
  return (
    <svg viewBox="0 0 160 220" className="w-full" role="img" aria-label="Illustration of a pregnant woman in a sari, one hand resting on her belly">
      <ellipse cx="80" cy="212" rx="56" ry="6" fill={nook.navy} opacity=".12" />
      <g className="origin-bottom animate-breathe" style={{ transformBox: "fill-box" }}>
        <ellipse cx="82" cy="48" rx="29" ry="31" fill={nook.hair} />
        <circle cx="108" cy="34" r="12" fill={nook.hair} />
        <rect x="72" y="74" width="13" height="16" rx="5" fill={nook.skin} />
        <ellipse cx="78" cy="55" rx="21" ry="24" fill={nook.skin} />
        <path d="M56 52C57 28 96 22 101 52 91 38 70 36 56 52z" fill={nook.hair} />
        <circle cx="75" cy="47" r="2.200" fill={nook.coral} />
        <path d="M65 57q4 3 8 0M80 57q4 3 8 0" stroke={nook.hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M71 67q6 5 12 0" stroke={nook.hair} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M52 96C60 86 100 86 108 96c10 24 24 44 18 68-4 20-2 36 0 46H34c2-40 10-80 18-114z" fill={nook.coral} />
        <circle cx="104" cy="150" r="21" fill="#F8AA94" />
        <path d="M52 96c18 14 48 34 76 54l-4 18C96 150 66 128 46 118z" fill={nook.peach} />
        <path d="M54 104c18 13 44 31 68 48" stroke={nook.navy} strokeWidth="1.300" strokeDasharray="1 5" strokeLinecap="round" fill="none" opacity=".6" />
        <path d="M106 102c12 16 12 36-6 50" stroke={nook.skin} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M34 200h92v10H34z" fill={nook.navy} opacity=".85" />
      </g>
      <motion.path
        d="M0 4.500C0 1.500 4-.5 6 3c2-3.500 6-1.500 6 1.500C12 9 6 12 6 12S0 9 0 4.500z"
        fill={nook.coral}
        initial={{ x: 118, y: 112, opacity: 0, scale: 0.6 }}
        animate={{ y: [112, 92], opacity: [0, 1, 0], scale: [0.6, 1.1] }}
        transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeOut" }}
      />
    </svg>
  );
}

export function MaatriMini() {
  const [name, setName] = useState("");
  const [week, setWeek] = useState(24);
  const trimester = week <= 13 ? "First trimester" : week <= 27 ? "Second trimester" : "Third trimester";

  return (
    <div
      className="grid overflow-hidden rounded-[24px] border-[1.5px] shadow-[4px_5px_0_#223E5B] md:grid-cols-[0.8fr_1.2fr]"
      style={{ background: nook.white, borderColor: nook.navy, color: nook.navy }}
      data-cursor="PLAY"
    >
      <div className="relative flex items-end justify-center px-8 pt-8" style={{ background: nook.mint }}>
        <span className="label absolute left-4 top-4">hand-drawn svg</span>
        <div className="w-[9.5rem] md:w-full md:max-w-[12rem]">
          <Mascot />
        </div>
      </div>

      <div className="p-5">
        <p className="label" style={{ color: "#4A5D70" }}>
          Mother registry
        </p>
        <label className="mt-3 block text-[12px]">
          Name
          <input
            type="text"
            value={name}
            maxLength={24}
            onChange={(e) => setName(e.target.value)}
            placeholder="type a name"
            className="mt-1 block w-full rounded-lg border-[1.5px] px-3 py-2 text-[14px] outline-offset-2"
            style={{ borderColor: `${nook.navy}55`, background: nook.white, color: nook.navy }}
          />
        </label>
        <label className="mt-3 block text-[12px]">
          Week of pregnancy: <span className="font-mono">{week}</span>
          <input
            type="range"
            min={4}
            max={40}
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            className="mt-2 block w-full"
            style={{ accentColor: nook.coral }}
          />
        </label>

        {/* the profile page updates as the form is filled in */}
        <div className="mt-5 rounded-2xl p-4" style={{ background: nook.cream }}>
          <p className="label" style={{ color: "#4A5D70" }}>
            Profile
          </p>
          <p className="mt-1 min-h-[2.2rem] break-words text-[1.7rem] leading-[1.15]" style={{ ...playfair, fontWeight: 600 }}>
            {name.trim() || "Her name here"}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: nook.white }}>
              <motion.div
                className="h-full origin-left rounded-full"
                style={{ background: nook.coral }}
                animate={{ scaleX: week / 40 }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
              />
            </div>
            <span className="font-mono text-[11px]">wk {week}/40</span>
          </div>
          <p className="mt-2 text-[13px]">{trimester}</p>
        </div>
        <p className="mt-3 font-mono text-[10px]" style={{ color: "#4A5D70" }}>
          Playfair Display + DM Sans · Reading Nook palette
        </p>
      </div>
    </div>
  );
}
