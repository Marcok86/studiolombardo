"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { SERVICES } from "@/lib/content";
import FadeIn from "./FadeIn";

/**
 * Servizi — galleria cinematografica a scroll orizzontale "pinned".
 *
 * Tecniche Motion in mostra:
 *  - useScroll legato alla sezione (offset start/end) → progresso 0→1
 *  - useSpring sul progresso → inerzia fluida, non lineare
 *  - useTransform progresso→pixel: lo scroll verticale diventa orizzontale
 *  - travel misurato dal DOM (scrollWidth) → corsa esatta, responsive
 *  - barra di avanzamento e numerale-fantasma in parallax
 *
 * Il pinning gira solo quando il suo componente è montato: così il target di
 * useScroll è SEMPRE idratato (niente warning "ref defined but not hydrated").
 * Su mobile / reduce-motion si ricade su una griglia statica accessibile.
 */
export default function ServicesShowcase() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const decide = () =>
      setEnabled(window.matchMedia("(min-width: 880px)").matches);
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  if (reduce || !enabled) return <ServicesStatic />;
  return <ServicesPinned />;
}

/* ---- Fallback statico (mobile / reduce-motion) ---- */
function ServicesStatic() {
  return (
    <section className="section section--soft" id="servizi">
      <div className="container">
        <FadeIn>
          <p className="eyebrow">Servizi</p>
          <h2 className="section-title">
            Tutto il tecnico, <em>sotto un unico tetto.</em>
          </h2>
          <p className="section-lead">
            Nove competenze integrate per seguire ogni fase: dalla fattibilità
            al cantiere, fino alla valorizzazione dell&apos;immobile.
          </p>
        </FadeIn>
        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <FadeIn as="article" className="service" key={s.title} index={i % 3} y={14}>
              <div className="service__num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service__arrow" aria-hidden>→</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Esperienza pinned a scroll orizzontale ---- */
function ServicesPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      // Corsa = larghezza reale del binario − viewport + un margine d'aria.
      setTravel(trackRef.current.scrollWidth - window.innerWidth + 96);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const x = useTransform(smooth, [0, 1], [0, -travel]);
  const progress = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="showcase" id="servizi">
      <div className="showcase__sticky">
        <div className="showcase__head container">
          <div>
            <p className="eyebrow">Servizi</p>
            <h2 className="section-title">
              Tutto il tecnico, <em>sotto un unico tetto.</em>
            </h2>
          </div>
          <p className="showcase__hint" aria-hidden>
            Scorri <span>—</span> nove competenze, un solo studio
          </p>
        </div>

        <motion.div className="showcase__track" ref={trackRef} style={{ x }}>
          {SERVICES.map((s) => (
            <article
              className="showcard"
              key={s.title}
              data-cursor
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <span className="showcard__spot" aria-hidden />
              <span className="showcard__ghost" aria-hidden>{s.num}</span>
              <div className="showcard__top">
                <span className="showcard__num">{s.num}</span>
                <span className="showcard__rule" aria-hidden />
              </div>
              <div className="showcard__body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <span className="showcard__arrow" aria-hidden>→</span>
            </article>
          ))}
        </motion.div>

        <div className="showcase__progress" aria-hidden>
          <motion.span style={{ width: progress }} />
        </div>
      </div>
    </section>
  );
}
