// Every fact on the site lives here. Source of truth: "Shubhi Singh Resume.pdf",
// plus the READMEs of the projects themselves. Nothing here is invented.

export const me = {
  name: "Shubhi Singh",
  degree: "B.Tech Computer Science & Engineering (Core)",
  school: "VIT Vellore",
  location: "Vellore, Tamil Nadu, India",
  email: "shubhi152006@gmail.com",
  github: "https://github.com/shubhisingh1510",
  githubLabel: "github.com/shubhisingh1510",
};

export type Tool = {
  name: string;
  note: string;
  color: string;
  shape: "note" | "tag" | "key" | "tape" | "card";
  rotate: number;
  lift?: number;
};

export const tools: Tool[] = [
  { name: "React", note: "my favourite way to turn ideas into interfaces.", color: "var(--color-powder)", shape: "note", rotate: -4 },
  { name: "JavaScript", note: "the language every one of these projects is written in.", color: "var(--color-butter)", shape: "key", rotate: 3, lift: 18 },
  { name: "Firebase", note: "auth + firestore + real-time experiences.", color: "var(--color-peach)", shape: "card", rotate: -2, lift: -6 },
  { name: "Design Systems", note: "palettes, type pairs and components that agree with each other.", color: "var(--color-lavender)", shape: "tape", rotate: 5, lift: 22 },
  { name: "Multilingual UI", note: "seven Indian languages in one interface, without the layout falling over.", color: "var(--color-pink)", shape: "note", rotate: 2, lift: -10 },
  { name: "Judge0 API", note: "because coding platforms should actually run code.", color: "var(--color-sage)", shape: "tag", rotate: -6, lift: 14 },
  { name: "OpenRouter AI", note: "AI-powered explanations without pretending they're magic.", color: "var(--color-ivory)", shape: "card", rotate: 4 },
  { name: "Git / GitHub", note: "commit early, apologise in the message.", color: "var(--color-coral)", shape: "key", rotate: -3, lift: 20 },
  { name: "DSA · DAA", note: "the theory under the pretty parts. also: theory of computation, compiler design.", color: "var(--color-butter)", shape: "tape", rotate: -5, lift: -4 },
  { name: "Motion", note: "the thing this page won't stop doing.", color: "var(--color-powder)", shape: "tag", rotate: 6, lift: 12 },
];

export type MoreProject = {
  name: string;
  line: string;
  tech: string[];
  built: string;
  why: string;
  link?: { href: string; label: string };
};

export const moreProjects: MoreProject[] = [
  {
    name: "SugarBuddy",
    line: "A friendly companion app for people living with diabetes.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Radix UI", "Framer Motion", "Express", "PostgreSQL + Prisma", "Firebase Auth"],
    built: "Medication, insulin, glucose, food, exercise and report tracking, plus an AI friend to talk to. Every third-party integration is optional, so the whole app runs and stays clickable with zero API keys.",
    why: "Healthcare software built with warmth instead of clinical coldness, and features that degrade gracefully instead of crashing.",
    link: { href: "https://github.com/shubhisingh1510/sugarbuddy", label: "github.com/shubhisingh1510/sugarbuddy" },
  },
  {
    name: "Dhairya",
    line: "An interruptible real-time voice agent. The name means patience.",
    tech: ["React", "TypeScript", "Node", "Web Speech API", "Groq / Gemini / Ollama"],
    built: "A voice agent that keeps its task as a checkpointed plan graph. Each interruption is classified as a correction, a tangent or a cancel, then applied without losing what came before. Start talking and it stops talking.",
    why: "Most assistants either can't be stopped or restart from zero. This one patches a single field and carries on.",
    link: { href: "https://github.com/shubhisingh1510/dhairya", label: "github.com/shubhisingh1510/dhairya" },
  },
  {
    name: "Shadow Developer",
    line: "An agent that reproduces a bug before it is allowed to fix it.",
    tech: ["Python", "FastAPI", "pytest", "Docker sandbox", "Web dashboard"],
    built: "Issue → reproduce → reason → patch → verify → pull request, run as an explicit state machine. It writes a failing regression test first, patches with the smallest change it can, and re-runs everything before opening a PR.",
    why: "When it can't reproduce the bug it stops and says so. Humans do the merging.",
  },
];

