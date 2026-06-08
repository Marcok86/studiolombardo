"use client";

import { CONTACT } from "@/lib/content";
import { useConsult } from "./ConsultDrawer";

export default function MobileCta() {
  const consult = useConsult();
  const phone = CONTACT.phones[0]?.href ?? "#";
  return (
    <div className="mobilecta">
      <a href={phone} className="btn btn--ghost">
        Chiama
      </a>
      <button
        type="button"
        className="btn btn--primary"
        onClick={() => consult.open()}
      >
        Consulenza
      </button>
    </div>
  );
}
