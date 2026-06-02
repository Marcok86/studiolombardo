import { CONTACT, SITE, NAV } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">STUDIO LOMBARDO</div>
          <nav style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <div style={{ display: "grid", gap: "0.2rem", textAlign: "right" }}>
            {CONTACT.phones.map((p) => (
              <a key={p.href} href={p.href}>{p.label}</a>
            ))}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </div>

        <div className="footer__legal">
          <span>© {new Date().getFullYear()} {SITE.legalName}</span>
          {CONTACT.studio.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
