// Sequenza dei layer dell'hero, dal fondo (z basso) alla cima (z alto).
// L'ultimo dell'array e' il primo visibile e svanisce per primo durante lo scroll.

export interface HeroLayer {
  id: string;
  desktop: string;
  mobile: string;
  alt: string;
  /** finestra di dissolvenza in progress 0..1; assente = resta sempre visibile (fondo) */
  fade?: { start: number; end: number };
}

export const HERO_LAYERS: HeroLayer[] = [
  {
    id: "empty",
    desktop: "/hero/hero-empty-desktop.webp",
    mobile: "/hero/hero-empty-mobile.webp",
    alt: "",
  },
  {
    id: "outro",
    desktop: "/hero/hero-04-outro-desktop.webp",
    mobile: "/hero/hero-04-outro-mobile.webp",
    alt: "Leonardo da Vinci",
    fade: { start: 0.66, end: 0.88 },
  },
  {
    id: "centrale",
    desktop: "/hero/hero-03-centrale-desktop.webp",
    mobile: "/hero/hero-03-centrale-mobile.webp",
    alt: "Leonardo da Vinci",
    fade: { start: 0.46, end: 0.68 },
  },
  {
    id: "focus",
    desktop: "/hero/hero-02-focus-desktop.webp",
    mobile: "/hero/hero-02-focus-mobile.webp",
    alt: "Leonardo da Vinci",
    fade: { start: 0.26, end: 0.48 },
  },
  {
    id: "intro",
    desktop: "/hero/hero-01-intro-desktop.webp",
    mobile: "/hero/hero-01-intro-mobile.webp",
    alt: "Leonardo da Vinci",
    fade: { start: 0.05, end: 0.28 },
  },
];

export interface Phase {
  in: number;
  full: number;
  out: number;
  end: number;
}

// Fasi testo HUD, sincronizzate con le dissolvenze
export const PHASES: Phase[] = [
  { in: 0.02, full: 0.10, out: 0.20, end: 0.26 }, // data
  { in: 0.18, full: 0.30, out: 0.44, end: 0.50 }, // motto
  { in: 0.44, full: 0.58, out: 0.74, end: 0.80 }, // titolo
  { in: 0.80, full: 0.92, out: 1.10, end: 1.20 }, // citazione
];

export const SERVICES = [
  { num: "I", title: "Direzione Lavori" },
  { num: "II", title: "Valutazioni & Perizie" },
  { num: "III", title: "Rilievi GNSS RTK" },
  { num: "IV", title: "Urbanistica" },
  { num: "V", title: "Sviluppo Immobiliare" },
  { num: "VI", title: "Pratiche Edilizie" },
] as const;
