// Contenuti reali dello Studio Tecnico Lombardo
// Strategia: "Ordine tecnico" — fiducia e metodo prima della prestazione.
// Tono: professionale, diretto, sicuro, concreto, cautelativo. Mai da agenzia.

export const SITE = {
  name: "Studio Lombardo",
  legalName: "Studio Tecnico Lombardo",
  positioning: "Ordine tecnico per pratiche edilizie, cantieri e immobili.",
  email: "info@studiotecnicolombardo.com",
  url: "https://www.studiotecnicolombardo.com",
  whatsapp: "+393492727574",
};

export const NAV = [
  // "Criticità": più elegante di "Il problema" come voce di menu
  { label: "Criticità", href: "#problema" },
  { label: "Metodo", href: "#metodo" },
  { label: "Aree tecniche", href: "#servizi" },
  { label: "Progetti", href: "#progetti" },
  { label: "Per chi", href: "#per-chi" },
  { label: "Studio", href: "#studio" },
  { label: "Contatti", href: "#contatti" },
];

export const HERO = {
  eyebrow: "Studio Tecnico Lombardo",
  // headline: bianco + parola-accento ("ordine")
  titleLead: "Ordine tecnico",
  titleRest: "per pratiche edilizie, cantieri e immobili.",
  // sub-headline forte (cosa garantisco)
  sub: "Dalla verifica iniziale alla gestione dell'intervento, con metodo, documenti e responsabilità chiare.",
  // descrizione operativa, più breve e incisiva
  desc: "Affianco privati, imprese e amministratori nella gestione tecnica di pratiche edilizie, cantieri, sicurezza e rilievi topografici, con un metodo chiaro, documentato e verificabile.",
  // frase identitaria
  motto: "Prima si verifica. Poi si decide. Poi si interviene.",
  // tag operativi in overlay
  tags: ["verifica", "pratica", "cantiere", "rilievo", "sicurezza"],
  ctaPrimary: { label: "Richiedi una consulenza tecnica", href: "#contatti" },
  ctaSecondary: { label: "Scopri le aree tecniche", href: "#servizi" },
  // micro-prove sotto la hero
  proof: [
    "Iscritto all'Albo dei Geometri di Como",
    "Esperienza in pratiche edilizie, progettazione e cantiere",
    "Approccio tecnico, documentale e cautelativo",
  ],
};

// Cinque principi-identità (banda editoriale)
export const PRINCIPLES = [
  "Ordine nei documenti",
  "Chiarezza nelle pratiche",
  "Controllo in cantiere",
  "Metodo nelle decisioni",
  "Responsabilità documentata",
];

// 2 — Sezione problema: far sentire l'utente "capito"
export const PROBLEM = {
  eyebrow: "Perché serve metodo",
  title: "Quando manca una guida tecnica, il rischio aumenta.",
  lead:
    "Un intervento edilizio non è fatto solo di lavori. Prima, durante e dopo servono verifiche, documenti, ruoli chiari e decisioni corrette.",
  items: [
    {
      icon: "layers",
      title: "Documenti incompleti",
      desc: "Planimetrie, pratiche precedenti, stato di fatto e dati catastali non sempre coincidono. Prima di procedere serve una verifica tecnica.",
    },
    {
      icon: "docs",
      title: "Pratiche impostate male",
      desc: "Una procedura edilizia errata può generare ritardi, richieste integrative, costi aggiuntivi o responsabilità evitabili.",
    },
    {
      icon: "site",
      title: "Cantiere senza controllo",
      desc: "Impresa, committente e tecnico devono operare con ruoli chiari, passaggi documentati e verifiche puntuali.",
    },
    {
      icon: "shield",
      title: "Responsabilità poco definite",
      desc: "Ogni intervento comporta obblighi tecnici, amministrativi e documentali che devono essere gestiti con attenzione.",
    },
  ],
};

// 3 — Metodo: perché sei affidabile (più del portfolio)
export const METHOD = {
  eyebrow: "Il metodo",
  title: "Il mio metodo: verificare, impostare, gestire, documentare.",
  lead:
    "Lo stesso percorso ordinato dietro ogni incarico: tracciabile, prevedibile, documentato. Non lavoro a sensazione, ma con procedura.",
  steps: [
    {
      num: "01",
      title: "Analisi iniziale",
      desc: "Inquadro il caso, raccolgo le informazioni e individuo le criticità tecniche da verificare.",
    },
    {
      num: "02",
      title: "Verifica documentale",
      desc: "Controllo stato di fatto, atti disponibili, pratiche edilizie, catasto e condizioni operative.",
    },
    {
      num: "03",
      title: "Strategia tecnica",
      desc: "Definisco il percorso più corretto in base all'obiettivo: pratica, progetto, cantiere, rilievo o consulenza.",
    },
    {
      num: "04",
      title: "Gestione e chiusura",
      desc: "Coordino le attività, documento i passaggi e accompagno l'incarico fino alla conclusione.",
    },
  ],
};

export interface Service {
  num: string;
  title: string;
  desc: string;
}

