"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { PROCESS } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progresso di scorrimento della timeline: da quando entra a metà
  // viewport fino a quando esce. Guida il riempimento della linea dorata.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="section section--soft process" id="come-lavoriamo" aria-label="Come lavoriamo">
      <div className="container">
        <FadeIn className="process__head">
          <p className="eyebrow">{PROCESS.eyebrow}</p>
          <h2 className="section-title">
            {PROCESS.title} <em>{PROCESS.titleItalic}</em>
          </h2>
          <p className="section-lead">{PROCESS.lead}</p>
        </FadeIn>

        <div className="process__track" ref={trackRef}>
          <div className="process__line" aria-hidden>
            <motion.div
              className="process__line-fill"
              style={{ scaleY: reduce ? 1 : fill }}
            />
          </div>

          <ol className="process__steps">
            {PROCESS.steps.map((step, i) => (
              <li className="pstep" key={step.num}>
                <motion.span
                  className="pstep__node"
                  aria-hidden
                  initial={{ scale: 0.6, opacity: 0.4 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <FadeIn className="pstep__body" index={i}>
                  <span className="pstep__num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
