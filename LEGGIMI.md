# Studio Tecnico Lombardo — Sito vetrina (base)

## Struttura
```
index.html              pagina unica
assets/
  style.css             tutti gli stili
  scroll.js             motore scroll (engine desktop + mobile separati)
  hero/
    hero-01-intro-*.webp     Leonardo a destra (primo visibile)
    hero-02-focus-*.webp     Leonardo centrale scenografico
    hero-03-centrale-*.webp  Leonardo busto a destra
    hero-04-outro-*.webp     Leonardo a sinistra (ampio spazio testo)
    hero-empty-*.webp        solo sfondo tecnico
```
Ogni immagine ha due versioni: `-desktop.webp` (1920×1080, 16:9) e `-mobile.webp` (1080×1920, 9:16 ritagliato sul soggetto).

## Come provarlo in locale
Apri un terminale nella cartella e lancia:
```
python3 -m http.server 8000
```
Poi vai su http://localhost:8000 (serve un server perché le immagini sono file esterni; il doppio click sull'HTML non carica le webp per restrizioni del browser).

## Due esperienze
- **Desktop**: parallasse 3D completa, blur focale, reazione al mouse, ornamenti animati.
- **Mobile**: engine snello (solo opacity+transform, niente blur/3D), immagini verticali leggere, hero più corto.
La modalità è scelta automaticamente (schermo ≤820px o touch → mobile).

## Sequenza scroll
empty (fondo) → outro → centrale → focus → intro (cima).
Scrollando, gli strati superiori svaniscono rivelando i sottostanti, mentre i testi entrano a fasi: data → motto → titolo → citazione.

## Prossimo passo
Conversione in Next.js + Vercel e inserimento contenuti reali (testi, servizi, progetti).
