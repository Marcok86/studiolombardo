"use client";

import { useEffect, useState } from "react";
import { NAV, CONTACT, HERO } from "@/lib/content";
import MagneticButton from "./MagneticButton";

const primaryPhone = CONTACT.phones[0];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Scrollspy: evidenzia la voce della sezione correntemente in vista.
  useEffect(() => {
    const ids = NAV.map((n) => n.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          STUDIO <b>LOMBARDO</b>
        </a>

        <nav className="nav__links">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={active === item.href ? "is-active" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="nav__tel" href={primaryPhone.href}>
            <span>☏</span> {primaryPhone.label}
          </a>
          <MagneticButton href={HERO.ctaPrimary.href} className="btn btn--primary nav__cta">
            Richiedi consulenza
          </MagneticButton>
          <button
            className="nav__burger"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__panel">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="btn btn--primary"
            href={HERO.ctaPrimary.href}
            onClick={() => setOpen(false)}
          >
            Richiedi consulenza
          </a>
        </div>
      )}
    </header>
  );
}
