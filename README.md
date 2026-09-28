# hwyl design — Portfolio

Sito one-page di Gabriele: branding, visual e web design. Next.js 16 + TypeScript + Tailwind 4 + Framer Motion + next-intl (IT/EN) + next-themes (dark default).

## Aprire il sito in locale

**Modo facile:** doppio click su `AVVIA-PORTFOLIO.bat` (nella cartella sopra, `portfolio-design`). Apre il browser su http://localhost:3000/it e avvia il server. Chiudi la finestra nera per fermarlo.

**Da terminale:**

```bash
cd portfolio
npm run dev
```

poi apri http://localhost:3000/it

Ogni modifica ai file si vede **subito** nel browser (hot reload), senza riavviare nulla.

## Dove mettere le mani

| Cosa vuoi cambiare | File |
|---|---|
| Testi (IT / EN) | `src/messages/it.json` e `src/messages/en.json` |
| Screenshot dei progetti | immagini in `public/works/`, percorsi in `src/lib/projects.ts` |
| Foto, logo, illustrazioni | `public/brand/` |
| Colori (dark + light) | variabili in `src/app/globals.css` (blocchi `:root` e `.dark`) |
| Sezioni della pagina | `src/components/` (Hero, About, ProjectSection, Contact...) |

## Comandi utili

```bash
npm run dev     # server locale con hot reload
npm run build   # build di produzione (verifica che tutto compili)
npm run lint    # controllo del codice
```

## Pubblicazione (deploy automatico)

Il sito è online su **https://spicybruno.github.io/** (repo `SpicyBruno/spicybruno.github.io`).

Ogni `git push` sul branch `main` avvia la GitHub Action `.github/workflows/deploy.yml`: fa `npm run build` (export statico nella cartella `out/`) e pubblica su GitHub Pages. In 1-2 minuti le modifiche sono live.

```bash
git add .
git commit -m "descrizione della modifica"
git push
```

Lo stato del deploy si vede nella tab **Actions** del repo su GitHub.

Collegamenti con HWYL Studio (https://spicybruno.github.io/hwyl-portfolio/): URL in `src/lib/site.ts` (`HWYL_URL`).