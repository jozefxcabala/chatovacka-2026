# CLAUDE.md — Chatovačka 2026

Statická PWA pre animátorov letného tábora Narnia 2026. Vanilla JS, Vite, MiniSearch. Žiadny framework.

## Dokumentácia

Pred prácou na úlohe prečítaj relevantné docs:

| Dokument | Kedy čítať |
|----------|-----------|
| [docs/architecture.md](docs/architecture.md) | Vždy — stack, navigácia, dátový tok, kľúčové rozhodnutia |
| [docs/components.md](docs/components.md) | Zmeny v JS moduloch (app.js, render.js, filters.js, utils.js) |
| [docs/data-model.md](docs/data-model.md) | Pridávanie/zmena dát, nové polia v aktivitách/dňoch |
| [docs/chatbot.md](docs/chatbot.md) | Zmeny v chatbote, nové intenty, intent handlery |
| [docs/search.md](docs/search.md) | Oba search systémy — activity filter aj MiniSearch konfigurácia |
| [docs/ui.md](docs/ui.md) | UI zmeny, nové komponenty, CSS konvencie |
| [docs/build.md](docs/build.md) | Build, deploy, PWA, GitHub Actions |
| [docs/conventions.md](docs/conventions.md) | Pomenovanie, patterns, čo sa nesmie meniť |

## Rýchla orientácia

- **Dáta**: `data/*.js` — JS moduly, všetko statické
- **Render**: `js/render.js` — vracia HTML stringy, nemodifikuje DOM
- **Orchestrácia**: `js/app.js` — bootstrap, navigácia, event delegation
- **Chatbot**: `js/chatbot.js` — pattern matching + MiniSearch, nie LLM
- **Filtre**: `js/filters.js` — čistá filter logika
- **Utility**: `js/utils.js` — ikony, farby, text formátovanie

## Dôležité pravidlá

- Vždy `escapeHtml()` pri vkladaní dát do HTML stringov
- Event handling cez `data-*` atribúty + centrálna delegácia v `app.js`
- ID aktivít: formát `{skratkaDna}-{slug}` (napr. `pon-pokladovka`)
- Base path v `vite.config.js` je `/chatovacka-2026/` — nemeniť
