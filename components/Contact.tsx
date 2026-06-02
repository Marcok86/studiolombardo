"use client";

import { CONTACT, SITE } from "@/lib/content";

export default function Contact() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") ?? "");
    const contatto = String(data.get("contatto") ?? "");
    const messaggio = String(data.get("messaggio") ?? "");

    const subject = `Richiesta consulenza — ${nome || "sito web"}`;
    const body =
      `Nome: ${nome}\n` +
      `Telefono / Email: ${contatto}\n\n` +
      `Messaggio:\n${messaggio}\n`;

    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="section" id="contatti">
      <div className="container">
        <p className="eyebrow">Contatti</p>
        <h2 className="section-title">Raccontaci il tuo progetto.</h2>
        <p className="section-lead">
          Rispondiamo in fretta. Scrivici dal form o chiamaci: la prima
          valutazione è senza impegno.
        </p>

        <div className="contact__grid" style={{ marginTop: "2.5rem" }}>
          <div className="contact__info">
            <h3>Telefono</h3>
            {CONTACT.phones.map((p) => (
              <p key={p.href}>
                <a href={p.href}>{p.label}</a>
              </p>
            ))}

            <h3>Email</h3>
            <p>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>

            <h3>Dove siamo</h3>
            {CONTACT.address.map((line) => (
              <p key={line}>{line}</p>
            ))}

            <ul className="contact__studio">
              {CONTACT.studio.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <label>
              Nome e cognome
              <input type="text" name="nome" autoComplete="name" required />
            </label>
            <label>
              Telefono o email
              <input type="text" name="contatto" required />
            </label>
            <label>
              Come possiamo aiutarti?
              <textarea name="messaggio" required />
            </label>
            <button type="submit" className="btn btn--primary">
              Invia richiesta
            </button>
            <p className="form__hint">
              Si aprirà il tuo programma di posta con il messaggio già pronto.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
