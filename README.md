# Studio Tecnico Lombardo — Sito (Next.js)

Sito vetrina one-page orientato alla **comunicazione e alla generazione di contatti**:
messaggio chiaro, CTA onnipresenti, numeri come prova di esperienza. Architettura
Next.js 16 (App Router) + TypeScript + React 19.

## Stack
- **Next.js 16** (App Router, Turbopack)
- **TypeScript** (strict) + **React 19**
- **next/font (Inter)** — sans-serif moderno, self-hosted al build (nessun CDN runtime)
- **next/image** — immagini ottimizzate (AVIF/WebP, responsive, lazy); hero unica con `priority`

## Sviluppo locale
```bash
npm install
npm run dev
```
Apri http://localhost:3000

## Build di produzione
```bash
npm run build
npm start
```

## Deploy su Vercel
Push sul repo collegato a Vercel: rileva Next.js automaticamente, nessuna config.
Ogni push su `main` ridistribuisce.

## Struttura
```
app/
  layout.tsx        root layout, font Inter, metadata + OpenGraph + JSON-LD LocalBusiness
  page.tsx          home (composizione sezioni)
  globals.css       design system (token, tipografia, stili sezioni)
components/
  Navbar.tsx        navbar fissa, telefono tap-to-call, CTA, menu mobile
  Hero.tsx          hero comunicativo (headline + doppia CTA + immagine leggera)
  Stats.tsx         numeri con count-up on-scroll (IntersectionObserver)
  Targets.tsx       i tre pubblici (privati / imprese / investitori)
  Services.tsx      i 9 servizi in griglia
  About.tsx         chi siamo + metodo (fattibilità → progetto → cantiere → consegna)
  Team.tsx          il team
  Contact.tsx       contatti + form (invio via mailto precompilato)
  Footer.tsx        wordmark, contatti, dati studio
  MobileCta.tsx     sticky "Chiama ora / Scrivici" su mobile
  Reveal.tsx        wrapper reveal-on-scroll (rispetta prefers-reduced-motion)
lib/
  content.ts        TUTTI i contenuti reali (testi, servizi, team, numeri, contatti)
public/hero/        immagini hero (la home usa hero-03-centrale)
```

## Principi
- **Messaggio e contatto prima dell'estetica.** Niente scroll-jacking, niente sequenze pesanti.
- **Mobile-first**, telefono sempre visibile (navbar + sticky CTA).
- **Performance**: pagina statica, una sola immagine hero (`priority`), font self-hosted,
  JS minimo, animazioni leggere via IntersectionObserver/CSS.
- **Accessibilità**: contrasti AA, `prefers-reduced-motion` rispettato.

## Personalizzazione contenuti
Tutto in **`lib/content.ts`** (headline, numeri, servizi, pubblici, team, contatti, email).
Colori/tipografia: variabili CSS in cima a `app/globals.css`.

## Form di contatto
v1 via **mailto strutturato**: il pulsante apre il client email con oggetto e corpo
precompilati verso `SITE.email` (in `lib/content.ts`). Per passare a un invio server-side
(es. Resend/Formspree) basta sostituire l'handler in `components/Contact.tsx`.