export const timeline = [
  {
    stage: "Learning",
    color: "var(--color-powder)",
    items: [
      { when: "2016 – 2024", what: "Sunrise English Private School, Abu Dhabi." },
      { when: "2021", what: "Youth Industry Exposure Program, UNESCO-MGIEP." },
      { when: "2023", what: "Industry Engagement & Technology Exposure Program, Microsoft." },
    ],
  },
  {
    stage: "Building",
    color: "var(--color-butter)",
    items: [
      { when: "Jul 2024", what: "Started B.Tech CSE (Core) at VIT Vellore." },
      { when: "", what: "CodeDojo: React, Firebase, OpenRouter AI and the Judge0 API in one platform." },
    ],
  },
  {
    stage: "Breaking things",
    color: "var(--color-coral)",
    items: [
      { when: "", what: "Real-time 1v1 battles over Firestore. Real-time is a very efficient way to find bugs." },
      { when: "", what: "Sticky navigation across a multi-screen presentation. Fixed, eventually." },
    ],
  },
  {
    stage: "Hackathons",
    color: "var(--color-lavender)",
    items: [
      { when: "2026", what: "SheBuilds Chennai × CCCL (Code & Challenge 3.0): top 50 of 700+ teams, national final round." },
      { when: "", what: "TerraBridge X: a hackathon UI aimed at ISRO use-cases." },
    ],
  },
  {
    stage: "Designing better",
    color: "var(--color-pink)",
    items: [
      { when: "", what: "The “Reading Nook” palette for Maatri and Abhay." },
      { when: "", what: "Sakhi: one seller flow, seven Indian languages." },
      { when: "", what: "A hand-illustrated SVG mascot, because the landing page needed a person on it." },
    ],
  },
  {
    stage: "Currently building",
    color: "var(--color-sage)",
    items: [
      { when: "2026", what: "NEST: a warm, editorial product site for a Samsung PRISM challenge concept." },
      { when: "", what: "And this page. Mostly the hover states." },
    ],
  },
];

export const clippings = [
  { year: "2021", title: "Selected Participant", body: "Youth Industry Exposure Program", by: "UNESCO-MGIEP", color: "var(--color-powder)", rotate: -3 },
  { year: "2023", title: "Technology Exposure", body: "Industry Engagement & Technology Exposure Program", by: "Microsoft", color: "var(--color-ivory)", rotate: 2 },
  { year: "2022", title: "Business Cup Challenge", body: "Team member, Sustainability & Environment research track", by: "Curtin University", color: "var(--color-sage)", rotate: -1.5 },
];

export const leadership = [
  { org: "Eco Club, Sunrise English Private School", when: "Aug 2019 – Present", what: "Leading eco-friendly, sustainable-living and environmental-education initiatives; organised workshops and awareness campaigns." },
  { org: "UNESCO MGIEP", when: "May 2020 – Aug 2020", what: "Volunteer on a programme advancing digital pedagogies and youth engagement toward SDG 4.7." },
  { org: "BSOE (Bee'ah School of Environment)", when: "Sep 2018 – Nov 2018", what: "Team member on sustainability-focused environmental projects." },
];

export const education = [
  { school: "Vellore Institute of Technology", detail: "B.Tech, Computer Science & Engineering (Core)", when: "Jul 2024 – Jul 2028", note: "currently here" },
  { school: "Sunrise English Private School", detail: "Abu Dhabi, UAE · Higher Secondary", when: "2016 – 2024", note: "" },
];

export const certifications = [
  { title: "AI Foundations Associate", by: "Oracle Certified", meta: "2026", color: "var(--color-coral)", rotate: -5 },
  { title: "Wild Life Ecology", by: "NPTEL · IIT Kanpur", meta: "Elite · 96%", color: "var(--color-sage)", rotate: 3 },
  { title: "Season 16 Scholar", by: "SheFi", meta: "Web3 · DeFi · AI", color: "var(--color-lavender)", rotate: -2 },
];

export const languages = [
  { name: "Hindi", level: "Native / Bilingual", hello: "नमस्ते", lang: "hi", dir: "ltr" as const },
  { name: "English", level: "Fluent", hello: "Hello", lang: "en", dir: "ltr" as const },
  { name: "Arabic", level: "Conversational", hello: "مرحبا", lang: "ar", dir: "rtl" as const },
  { name: "Marathi", level: "Elementary", hello: "नमस्कार", lang: "mr", dir: "ltr" as const },
];

export const obsessions = ["Frontend", "Motion", "Design systems", "Micro-interactions", "Good typography"];
