"use client";

import { FINAL_CTA } from "@/lib/content";
import CinematicBand from "./CinematicBand";
import MagneticButton from "./MagneticButton";
import Icon from "./Icon";
import { useConsult } from "./ConsultDrawer";

export default function FinalCta() {
  const consult = useConsult();
  return (
    <CinematicBand
      src="/assets/cinematic/drone.png"
      align="center"
      eyebrow={FINAL_CTA.eyebrow}
      title={FINAL_CTA.title}
      text={FINAL_CTA.text}
    >
      <p className="band__motto">{FINAL_CTA.motto}</p>
      <div className="band__cta">
        <MagneticButton
          href={FINAL_CTA.cta.href}
          className="btn btn--primary"
          onClick={(e) => {
            e.preventDefault();
            consult.open();
          }}
        >
          {FINAL_CTA.cta.label}
          <Icon name="arrow" size={18} className="arr" />
        </MagneticButton>
      </div>
    </CinematicBand>
  );
}
