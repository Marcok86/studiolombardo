import FadeIn from "./FadeIn";
import { TARGETS } from "@/lib/content";

export default function Targets() {
  return (
    <section className="section" id="per-chi">
      <div className="container">
        <FadeIn>
          <p className="eyebrow">Per chi lavoriamo</p>
          <h2 className="section-title">
            Tre modi di <em>affidarti a noi.</em>
          </h2>
          <p className="section-lead">
            Privati, imprese e investitori: per ognuno un percorso tecnico
            su misura, con un unico referente dall&apos;inizio alla fine.
          </p>
        </FadeIn>

        <div className="targets__grid">
          {TARGETS.map((t, i) => (
            <FadeIn as="article" key={t.title} className="target-card" index={i}>
              <span className="target-card__index" aria-hidden>0{i + 1}</span>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <a className="target-card__link" href="#contatti">
                Parlane con noi
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
