# Hero — Fix UX: reduced-motion gating + verifica contrasto

**Data:** 2026-06-08
**Componente:** `components/Hero.tsx` (+ eventuale `app/globals.css`)
**Origine:** review UI/UX con la skill `ui-ux-pro-max` sul redesign nero&oro.
**Scope:** ristretto. Due fix indipendenti sull'Hero, nessuna modifica strutturale.

---

## Contesto

L'Hero del redesign Studio Lombardo (dark editoriale, nero&oro) usa `motion/react`
per: animazioni d'entrata (stagger), parallax legato allo scroll e parallax legato
al puntatore, più una scena 3D (`Hero3D`). La review ha rilevato due problemi:

1. **`prefers-reduced-motion` gestito solo in parte.** Oggi `reduce` disattiva il
   solo parallax-mouse (`onMove` esce in anticipo). Restano attivi: le animazioni
   d'entrata con traslazione `y`, il parallax-scroll (`bgY`, `bgScale`, `contentY`)
   e i wrapper di tilt. Chi richiede meno movimento vede comunque traslazioni e
   parallax.
2. **Contrasto testo sull'immagine** — sospetto in review, **in gran parte già
   risolto** dallo scrim esistente (vedi sotto). Resta da *verificare* il caso
   peggiore di `hero__desc`.

### Stato attuale rilevante (verificato nel codice)

- `globals.css:434-446` — lo scrim **esiste già**: immagine di sfondo a
  `opacity:0.38`; `.hero__bg::after` con doppio gradiente (verticale
  `rgba(10,12,15,0.55)→0.82→--bg`, orizzontale `--bg→0.35→transparent`).
- Il testo sta nella **colonna sinistra** (`.hero__inner` a 2 colonne,
  `globals.css:481-482`), cioè dove il gradiente orizzontale è più scuro.
- Token colore: `--bg #0a0c0f`, `--ink #ece9e2`, `--ink-soft #a4a9b2`.
- Contrasti calcolati su `--bg` puro: `--ink` ≈ **16:1**, `--ink-soft` ≈ **8.3:1**
  (entrambi oltre la soglia AA 4.5:1).

---

## Fix #1 — Gating completo di `prefers-reduced-motion`

### Comportamento target

Con `reduce === true`: **le dissolvenze (opacity) restano**; **ogni traslazione,
scale, tilt e parallax viene azzerato**. Scelta utente: "fade sì, movimento no"
(l'opacity non innesca disturbi vestibolari ed è considerata accettabile sotto
reduced-motion).

Per gli utenti **senza** reduced-motion: comportamento identico a oggi, zero
regressioni.

### Approccio: helper + style-object gated (approccio "B")

Il parallax è guidato da MotionValues applicate come `style` inline: un
`@media (prefers-reduced-motion)` in CSS **non basta** (non sovrascrive i transform
inline). La gestione è quindi in JS, centralizzata in `Hero.tsx`.

**Unità 1 — Helper `rise(delay, dy?)`**
Funzione locale che produce le props d'entrata, unica fonte di verità della regola
reduce:

- `reduce` → `{ initial:{opacity:0}, animate:{opacity:1}, transition:{duration:0.6, delay} }`
- normale → `{ initial:{opacity:0, y:dy}, animate:{opacity:1, y:0}, transition:{duration:0.8, ease:[0.16,1,0.3,1], delay} }`

Sostituisce gli ~8-9 blocchi `initial/animate/transition` ripetuti: eyebrow,
titleLead, titleRest, sub, desc, tags, motto, actions, proof. I `delay` correnti
(0.05 → 0.7) e i `dy` correnti (14/24/18/16/12) diventano argomenti.
Per `tags` e `proof` (oggi solo fade `opacity`, senza `y`) `rise` si usa con
`dy = 0` o si lascia il fade semplice: comportamento invariato in entrambi i casi.

**Unità 2 — Style del parallax-scroll, calcolati una volta come oggetti gated**

- `heroBgStyle = reduce ? {} : { y: bgY, scale: bgScale }`
- `heroContentStyle = reduce ? { opacity: contentOpacity } : { y: contentY, opacity: contentOpacity }`

`contentOpacity` (fade-out su scroll) **si mantiene sempre**: è una dissolvenza,
coerente con "fade sì". `bgY`, `bgScale`, `contentY` (movimento) cadono con reduce.

**Unità 3 — Wrapper di tilt/mouse**
Il parallax-mouse è già di fatto neutralizzato (`onMove` esce se `reduce` ⇒
`mx/my = 0` ⇒ transform a zero). Quando `reduce`, si rimuove anche il wrapper
`rotateX/rotateY/x/y` (o lo si rende statico) per non lasciare un `transform`
inerte. Diff minimo.

### Cosa NON cambia

Struttura JSX, classi CSS, contenuti, scena `Hero3D`, e l'esperienza per chi non
ha reduced-motion.

### Criterio di successo

Con `prefers-reduced-motion: reduce` attivo: nessuna traslazione/scale/tilt/parallax
osservabile; le sole transizioni rimaste sono di opacity. `tsc --noEmit` = 0 errori.

---

## Fix #2 — Verifica del contrasto (misurata, non a priori)

Non si progetta una modifica a priori: si progetta una **verifica misurata**; la
modifica è **condizionale** all'esito.

### Procedura

1. **Avvio dev server**: `npm run dev` (porta 3000, in background). Apertura
   dell'Hero nel browser con `new_page` su `http://localhost:3000`
   (`navigate_page` lascia la pagina vuota: React non idrata — nota di progetto).
2. **Misura puntuale** del contrasto effettivo di `hero__desc` (`--ink-soft`) nel
   **punto peggiore**: bordo destro/basso della colonna testo, dove lo scrim
   orizzontale è più sottile e l'immagine `arch-dark.png` più chiara. Si campiona
   il colore di sfondo renderizzato in quel punto e si calcola il rapporto reale
   contro `#a4a9b2`.
3. **Decisione condizionata:**
   - **≥ 4.5:1** → nessuna modifica; esito confermato con il valore numerico.
     (Esito atteso, visti gli ~8.3:1 su bg puro.)
   - **< 4.5:1** → fix **locale all'hero**, mai sul token globale `--ink-soft`:
     - preferito: estendere lo stop scuro del gradiente orizzontale in
       `.hero__bg::after` (es. `0.35` → ~`0.5` al 55%), coprendo la zona del testo
       senza toccare i colori;
     - alternativa: `.hero__desc { color: #b4b9c2 }` solo nell'hero.

### Dipendenze e fallback

Richiede dev server + browser MCP attivi. Se il browser MCP è disconnesso (già
accaduto in sessioni passate), fallback a screenshot headless via
`node .shots/…` (puppeteer-core, `--enable-unsafe-swiftshader` per WebGL) e
campionamento del pixel dallo screenshot.

### Criterio di successo

`hero__desc` ≥ 4.5:1 nel punto peggiore **misurato**, senza alterare token globali
né l'estetica nero&oro.

---

## Fuori scope (YAGNI)

- Nessun refactor di altri componenti o del sistema di animazione globale.
- Nessuna modifica ai token colore globali.
- Nessun intervento su `Hero3D` oltre l'eventuale rispetto di reduced-motion già
  presente.
- Nessun deploy/hosting (non configurato; fuori tema).

## Ordine di esecuzione

Fix #1 (puramente in `Hero.tsx`) e Fix #2 (verifica + eventuale CSS) sono
indipendenti e possono procedere in qualunque ordine. Suggerito: #1 prima
(deterministico, no dipendenze esterne), poi #2 (richiede browser/dev server).
