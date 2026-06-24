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

#### Animátori — ako ich extrahovať a kam vložiť

Pred generovaním objektu aktivity **vždy skontroluj** dokument na prítomnosť animátorov:

1. **Identifikuj animátorov** — hľadaj v dokumente mená ľudí priradených k rolám (napr. „Tomáš – koordinátor", „Jana a Peter – hádankári", „Lucia bude pri vstupe", „5 animátorov na beh"). Zoznam môže byť v texte, tabuľke alebo zátvorkách.

2. **Pole `animators`** — pre každého pomenovaného animátora pridaj objekt `{ name, role }`. Ak rola nie je uvedená, vynechaj pole `role` alebo použi `role: null`. Ak sú animátori len v čísle (napr. „cca 10 animátorov") bez mien, nechaj pole prázdne `[]`.

3. **Pole `animatorsNote`** — vždy vyplň podľa tejto logiky:
   - Ak sú v dokumente **pomenovaní animátori**: vygeneruj čitateľný súhrn mien, napr. `"Tomáš (koordinátor), Jana, Peter (beh)"` — tento text sa zobrazuje v dennom harmonograme (skrátený pohľad), preto musí byť ľudsky čitateľný
   - Ak sú len **číselné informácie** (napr. „cca 10 animátorov", „5 hádankárov + 9 behačov"): použi tento text priamo
   - Ak nie sú žiadne informácie: nastav `null`

4. **Sekcia v `description`** — ak sú v dokumente pomenovaní animátori s rolami, **pridaj na koniec poľa `description`** túto sekciu (za ostatný obsah, oddelenú prázdnym riadkom):

   ```
   ## Animátori
   - Meno – rola
   - Meno – rola
   ```

   Ak sú animátori len v čísle (bez mien), sekciu do `description` nepridávaj.

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
  detail: 'Krátky súhrn čo sa v programe konkrétne deje (1–2 vety, max 150 znakov).',
  // detail — zobrazuje sa v akordeone aktivít vedľa harmonogramu (nie v riadku harmonogramu!)
  // Používaj aktívny popis: „Skupinky hľadajú…", „Deti plnia úlohy…" — nie abstraktné frázy.
  description: `
Text so zachovaným formátovaním z dokumentu.

## Animátori
- Meno – rola
- Meno – rola
  `,
  vedúciDna: 'Meno vedúceho dňa alebo null',
  vedúciProgramu: null,
  animators: [{ name: 'Meno', role: 'Rola' }],  // prázdne pole [] ak nie sú pomenovaní
  animatorsNote: 'Meno (rola), Meno, ...',       // čitateľný súhrn pre skrátený pohľad
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

## Krok 5 — Vlož do dátového súboru

1. Otvor príslušný JS súbor
2. Vlož nový objekt **pred posledný `];`** na konci súboru
3. Zachovaj odsadenie 2 medzery, rovnaký štýl ako ostatné záznamy v súbore
4. **Ak záznam s rovnakým `id` už existuje** → aktualizuj ho namiesto duplikovania; **pole `animators` zachovaj ak dokument neobsahuje menovitý zoznam animátorov** — nikdy ho neprepíšaj na `[]`
5. **Ak ten istý deň+typ už existuje** (napr. ranná modlitba v pondelok) → opýtaj sa používateľa či ho prepísať

## Krok 5b — Aktualizuj harmonogram v `data/days.js`

Ak ide o aktivitu (typ `activity` alebo `scenka`), otvor `data/days.js` a nájdi príslušný deň podľa `dayRef`.

**Čo aktualizovať:**

1. **`vedúciDna`** na úrovni dňa — ak dokument uvádza vedúceho dňa a líši sa od aktuálnej hodnoty, aktualizuj ho
2. **Položka v `schedule`** s `activityRef` rovnajúcim sa `id` aktivity:
   - `time` — zmeň na čas z dokumentu
   - `label` — zmeň na názov aktivity z dokumentu
3. **Ak položka v `schedule` ešte neexistuje** — pridaj ju na správne miesto (podľa času, vzostupne)

Štruktúra položky v schedule:
```js
{ time: '10:30', label: 'Názov aktivity', type: 'activity', activityRef: 'id-aktivity' }
// alebo pre scénku:
{ time: '20:00', label: 'Názov scénky', type: 'scenka', activityRef: 'id-scenky' }
// voliteľne:
{ time: '22:00', label: 'Nočná hra', type: 'activity', activityRef: 'id', note: 'Nočná hra' }
```

Pre modlitby a stretká harmonogram **neaktualizuj**.

## Krok 6 — Zhrnutie

Po dokončení povedz:
- Čo si pridal alebo aktualizoval (názov, deň, súbor)
- Čo si zmenil v harmonograme `days.js` (čas, label, vedúciDna)
- Ak si niečo odhadoval (chýbajúce pole, neurčitý deň), upozorni na to
- Ak dokument obsahoval viac záznamov, vypíš ich všetky
