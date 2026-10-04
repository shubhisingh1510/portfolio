import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const wine = "#7A2540";
const gold = "#B8892F";
const cream = "#FBF3E7";

type Copy = { native: string; title: string; shop: string; pick: string; otp: string; google: string; cats: string[] };

// The seven languages Sakhi's seller onboarding supports.
const copy: Record<string, Copy> = {
  hi: { native: "हिंदी", title: "अपनी दुकान शुरू करें", shop: "दुकान का नाम", pick: "श्रेणी चुनें", otp: "OTP भेजें", google: "Google से जारी रखें", cats: ["कपड़े", "गहने", "हस्तशिल्प", "खाना"] },
  bn: { native: "বাংলা", title: "আপনার দোকান শুরু করুন", shop: "দোকানের নাম", pick: "বিভাগ বেছে নিন", otp: "OTP পাঠান", google: "Google দিয়ে চালিয়ে যান", cats: ["কাপড়", "গয়না", "হস্তশিল্প", "খাবার"] },
  ta: { native: "தமிழ்", title: "உங்கள் கடையைத் தொடங்குங்கள்", shop: "கடையின் பெயர்", pick: "வகையைத் தேர்ந்தெடுக்கவும்", otp: "OTP அனுப்பு", google: "Google மூலம் தொடரவும்", cats: ["துணிகள்", "நகைகள்", "கைவினை", "உணவு"] },
  te: { native: "తెలుగు", title: "మీ దుకాణాన్ని ప్రారంభించండి", shop: "దుకాణం పేరు", pick: "వర్గాన్ని ఎంచుకోండి", otp: "OTP పంపండి", google: "Googleతో కొనసాగించండి", cats: ["దుస్తులు", "నగలు", "హస్తకళలు", "ఆహారం"] },
  mr: { native: "मराठी", title: "तुमचे दुकान सुरू करा", shop: "दुकानाचे नाव", pick: "श्रेणी निवडा", otp: "OTP पाठवा", google: "Google सह सुरू ठेवा", cats: ["कपडे", "दागिने", "हस्तकला", "खाद्यपदार्थ"] },
  gu: { native: "ગુજરાતી", title: "તમારી દુકાન શરૂ કરો", shop: "દુકાનનું નામ", pick: "શ્રેણી પસંદ કરો", otp: "OTP મોકલો", google: "Google સાથે ચાલુ રાખો", cats: ["કપડાં", "ઘરેણાં", "હસ્તકલા", "ખોરાક"] },
  kn: { native: "ಕನ್ನಡ", title: "ನಿಮ್ಮ ಅಂಗಡಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ", shop: "ಅಂಗಡಿಯ ಹೆಸರು", pick: "ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ", otp: "OTP ಕಳುಹಿಸಿ", google: "Google ನೊಂದಿಗೆ ಮುಂದುವರಿಸಿ", cats: ["ಬಟ್ಟೆಗಳು", "ಆಭರಣಗಳು", "ಕರಕುಶಲ", "ಆಹಾರ"] },
};
const order = Object.keys(copy);

function BlockPrint() {
  return (
    <svg aria-hidden className="h-3 w-full" preserveAspectRatio="none">
      <defs>
        <pattern id="sakhi-print" width="18" height="12" patternUnits="userSpaceOnUse">
          <path d="M9 1l5 5-5 5-5-5z" fill="none" stroke={gold} strokeWidth="1.3" />
          <circle cx="9" cy="6" r="1.2" fill={wine} />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill="url(#sakhi-print)" />
    </svg>
  );
}

export function SakhiMini() {
  const [lang, setLang] = useState("hi");
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState<number | null>(null);
  const [digits, setDigits] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const t = copy[lang];

  useEffect(() => () => window.clearInterval(timer.current), []);
  const sendOtp = () => {
    window.clearInterval(timer.current);
    setDigits(0);
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 1;
      setDigits(n);
      if (n >= 4) window.clearInterval(timer.current);
    }, 260);
  };

  return (
    <div
      className="mx-auto max-w-[25rem] overflow-hidden rounded-[28px] border-[1.5px] shadow-[4px_5px_0_#7A2540]"
      style={{ background: cream, borderColor: wine, color: "#3B1A28" }}
      data-cursor="PLAY"
    >
      <BlockPrint />
      <div className="px-5 pb-5 pt-4">
        <div role="group" aria-label="Interface language" className="flex flex-wrap gap-1.5">
          {order.map((code) => (
            <button
              key={code}
              lang={code}
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className="rounded-full border px-2.5 py-1 text-[12px] leading-none transition-colors"
              style={{
                borderColor: wine,
                background: lang === code ? wine : "transparent",
                color: lang === code ? cream : wine,
              }}
            >
              {copy[code].native}
            </button>
          ))}
        </div>

        <div lang={lang} className="mt-5">
          <AnimatePresence mode="wait">
            <motion.h4
              key={lang}
              className="m-0 min-h-[4.2rem] font-serif text-[1.75rem] leading-[1.2]"
              style={{ color: wine }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              {t.title}
            </motion.h4>
          </AnimatePresence>

          <label className="mt-3 block text-[12px]" style={{ color: gold }}>
            {t.shop}
            <input
              type="text"
              placeholder="Sakhi Sarees"
              className="mt-1 block w-full rounded-lg border bg-white/70 px-3 py-2 text-[14px] text-[#3B1A28] outline-offset-2"
              style={{ borderColor: `${wine}55` }}
            />
          </label>

          <div className="relative mt-3">
            <button
              aria-haspopup="listbox"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex w-full items-center justify-between rounded-lg border bg-white/70 px-3 py-2 text-left text-[14px]"
              style={{ borderColor: `${wine}55` }}
            >
              {cat === null ? t.pick : t.cats[cat]}
              <motion.span animate={{ rotate: open ? 180 : 0 }} aria-hidden>
                ▾
              </motion.span>
            </button>
            <AnimatePresence>
              {open && (
                <motion.ul
                  role="listbox"
                  className="absolute inset-x-0 top-full z-10 m-0 mt-1 list-none overflow-hidden rounded-lg border bg-white p-1"
                  style={{ borderColor: wine, transformOrigin: "top" }}
                  initial={{ opacity: 0, scaleY: 0.6 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0.6 }}
                  transition={{ duration: 0.18 }}
                >
                  {t.cats.map((c, i) => (
                    <li key={c} role="option" aria-selected={cat === i}>
                      <button
                        onClick={() => {
                          setCat(i);
                          setOpen(false);
                        }}
                        className="block w-full rounded-md px-2.5 py-1.5 text-left text-[14px] hover:bg-[#F6E4E1]"
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={sendOtp}
              className="rounded-full px-4 py-2 text-[13px] transition-transform active:scale-95"
              style={{ background: wine, color: cream }}
            >
              {t.otp}
            </button>
            <div className="flex gap-1" aria-label="One-time password, demo">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="grid size-8 place-items-center rounded-md border font-mono text-[13px]"
                  style={{ borderColor: i < digits ? wine : `${wine}40`, background: i < digits ? "#F6E4E1" : "transparent" }}
                >
                  {i < digits ? "•" : ""}
                </span>
              ))}
            </div>
            {digits >= 4 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: gold }} aria-label="verified">
                ✓
              </motion.span>
            )}
          </div>

          <button
            className="mt-2.5 w-full rounded-full border px-4 py-2 text-[13px]"
            style={{ borderColor: `${wine}66`, color: wine }}
          >
            {t.google}
          </button>
        </div>
      </div>
      <BlockPrint />
    </div>
  );
}
