// Contenuti reali dello Studio Tecnico Lombardo

export const SITE = {
  name: "Studio Lombardo",
  legalName: "Studio Tecnico Lombardo",
  email: "info@studiotecnicolombardo.com",
  url: "https://www.studiotecnicolombardo.com",
  whatsapp: "+393492727574",
};

export const NAV = [
  { label: "Chi siamo", href: "#chi-siamo" },
  { label: "Servizi", href: "#servizi" },
  { label: "Per chi", href: "#per-chi" },
  { label: "Contatti", href: "#contatti" },
];

export const HERO = {
  eyebrow: "Studio Tecnico Lombardo · dal 2014",
  title: "Progettiamo, costruiamo e valorizziamo i tuoi immobili.",
  subtitle:
    "Un unico referente tecnico per privati, imprese e investitori. Un percorso chiaro, ordinato e affidabile — dalla prima idea alla consegna.",
  ctaPrimary: { label: "Richiedi consulenza", href: "#contatti" },
  ctaSecondary: { label: "Scopri i servizi", href: "#servizi" },
};

export const ABOUT = {
  eyebrow: "Chi Siamo",
  title: "Un percorso chiaro,",
  titleItalic: "ordinato e affidabile",
  paragraphs: [
    "Lo Studio nasce nel 2014, come naturale evoluzione di un percorso formativo completo e di un'esperienza decennale maturata tra progettazione, cantiere e gestione tecnica.",
    "Abbiamo scelto di creare una realtà indipendente, capace di rispondere in modo concreto alle esigenze tecniche, urbanistiche ed operative poste ogni giorno da privati, imprese e investitori.",
  ],
  quote:
    "Il nostro obiettivo è garantire un percorso chiaro, ordinato e affidabile, eliminando incertezza, dispersioni e improvvisazione.",
};

export const STATS = [
  { value: "150", suffix: "+", label: "Progetti svolti" },
  { value: "10", suffix: "+", label: "Anni di esperienza" },
  { value: "100", suffix: "%", label: "Affidabilità" },
  { value: "30", suffix: "+", label: "Comuni serviti" },
];

export interface Service {
  num: string;
  title: string;
  desc: string;
}

export const SERVICES: Service[] = [
  { num: "I", title: "Progettazione", desc: "Dallo studio di fattibilità al design d'interni, trasformiamo la tua idea in un progetto esecutivo completo e funzionale." },
  { num: "II", title: "Direzione Lavori", desc: "Supervisione tecnica rigorosa in cantiere per garantire qualità esecutiva, rispetto dei tempi e controllo dei costi." },
  { num: "III", title: "Pratiche Edilizie", desc: "Gestione completa di CILA, SCIA, PdC e sanatorie. Dialoghiamo noi con la Pubblica Amministrazione per te." },
  { num: "IV", title: "Perizie e Stime", desc: "Valutazioni immobiliari asseverate e consulenze tecniche di parte (CTP) per privati e tribunali." },
  { num: "V", title: "Successioni", desc: "Assistenza completa per dichiarazioni di successione ereditaria, riunioni di usufrutto e volture catastali." },
  { num: "VI", title: "Rilievi Topografici", desc: "Misure di precisione con strumentazione GNSS RTK e Stazione Totale per confini, frazionamenti e inserimenti in mappa." },
  { num: "VII", title: "APE & Energia", desc: "Redazione Certificati Energetici (APE) e consulenza per la riqualificazione e l'efficientamento degli edifici." },
  { num: "VIII", title: "Sicurezza Cantieri", desc: "Coordinamento della sicurezza (CSP/CSE) e redazione PSC/POS per lavorare senza rischi e in regola." },
  { num: "IX", title: "Analisi Economiche", desc: "Business plan, computi metrici e studi di fattibilità per massimizzare il rendimento dei tuoi investimenti." },
];

export const TARGETS = [
  { title: "Privati", desc: "La casa dei tuoi sogni, senza pensieri. Ci occupiamo di tutto: dai permessi alla progettazione, fino alla chiusura dei lavori." },
  { title: "Imprese", desc: "Supporto tecnico costante per i tuoi cantieri. Gestione della sicurezza e contabilità lavori per farti concentrare sul costruire." },
  { title: "Investitori", desc: "Massimizza il rendimento delle tue operazioni immobiliari con analisi di fattibilità precise e tempi certi." },
];

export const TEAM = [
  {
    name: "Geom. Marco Lombardo",
    role: "Progettazione, Gestione & DL",
    desc: "Dal 2008 in attività professionale, gestisce progettazione, direzione lavori, sicurezza, coordinamento tecnico e analisi operative.",
    skills: ["Direzione lavori", "Coordinamento tecnico", "Due diligence e analisi tecniche"],
  },
  {
    name: "Geom. Jessica Lombardo",
    role: "Pratiche Edilizie & Catasto",
    desc: "In attività dal 2017, segue pratiche edilizie e urbanistiche, aggiornamenti catastali, computi metrici, gestione documentale e rapporti operativi.",
    skills: ["Pratiche edilizie e urbanistiche", "Catasto (DOCFA, PREGEO)", "Computi e quadri economici"],
  },
];

export const APE = {
  eyebrow: "Energy Upgrade",
  title: "APE &",
  titleItalic: "Efficienza",
  intro:
    "Non un semplice certificato, ma una strategia di valorizzazione. Analizziamo lo stato di fatto e progettiamo il salto di qualità energetica del tuo immobile.",
  steps: [
    { title: "Diagnosi", desc: "Analisi dispersioni e impianti esistenti." },
    { title: "Legge 10", desc: "Progettazione isolamenti e nuovi impianti." },
  ],
  classes: ["G", "F", "E", "D", "C", "B", "A4"],
  benefits: ["+ Valore", "− Sprechi", "+ Comfort"],
};

export const CONTACT = {
  address: ["Via S. Antonio n. 5", "22070 — Locate Varesino (CO)"],
  phones: [
    { label: "0331 363564", href: "tel:+390331363564" },
    { label: "+39 349 2727574", href: "tel:+393492727574" },
  ],
  studio: [
    "Iscrizione Albo Geometri Provincia di Como n. 2793",
    "P.IVA 03090650130",
    "C.F. LMBMRC86A13L319I",
    "Titolare: Geom. Marco Lombardo",
  ],
};
