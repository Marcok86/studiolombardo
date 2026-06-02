"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HERO, CONTACT, MANIFESTO } from "@/lib/content";

const primaryPhone = CONTACT.phones[0];

// Helper di interpolazione (vedi spec parallax)
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const map = (p: number, a: number, b: number, c: number, d: number) =>
  mix(c, d, clamp((p - a) / (b - a)));
// Dissolvenza in/out: 0 -> 1 (in) e 1 -> 0 (out)
const fadeInOut = (p: number, inA: number, inB: number, outA: number, outB: number) =>
  clamp(Math.min(map(p, inA, inB, 0, 1), map(p, outA, outB, 1, 0)));

// I 5 frame della sequenza, in ordine di profondità (background -> foreground)
const FRAMES = [
  { src: "/assets/hero/hero-01-intro-right.webp", alt: "Leonardo da Vinci con compasso e libro", pos: "78% center" },
  { src: "/assets/hero/hero-02-left-focus.webp", alt: "", pos: "22% center" },
  { src: "/assets/hero/hero-03-central-climax.webp", alt: "", pos: "50% center" },
  { src: "/assets/hero/hero-04-outro-right.webp", alt: "", pos: "80% center" },
  { src: "/assets/hero/hero-05-empty-technical.webp", alt: "", pos: "50% center" },
];

