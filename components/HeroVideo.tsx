"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Clip generati con Higgsfield (Grok 1.5), grado nero&oro.
const CLIPS = [
  "/assets/hero-video/clip-1-rilievo.mp4",
  "/assets/hero-video/clip-2-autocad.mp4",
  "/assets/hero-video/clip-5-progetti.mp4",
];
const POSTER = "/assets/hero-video/poster.jpg";

export default function HeroVideo() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLVideoElement | null>>([]);

  // Riproduce il clip attivo dall'inizio quando cambia.
  useEffect(() => {
    if (reduce) return;
    const v = refs.current[active];
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [active, reduce]);

  // Reduced-motion / mobile leggero: solo poster statico, nessun video.
  if (reduce) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="herovid__poster" src={POSTER} alt="" aria-hidden />;
  }

  return (
    <div className="herovid" aria-hidden>
      {CLIPS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="herovid__clip"
          style={{ opacity: i === active ? 1 : 0 }}
          src={src}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          onEnded={() => i === active && setActive((a) => (a + 1) % CLIPS.length)}
        />
      ))}
    </div>
  );
}
