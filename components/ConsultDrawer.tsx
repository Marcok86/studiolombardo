"use client";

import { createContext, useContext, useState } from "react";
import { Drawer } from "vaul";
import { toast } from "sonner";
import { SITE, CONTACT } from "@/lib/content";
import Icon from "./Icon";

type ConsultCtx = { open: () => void };
const Ctx = createContext<ConsultCtx | null>(null);

export function useConsult(): ConsultCtx {
  return useContext(Ctx) ?? { open: () => {} };
}

/**
 * Provider globale + drawer laterale (vaul, direction="right") con un
 * form di consulenza compatto. Qualsiasi CTA "Richiedi consulenza" può
 * aprirlo via useConsult().open() — niente salto a fondo pagina.
 */
export default function ConsultProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") ?? "");
    const contatto = String(data.get("contatto") ?? "");
    const messaggio = String(data.get("messaggio") ?? "");
    const subject = `Consulenza tecnica — ${nome || "richiesta dal sito"}`;
    const body =
      `Nome: ${nome}\nTelefono / Email: ${contatto}\n\nSituazione tecnica:\n${messaggio}\n`;

    toast.success("Richiesta pronta", {
      description: "Apro il tuo programma di posta con il messaggio già compilato.",
    });
    setOpen(false);
    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}

      <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="drawer__overlay" />
          <Drawer.Content className="drawer drawer--right">
            <div className="cdrawer">
              <div className="cdrawer__head">
                <div>
                  <p className="eyebrow">Parliamone</p>
                  <Drawer.Title className="cdrawer__title">
                    Richiedi una consulenza tecnica
                  </Drawer.Title>
                  <Drawer.Description className="cdrawer__desc">
                    Raccontami il caso in due righe: ti indico i primi passi tecnici.
                  </Drawer.Description>
                </div>
                <Drawer.Close className="copybtn" aria-label="Chiudi">
                  <Icon name="close" size={18} />
                </Drawer.Close>
              </div>

              <form className="form cdrawer__form" onSubmit={submit}>
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
                  Invia richiesta
                  <Icon name="arrow" size={18} className="arr" />
                </button>
              </form>

              <div className="cdrawer__alt">
                <span>Oppure contattami direttamente</span>
                <div className="cdrawer__altrow">
                  <a href={CONTACT.phones[0].href} className="btn btn--ghost">
                    <Icon name="phone" size={16} /> Chiama
                  </a>
                  <a href={`mailto:${SITE.email}`} className="btn btn--ghost">
                    <Icon name="mail" size={16} /> Email
                  </a>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Ctx.Provider>
  );
}
