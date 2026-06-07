import { SERVICES } from "@/lib/content";
import FadeIn from "./FadeIn";

export default function Services() {
  return (
    <section className="section section--soft" id="servizi">
      <div className="container">
        <FadeIn>
          <p className="eyebrow">Servizi</p>
          <h2 className="section-title">
            Tutto il tecnico, <em>sotto un unico tetto.</em>
          </h2>
          <p className="section-lead">
            Nove competenze integrate per seguire ogni fase: dalla fattibilità
            al cantiere, fino alla valorizzazione dell&apos;immobile.
          </p>
        </FadeIn>

        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <FadeIn as="article" className="service" key={s.title} index={i % 3} y={14}>
              <div className="service__num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service__arrow" aria-hidden>→</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
