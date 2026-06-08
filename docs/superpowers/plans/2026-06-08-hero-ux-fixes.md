# Hero UX Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendere l'Hero del redesign pienamente conforme a `prefers-reduced-motion` (fade sì, movimento no) e verificare/garantire il contrasto AA del testo descrittivo sull'immagine.

**Architecture:** Due fix indipendenti. Fix #1 è puramente in `components/Hero.tsx`: si centralizza la regola reduced-motion in un helper `rise()` per le animazioni d'entrata e in oggetti-stile condizionati per il parallax (approccio "B"). Fix #2 è una verifica *misurata* via screenshot headless (puppeteer-core + sharp) con eventuale ritocco locale dello scrim in `app/globals.css`, mai dei token globali.

**Tech Stack:** Next.js 16, React 19, `motion` v12 (MotionValues + `useReducedMotion`), CSS puro, TypeScript 5.7 (`npx tsc --noEmit` come gate), puppeteer-core 25 + sharp per la misura headless.

---

## File Structure

- **Modify** `components/Hero.tsx` — aggiunge l'helper `rise()`, gli oggetti-stile gated (`heroBgStyle`, `heroContentStyle`, `heroTiltStyle`) e li applica al JSX. Unica responsabilità: il markup/animazione dell'Hero. Nessun nuovo file.
- **Create** `.shots/hero-contrast.mjs` — script headless monouso: misura la luminanza dello sfondo dietro `.hero__desc` e stampa il rapporto di contrasto contro `--ink-soft`. Vive in `.shots/` accanto agli altri script headless del progetto.
- **Modify (condizionale)** `app/globals.css:440-446` — solo se la misura risulta < 4.5:1: si scurisce lo stop del gradiente orizzontale in `.hero__bg::after`. Nessuna modifica ai token in `:root`.

