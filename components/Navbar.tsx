"use client";

import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { NAV, HERO } from "@/lib/content";
import Icon from "./Icon";
import { useConsult } from "./ConsultDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const consult = useConsult();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy: evidenzia la voce della sezione attiva
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.href.replace("#", "")))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav__inner" aria-label="Principale">
        <a href="#top" className="brand">
          <span>
            Studio&nbsp;<b>Lombardo</b>
          </span>
          <small>Tecnico</small>
        </a>

        <div className="nav__links">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={active === n.href ? "is-active" : ""}
            >
              {n.label}
            </a>
          ))}
        </div>

        <a
          href={HERO.ctaPrimary.href}
          className="btn btn--primary nav__cta"
          onClick={(e) => {
            e.preventDefault();
            consult.open();
          }}
        >
          Consulenza
          <Icon name="arrow" size={16} className="arr" />
        </a>

        {/* Menu mobile: drawer dal basso (vaul) */}
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger asChild>
            <button className="nav__burger" aria-label="Apri il menu">
              <Icon name="menu" size={24} />
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="drawer__overlay" />
            <Drawer.Content className="drawer">
              <div className="drawer__handle" aria-hidden />
              <Drawer.Title className="drawer__title">Navigazione</Drawer.Title>
              <Drawer.Description className="drawer__desc">
                Studio Tecnico Lombardo
              </Drawer.Description>
              <nav className="drawer__nav" aria-label="Menu mobile">
                {NAV.map((n) => (
                  <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                    {n.label}
                    <Icon name="arrow" size={18} />
                  </a>
                ))}
              </nav>
              <a
                href={HERO.ctaPrimary.href}
                className="btn btn--primary drawer__cta"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  consult.open();
                }}
              >
                {HERO.ctaPrimary.label}
                <Icon name="arrow" size={18} className="arr" />
              </a>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </nav>
    </header>
  );
}
