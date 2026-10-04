import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { useFinePointer } from "../lib/hooks";

/**
 * A soft light for a dark section. It sits behind the section's content and follows the
 * pointer about 150ms late, like a torch held in a hand. Whatever is passed as `children`
 * is drawn twice: once barely visible, once bright but masked to the pool of light.
 *
 * Mouse: follows the cursor. Touch: follows a finger, and wanders slowly when left alone.
 * Reduced motion: no lag and no wandering.
 */
export function Torch({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    let r = host.getBoundingClientRect();
    let tx = r.width * 0.7;
    let ty = r.height * 0.45;
    let x = tx;
    let y = ty;
    let raf = 0;
    let inView = false;
    let lastTouch = -1e9;
    const wander = !fine && !reduce;

    const paint = () => {
      el.style.setProperty("--tx", `${x.toFixed(1)}px`);
      el.style.setProperty("--ty", `${y.toFixed(1)}px`);
    };
    const tick = (t: number) => {
      if (wander && t - lastTouch > 1600) {
        tx = r.width * (0.5 + 0.34 * Math.sin(t / 2600));
        ty = r.height * (0.5 + 0.32 * Math.sin(t / 1900 + 1));
      }
      // closing a tenth of the gap each frame puts the light roughly 150ms behind
      const k = reduce ? 1 : 0.1;
      x += (tx - x) * k;
      y += (ty - y) * k;
      paint();
      const moving = Math.abs(tx - x) + Math.abs(ty - y) > 0.3;
      raf = moving || (wander && inView) ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const aim = (cx: number, cy: number) => {
      r = host.getBoundingClientRect();
      tx = cx - r.left;
      ty = cy - r.top;
      kick();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      el.style.setProperty("--on", "1");
      aim(e.clientX, e.clientY);
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") el.style.setProperty("--on", "0");
    };
    const onTouch = (e: TouchEvent) => {
      lastTouch = performance.now();
      aim(e.touches[0].clientX, e.touches[0].clientY);
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      r = host.getBoundingClientRect();
      if (inView) kick();
    });

    paint();
    // with no cursor to wait for, the light is simply on
    el.style.setProperty("--on", fine ? "0" : "1");
    io.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("touchstart", onTouch, { passive: true });
    host.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("touchstart", onTouch);
      host.removeEventListener("touchmove", onTouch);
    };
  }, [fine, reduce]);

  return (
    <div ref={root} aria-hidden className="torch pointer-events-none absolute inset-0 overflow-hidden">
      <div className="torch-glow" />
      <div className="absolute inset-0 opacity-[0.05]">{children}</div>
      <div className="torch-lit absolute inset-0">{children}</div>
    </div>
  );
}
