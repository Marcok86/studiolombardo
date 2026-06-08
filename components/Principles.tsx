import { PRINCIPLES } from "@/lib/content";

/**
 * Banda editoriale con i cinque principi-identità in marquee continuo.
 * Duplico la lista per il loop infinito senza stacco.
 */
export default function Principles() {
  const items = [...PRINCIPLES, ...PRINCIPLES];
  return (
    <section className="principles" aria-label="I nostri principi">
      <div className="principles__track">
        {items.map((p, i) => (
          <span className="principles__item" key={i} aria-hidden={i >= PRINCIPLES.length}>
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
