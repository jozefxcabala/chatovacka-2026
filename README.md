# Chatovačka — Program tábora pre animátorov

Statická webová aplikácia pre animátorov. Funguje offline (PWA), nasadzuje sa na GitHub Pages.

---

## Štruktúra projektu

```
data/
  config.js      ← názov tábora, dátumy, oznamy, kontakty, prílohy
  days.js        ← dni tábora a denný program (timeline)
  activities.js  ← všetky aktivity s popisom, animátormi, pomôckami
  scenes.js      ← scénky
  prayers.js     ← modlitby a stretká

js/
  app.js         ← vstupný bod, navigácia, sidebar, inicializácia
  render.js      ← HTML buildery pre každú sekciu
  filters.js     ← logika filtrovania aktivít
  utils.js       ← pomocné funkcie, formatTextToHtml, ICONS

css/
  base.css       ← tokeny, reset, layout, sekcie (úvod, deň, scénky…)
  sidebar.css    ← sidebar, topbar
  activities.css ← filtre, karty aktivít
  detail.css     ← detail aktivity
  responsive.css ← media queries

index.html       ← čistý HTML skeleton, žiadne dáta
sw.js            ← service worker pre offline prístup
manifest.json    ← PWA manifest
```

---

## Kde čo zmeniť

### Názov tábora, rok, termín, miesto

Súbor: **`data/config.js`**

```js
export const campMeta = {
  year:      2027,
  version:   'v1.0',
  campName:  'Narnia 2027',
  theme:     'Nový podtitol',
  campDates: { start: '2027-06-27', end: '2027-07-03' },
  location:  'Chatovačka, Donovaly'
};
```

### Dni a denný harmonogram (timeline)

Súbor: **`data/days.js`**

Každý deň je objekt v poli `days`. Pole `schedule` definuje timeline dňa.
`activityRef` musí odkazovať na `id` existujúcej aktivity v `activities.js`.

```js
{ time: '09:00', label: 'Pokladovka', type: 'activity', activityRef: 'pon-pokladovka' }
```

### Pridanie novej aktivity

Súbor: **`data/activities.js`**

Pridaj nový objekt do poľa `activities`:

```js
{
  id: 'pon-nova-aktivita',   // unikátne ID
  name: 'Nová aktivita',
  dayRef: 'pondelok',        // musí existovať v days.js
  timeLabel: 'Doobedu',      // zobrazovaný štítok
  timeOfDay: 'morning',      // morning | afternoon | evening | night
  type: 'activity',          // activity | scenka
  time: '10:00',
  endTime: '11:30',
  location: 'Areál chatovačky',
  description: `
Krátky popis alebo dlhý formátovaný text (pozri nižšie).
  `,
  vedúciDna: 'Meno',
  vedúciProgramu: 'Meno',
  animators: [
    { name: 'Jana', role: 'Rozhodca' },
    { name: 'Maroš' }
  ],
  animatorsNote: 'Cca 5 animátorov',
  materials: [
    'Lopty – 3 ks',
    'Píšťalka – 1 ks'
  ],
  hasScoring: false,
  scoring: null,
  hasMtzNote: false,
  mtzNote: null
}
```

### Ako písať dlhý text aktivity (pole `description`)

Použi **multiline template string** (backtick). Formát:

```
description: `
Normálny odsek — jednoduchý text.

## Nadpis sekcie
(riadok začínajúci ## = podnadpis)

- položka zoznamu
- ďalšia položka
(riadky začínajúce "- " = zoznam)

Ďalší odsek textu.
`
```

Pravidlá:
- Prázdny riadok = oddeľovač odsekov
- `## Text` = nadpis (`<h3>`)
- `- text` = položka zoznamu (`<ul><li>`)
- Ostatné riadky = odseky (`<p>`)
- HTML znaky sú **automaticky escapované** — netreba ich ošetrovať
- Diakritika funguje štandardne

### Ako písať pomôcky (pole `materials`)

Každá pomôcka je **samostatný string** v poli. Zobrazí sa ako textový zoznam s bodkami:

```js
materials: [
  'Mapa pokladu – 1 ks / skupinka',
  'Krabice s hádankami – 5 ks',
  'Píšťalky – 2 ks'
]
```

Pomôcky sú **len na čítanie** — nie sú to checkboxy, len informačný zoznam.

### Modlitby a stretká

Súbor: **`data/prayers.js`**

```js
{
  id: 'pr-nova',
  title: 'Názov modlitby',
  text: `Text modlitby môže byť aj multiline template string.

Môže mať viac odsekov.`
}
```

### Scénky

Súbor: **`data/scenes.js`**

```js
{
  id: 'sc-nova',
  dayRef: 'streda',   // musí existovať v days.js
  title: 'Názov scénky',
  note: 'Krátky popis.'
}
```

### Prílohy

Súbor: **`data/config.js`** — pole `appendices`.

---

## Lokálne spustenie

Stránka používa ES modules (`<script type="module">`). Prehliadač ich **nespustí priamo z file://**  — potrebuješ jednoduchý HTTP server:

```bash
python3 -m http.server 8000
```

Potom otvor: [http://localhost:8000](http://localhost:8000)

Alternatívy:
```bash
npx serve .
# alebo
php -S localhost:8000
```

---

## Nasadenie na GitHub Pages

1. Commitni všetky zmeny:
   ```bash
   git add -A
   git commit -m "Aktualizácia tábora 2027"
   ```

2. Pushni na GitHub:
   ```bash
   git push
   ```

3. V nastaveniach repozitára → **Pages** → Source: `main` branch, root `/`.

Stránka sa automaticky nasadí. ES modules fungujú na GitHub Pages natívne (HTTPS).

---

## Nový rok — postup

1. Zmeň `campMeta` v `data/config.js`
2. Prepíš `days` v `data/days.js` novými dňami a harmonogramom
3. Prepíš `activities` v `data/activities.js` novými aktivitami
4. Doplň `scenes` a `prayers` podľa potreby
5. Aktualizuj cache verziu v `sw.js` (napr. `tabor-v3` → `tabor-v4`)
6. Commitni a pushni

---

## Technické poznámky

- **Žiadny build step** — čistý statický web
- **ES modules** — moduly sa načítajú natívne v prehliadači
- **Offline prístup** — service worker v `sw.js` cachuje všetky súbory
- **PWA** — manifest.json umožňuje pridanie na plochu
- **Tmavý režim** — automaticky podľa systému
- **Mobilný layout** — plne responzívny sidebar a karty
