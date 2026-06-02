import Reveal from "./Reveal";
import { TEAM } from "@/lib/content";

function initials(name: string) {
  const parts = name.replace(/Geom\.\s*/i, "").trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export default function Team() {
  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Il team</p>
          <h2 className="section-title">Il volto dietro lo studio.</h2>
          <p className="section-lead">
            Due geometri, competenze complementari, un unico standard di
            affidabilità a fianco dei nostri clienti.
          </p>
        </Reveal>

        <div className="team__grid">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} className="member" delay={i * 90}>
              <div className="member__avatar" aria-hidden>{initials(m.name)}</div>
              <h3>{m.name}</h3>
              <p className="member__role">{m.role}</p>
              <p>{m.desc}</p>
              <ul className="member__skills">
                {m.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