Nessun test runner nel progetto: la verifica è `npx tsc --noEmit` (Fix #1) e l'output numerico dello script di misura (Fix #2).

---

## Task 1: Gating completo di `prefers-reduced-motion` in Hero.tsx

**Files:**
- Modify: `components/Hero.tsx` (dichiarazioni dopo le MotionValues; `style` su `hero__bg`/`hero__content`/wrapper tilt; 7 blocchi `initial/animate/transition`)

**Comportamento target:** con `reduce === true` restano solo le dissolvenze (opacity); spariscono traslazioni, scale, tilt e parallax. Con reduced-motion **off**: comportamento identico a oggi.

- [ ] **Step 1: Baseline type-check (deve partire pulito)**

Run: `cd C:\CLAUDE.AI\studiolombardo; npx tsc --noEmit`
Expected: nessun output, exit 0 (nessun errore preesistente).

- [ ] **Step 2: Aggiungere helper `rise()` e oggetti-stile gated**

In `components/Hero.tsx`, subito **dopo** le dichiarazioni delle MotionValues del puntatore (dopo la riga `const rotY = useTransform(smx, [-0.5, 0.5], [-2.6, 2.6]);`) e **prima** di `function onMove(...)`, inserire:

```tsx
  // --- gating reduced-motion: fade sì, movimento no ---
  // Props d'entrata: con reduce solo opacity, altrimenti slide-up con easing.
  const rise = (delay: number, dy = 24) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay } }
      : {
          initial: { opacity: 0, y: dy },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
        };

  // Parallax-scroll: il fade (contentOpacity) resta sempre; il movimento cade con reduce.
  const heroBgStyle = reduce ? {} : { y: bgY, scale: bgScale };
  const heroContentStyle = reduce
    ? { opacity: contentOpacity }
    : { y: contentY, opacity: contentOpacity };

  // Wrapper tilt del puntatore: nessun transform sotto reduce.
  const heroTiltStyle = reduce
    ? {}
    : { x: cMX, y: cMY, rotateX: rotX, rotateY: rotY, transformPerspective: 1200 };
```

- [ ] **Step 3: Applicare gli oggetti-stile al JSX**

In `components/Hero.tsx`, sostituire le tre aperture di `motion.div`:

Da:
```tsx
      <motion.div className="hero__bg" style={{ y: bgY, scale: bgScale }}>
```
A:
```tsx
      <motion.div className="hero__bg" style={heroBgStyle}>
```

Da:
```tsx
        <motion.div
          className="hero__content"
          style={{ y: contentY, opacity: contentOpacity }}
        >
```
A:
```tsx
        <motion.div className="hero__content" style={heroContentStyle}>
```

Da:
```tsx
          <motion.div
            style={{ x: cMX, y: cMY, rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
          >
```
A:
```tsx
          <motion.div style={heroTiltStyle}>
```

- [ ] **Step 4: Sostituire i 7 blocchi d'entrata con `rise()`**

In `components/Hero.tsx`, sostituire i prop `initial`/`animate`/`transition` di ciascun elemento con lo spread di `rise()`. Lasciare invariati `className`, contenuti e tutto il resto.

Eyebrow — da `initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}` a:
```tsx
            <motion.p className="eyebrow hero__eyebrow" {...rise(0, 14)}>
              {HERO.eyebrow}
            </motion.p>
```

Titolo, prima riga (`lead-word`) — da `delay: 0.05`:
```tsx
              <motion.span className="lead-word" {...rise(0.05, 24)}>
                {HERO.titleLead}
              </motion.span>
```

Titolo, seconda riga — da `delay: 0.14`, mantenendo `display:block`:
```tsx
              <motion.span style={{ display: "block" }} {...rise(0.14, 24)}>
                {HERO.titleRest}
              </motion.span>
```

Sub — da `delay: 0.24`:
```tsx
            <motion.p className="hero__sub" {...rise(0.24, 18)}>
              {HERO.sub}
            </motion.p>
```

Desc — da `delay: 0.32`:
```tsx
            <motion.p className="hero__desc" {...rise(0.32, 16)}>
              {HERO.desc}
            </motion.p>
```

Motto — da `delay: 0.5`:
```tsx
            <motion.p className="hero__motto" {...rise(0.5, 12)}>
              {HERO.motto}
            </motion.p>
```

Actions — da `delay: 0.58` (mantenere `className` e i figli `MagneticButton`/`<a>` invariati):
```tsx
            <motion.div className="hero__actions" {...rise(0.58, 18)}>
```
(chiusura `</motion.div>` e contenuto interno restano identici)

**NON toccare** `hero__tags` (riga ~138) né `hero__proof` (riga ~181): sono già animazioni solo-opacity, quindi già sicure sotto reduced-motion. Lasciarle esattamente com'è minimizza il diff.

- [ ] **Step 5: Type-check**

Run: `cd C:\CLAUDE.AI\studiolombardo; npx tsc --noEmit`
Expected: nessun output, exit 0. (Se compare un errore sul tipo di `ease`, verificare che il cast sia esattamente `as [number, number, number, number]`.)

- [ ] **Step 6: Verifica comportamentale reduced-motion (headless)**

Avviare il dev server in background: `cd C:\CLAUDE.AI\studiolombardo; npm run dev` (porta 3000; usare il tool PowerShell con `run_in_background: true`).

Aprire la pagina **con reduced-motion emulato** e osservare l'Hero. Opzione A (chrome-devtools MCP): `new_page` su `http://localhost:3000`, poi `emulate` con `prefers-reduced-motion: reduce`, poi `take_screenshot` e ispezione: il contenuto deve apparire senza slide; nessun parallax al variare dello scroll.
Opzione B (fallback se MCP disconnesso): aggiungere temporaneamente a `app/globals.css` la query `@media (prefers-reduced-motion: reduce) { * { } }` non serve — invece lanciare Chrome headless forzando la preferenza:
```bash
node -e "(async()=>{const p=await import('puppeteer-core');const b=await p.default.launch({executablePath:process.env.CHROME||'C\\:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',args:['--force-prefers-reduced-motion','--enable-unsafe-swiftshader']});const pg=await b.newPage();await pg.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await pg.goto('http://localhost:3000',{waitUntil:'networkidle0'});await pg.screenshot({path:'.shots/hero-reduced.png'});await b.close();})()"
```
Expected: `.shots/hero-reduced.png` mostra l'Hero leggibile, testo in posizione finale, nessun artefatto di transform.

- [ ] **Step 7: Commit**

```bash
cd C:\CLAUDE.AI\studiolombardo
git add components/Hero.tsx
git commit -m "fix(hero): gate all motion under prefers-reduced-motion (fade only)"
```

---

## Task 2: Verifica (e fix condizionale) del contrasto di `hero__desc`

**Files:**
- Create: `.shots/hero-contrast.mjs`
- Modify (condizionale): `app/globals.css:440-446`

**Esito atteso:** `--ink-soft` ≈ 8.3:1 su `--bg` puro, quindi probabilmente nessuna modifica. Il fix CSS scatta solo se la misura nel punto peggiore è < 4.5:1.

- [ ] **Step 1: Assicurarsi che `sharp` sia disponibile**

Run: `cd C:\CLAUDE.AI\studiolombardo; node -e "import('sharp').then(()=>console.log('OK')).catch(()=>{console.log('MISSING');process.exit(1)})"`
Expected: `OK`. Se stampa `MISSING`, installarlo: `npm i -D sharp` e ripetere il check fino a `OK`.

- [ ] **Step 2: Creare lo script di misura**

Create `.shots/hero-contrast.mjs`:

```js
// Misura il contrasto di .hero__desc (--ink-soft #a4a9b2) contro lo sfondo
// effettivo dietro al testo, nel punto peggiore (bordo destro/basso della colonna).
// Metodo: rende il testo trasparente (layout invariato), cattura il rettangolo di
// .hero__desc, media i canali con sharp e calcola il rapporto WCAG.
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const CHROME =
  process.env.CHROME || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = process.env.URL || "http://localhost:3000";

const toLin = (c) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const lum = (r, g, b) => 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
const ratio = (l1, l2) => {
  const a = Math.max(l1, l2);
  const b = Math.min(l1, l2);
  return (a + 0.05) / (b + 0.05);
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ["--enable-unsafe-swiftshader", "--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500)); // entrance settle

const box = await page.evaluate(() => {
  const el = document.querySelector(".hero__desc");
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
});
if (!box || box.w < 4 || box.h < 4) {
  console.error("hero__desc non trovato o fuori viewport:", box);
  await browser.close();
  process.exit(2);
}

// rende trasparenti le foglie testuali del contenuto, layout invariato
await page.evaluate(() => {
  document.querySelectorAll(".hero__content *").forEach((e) => {
    if (e.children.length === 0) e.style.color = "transparent";
  });
});

const buf = await page.screenshot({ clip: { x: box.x, y: box.y, width: box.w, height: box.h } });
const { channels } = await sharp(buf).stats();
const [r, g, b] = channels.map((c) => c.mean);
const bgL = lum(r, g, b);
const inkSoftL = lum(0xa4, 0xa9, 0xb2);
const cr = ratio(inkSoftL, bgL);

console.log(`sfondo medio dietro hero__desc: rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`);
console.log(`contrasto --ink-soft vs sfondo: ${cr.toFixed(2)}:1  (soglia AA 4.5:1)`);
console.log(cr >= 4.5 ? "PASS" : "FAIL");

await browser.close();
process.exit(cr >= 4.5 ? 0 : 1);
```

- [ ] **Step 3: Avviare il dev server (se non già attivo)**

Run (PowerShell, `run_in_background: true`): `cd C:\CLAUDE.AI\studiolombardo; npm run dev`
Attendere che compili (porta 3000 raggiungibile).

- [ ] **Step 4: Eseguire la misura**

Run: `cd C:\CLAUDE.AI\studiolombardo; node .shots/hero-contrast.mjs`
Expected: stampa il colore medio, il rapporto e `PASS` o `FAIL`.
- Se **PASS** → nessuna modifica CSS necessaria; saltare allo Step 7 (commit del solo script).
- Se **FAIL** → procedere allo Step 5.

- [ ] **Step 5: (Solo se FAIL) Scurire lo scrim orizzontale localmente**

In `app/globals.css`, nel blocco `.hero__bg::after` (righe ~440-446), sostituire il secondo gradiente.

Da:
```css
  background:
    linear-gradient(180deg, rgba(10, 12, 15, 0.55) 0%, rgba(10, 12, 15, 0.82) 60%, var(--bg) 100%),
    linear-gradient(90deg, var(--bg) 0%, rgba(10, 12, 15, 0.35) 55%, transparent 100%);
```
A:
```css
  background:
    linear-gradient(180deg, rgba(10, 12, 15, 0.55) 0%, rgba(10, 12, 15, 0.82) 60%, var(--bg) 100%),
    linear-gradient(90deg, var(--bg) 0%, rgba(10, 12, 15, 0.55) 60%, rgba(10, 12, 15, 0.15) 100%);
```
(Aumenta la copertura scura nella zona del testo senza toccare i token `--ink-soft`/`--ink`.)

- [ ] **Step 6: (Solo se si è eseguito lo Step 5) Ri-misurare**

Run: `cd C:\CLAUDE.AI\studiolombardo; node .shots/hero-contrast.mjs`
Expected: ora `PASS` (≥ 4.5:1). Se ancora `FAIL`, alzare il primo stop scuro del gradiente orizzontale (es. `0.55` → `0.7`) e ripetere.

- [ ] **Step 7: Commit**

Se non è stato necessario il fix CSS:
```bash
cd C:\CLAUDE.AI\studiolombardo
git add .shots/hero-contrast.mjs
git commit -m "chore(hero): add headless contrast measurement for hero__desc"
```
Se è stato applicato il fix CSS:
```bash
cd C:\CLAUDE.AI\studiolombardo
git add .shots/hero-contrast.mjs app/globals.css
git commit -m "fix(hero): strengthen horizontal scrim so hero__desc meets AA contrast"
```

---

## Note di esecuzione

- **Ordine:** Task 1 prima (deterministico, nessuna dipendenza esterna), poi Task 2 (richiede dev server + Chrome).
- **Branch:** lavorare su `redesign/sensational-2026` (già attivo). Commit locali; **nessun push** (l'auth GitHub su questa macchina è dell'account sbagliato — vedi storico progetto).
- **Chrome path:** se diverso dal default, esportare `CHROME` prima di lanciare gli script headless.
- **`sharp` su Windows:** l'installazione scarica un binario nativo; può richiedere qualche decina di secondi. È l'unica dipendenza aggiunta, solo come devDependency per la misura.
