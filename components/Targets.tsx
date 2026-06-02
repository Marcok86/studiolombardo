import Reveal from "./Reveal";
import { TARGETS } from "@/lib/content";

export default function Targets() {
  return (
    <section className="section" id="per-chi">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Per chi lavoriamo</p>
          <h2 className="section-title">Tre modi di affidarti a noi.</h2>
          <p className="section-lead">
            Privati, imprese e investitori: per ognuno un percorso tecnico
            su misura, con un unico referente dall&apos;inizio alla fine.
          </p>
        </Reveal>

        <div className="targets__grid">
          {TARGETS.map((t, i) => (
            <Reveal key={t.title} className="target-card" delay={i * 80}>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <a className="target-card__link" href="#contatti">
                Parlane con noi
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
