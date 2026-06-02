# Studio Tecnico Lombardo — Sito (Next.js)

Sito vetrina one-page con hero scroll-driven in parallasse, architettura Next.js 16 (App Router) + TypeScript + React 19.

## Stack
- **Next.js 16** (App Router, Turbopack)
- **TypeScript** (strict)
- **React 19**
- **next/font/local** — font Cormorant + EB Garamond self-hosted (nessuna dipendenza da CDN)
- **next/image** — immagini ottimizzate automaticamente (AVIF/WebP, responsive, lazy)

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
Pusha questa cartella sul repo GitHub collegato a Vercel. Vercel rileva Next.js
automaticamente: nessuna configurazione necessaria. Ogni push su `main` ridistribuisce.

## Struttura
```
app/
  layout.tsx        root layout, font locali, metadata
  page.tsx          home (Hero + Sections)
  globals.css       stili globali
  fonts/            font .ttf self-hosted
components/
  Hero.tsx          hero scroll-driven (engine desktop + mobile)
  Sections.tsx      sezioni contenuto con reveal-on-scroll
lib/
  hero-data.ts      sequenza immagini, fasi testo, servizi (tipizzato)
  useDeviceMode.ts  hook rilevamento device + helper math
public/hero/        immagini hero (desktop 16:9 + mobile 9:16)
```

## Due esperienze
- **Desktop**: parallasse 3D completa (perspective, rotateY, blur focale, mouse-parallax, ornamenti animati).
- **Mobile**: engine snello (solo opacity + transform), immagini verticali leggere, hero più corto.
Selezione automatica via `useDeviceMode` (schermo ≤820px o pointer touch → mobile; prefers-reduced-motion → statico).

## Sequenza scroll
empty (fondo) → outro → centrale → focus → intro (cima).
Scrollando: gli strati superiori svaniscono rivelando i sottostanti, mentre i testi
entrano a fasi (data → motto → titolo → citazione).

## Personalizzazione contenuti
- Testi e servizi: `lib/hero-data.ts` e `components/Sections.tsx`
- Timing animazioni: array `PHASES` e campi `fade` in `lib/hero-data.ts`
- Colori/tipografia: variabili CSS in cima a `app/globals.css`
