"use client";

import { PROBLEM } from "@/lib/content";
import FadeIn from "./FadeIn";
import TiltCard from "./TiltCard";
import Icon, { type IconName } from "./Icon";

export default function Problem() {
  return (
    <section className="section" id="problema">
      <div className="container">
        <FadeIn className="section-head">
          <p className="eyebrow">{PROBLEM.eyebrow}</p>
          <h2 className="display">{PROBLEM.title}</h2>
          <p className="lead">{PROBLEM.lead}</p>
        </FadeIn>

        <div className="cardgrid cardgrid--4">
          {PROBLEM.items.map((it, i) => (
            <TiltCard key={it.title} index={i} className="glass icard">
              <span className="icard__ico">
                <Icon name={it.icon as IconName} />
              </span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
