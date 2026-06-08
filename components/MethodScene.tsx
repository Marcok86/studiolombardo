"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScroll, useMotionValueEvent } from "motion/react";
import { METHOD } from "@/lib/content";

const MethodCanvas = dynamic(() => import("./MethodCanvas"), { ssr: false });

export default function MethodScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(
      METHOD.steps.length - 1,
      Math.max(0, Math.floor(p * METHOD.steps.length))
    );
    setActive(i);
  });

  return (
    <section className="methodx" id="metodo" ref={ref}>
      <div className="methodx__sticky">
        <div className="container methodx__grid">
          <div className="methodx__text">
            <p className="eyebrow">{METHOD.eyebrow}</p>
            <h2 className="display methodx__title">{METHOD.title}</h2>
            <p className="methodx__hint">Scorri: l&apos;intervento prende forma, passo dopo passo.</p>

            <ol className="methodx__steps">
              {METHOD.steps.map((s, i) => (
                <li
                  key={s.num}
                  className={`methodx__step ${i === active ? "is-active" : ""} ${
                    i < active ? "is-done" : ""
                  }`}
                >
                  <span className="methodx__num">{s.num}</span>
                  <div className="methodx__body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="methodx__viz" aria-hidden>
            <MethodCanvas progress={scrollYProgress} />
            <span className="methodx__counter">
              <b>{METHOD.steps[active].num}</b> / {String(METHOD.steps.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
