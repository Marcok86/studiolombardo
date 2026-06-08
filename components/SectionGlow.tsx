"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Alone dorato sfocato che deriva lentamente in controtempo allo scroll
 * (micro-parallax di profondità). Decorativo, dietro al contenuto.
 */
export default function SectionGlow({
  side = "right",
}: {
  side?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <div ref={ref} className={`sglow sglow--${side}`} aria-hidden>
      <motion.span style={{ y }} />
    </div>
  );
}
