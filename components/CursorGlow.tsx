"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Alone dorato che insegue il puntatore con inerzia (spring), in mix-blend
 * "screen" per accendersi sulle sezioni scure. Non sostituisce il cursore
 * di sistema (così link e testo restano usabili): lo accompagna.
 * Disattivato su touch e con prefers-reduced-motion.
 */
export default function CursorGlow() {
  const [active, setActive] = useState(false);
  const [hot, setHot] = useState(false); // su elementi interattivi
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 350, damping: 35, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 35, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!active) setActive(true);
      const t = e.target as HTMLElement | null;
      setHot(!!t?.closest("a, button, .showcard, [data-cursor]"));
    };
    const leave = () => setActive(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y, active]);

  return (
    <motion.div
      className={`cursor-glow ${active ? "is-active" : ""} ${hot ? "is-hot" : ""}`}
      style={{ x: sx, y: sy }}
      aria-hidden
    />
  );
}
