# Architektúra projektu

## Prehľad

**Chatovačka 2026** je statická PWA pre animátorov letného tábora Narnia 2026. Nepoužíva žiadny JS framework — iba vanilla JS (ES modules), Vite na build a MiniSearch pre chatbot.

## Adresárová štruktúra

```
chatovacka-2026/
├── data/           # Všetky dáta tábora (JS moduly)
├── js/             # Aplikačná logika (4 hlavné moduly + utils)
├── css/            # Štýly (rozdelené podľa oblasti)
├── docs/           # Táto dokumentácia
├── .github/workflows/  # GitHub Actions CI/CD
├── index.html      # Jediný HTML súbor (skeleton)
├── sw.js           # Service Worker (manuálny, mimo bundle)
├── manifest.json   # PWA manifest
└── vite.config.js  # Vite + PWA plugin config
```

## Stack

| Vrstva | Technológia |
|--------|-------------|
| Jazyk | Vanilla JS (ES modules, ES2020+) |
| Build | Vite 5.4 |
| Search | MiniSearch 7.1 |
| PWA | vite-plugin-pwa + manuálny sw.js |
| Hosting | GitHub Pages (automatický deploy) |

## Dátový tok

```
data/*.js
  ↓
app.js (bootstrap pri DOMContentLoaded)
  ├── render.js → DOM (všetky sekcie)
  ├── filters.js → buildAktivityCards() → DOM (grid)
  └── chatbot.js → MiniSearch index → odpovede
```

**Jednosmerný tok**: dáta → render → DOM. Žiadny virtual DOM, žiadna reaktivita.

## Navigácia (SPA)

- Všetky sekcie sú renderované na štarte a skryté/zobrazené cez JS
- `navigateTo(sectionId, actParam?)` riadi prechody
- Stav: `currentSection`, `currentActivityId`, `previousSection`
- Perzistencia: `localStorage.lastSection` (posledná navštívená sekcia)

## Sekcie aplikácie

| ID | Obsah |
|----|-------|
| `uvod` | Hero, oznámenia, dnešný program, pravidlá |
| `pondelok` … `sobota` | Denný program s harmonogramom |
| `aktivity` | Filtrovateľný zoznam aktivít + detail view |
| `scenky` | Divadelné scénky podľa dní |
| `stretka` | Denné stretká |
| `modlitby` | Modlitby podľa dní |
| `skupinky` | Rozdelenie do skupín podľa ročníkov |
| `animatori` | Zoznam animátorov s veľkosťami tričiek |
| `prilohy` | Sumáre veľkostí tričiek na tlač |

## Kľúčové architektonické rozhodnutia

1. **Žiadny framework** — dáta tábora sú statické, framework by bol overhead bez benefitu
2. **HTML ako string** — všetky render funkcie vracajú string, nie mutujú DOM (výnimka: `buildAktivityCards` pre výkon)
3. **Event delegation** — všetky click eventy sú na `document`, routované cez `data-*` atribúty
4. **MiniSearch** — plnotextový search s normalizáciou slovenských diakritík
5. **PWA** — service worker umožňuje offline použitie bez servera
