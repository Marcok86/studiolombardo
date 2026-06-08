"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import FadeIn from "./FadeIn";

/**
 * Banda full-bleed cinematografica: immagine che scorre in parallax
 * (translate + scale sullo scroll), velo scuro per leggibilità, testo
 * rivelato sopra. Rompe la griglia e dà immersione fotografica.
 */
export default function CinematicBand({
  src,
  eyebrow,
  title,
  text,
  align = "left",
  children,
}: {
  src: string;
  eyebrow?: string;
  title?: React.ReactNode;
  text?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1.02]);

  return (
    <section className={`band band--${align}`} ref={ref}>
      <motion.div className="band__bg" style={{ y, scale }}>
        <Image src={src} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
      </motion.div>
      <div className="band__veil" aria-hidden />

      <div className={`container band__inner band__inner--${align}`}>
        <FadeIn>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <h2 className="band__title">{title}</h2>}
          {text && <p className="band__text">{text}</p>}
          {children}
        </FadeIn>
      </div>
    </section>
  );
}
