import { CONTACT } from "@/lib/content";

const primaryPhone = CONTACT.phones[0];

export default function MobileCta() {
  return (
    <div className="mcta">
      <a className="btn btn--ghost" href="#contatti">
        Scrivici
      </a>
      <a className="btn btn--primary" href={primaryPhone.href}>
        Chiama ora
      </a>
    </div>
  );
}
