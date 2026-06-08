"use client";

import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { HERO } from "@/lib/content";
import MagneticButton from "./MagneticButton";
import Icon from "./Icon";
import { useConsult } from "./ConsultDrawer";

// Scena 3D solo client-side (three.js usa window/WebGL)
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const consult = useConsult();

  // --- parallax da scroll ---
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // --- parallax 3D dal puntatore (piani di profondità) ---
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 110, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 110, damping: 20, mass: 0.6 });

  const bgMX = useTransform(smx, [-0.5, 0.5], [26, -26]);
  const bgMY = useTransform(smy, [-0.5, 0.5], [20, -20]);
  const gridMX = useTransform(smx, [-0.5, 0.5], [-16, 16]);
  const gridMY = useTransform(smy, [-0.5, 0.5], [-12, 12]);
  const orbMX = useTransform(smx, [-0.5, 0.5], [50, -50]);
  const orbMY = useTransform(smy, [-0.5, 0.5], [40, -40]);
  const cMX = useTransform(smx, [-0.5, 0.5], [-10, 10]);
  const cMY = useTransform(smy, [-0.5, 0.5], [-7, 7]);
  const rotX = useTransform(smy, [-0.5, 0.5], [2.2, -2.2]);
  const rotY = useTransform(smx, [-0.5, 0.5], [-2.6, 2.6]);

  // --- gating reduced-motion: fade sì, movimento no ---
  // Props d'entrata: con reduce solo opacity, altrimenti slide-up con easing.
  const rise = (delay: number, dy = 24) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay } }
      : {
          initial: { opacity: 0, y: dy },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
        };

  // Parallax-scroll: il fade (contentOpacity) resta sempre; il movimento cade con reduce.
  const heroBgStyle = reduce ? {} : { y: bgY, scale: bgScale };
  const heroContentStyle = reduce
    ? { opacity: contentOpacity }
    : { y: contentY, opacity: contentOpacity };

  // Wrapper tilt del puntatore: nessun transform sotto reduce.
  const heroTiltStyle = reduce
    ? {}
    : { x: cMX, y: cMY, rotateX: rotX, rotateY: rotY, transformPerspective: 1200 };

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="hero" id="top" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      {/* sfondo: scroll (esterno) + mouse (interno) */}
      <motion.div className="hero__bg" style={heroBgStyle}>
        <motion.div className="hero__bg-layer" style={{ x: bgMX, y: bgMY }}>
          <Image
            src="/assets/textures/arch-dark.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </motion.div>

      <motion.div className="hero__grid" style={{ x: gridMX, y: gridMY }} aria-hidden />
      <motion.div className="hero__orb" style={{ x: orbMX, y: orbMY }} aria-hidden />

      <div className="container hero__inner">
        <motion.div className="hero__content" style={heroContentStyle}>
          <motion.div style={heroTiltStyle}>
            <motion.p className="eyebrow hero__eyebrow" {...rise(0, 14)}>
              {HERO.eyebrow}
            </motion.p>

            <h1 className="hero__title">
              <motion.span className="lead-word" {...rise(0.05, 24)}>
                {HERO.titleLead}
              </motion.span>
              <motion.span style={{ display: "block" }} {...rise(0.14, 24)}>
                {HERO.titleRest}
              </motion.span>
            </h1>

            <motion.p className="hero__sub" {...rise(0.24, 18)}>
              {HERO.sub}
            </motion.p>

            <motion.p className="hero__desc" {...rise(0.32, 16)}>
              {HERO.desc}
            </motion.p>

            <motion.ul
              className="hero__tags"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              aria-label="Ambiti operativi"
            >
              {HERO.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </motion.ul>

            <motion.p className="hero__motto" {...rise(0.5, 12)}>
              {HERO.motto}
            </motion.p>

            <motion.div className="hero__actions" {...rise(0.58, 18)}>
              <MagneticButton
                href={HERO.ctaPrimary.href}
                className="btn btn--primary"
                onClick={(e) => {
                  e.preventDefault();
                  consult.open();
                }}
              >
                {HERO.ctaPrimary.label}
                <Icon name="arrow" size={18} className="arr" />
              </MagneticButton>
              <a href={HERO.ctaSecondary.href} className="btn btn--ghost">
                {HERO.ctaSecondary.label}
              </a>
            </motion.div>

            <motion.ul
              className="hero__proof"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7 }}
            >
              {HERO.proof.map((p) => (
                <li key={p}>
                  <Icon name="check" size={16} />
                  {p}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        <div className="hero__viz" aria-hidden>
          <Hero3D />
        </div>
      </div>

      <div className="hero__scroll" aria-hidden>
        <span />
        Scorri
      </div>
    </section>
  );
}
