"use client";

import { SERVICES, SERVICES_INTRO } from "@/lib/content";
import FadeIn from "./FadeIn";
import TiltCard from "./TiltCard";
import SectionGlow from "./SectionGlow";
import Icon from "./Icon";

export default function Services() {
  return (
    <section className="section" id="servizi">
      <SectionGlow side="right" />
      <div className="container">
        <FadeIn className="section-head">
          <p className="eyebrow">{SERVICES_INTRO.eyebrow}</p>
          <h2 className="display">{SERVICES_INTRO.title}</h2>
          <p className="lead">{SERVICES_INTRO.lead}</p>
        </FadeIn>

        <div className="cardgrid cardgrid--4">
          {SERVICES.map((s, i) => (
            <TiltCard key={s.num} index={i % 4} className="glass svc">
              <div className="svc__top">
                <span className="svc__num">{s.num}</span>
                <Icon name="arrowUp" size={18} className="svc__arr" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
