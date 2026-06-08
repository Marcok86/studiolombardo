import { NAV, SITE, CONTACT } from "@/lib/content";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#top" className="brand">
              <span>
                Studio&nbsp;<b>Lombardo</b>
              </span>
              <small>Tecnico</small>
            </a>
            <p>{SITE.positioning}</p>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h4>Naviga</h4>
              {NAV.map((n) => (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ))}
            </div>
            <div className="footer__col">
              <h4>Contatti</h4>
              {CONTACT.phones.map((p) => (
                <a key={p.href} href={p.href}>
                  {p.label}
                </a>
              ))}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              {CONTACT.address.map((line) => (
                <span key={line} style={{ color: "var(--ink-faint)" }}>
                  {line}
                </span>
              ))}
            </div>
            <div className="footer__col">
              <h4>Studio</h4>
              {CONTACT.studio.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {SITE.legalName}. Tutti i diritti riservati.
          </span>
          <span>P.IVA 03090650130</span>
        </div>
      </div>
    </footer>
  );
}
