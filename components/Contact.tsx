"use client";

import { toast } from "sonner";
import { CONTACT, SITE, FINAL_CTA } from "@/lib/content";
import FadeIn from "./FadeIn";
import Icon from "./Icon";

async function copy(text: string, msg: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(msg, { description: text });
  } catch {
    toast.error("Impossibile copiare automaticamente", { description: text });
  }
}

export default function Contact() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") ?? "");
    const contatto = String(data.get("contatto") ?? "");
    const messaggio = String(data.get("messaggio") ?? "");

    const subject = `Consulenza tecnica — ${nome || "richiesta dal sito"}`;
    const body =
      `Nome: ${nome}\n` +
      `Telefono / Email: ${contatto}\n\n` +
      `Situazione tecnica:\n${messaggio}\n`;

    toast.success("Richiesta pronta", {
      description: "Apro il tuo programma di posta con il messaggio già compilato.",
    });

    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="section" id="contatti">
      <div className="container">
        <FadeIn className="section-head">
          <p className="eyebrow">{FINAL_CTA.eyebrow}</p>
          <h2 className="display">Raccontami il caso. Partiamo dalle verifiche corrette.</h2>
          <p className="lead">
            Descrivi brevemente la situazione edilizia, catastale o di cantiere:
            ti rispondo indicando i primi passi tecnici da seguire.
          </p>
        </FadeIn>

        <div className="contact__grid">
          <FadeIn className="contact__info">
            <h3>Telefono</h3>
            {CONTACT.phones.map((p) => (
              <p key={p.href} className="contact__row">
                <a href={p.href}>{p.label}</a>
                <button
                  type="button"
                  className="copybtn"
                  onClick={() => copy(p.label, "Numero copiato")}
                  aria-label={`Copia ${p.label}`}
                >
                  <Icon name="copy" size={15} />
                </button>
              </p>
            ))}

            <h3>Email</h3>
            <p className="contact__row">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <button
                type="button"
                className="copybtn"
                onClick={() => copy(SITE.email, "Email copiata")}
                aria-label="Copia email"
              >
                <Icon name="copy" size={15} />
              </button>
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
          </FadeIn>

          <FadeIn index={1}>
            <form className="glass form" onSubmit={handleSubmit}>
              <label>
                Nome e cognome
                <input type="text" name="nome" autoComplete="name" required />
              </label>
              <label>
                Telefono o email
                <input type="text" name="contatto" required />
              </label>
              <label>
                Descrivi la situazione tecnica
                <textarea
                  name="messaggio"
                  required
                  placeholder="Es. devo ristrutturare e non so quali pratiche servono…"
                />
              </label>
              <button type="submit" className="btn btn--primary">
                {FINAL_CTA.cta.label}
                <Icon name="arrow" size={18} className="arr" />
              </button>
              <p className="form__hint">
                Si aprirà il tuo programma di posta con il messaggio già pronto.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
