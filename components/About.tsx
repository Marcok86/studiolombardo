import Reveal from "./Reveal";
import { ABOUT } from "@/lib/content";

const METHOD = [
  { title: "Fattibilità", desc: "Analisi tecnica ed economica prima di partire." },
  { title: "Progetto", desc: "Soluzione completa e pratiche autorizzative." },
  { title: "Cantiere", desc: "Direzione lavori, qualità, tempi e costi sotto controllo." },
  { title: "Consegna", desc: "Chiusura, conformità e valorizzazione finale." },
];

export default function About() {
  return (
    <section className="section" id="chi-siamo">
      <div className="container about__grid">
        <Reveal className="about__body">
          <p className="eyebrow">{ABOUT.eyebrow}</p>
          <h2 className="section-title">
            {ABOUT.title} {ABOUT.titleItalic}.
          </h2>
          {ABOUT.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <blockquote className="about__quote" style={{ marginTop: "1.6rem" }}>
            {ABOUT.quote}
          </blockquote>
        </Reveal>

        <Reveal className="method" delay={120}>
          {METHOD.map((m, i) => (
            <div className="method__step" key={m.title}>
              <span className="method__num">{i + 1}</span>
              <span>
                <b>{m.title}</b>
                <span>{m.desc}</span>
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
