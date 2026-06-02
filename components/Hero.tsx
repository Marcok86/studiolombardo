import Image from "next/image";
import { HERO, CONTACT } from "@/lib/content";

const primaryPhone = CONTACT.phones[0];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__content">
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
            Oppure chiamaci:{" "}
            <a href={primaryPhone.href}>{primaryPhone.label}</a>
          </p>
        </div>

        <div className="hero__media">
          <Image
            src="/hero/hero-03-centrale-desktop.webp"
            alt="Illustrazione ispirata a Leonardo da Vinci — competenza tecnica e progettazione"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
