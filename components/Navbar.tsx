"use client";

import { useState } from "react";
import { NAV, CONTACT, HERO } from "@/lib/content";

const primaryPhone = CONTACT.phones[0];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          STUDIO <b>LOMBARDO</b>
        </a>

        <nav className="nav__links">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="nav__tel" href={primaryPhone.href}>
            <span>☏</span> {primaryPhone.label}
          </a>
          <a className="btn btn--primary nav__cta" href={HERO.ctaPrimary.href}>
            Richiedi consulenza
          </a>
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
