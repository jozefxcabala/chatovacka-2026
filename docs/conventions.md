# Coding conventions

## JavaScript

- **Žiadne semicolony** (konzistentné v celom projekte)
- `const` pre všetko, `let` len ak treba reassign, **žiadne `var`**
- Arrow funkcie v callbacks, named function declarations pre top-level
- Template literals pre HTML strings
- Destructuring pri importoch a parametroch
- Komentáre sekciami: `// ─────────────────────────────────`

## Naming

| Typ | Konvencia | Príklad |
|-----|-----------|---------|
| Premenné, funkcie | camelCase | `buildActivityDetail`, `currentSection` |
| Konštanty | UPPER_SNAKE_CASE | `DAY_COLOR_MAP`, `ANIMATOR_PALETTE` |
| CSS triedy | kebab-case | `activity-card`, `filter-bar` |
| `data-*` atribúty | kebab-case | `data-section`, `data-act-id` |
| IDs dní | lowercase slovensky | `pondelok`, `utorok` |
| IDs aktivít | `{skratkaDna}-{slug}` | `pon-pokladovka`, `str-sportovy-den` |

## HTML generovanie

- Všetky render funkcie **vracajú HTML string**, nemodifikujú DOM
- Výnimka: `buildAktivityCards()` — mutuje DOM grid (výkonnostný dôvod)
- `escapeHtml()` sa musí volať pri každom user-provided alebo data stringu vloženom do HTML
- Nikdy nevkladať raw dáta bez escape

## Event handling

- Centrálna delegácia — jeden listener na `document` v `initDelegation()`
- Routing cez `data-*` atribúty (napr. `data-section="aktivity"`, `data-act-id="pon-xyz"`)
- Žiadne inline `onclick` handlery v HTML stringoch

## Dátové referencie

- `activityRef` v harmonograme odkazuje na `activities.id`
- `dayRef` v aktivitách odkazuje na `days.id`
- Tieto referencie sú stringy — validácia sa nerobí (predpokladáme validné dáta)

## CSS

- Design tokeny v `:root` (nie hardcoded farby v komponentoch)
- BEM-like sémantické pomenovanie (nie utility classes)
- Mobile-first responsive
- Dark mode cez `@media (prefers-color-scheme: dark)` — nie JS trieda

## Čo sa nesmie meniť bez rozmyslu

1. **ID konvencia aktivít** (`{den}-{slug}`) — chatbot a referencie závisia od nej
2. **Štruktúra `campData` objektu** — predáva sa do všetkých render funkcií
3. **`data-*` atribúty** na navigačných elementoch — event delegation ich číta
4. **Base path v `vite.config.js`** (`/chatovacka-2026/`) — GitHub Pages ho potrebuje
5. **Export názvov** z `data/*.js` — importované v `app.js` menom

## Pridávanie nových aktivít

1. Pridaj záznam do `data/activities.js` so správnou `id` konvenciou
2. Pridaj `activityRef` do príslušného `schedule` v `data/days.js`
3. Chatbot index sa automaticky prebuduje pri ďalšom `initChatbot()`

## Pridávanie nových sekcií

1. Vytvor builder funkciu v `render.js`
2. Zavolaj ju v `renderAllSections()`
3. Pridaj nav item do `buildNavItems()` v `render.js`
4. Ak sekcia potrebuje filtre/špeciálne správanie, inicializuj v `app.js`
