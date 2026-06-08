"use client";

import { AUDIENCE } from "@/lib/content";
import FadeIn from "./FadeIn";
import TiltCard from "./TiltCard";
import SectionGlow from "./SectionGlow";

export default function Audience() {
  return (
    <section className="section" id="per-chi">
      <SectionGlow side="left" />
      <div className="container">
        <FadeIn className="section-head">
          <p className="eyebrow">{AUDIENCE.eyebrow}</p>
          <h2 className="display">{AUDIENCE.title}</h2>
        </FadeIn>

        <div className="cardgrid cardgrid--4">
          {AUDIENCE.items.map((it, i) => (
            <TiltCard key={it.title} index={i} className="glass aud">
              <span className="aud__idx">{String(i + 1).padStart(2, "0")}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