// 4 — Aree di intervento (dopo problema e metodo). Testo sobrio.
export const SERVICES_INTRO = {
  eyebrow: "Aree di intervento tecnico",
  title: "Soluzioni tecniche per immobili, pratiche e cantieri.",
  lead:
    "Un unico riferimento tecnico per analizzare, impostare, seguire e documentare ogni fase dell'intervento.",
};

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Pratiche edilizie e urbanistiche",
    desc: "Gestione di CILA, SCIA, permessi, sanatorie, verifiche preliminari e rapporti con gli enti.",
  },
  {
    num: "02",
    title: "Progettazione edilizia",
    desc: "Soluzioni tecniche per interventi residenziali, ristrutturazioni, modifiche distributive e opere edilizie.",
  },
  {
    num: "03",
    title: "Direzione lavori",
    desc: "Controllo tecnico dell'esecuzione, coordinamento operativo e verifica della corretta realizzazione delle opere.",
  },
  {
    num: "04",
    title: "Sicurezza cantieri",
    desc: "Coordinamento della sicurezza in progettazione ed esecuzione (CSP/CSE), con attenzione agli obblighi documentali.",
  },
  {
    num: "05",
    title: "Rilievi topografici GNSS/RTK",
    desc: "Rilievi plano-altimetrici, restituzioni grafiche, tracciamenti, verifiche e supporto tecnico al progetto.",
  },
  {
    num: "06",
    title: "Consulenze tecniche immobiliari",
    desc: "Analisi di situazioni edilizie, catastali, condominiali o documentali prima di acquistare, vendere o intervenire.",
  },
  {
    num: "07",
    title: "Computi e contabilità lavori",
    desc: "Computi metrici, quadri economici e contabilità di cantiere per tenere costi e avanzamento sotto controllo.",
  },
  {
    num: "08",
    title: "Supporto tecnico continuativo",
    desc: "Un riferimento tecnico stabile per imprese e proprietà che devono decidere, costruire o regolarizzare nel tempo.",
  },
];

// 5 — Per chi: il visitatore deve riconoscersi
export const AUDIENCE = {
  eyebrow: "Per chi lavoro",
  title: "Un supporto tecnico per chi deve decidere, costruire o regolarizzare.",
  items: [
    {
      title: "Privati",
      desc: "Per chi deve ristrutturare, modificare un immobile, verificare una situazione edilizia o affrontare una pratica.",
    },
    {
      title: "Imprese",
      desc: "Per supporto tecnico in cantiere, rilievo, computazione, gestione documentale e coordinamento operativo.",
    },
    {
      title: "Amministratori",
      desc: "Per valutazioni tecniche, interventi su parti comuni e problematiche edilizie nella gestione degli immobili.",
    },
    {
      title: "Proprietà immobiliari",
      desc: "Per due diligence tecniche, verifiche documentali e supporto nelle decisioni su patrimoni e operazioni.",
    },
  ],
};

// 6 — Profilo: confermare fiducia, senza autocelebrarsi.
// Studio reale a due: Marco (titolare) + Jessica.
export const PROFILE = {
  eyebrow: "Lo studio",
  name: "Studio Tecnico Lombardo",
  lead: "Geometri liberi professionisti — gestione tecnica degli interventi edilizi.",
  paragraphs: [
    "Ci occupiamo della gestione tecnica degli interventi edilizi con un approccio pratico, documentato e orientato alla corretta esecuzione delle opere.",
    "Seguiamo privati, imprese e amministratori nella gestione di pratiche, cantieri, rilievi e consulenze tecniche, con attenzione alla chiarezza dei passaggi e alla tutela delle responsabilità.",
  ],
  trust: [
    "Iscrizione all'Albo dei Geometri di Como (n. 2793)",
    "Esperienza in progettazione e direzione lavori",
    "Gestione pratiche edilizie e cantieri",
    "Coordinamento della sicurezza",
    "Rilievi topografici professionali GNSS/RTK",
    "Approccio tecnico, documentale e cautelativo",
  ],
  people: [
    {
      name: "Geom. Marco Lombardo",
      role: "Titolare · Progettazione, Direzione Lavori e Sicurezza",
      desc: "Coordina progettazione, direzione lavori, sicurezza e analisi tecniche, con attenzione alla corretta esecuzione e alla documentazione delle decisioni.",
    },
    {
      name: "Geom. Jessica Lombardo",
      role: "Pratiche Edilizie e Catasto",
      desc: "Segue pratiche edilizie e urbanistiche, aggiornamenti catastali (DOCFA, PREGEO), computi metrici e gestione documentale.",
    },
  ],
};

// 7 — Prova / credibilità
export const STATS = [
  { value: "150", suffix: "+", label: "Incarichi seguiti" },
  { value: "10", suffix: "+", label: "Anni tra progetto e cantiere" },
  { value: "30", suffix: "+", label: "Comuni serviti" },
  { value: "100", suffix: "%", label: "Approccio documentato" },
];

// 8 — CTA finale: abbassa la barriera (confronto, non acquisto)
export const FINAL_CTA = {
  eyebrow: "Parliamone",
  title: "Hai una situazione edilizia da chiarire?",
  text:
    "Descrivi brevemente la situazione: ti aiuterò a capire quali verifiche servono, quali documenti raccogliere e quale percorso tecnico seguire.",
  cta: { label: "Richiedi una consulenza tecnica", href: "#contatti" },
  motto: "Prima si verifica. Poi si decide.",
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
