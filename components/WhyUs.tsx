"use client";

import { WHY } from "@/lib/content";
import FadeIn from "./FadeIn";

const ICONS: Record<string, React.ReactNode> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  rigor: (
    <>
      <path d="M4 19h16" />
      <path d="M6 19V8l6-4 6 4v11" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  badge: (
    <>
      <path d="M12 3l2.2 2.1 3-.4.6 3 2.6 1.6-1.4 2.7 1.4 2.7-2.6 1.6-.6 3-3-.4L12 21l-2.2-2.1-3 .4-.6-3L3.6 13l1.4-2.7L3.6 7.6l2.6-1.6.6-3 3 .4L12 3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  growth: (
    <>
      <path d="M4 19h16" />
      <path d="M5 16l4-5 3 3 5-7" />
      <path d="M17 7h3v3" />
    </>
  ),
};

export default function WhyUs() {
  return (
    <section className="section why why--dark" id="perche-noi" aria-label="Perché sceglierci">
      <div className="why__texture" aria-hidden />
      <div className="container">
        <FadeIn className="why__head">
          <p className="eyebrow">{WHY.eyebrow}</p>
          <h2 className="section-title">
            {WHY.title} <em>{WHY.titleItalic}</em>
          </h2>
          <p className="section-lead">{WHY.lead}</p>
        </FadeIn>

        <div className="why__grid">
          {WHY.items.map((item, i) => (
            <FadeIn
              as="article"
              className="why-card"
              key={item.title}
              index={i}
              y={18}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                el.style.setProperty("--mx", `${e.clientX - r.left}px`);
                el.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <span className="why-card__spot" aria-hidden />
              <span className="why-card__icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[item.icon]}
                </svg>
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
