"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { CONTACT } from "@/lib/content";
import FadeIn from "./FadeIn";
import MagneticButton from "./MagneticButton";

/**
 * Banda cinematografica full-bleed con visual Higgsfield (blueprint dorato
 * su scrivania scura). Parallax sullo sfondo via useScroll: l'immagine si
 * muove più lentamente del contenuto, creando profondità.
 */
export default function CinematicCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section ref={ref} className="cband">
      <motion.div className="cband__bg" style={{ y, scale }} aria-hidden>
        <Image
          src="/assets/textures/arch-dark.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />
      </motion.div>
      <div className="cband__overlay" aria-hidden />

      <div className="container cband__inner">
        <FadeIn>
          <p className="eyebrow">Studio Tecnico Lombardo</p>
          <h2 className="cband__title">
            Dal disegno alla consegna, <em>un solo rigore.</em>
          </h2>
          <p className="cband__lead">
            Un unico referente tecnico per ogni fase. Raccontaci l&apos;immobile:
            ti diciamo subito come muoverci, con tempi e quadro economico chiari.
          </p>
          <div className="cband__cta">
            <MagneticButton className="btn btn--primary" href="#contatti">
              Richiedi una consulenza
            </MagneticButton>
            <a className="btn btn--light" href={CONTACT.phones[0].href}>
              {CONTACT.phones[0].label}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
