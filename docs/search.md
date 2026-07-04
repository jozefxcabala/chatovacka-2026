# Search

Projekt má dva nezávislé search systémy.

## 1. Activity filter search (`js/filters.js`)

Jednoduchý client-side filter, **žiadna externá knižnica**.

```js
getFilteredActivities(activities, { q, dayF, timeF, typeF, animF })
```

**Full-text `q`**: case-insensitive `includes()` cez polia:
`name`, `description`, `location`, `animators[].name`, `vedúciProgramu`, `vedúciDna`

**Ostatné filtre** sú exaktné zhody:
- `dayF` → `activity.dayRef`
- `timeF` → `activity.timeOfDay` (`morning | afternoon | evening | night`)
- `typeF` → `activity.type` (`activity | scenka`)
- `animF` → array mien, aktivita musí obsahovať aspoň jedno (OR logika)

Všetky filtre sa kombinujú cez AND. Filter sa spúšťa pri každej zmene UI (input, select, checkbox).

---

## 2. Chatbot search (MiniSearch)

**Knižnica**: `minisearch` 7.1.0

### Index

Indexujú sa všetky aktivity. Každý dokument má polia:

```
name, detail, description, materials, scoring,
mtzNote, day, location, animators, vedúciDna, vedúciProgramu
```

Všetky hodnoty sú normalizované cez `norm()` (slovenské diakritiky → ASCII, lowercase).

### MiniSearch konfigurácia

```js
{
  prefix: true,    // "poklad" nájde "pokladovka"
  fuzzy: 0.2,      // Levenshtein tolerancia (1 znak na 5)
  boost: {
    name: 4,           // Názov aktivity — najvyššia priorita
    vedúciProgramu: 3,
    animators: 2.5,
    detail: 2,
    materials: 1.5,
    scoring: 1.2       // Zvyšok — rovnaká váha
  }
}
```

### Normalizácia (`norm()`)

```
á→a, é→e, í→i, ó→o, ú→u, ý→y
č→c, š→s, ž→z, ľ→l, ĺ→l, ŕ→r, ť→t, ď→d, ň→n
+ lowercase
```

Aplikuje sa rovnako pri indexovaní aj pri hľadaní → diakritika nespôsobuje miss.

### Kedy sa MiniSearch používa

Iba v chatbote, ako **fallback** v `handleSearch()` (intent `find`). Špecializované intenty (schedule, materials, leader...) hľadajú priamo v dátach bez MiniSearch.

### Výsledky

`handleSearch()` zobrazí top 3 výsledky s: názvom, dňom, časom, miestom, vedúcim, skrátený popis.

---

## Rozdiel medzi systémami

| | Activity filter | Chatbot MiniSearch |
|--|--|--|
| Kde | `filters.js` | `chatbot.js` |
| Trigger | UI zmena (filter bar) | Chatbot query (intent `find`) |
| Algoritmus | `String.includes()` | Levenshtein + TF-IDF boosting |
| Normalizácia | Nie | Áno (diakritika) |
| Fuzzy | Nie | Áno (0.2) |
| Výsledky | Všetky zhody | Top 3 |
