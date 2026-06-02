"use client";

import { useEffect, useRef } from "react";
import {
  ABOUT,
  STATS,
  SERVICES,
  TARGETS,
  TEAM,
  APE,
  CONTACT,
} from "@/lib/content";

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
      { threshold: 0.15 }
    );
    root.querySelectorAll(".reveal").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 6) * 0.08}s`;
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
      {/* ===== CHI SIAMO ===== */}
      <section className="sec" id="chi-siamo">
        <div className="eyebrow reveal">{ABOUT.eyebrow}</div>
        <h2 className="reveal">
          {ABOUT.title} <span className="it">{ABOUT.titleItalic}</span>
        </h2>
        {ABOUT.paragraphs.map((p, i) => (
          <p className="lead reveal" key={i}>
            {p}
          </p>
        ))}
        <blockquote className="pull-quote reveal">{ABOUT.quote}</blockquote>

        <div className="stats reveal">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-num">
                {s.value}
                <span className="oro">{s.suffix}</span>
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVIZI ===== */}
      <section className="sec wide" id="servizi">
        <div className="eyebrow reveal">Expertise</div>
        <h2 className="reveal">
          Le nostre <span className="it">soluzioni</span>
        </h2>
        <div className="grid grid-services">
          {SERVICES.map((s) => (
            <div className="card reveal" key={s.num}>
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TARGET ===== */}
      <section className="sec" id="target">
        <div className="eyebrow reveal">Il nostro target</div>
        <h2 className="reveal">
          Ci rivolgiamo <span className="it">a chi costruisce</span>
        </h2>
        <div className="targets">
          {TARGETS.map((t, i) => (
            <div className="target-col reveal" key={t.title}>
              <span className="target-idx">0{i + 1}</span>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="sec" id="team">
        <div className="eyebrow reveal">Professionisti</div>
        <h2 className="reveal">
          Il <span className="it">Team</span>
        </h2>
        <p className="lead reveal">
          Le figure tecniche che guidano ogni progetto con metodo, continuità e
          controllo.
        </p>
        <div className="team-grid">
          {TEAM.map((m) => (
            <div className="team-card reveal" key={m.name}>
              <div className="team-head">
                <h3>{m.name}</h3>
                <span className="team-role">{m.role}</span>
              </div>
              <p>{m.desc}</p>
              <ul className="team-skills">
                {m.skills.map((sk) => (
                  <li key={sk}>{sk}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== APE ===== */}
      <section className="ape-band" id="ape">
        <div className="ape-inner">
          <div className="eyebrow gold-on-dark reveal">{APE.eyebrow}</div>
          <h2 className="reveal on-dark">
            {APE.title} <span className="it">{APE.titleItalic}</span>
          </h2>
          <p className="lead on-dark reveal">{APE.intro}</p>

          <div className="ape-steps">
            {APE.steps.map((st, i) => (
              <div className="ape-step reveal" key={st.title}>
                <span className="ape-step-num">0{i + 1}</span>
                <div>
                  <h4>{st.title}</h4>
                  <p>{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ape-classes reveal">
            {APE.classes.map((c, i) => (
              <div
                key={c}
                className={`ape-class ${i === 0 ? "worst" : ""} ${
                  i === APE.classes.length - 1 ? "best" : ""
                }`}
              >
                {c}
              </div>
            ))}
          </div>
          <div className="ape-benefits reveal">
            {APE.benefits.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER / CONTATTI ===== */}
      <footer id="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="mark">
              STUDIO <span className="oro">LOMBARDO</span>
            </div>
            <p className="footer-tag">
              Partner tecnico di fiducia per privati, imprese e investitori.
              Progettazione, catasto ed efficienza energetica.
            </p>
          </div>

          <div className="footer-col">
            <h5>Contatti</h5>
            {CONTACT.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {CONTACT.phones.map((ph) => (
              <p key={ph.href}>
                <a href={ph.href}>{ph.label}</a>
              </p>
            ))}
          </div>

          <div className="footer-col">
            <h5>Dati Studio</h5>
            {CONTACT.studio.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="line" />
          <small>
            © {new Date().getFullYear()} Studio Tecnico Lombardo · Tutti i
            diritti riservati
          </small>
        </div>
      </footer>
    </div>
  );
}
