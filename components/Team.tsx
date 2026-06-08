"use client";

import FadeIn from "./FadeIn";
import { TEAM } from "@/lib/content";

function initials(name: string) {
  const parts = name.replace(/Geom\.\s*/i, "").trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export default function Team() {
  return (
    <section className="section section--soft">
      <div className="container">
        <FadeIn>
          <p className="eyebrow">Il team</p>
          <h2 className="section-title">
            Il volto <em>dietro lo studio.</em>
          </h2>
          <p className="section-lead">
            Due geometri, competenze complementari, un unico standard di
            affidabilità a fianco dei nostri clienti.
          </p>
        </FadeIn>

        <div className="team__grid">
          {TEAM.map((m, i) => (
            <FadeIn
              as="article"
              key={m.name}
              className="member"
              index={i}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                el.style.setProperty("--mx", `${e.clientX - r.left}px`);
                el.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <span className="member__spot" aria-hidden />
              <div className="member__avatar" aria-hidden>{initials(m.name)}</div>
              <h3>{m.name}</h3>
              <p className="member__role">{m.role}</p>
              <p>{m.desc}</p>
              <ul className="member__skills">
                {m.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
