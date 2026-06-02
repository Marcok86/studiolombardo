"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { MANIFESTO } from "@/lib/content";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      const layer = layerRef.current;
      if (!el || !layer) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (sezione sotto) .. 1 (sezione sopra); 0 = centrata
      const rel = (rect.top + rect.height / 2 - vh / 2) / vh;
      layer.style.transform = `translate3d(0, ${rel * -60}px, 0) scale(1.12)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="manifesto" ref={sectionRef} aria-label="Il nostro approccio">
      <div className="manifesto__layer" ref={layerRef} aria-hidden>
        <Image
          src="/hero/hero-04-outro-desktop.webp"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
        />
      </div>
      <div className="manifesto__scrim" aria-hidden />
      <div className="container manifesto__inner">
        <div className="manifesto__content">
          <p className="manifesto__claim">{MANIFESTO.claim}</p>
          <p className="manifesto__text">{MANIFESTO.text}</p>
          <a className="btn btn--primary" href={MANIFESTO.cta.href}>
            {MANIFESTO.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
