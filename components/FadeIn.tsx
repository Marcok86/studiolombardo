"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Reveal elegante basato su Motion: entra con fade + rise + leggero scale,
 * su curva spring-like. Rispetta prefers-reduced-motion (entra senza moto).
 * `index` produce uno stagger naturale per liste/griglie.
 */
export default function FadeIn({
  children,
  index = 0,
  y = 24,
  className,
  as = "div",
  once = true,
  onMouseMove,
}: {
  children: ReactNode;
  index?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
  once?: boolean;
  onMouseMove?: React.MouseEventHandler<HTMLElement>;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: reduce ? 0 : index * 0.08,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.3, margin: "0px 0px -8% 0px" }}
      onMouseMove={onMouseMove}
    >
      {children}
    </MotionTag>
  );
}
