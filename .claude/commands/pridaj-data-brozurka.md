Prečítaj dokument a pridaj jeho obsah do dát tábora Narnia 2026.

## Súbor
Cesta k súboru: `$ARGUMENTS`

## Krok 1 — Načítaj obsah súboru

Podľa prípony:

- `.docx` / `.doc` → spusti bash príkaz: `textutil -convert txt -stdout "$ARGUMENTS"`
- `.pdf` → použi Read tool priamo na `$ARGUMENTS`
- `.txt` / `.md` → použi Read tool priamo

## Krok 2 — Zachovaj formátovanie z dokumentu

Text prevádzaj **presne tak ako je v dokumente** — nezjednodušuj, nezlučuj, nemeň štruktúru:

| Formát v dokumente | Formát v JS poli |
|--------------------|-----------------|
| Nadpis (Heading 1/2, veľké písmená, podčiarknutý riadok) | `## Nadpis` |
| Odrážkový zoznam (bullet, •, -, *) | `- položka` |
| Číslovaný zoznam (1. 2. 3.) | `1. položka` — zachovaj čísla |
| Tučný text | `**tučný text**` |
| Kurzíva | `_kurzíva_` |
| Prázdny riadok | zachovaj |
| Odseky | každý odsek na vlastnom riadku |
| Strany / page break / footer / header | ignoruj |

Text vkladaj ako multiline template string (backtick) — rovnako ako ostatné záznamy v súboroch.

## Krok 3 — Identifikuj typ záznamu

Na základe obsahu zisti čo dokument obsahuje. Dokument môže mať viac záznamov naraz:

| Typ | Súbor | Poznávací znak |
|-----|-------|----------------|
| Aktivita | `data/activities.js` | Hra, súťaž, dielňa, šport, nočná hra, tvorivá aktivita |
| Modlitba | `data/prayers.js` | Modlitba, reflexia, duchovný text, liturgia |
| Stretko | `data/stretka.js` | Ranné / záverečné stretnutie tábora |
| Scénka | `data/scenes.js` | Divadelná scénka, dramatizácia, príbeh na scéne |

Ak si nie si istý typom, spýtaj sa používateľa skôr než pokračuješ.

## Krok 4 — Vygeneruj JS objekt podľa typu

Dostupné dayRef hodnoty: `pondelok` `utorok` `streda` `stvrtok` `piatok` `sobota`

### Aktivita → `data/activities.js`

```js
{
  id: 'den-kratky-nazov',          // napr. 'pon-pokladovka', 'str-dielna'
  name: 'Názov aktivity',
  dayRef: 'pondelok',
  timeLabel: 'Doobedu',            // Doobedu | Poobedie | Večer | Nočná hra
  timeOfDay: 'morning',            // morning | afternoon | evening | night
  type: 'activity',                // activity | scenka
  time: '09:00',
  endTime: '10:30',                // alebo null
  location: 'Miesto konania',
  description: `
Text so zachovaným formátovaním z dokumentu.
  `,
  vedúciDna: 'Meno vedúceho dňa alebo null',
  vedúciProgramu: null,
  animators: [{ name: 'Meno', role: 'Rola' }],  // prázdne pole [] ak nie sú
  animatorsNote: null,
  materials: ['Pomôcka 1', 'Pomôcka 2'],         // prázdne pole [] ak nie sú
  hasScoring: false,
  scoring: null,
  hasMtzNote: false,
  mtzNote: null
}
```

### Modlitba → `data/prayers.js`

```js
{
  id: 'pr-typ-den',                // napr. 'pr-ranna-pon', 'pr-vecerna-str'
  dayRef: 'pondelok',
  title: 'Ranná modlitba',
  text: `
Text modlitby so zachovaným formátovaním.
  `
}
```

### Stretko → `data/stretka.js`

```js
{
  id: 'str-den',                   // napr. 'str-utorok'
  dayRef: 'utorok',
  title: 'Ranné stretko',
  text: `
Obsah stretka so zachovaným formátovaním.
  `
}
```

### Scénka → `data/scenes.js`

```js
{
  id: 'sc-kratky-nazov',
  dayRef: 'pondelok',
  title: 'Názov scénky',
  text: `
Text scénky so zachovaným formátovaním.
  `
}
```

## Krok 5 — Vlož do súboru

1. Otvor príslušný JS súbor
2. Vlož nový objekt **pred posledný `];`** na konci súboru
3. Zachovaj odsadenie 2 medzery, rovnaký štýl ako ostatné záznamy v súbore
4. **Ak záznam s rovnakým `id` už existuje** → aktualizuj ho namiesto duplikovania
5. **Ak ten istý deň+typ už existuje** (napr. ranná modlitba v pondelok) → opýtaj sa používateľa či ho prepísať

## Krok 6 — Zhrnutie

Po dokončení povedz:
- Čo si pridal alebo aktualizoval (názov, deň, súbor)
- Ak si niečo odhadoval (chýbajúce pole, neurčitý deň), upozorni na to
- Ak dokument obsahoval viac záznamov, vypíš ich všetky
