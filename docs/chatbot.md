# Chatbot

**Súbor**: `js/chatbot.js`

Chatbot nie je LLM — je to pattern-based systém s MiniSearch full-text vyhľadávaním. Odpovedá na slovenské otázky o tábore.

## Architektúra pipeline

```
Používateľský vstup
  → norm() — normalizácia diakritiky
  → detectIntent() — klasifikácia zámeru
  → extractDay() / extractTimeOfDay() / extractPersonName() — entity extraction
  → handler podľa intentu
  → renderMd() — markdown → HTML
  → zobrazenie v chat UI
```

## Text normalizácia (`norm()`)

Slovenské diakritiky → ASCII (á→a, č→c, š→s, ž→z, ...) + lowercase. Používa sa všade pri porovnávaní.

## Intent detection (`detectIntent()`)

Normalizovaný text sa matchuje proti regex pattern skupinám:

| Intent | Príklady otázok |
|--------|----------------|
| `briefing` | "briefing", "čo ma čaká dnes" |
| `summary` | "zhrnutie", "krátko o aktivite" |
| `schedule` | "program", "harmonogram", "čo robíme" |
| `leader` | "kto vedie", "kto zodpovedá" |
| `person` | meno animátora v otázke |
| `my-role` | "moja úloha", "čo robím ja" |
| `materials` | "pomôcky", "čo potrebujeme" |
| `rain` | "keď prší", "mokrý program" |
| `rules` | "pravidlá", "bodovanie" |
| `location` | "kde", "miesto" |
| `time_lookup` | "kedy", "o koľkej" |
| `after-event` | "po obede", "po omši" |
| `find` | fallback — generic search |

## Entity extraction

- **`extractDay(q)`** — rozpozná názvy dní, "dnes", "zajtra"
- **`extractTimeOfDay(q)`** — ráno/doobedu/poobedie/večer/noc
- **`extractPersonName(q)`** — fuzzy match oproti `animators.name` a `vedúciDna`
- **`extractActivityDoc(q)`** — nájde aktivitu podľa word overlap s názvami

## Intent handlery

| Handler | Čo vracia |
|---------|-----------|
| `handleBriefing(day)` | Kompletný denný briefing: harmonogram, vedúci, thought, pomôcky, záloha |
| `handleSchedule(day, timeOfDay)` | Program dňa, voliteľne filtrovaný podľa časti dňa |
| `handleLeader(activity?, day?)` | Kto vedie aktivitu/deň, zoznam animátorov |
| `handlePerson(name)` | Info o animátorovi: kategória, programy kde vedie/animuje |
| `handleMyRole(activity)` | Zoznam animátorov a ich rolí v aktivite |
| `handleMaterials(activity?, day?)` | Pomôcky pre aktivitu alebo celý deň |
| `handleRain(day?)` | Aktivity s "mokrý program" poznámkami |
| `handleRules(activity)` | Pravidlá a bodovanie aktivity |
| `handleLocation(activity?)` | Kde sa aktivita koná |
| `handleSummary(activity)` | Krátke zhrnutie aktivity |
| `handleAfterEvent(q)` | Čo nasleduje po danej udalosti |
| `handleTimeLookup(q)` | Kedy je daná aktivita |
| `handleSearch(q)` | Generic MiniSearch, top 3 výsledky |

## MiniSearch konfigurácia

```js
fields: ['name', 'detail', 'description', 'materials', 'scoring',
         'mtzNote', 'day', 'location', 'animators', 'vedúciDna', 'vedúciProgramu']

boost: {
  name: 4,           // názov aktivity najdôležitejší
  vedúciProgramu: 3,
  animators: 2.5,
  detail: 2,
  materials: 1.5,
  scoring: 1.2
}

prefix: true         // prefix matching
fuzzy: 0.2           // Levenshtein tolerancia
processTerm: norm()  // normalizácia pri indexovaní aj hľadaní
```

Index sa buduje raz pri `initChatbot()` zo všetkých aktivít.

## Response rendering (`renderMd()`)

Konvertuje markdown-like syntax na HTML:
- `**text**` → `<strong>`
- `_text_` → `<em>`
- `## text` → sekčná hlavička
- `• text` alebo `- text` → zoznam
- prázdne riadky → `<br>`

## Chat UI

- Fixed widget vpravo dole (56×56px button)
- Panel 360×520px desktop, fullscreen mobile
- Bot správy vľavo, user správy vpravo
- Typing indicator (3 blikajúce bodky)
- 8 shortcut buttonov po otvorení:
  - 📋 Briefing dnes, 📅 Program dnes, 🌙 Nočný program, 🌆 Večerný program
  - 🔧 Pomôcky, ☔ Keď prší?, 👑 Kto vedie?, 🏆 Bodovanie
- Enter na odoslanie, Esc na zatvorenie
- Auto-zatváranie pri kliku mimo panel

## Obmedzenia

- Žiadny LLM, žiadne kontextové pamätanie medzi správami
- Každá otázka je nezávislá (stateless)
- Pattern matching môže minúť neobvyklé formulácie
- Dáta sú z `activities` — prayers, stretká, scénky nie sú indexované
