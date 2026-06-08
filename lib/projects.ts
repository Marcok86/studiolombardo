// Progetti / render dello Studio. Onesti: sono render di progetto,
// non foto del realizzato. Luogo/anno da confermare dove generico.

export interface Project {
  slug: string;
  title: string;
  category: "Ville" | "Residenziale" | "Interni";
  place: string;
  year?: string;
  tag: string;
  summary: string;
  details: string[];
  cover: string;
  images: string[];
}

export const PROJECT_CATEGORIES = ["Tutti", "Ville", "Residenziale", "Interni"] as const;

const img = (slug: string, file: string) => `/progetti/${slug}/${file}`;

export const PROJECTS: Project[] = [
  {
    slug: "villa-pietra",
    title: "Villa in pietra con piscina",
    category: "Ville",
    place: "Provincia di Como",
    tag: "Render di progetto",
    summary:
      "Nuova costruzione unifamiliare con rivestimento in pietra, ampio portico e piscina inserita nel terreno collinare.",
    details: [
      "Progettazione architettonica e definizione volumetrica.",
      "Studio degli esterni: piscina, pavimentazioni e illuminazione del giardino.",
      "Restituzione 3D per la valutazione delle scelte prima del cantiere.",
    ],
    cover: img("villa-pietra", "cover.webp"),
    images: [
      img("villa-pietra", "cover.webp"),
      img("villa-pietra", "01.webp"),
      img("villa-pietra", "02.webp"),
    ],
  },
  {
    slug: "villa-mozzate",
    title: "Villa unifamiliare",
    category: "Ville",
    place: "Mozzate (CO)",
    tag: "Render di progetto",
    summary:
      "Villa a un piano con copertura piana, grandi vetrate e ampio giardino, pensata per la vita all'aperto.",
    details: [
      "Progetto architettonico e studio degli affacci sul verde.",
      "Definizione di materiali, serramenti e schermature.",
      "Render per la condivisione delle scelte con la committenza.",
    ],
    cover: img("villa-mozzate", "cover.webp"),
    images: [img("villa-mozzate", "cover.webp"), img("villa-mozzate", "01.webp")],
  },
  {
    slug: "palazzina",
    title: "Palazzina residenziale",
    category: "Residenziale",
    place: "Provincia di Como",
    tag: "Render di progetto",
    summary:
      "Edificio residenziale plurifamiliare con terrazzi, portici e spazi verdi comuni; studio d'insieme e di dettaglio.",
    details: [
      "Progettazione dell'edificio e degli spazi esterni comuni.",
      "Studio dei prospetti, dei terrazzi e delle aree a verde.",
      "Vista d'insieme (drone) e dettagli a livello terra.",
    ],
    cover: img("palazzina", "cover.webp"),
    images: [
      img("palazzina", "cover.webp"),
      img("palazzina", "01.webp"),
      img("palazzina", "02.webp"),
      img("palazzina", "03.webp"),
      img("palazzina", "04.webp"),
    ],
  },
  {
    slug: "appartamento",
    title: "Appartamento — interni",
    category: "Interni",
    place: "Provincia di Como",
    tag: "Render di progetto",
    summary:
      "Distribuzione e finiture di un appartamento: zona giorno, camera matrimoniale e cameretta, in chiave contemporanea.",
    details: [
      "Studio distributivo e progetto degli interni.",
      "Scelta di materiali, arredi e illuminazione.",
      "Render ambiente per ambiente per valutare le finiture.",
    ],
    cover: img("appartamento", "cover.webp"),
    images: [
      img("appartamento", "cover.webp"),
      img("appartamento", "01.webp"),
      img("appartamento", "02.webp"),
    ],
  },
];
