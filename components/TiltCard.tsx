"use client";

import type { ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useMotionTemplate,
  type Variants,
} from "motion/react";

/**
 * Card con tilt 3D che insegue il cursore (rotateX/rotateY su molla),
 * glare luminoso che scorre sulla superficie e spotlight oro (--mx/--my).
 * Include il reveal in ingresso (fade + rise) con stagger via `index`.
 * Tutto su prefers-reduced-motion viene neutralizzato.
 */
export default function TiltCard({
  children,
  className = "",
  index = 0,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 16, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 180, damping: 16, mass: 0.4 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(240,209,140,0.16), transparent 55%)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: reduce ? 0 : index * 0.07,
      },
    },
  };

  return (
    <motion.article
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -8% 0px" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 1100,
      }}
    >
      <span className="glass__spot" aria-hidden />
      <motion.span className="tilt-glare" style={{ background: glare }} aria-hidden />
      {children}
    </motion.article>
  );
}
