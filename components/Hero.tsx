"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HERO, CONTACT, MANIFESTO } from "@/lib/content";

const primaryPhone = CONTACT.phones[0];
const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

export default function Hero() {
  const [parallax, setParallax] = useState(false);
  const wrapRef = useRef<HTMLElement>(null);
  const emptyRef = useRef<HTMLDivElement>(null);
  const centraleRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const claimRef = useRef<HTMLDivElement>(null);
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
      // Finché il layout parallax (altezza 175vh) non è applicato, total <= 0:
      // trattiamo come inizio (p=0) così il messaggio resta visibile.
      const p = total > 0 ? clamp(-wrap.getBoundingClientRect().top / total) : 0;

      if (emptyRef.current)
        emptyRef.current.style.transform = `translate3d(0, ${p * -50}px, 0) scale(1.08)`;
      if (centraleRef.current) {
        centraleRef.current.style.opacity = String(1 - clamp(p / 0.55));
        centraleRef.current.style.transform = `translate3d(0, ${p * 80}px, 0) scale(${1 + p * 0.1})`;
      }
      if (focusRef.current) {
        focusRef.current.style.opacity = String(clamp((p - 0.4) / 0.5));
        focusRef.current.style.transform = `translate3d(0, ${p * 40}px, 0) scale(${1.05 + p * 0.06})`;
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = String(1 - clamp((p - 0.32) / 0.26));
        contentRef.current.style.transform = `translate3d(0, ${p * -60}px, 0)`;
      }
      if (claimRef.current) {
        claimRef.current.style.opacity = String(clamp((p - 0.5) / 0.32));
        claimRef.current.style.transform = `translate3d(0, ${(1 - p) * 28}px, 0)`;
      }
      if (cueRef.current) cueRef.current.style.opacity = String(1 - clamp(p / 0.15));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    // L'altezza definitiva (classe is-parallax) viene committata da React in modo
    // differito: rilanciamo update più volte finché il layout non si è stabilizzato.
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
        <div className="hero__layer hero__layer--empty" ref={emptyRef} aria-hidden>
          <Image
            src="/hero/hero-empty-desktop.webp"
            alt=""
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div className="hero__layer hero__layer--figure" ref={centraleRef} aria-hidden>
          <Image
            src="/hero/hero-03-centrale-desktop.webp"
            alt="Figura ispirata a Leonardo da Vinci"
            fill
            sizes="100vw"
            priority
          />
        </div>
        <div
          className="hero__layer hero__layer--figure"
          ref={focusRef}
          style={{ opacity: 0 }}
          aria-hidden
        >
          <Image
            src="/hero/hero-02-focus-desktop.webp"
            alt=""
            fill
            sizes="100vw"
          />
        </div>

        <div className="hero__scrim" aria-hidden />

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

        <div className="hero__claim" ref={claimRef} aria-hidden>
          <p className="hero__claim-inner">{MANIFESTO.claim}</p>
        </div>

        <div className="hero__cue" ref={cueRef} aria-hidden>
          <span>Scopri</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
