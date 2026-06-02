"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/content";

function useCountUp(target: number, run: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return value;
}

function Stat({ value, suffix, label, run }: {
  value: string; suffix: string; label: string; run: boolean;
}) {
  const n = useCountUp(parseInt(value, 10), run);
  return (
    <div>
      <div className="stat__value">{n}{suffix}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats section" aria-label="I numeri dello studio">
      <div className="container">
        <div className="stats__grid" ref={ref}>
          {STATS.map((s) => (
            <Stat key={s.label} {...s} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
