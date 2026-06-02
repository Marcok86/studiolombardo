"use client";

import { useEffect, useRef } from "react";
import { SERVICES } from "@/lib/hero-data";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    root.querySelectorAll(".reveal").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 6) * 0.09}s`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Sections() {
  const ref = useReveal();
  return (
    <div className="content-wrap" ref={ref}>
      <section className="sec">
        <div className="eyebrow reveal">Lo Studio</div>
        <h2 className="reveal">
          Dove la tecnica incontra <span className="it">la misura</span>
        </h2>
        <p className="lead placeholder reveal">
          [ Testo di presentazione — da definire. ]
        </p>
        <p className="lead placeholder reveal">
          [ Filosofia professionale, territorio, valori. ]
        </p>
      </section>

      <section className="sec">
        <div className="eyebrow reveal">Competenze</div>
        <h2 className="reveal">
          Sei discipline, <span className="it">un unico rigore</span>
        </h2>
        <div className="grid">
          {SERVICES.map((s) => (
            <div className="card reveal" key={s.num}>
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <p className="placeholder">[ Descrizione ]</p>
            </div>
          ))}
        </div>
      </section>

      <div className="quote-band">
        <p className="reveal">
          L&apos;esperienza, madre di ogni certa conoscenza, gode grazie
          all&apos;importanza delle cose apprese.
        </p>
        <div className="src reveal">Leonardo da Vinci</div>
      </div>

      <section className="sec">
        <div className="eyebrow reveal">Progetti</div>
        <h2 className="reveal">
          Opere <span className="it">e realizzazioni</span>
        </h2>
        <p className="lead placeholder reveal">
          [ Galleria progetti — da inserire. ]
        </p>
      </section>

      <footer>
        <div className="mark">
          STUDIO <span className="oro">LOMBARDO</span>
        </div>
        <div className="line" />
        <p>Locate Varesino (CO)</p>
        <small>
          Geom. Marco Lombardo · Collegio Geometri della Provincia di Como n.
          2793
        </small>
      </footer>
    </div>
  );
}
