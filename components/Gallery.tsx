"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type Project,
} from "@/lib/projects";
import FadeIn from "./FadeIn";
import Icon from "./Icon";

export default function Gallery() {
  const [cat, setCat] = useState<string>("Tutti");
  const [open, setOpen] = useState<Project | null>(null);

  const list =
    cat === "Tutti" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  // chiusura modal con Escape + blocco scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="section" id="progetti">
      <div className="container">
        <FadeIn className="section-head">
          <p className="eyebrow">Progetti</p>
          <h2 className="display">Progetti e render dello studio.</h2>
          <p className="lead">
            Una selezione di interventi tra ville, residenziale e interni —
            render di progetto usati per decidere prima del cantiere.
          </p>
        </FadeIn>

        <div className="gal__filters">
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c}
              className={`gal__chip ${cat === c ? "is-active" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
              {c !== "Tutti" && (
                <span className="gal__count">
                  {PROJECTS.filter((p) => p.category === c).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <motion.div layout className="gal__grid">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.button
                layout
                key={p.slug}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="gal__card"
                onClick={() => setOpen(p)}
                aria-label={`Apri ${p.title}`}
              >
                <span className="gal__media">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="gal__tag">{p.category}</span>
                  <span className="gal__plus">
                    <Icon name="arrowUp" size={18} />
                  </span>
                </span>
                <span className="gal__meta">
                  <span className="gal__title">{p.title}</span>
                  <span className="gal__place">
                    {p.place} · {p.images.length} viste
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className="lb__panel"
              initial={{ y: 36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lb__close"
                onClick={() => setOpen(null)}
                aria-label="Chiudi"
              >
                <Icon name="close" size={20} />
              </button>

              <div className="lb__head">
                <p className="eyebrow">
                  {open.category} · {open.tag}
                </p>
                <h3>{open.title}</h3>
                <p className="lb__place">
                  {open.place}
                  {open.year ? ` · ${open.year}` : ""}
                </p>
                <p className="lb__summary">{open.summary}</p>
                <ul className="lb__details">
                  {open.details.map((d) => (
                    <li key={d}>
                      <Icon name="check" size={16} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lb__gallery">
                {open.images.map((src, i) => (
                  // immagini webp leggere: <img> nativo preserva l'aspetto reale
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={`${open.title} — vista ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="lb__img"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
