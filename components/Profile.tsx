"use client";

import Image from "next/image";
import { PROFILE } from "@/lib/content";
import FadeIn from "./FadeIn";
import TiltCard from "./TiltCard";
import Icon from "./Icon";
import Stats from "./Stats";

export default function Profile() {
  return (
    <section className="section" id="studio">
      <div className="container">
        <div className="profile">
          <FadeIn className="profile__body">
            <p className="eyebrow">{PROFILE.eyebrow}</p>
            <h2 className="display">{PROFILE.name}</h2>
            <p className="lead">{PROFILE.lead}</p>
            {PROFILE.paragraphs.map((p) => (
              <p key={p} style={{ color: "var(--ink-soft)" }}>
                {p}
              </p>
            ))}

            <ul className="trust">
              {PROFILE.trust.map((t) => (
                <li key={t}>
                  <Icon name="check" size={18} />
                  {t}
                </li>
              ))}
            </ul>
          </FadeIn>

          <div className="people">
            <FadeIn className="profile__photo">
              <Image
                src="/assets/cinematic/blueprint.png"
                alt="Disegni tecnici e strumenti sullo studio"
                width={1376}
                height={768}
                sizes="(max-width: 860px) 90vw, 46vw"
              />
              <span className="profile__photo-cap">Studio · disegno e verifica</span>
            </FadeIn>
            {PROFILE.people.map((person, i) => (
              <TiltCard key={person.name} index={i} max={6} className="glass person">
                <h4>{person.name}</h4>
                <p className="role">{person.role}</p>
                <p>{person.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          <Stats />
        </div>
      </div>
    </section>
  );
}
