"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Barra di avanzamento dello scroll, ancorata in cima al viewport.
 * Usa useScroll (progresso 0→1 dell'intera pagina) + useSpring per un
 * movimento fluido e "pesato", non lineare. scaleX è la proprietà più
 * economica da animare (solo compositing, niente reflow).
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />;
}
