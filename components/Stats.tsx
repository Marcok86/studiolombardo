"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { STATS } from "@/lib/content";

function CountUp({ value, suffix }: { value: string; suffix: string }) {
  const target = parseInt(value, 10);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 1 });
  const [display, setDisplay] = useState(reduce ? value : "0");

  useEffect(() => {
    if (inView && !reduce) mv.set(target);
  }, [inView, reduce, target, mv]);

  useEffect(() => {
    if (reduce) return;
    return spring.on("change", (v) => setDisplay(String(Math.round(v))));
  }, [spring, reduce]);

  return (
    <span ref={ref} className="stat__v">
      {display}
      <b>{suffix}</b>
    </span>
  );
}

export default function Stats() {
  return (
    <div className="stats">
      {STATS.map((s) => (
        <div className="stat" key={s.label}>
          <CountUp value={s.value} suffix={s.suffix} />
          <div className="stat__l">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
