import { useEffect, useRef, useState } from "react";
import { animate, motion } from "motion/react";

// The five languages CodeDojo supports, each solving the same small problem.
const snippets: Record<string, string[]> = {
  Python: [
    "def two_sum(nums, target):",
    "    seen = {}",
    "    for i, n in enumerate(nums):",
    "        if target - n in seen:",
    "            return [seen[target - n], i]",
    "        seen[n] = i",
  ],
  "C++": [
    "vector<int> twoSum(vector<int>& a, int t) {",
    "  unordered_map<int, int> seen;",
    "  for (int i = 0; i < a.size(); i++) {",
    "    if (seen.count(t - a[i]))",
    "      return {seen[t - a[i]], i};",
    "    seen[a[i]] = i; } }",
  ],
  Java: [
    "int[] twoSum(int[] a, int t) {",
    "  Map<Integer, Integer> seen = new HashMap<>();",
    "  for (int i = 0; i < a.length; i++) {",
    "    if (seen.containsKey(t - a[i]))",
    "      return new int[]{seen.get(t - a[i]), i};",
    "    seen.put(a[i], i); } }",
  ],
  C: [
    "void two_sum(int *a, int n, int t, int *out) {",
    "  for (int i = 0; i < n; i++)",
    "    for (int j = i + 1; j < n; j++)",
    "      if (a[i] + a[j] == t) {",
    "        out[0] = i; out[1] = j;",
    "        return; } }",
  ],
  JavaScript: [
    "function twoSum(nums, target) {",
    "  const seen = new Map();",
    "  for (const [i, n] of nums.entries()) {",
    "    if (seen.has(target - n))",
    "      return [seen.get(target - n), i];",
    "    seen.set(n, i); } }",
  ],
};
const langs = Object.keys(snippets);
const rivals = [
  { name: "null_ptr", xp: 1320 },
  { name: "byte_ninja", xp: 1275 },
  { name: "rita.recursion", xp: 1180 },
];

export function CodeDojoMini() {
  const [lang, setLang] = useState("Python");
  const [run, setRun] = useState(0);
  const [busy, setBusy] = useState(false);
  const [xp, setXp] = useState(1240);
  const [shown, setShown] = useState(1240);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const c = animate(shown, xp, { duration: 0.7, onUpdate: (v) => setShown(Math.round(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xp]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const submit = () => {
    if (busy) return;
    setBusy(true);
    setRun((r) => r + 1);
    timer.current = window.setTimeout(() => {
      setXp((v) => v + 50);
      setBusy(false);
    }, 1100);
  };

  const board = [...rivals, { name: "you", xp }].sort((a, b) => b.xp - a.xp);
  const rank = board.findIndex((r) => r.name === "you") + 1;

  return (
    <div
      className="paper-shadow overflow-hidden rounded-2xl border-[1.5px] border-ink bg-ivory text-ink"
      onPointerEnter={(e) => e.pointerType === "mouse" && run === 0 && submit()}
      data-cursor="PLAY"
    >
      <div className="flex items-center gap-2 border-b-[1.5px] border-ink px-3 py-2">
        <i className="size-2.5 rounded-full bg-coral" />
        <i className="size-2.5 rounded-full bg-butter" />
        <i className="size-2.5 rounded-full bg-sage" />
        <span className="label ml-2 whitespace-nowrap">codedojo / two-sum</span>
        <span className="label ml-auto flex items-center gap-1.5 whitespace-nowrap">
          <i className="size-1.5 animate-blink rounded-full bg-coral" /> 1v1 battle
        </span>
      </div>

      <div className="grid md:grid-cols-[1.55fr_1fr]">
        <div className="border-ink md:border-r-[1.5px]">
          <div role="tablist" aria-label="Language" className="flex flex-wrap gap-1 border-b border-ink/15 px-2 py-2">
            {langs.map((l) => (
              <button
                key={l}
                role="tab"
                aria-selected={lang === l}
                onClick={() => setLang(l)}
                className={`label rounded px-2 py-1 transition-colors ${lang === l ? "bg-ink text-ivory" : "hover:bg-ink/10"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <pre className="m-0 min-h-[10.5rem] overflow-x-auto bg-ink px-3 py-3 font-mono text-[11px] leading-[1.75] text-ivory md:text-[12px]">
            {snippets[lang].map((line, i) => (
              <motion.span
                key={`${lang}-${run}-${i}`}
                className="block whitespace-pre"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.09, duration: 0.25 }}
              >
                <span className="mr-3 select-none text-ivory/35">{i + 1}</span>
                {line}
              </motion.span>
            ))}
          </pre>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <button
              onClick={submit}
              className="label rounded-full border-[1.5px] border-ink bg-butter px-3.5 py-1.5 transition-transform active:scale-95"
            >
              {busy ? "running…" : "run ▶"}
            </button>
            <span className="font-mono text-[11px] text-ink-soft" aria-live="polite">
              {busy ? "judging 3 test cases" : run > 0 ? "3/3 passed · +50 xp" : "press run. go on."}
            </span>
          </div>
        </div>

        <div className="border-t-[1.5px] border-ink bg-powder/50 p-3 md:border-t-0">
          <p className="label text-ink-soft">your xp</p>
          <p className="display text-[2.6rem] tabular-nums">{shown}</p>
          <p className="label mb-2 mt-3 text-ink-soft">leaderboard</p>
          <ol className="m-0 list-none space-y-1 p-0">
            {board.map((r, i) => (
              <motion.li
                key={r.name}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className={`flex items-center justify-between rounded-md border-[1.5px] px-2 py-1 font-mono text-[11px] ${
                  r.name === "you" ? "border-ink bg-butter" : "border-ink/20 bg-ivory"
                }`}
              >
                <span>
                  {i + 1}. {r.name}
                </span>
                <span className="tabular-nums">{r.name === "you" ? shown : r.xp}</span>
              </motion.li>
            ))}
          </ol>
          <p className="mt-2 font-mono text-[10px] text-ink-soft">
            {rank === 1 ? "#1. okay, you can stop now." : "miniature · demo data"}
          </p>
        </div>
      </div>
    </div>
  );
}
