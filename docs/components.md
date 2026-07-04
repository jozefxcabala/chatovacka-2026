# Komponenty — JS moduly

Projekt má 4 hlavné JS moduly + utils. Žiadny framework, žiadne komponenty ako triedy — iba funkcie.

## `js/app.js` — Jadro aplikácie

**Zodpovednosť**: Bootstrap, navigácia, event handling, sidebar, filtre, print.

### Kľúčové funkcie

| Funkcia | Čo robí |
|---------|---------|
| `navigateTo(sectionId, actParam?, instant?)` | Prepnutie sekcie, scroll, history tracking |
| `initDelegation()` | Centrálny event handler pre celú app (click na document) |
| `initAktivityFilters()` | Setup filter UI (search, dropdowns, checkboxy animátorov) |
| `initSidebar()` | Collapse/expand sidebar, mobile drawer |
| `initAnimatoriFilter()` | Filter animátorov podľa zodpovednosti |
| `initPrintBrozurka()` | Print/PDF export aktivít |
| `initSectionObserver()` | IntersectionObserver pre auto-highlight nav |
| `buildAktivityCards()` | Znovu-render gridu po zmene filtrov (volá filters.js + render.js) |

### Lokálny stav (v module)

- `currentSection`, `currentActivityId`, `previousSection`
- `campData` — agregovaný objekt zo všetkých `data/*.js`

---

## `js/render.js` — HTML generovanie

**Zodpovednosť**: Vytvára HTML stringy pre všetky sekcie. **Nemodifikuje DOM** (výnimka: `buildAktivityCards`).

### Builder funkcie (každá vracia HTML string)

| Funkcia | Sekcia |
|---------|--------|
| `buildUvod(campData)` | Úvod — hero, oznámenia, dnešný program, pravidlá |
| `buildDay(day, campData)` | Denný program — timeline + accordion aktivít |
| `buildAktivitySection(campData)` | Scaffold filtrov + grid (prázdne miesto) |
| `buildAktivityCards(campData)` | Render kariet (mutuje DOM grid, číta filtre) |
| `buildActivityDetail(actId, campData)` | Detail aktivity — backbtn, meta, popis, animátori, pomôcky |
| `buildScenky(campData)` | Scénky podľa dní (accordion) |
| `buildStretka(campData)` | Stretká (accordion) |
| `buildModlitby(campData)` | Modlitby (accordion) |
| `buildSkupinky(campData)` | Skupinky podľa ročníkov |
| `buildAnimatori(campData)` | Tabuľka animátorov s chipmi zodpovedností |
| `buildPrilohy(campData)` | Sumáre veľkostí tričiek |
| `renderAllSections(campData)` | Batch render všetkých sekcií do DOM |

### Pomocné funkcie

- `formatTextToHtml(text)` — markdown-like text → HTML (headings, listy, bold, italic)
- `getAnimatorColorMap(campData)` — deterministická farebná paleta pre animátorov
- `getTodayDayId(days)` — aktuálny deň tábora
- `getScheduleStatus(schedule)` — past/current/next/future pre harmonogram

---

## `js/chatbot.js` — Chatbot

Detailne popísaný v [chatbot.md](chatbot.md).

**Zodpovednosť**: AI-like chatbot — intent detection, MiniSearch, renderovanie odpovedí, chat UI.

---

## `js/filters.js` — Filtrovanie aktivít

**Zodpovednosť**: Čistá logika filtrovania, žiadna DOM manipulácia okrem `getFiltersState()`.

| Funkcia | Čo robí |
|---------|---------|
| `getFilteredActivities(activities, {q, dayF, timeF, typeF, animF})` | AND kombinácia všetkých filtrov |
| `getFiltersState()` | Číta aktuálny stav DOM filter controls |
| `clearFilters()` | Reset všetkých filter controls v DOM |
| `showActivityList()` | Skryje detail, zobrazí zoznam |

---

## `js/utils.js` — Utility a konštanty

| Export | Typ | Účel |
|--------|-----|------|
| `DAY_COLOR_MAP` | object | Deň ID → CSS color variable |
| `ICONS` | object | SVG definície ikon (home, calendar, ...) |
| `ANIMATOR_PALETTE` | array | 20 farieb pre animátorov |
| `escapeHtml(str)` | fn | Escape HTML špeciálnych znakov |
| `formatTextToHtml(text)` | fn | Markdown-like → HTML |
| `el(tag, className)` | fn | Element factory |
| `getDayConfig(days, dayId)` | fn | Lookup dňa podľa ID |
| `getActivity(activities, actId)` | fn | Lookup aktivity podľa ID |
| `getTodayDayId(days)` | fn | Aktuálny deň tábora |
| `getScheduleStatus(schedule)` | fn | Stav položiek harmonogramu |

---

## Vzťahy medzi modulmi

```
app.js
  ├── importuje: render.js, filters.js, utils.js, data/*.js
  ├── volá: renderAllSections(), buildAktivityCards(), initChatbot()
  └── event delegation → volá funkcie z filters.js a render.js

render.js
  ├── importuje: utils.js, data/*.js
  └── vracia: HTML strings (žiadne volania do app.js)

chatbot.js
  ├── importuje: data/*.js, utils.js
  └── žiadne závislosti na app.js ani render.js

filters.js
  └── žiadne importy z iných projektových modulov (čistá logika)
```
