import Reveal from "./Reveal";
import { SERVICES } from "@/lib/content";

export default function Services() {
  return (
    <section className="section section--soft" id="servizi">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Servizi</p>
          <h2 className="section-title">Tutto il tecnico, sotto un unico tetto.</h2>
          <p className="section-lead">
            Nove competenze integrate per seguire ogni fase: dalla fattibilità
            al cantiere, fino alla valorizzazione dell&apos;immobile.
          </p>
        </Reveal>

        <div className="services__grid">
          {SERVICES.map((s) => (
            <div className="service" key={s.title}>
              <div className="service__num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
