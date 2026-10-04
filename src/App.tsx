import { MotionConfig } from "motion/react";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Toolbox } from "./sections/Toolbox";
import { Projects } from "./sections/Projects";
import { More } from "./sections/More";
import { Timeline } from "./sections/Timeline";
import { Achievements } from "./sections/Achievements";
import { Education } from "./sections/Education";
import { Currently, Languages } from "./sections/Languages";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    // "user" makes every Motion animation respect prefers-reduced-motion
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="label sr-only rounded-md bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[90]"
      >
        Skip to the work
      </a>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Toolbox />
        <Projects />
        <More />
        <Timeline />
        <Achievements />
        <Education />
        <Languages />
        <Currently />
        <Contact />
      </main>
    </MotionConfig>
  );
}