export default function Hero() {
  const [parallax, setParallax] = useState(false);
  const wrapRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const phaseBRef = useRef<HTMLDivElement>(null);
  const phaseCRef = useRef<HTMLDivElement>(null);
  const phaseDRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setParallax(true);

    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const total = wrap.offsetHeight - window.innerHeight;
      // Finché il layout parallax (altezza piena) non è applicato, total <= 0:
      // trattiamo come inizio (p=0) così l'intro resta visibile.
      const p = total > 0 ? clamp(-wrap.getBoundingClientRect().top / total) : 0;

      // Movimento dei 5 layer: opacità (cross-fade) + scala + traslazione + rotazione prospettica
      const configs = [
        { o: map(p, 0.14, 0.34, 1, 0), s: map(p, 0, 1, 1.04, 1.1), x: map(p, 0, 1, 0, -3), y: map(p, 0, 1, 0, -1), rx: 0, ry: map(p, 0, 1, 0, -2) },
        { o: fadeInOut(p, 0.18, 0.32, 0.38, 0.55), s: map(p, 0.18, 0.55, 1.08, 1.02), x: map(p, 0.18, 0.55, 2, -2), y: map(p, 0.18, 0.55, 1, -1), rx: 0, ry: map(p, 0.18, 0.55, 2, -1) },
        { o: fadeInOut(p, 0.4, 0.55, 0.62, 0.75), s: map(p, 0.4, 0.75, 1.02, 1.12), x: map(p, 0.4, 0.75, 0, 1), y: map(p, 0.4, 0.75, 1, -2), rx: map(p, 0.4, 0.75, 0, 1), ry: 0 },
        { o: fadeInOut(p, 0.66, 0.78, 0.84, 0.94), s: map(p, 0.66, 0.94, 1.02, 1.06), x: map(p, 0.66, 0.94, -1, 0), y: map(p, 0.66, 0.94, 0, -1), rx: 0, ry: 0 },
        { o: map(p, 0.86, 1.0, 0, 1), s: map(p, 0.86, 1.0, 1.0, 1.03), x: 0, y: map(p, 0.86, 1.0, 0, -1), rx: 0, ry: 0 },
      ];
      layerRefs.current.forEach((layer, i) => {
        if (!layer) return;
        const c = configs[i];
        layer.style.opacity = c.o.toFixed(3);
        layer.style.transform = `translate3d(${c.x}vw, ${c.y}vh, ${i * -40}px) scale(${c.s}) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
      });

      // Fasi testuali (HUD) — appaiono e svaniscono in momenti diversi, restando leggibili
      if (contentRef.current) {
        contentRef.current.style.opacity = String(map(p, 0.12, 0.26, 1, 0));
        contentRef.current.style.transform = `translate3d(0, ${p * -60}px, 0)`;
      }
      if (phaseBRef.current) {
        phaseBRef.current.style.opacity = String(fadeInOut(p, 0.2, 0.3, 0.36, 0.46));
        phaseBRef.current.style.transform = `translate3d(0, ${map(p, 0.2, 0.46, 18, -18)}px, 0)`;
      }
      if (phaseCRef.current) {
        phaseCRef.current.style.opacity = String(fadeInOut(p, 0.44, 0.54, 0.6, 0.7));
        phaseCRef.current.style.transform = `translate3d(0, ${map(p, 0.44, 0.7, 16, -16)}px, 0)`;
      }
      if (phaseDRef.current) {
        phaseDRef.current.style.opacity = String(fadeInOut(p, 0.68, 0.8, 0.9, 0.97));
        phaseDRef.current.style.transform = `translate3d(0, ${map(p, 0.68, 0.97, 20, -10)}px, 0)`;
      }
      if (cueRef.current) cueRef.current.style.opacity = String(1 - clamp(p / 0.1));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    // L'altezza definitiva (classe is-parallax) è committata da React in modo
    // differito: rilanciamo update finché il layout non si è stabilizzato.
    requestAnimationFrame(() => requestAnimationFrame(update));
    const timers = [setTimeout(update, 120), setTimeout(update, 400)];
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", update);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      className={`hero ${parallax ? "is-parallax" : ""}`}
      id="top"
    >
      <div className="hero__sticky">
        <div className="hero__scene">
          {FRAMES.map((f, i) => (
            <div
              key={f.src}
              className="hero__layer"
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              style={i === 0 ? undefined : { opacity: 0 }}
              aria-hidden={f.alt ? undefined : true}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                style={{ objectPosition: f.pos }}
              />
            </div>
          ))}
          <div className="hero__vignette" aria-hidden />
        </div>

        <div className="hero__scrim" aria-hidden />

        {/* Fase A — intro: contenuto principale a sinistra (frame 01, figura a destra) */}
        <div className="container hero__inner">
          <div className="hero__content" ref={contentRef}>
            <p className="hero__eyebrow">{HERO.eyebrow}</p>
            <h1 className="hero__title">{HERO.title}</h1>
            <p className="hero__sub">{HERO.subtitle}</p>
            <div className="hero__cta">
              <a className="btn btn--primary" href={HERO.ctaPrimary.href}>
                {HERO.ctaPrimary.label}
              </a>
              <a className="btn btn--ghost" href={HERO.ctaSecondary.href}>
                {HERO.ctaSecondary.label}
              </a>
            </div>
            <p className="hero__phone">
              Oppure chiamaci: <a href={primaryPhone.href}>{primaryPhone.label}</a>
            </p>
          </div>
        </div>

        {/* Fase B — valore: testo a destra (frame 02, figura a sinistra) */}
        <div className="hero__hud hero__hud--right" ref={phaseBRef} aria-hidden>
          <div className="hero__hud-box">
            <p className="hero__hud-line">
              Un solo interlocutore tecnico, dal primo sopralluogo alla consegna.
            </p>
          </div>
        </div>

        {/* Fase C — climax: citazione di Leonardo (frame 03, composizione centrale) */}
        <div className="hero__hud hero__hud--center" ref={phaseCRef} aria-hidden>
          <div className="hero__hud-box">
            <p className="hero__quote">« {MANIFESTO.quote} »</p>
            <p className="hero__quote-cite">{MANIFESTO.author}</p>
          </div>
        </div>

        {/* Fase D — outro: claim finale + invito (frame 04, figura a destra) */}
        <div className="hero__hud hero__hud--left" ref={phaseDRef} aria-hidden>
          <div className="hero__hud-box">
            <p className="hero__claim-inner">{MANIFESTO.claim}</p>
            <a className="btn btn--primary" href={MANIFESTO.cta.href}>
              {MANIFESTO.cta.label}
            </a>
          </div>
        </div>

        <div className="hero__cue" ref={cueRef} aria-hidden>
          <span>Scorri</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
