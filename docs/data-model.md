# Dátový model

Všetky dáta sú statické JS moduly v `data/`. Žiadne API volania, žiadna databáza.

## Súbory a ich obsah

| Súbor | Export | Čo obsahuje |
|-------|--------|-------------|
| `data/config.js` | `campMeta`, `animatorRules`, `announcements`, `contacts`, `appendices` | Meta tábora, pravidlá, oznámenia |
| `data/days.js` | `days` | Denné programy s harmonogramom |
| `data/activities.js` | `activities` | Definície aktivít |
| `data/scenes.js` | `scenes` | Divadelné scénky |
| `data/prayers.js` | `prayers` | Modlitby/meditácie |
| `data/stretka.js` | `stretka` | Denné stretká |
| `data/groups.js` | `groups` | Skupinky podľa ročníkov |
| `data/nameDays.js` | `nameDays` | Slovenský menný kalendár (MM-DD → meno) |
| `data/animators.js` | `animators` | Zoznam animátorov |

## Hlavné dátové štruktúry

### Day (jeden deň tábora)

```js
{
  id: 'pondelok',           // unikátne ID, používa sa ako referencie
  label: 'Pondelok',
  date: '2026-06-29',       // ISO dátum
  dayIndex: 1,
  thought: '...',           // citát dňa
  thoughtAuthor: null,
  vedúciDna: 'Marta, Josky',
  schedule: [ScheduleItem]
}
```

### ScheduleItem (položka harmonogramu)

```js
{
  time: '07:30',            // HH:MM
  label: 'Nástup',
  type: 'system' | 'jedlo' | 'activity' | 'scenka',
  activityRef: 'pon-pokladovka',  // → activities.id (optional)
  note: '...'               // optional poznámka
}
```

### Activity (aktivita)

```js
{
  id: 'pon-pokladovka',     // konvencia: {skratkaDna}-{slug}
  name: 'Pokladovka',
  dayRef: 'pondelok',       // → days.id
  timeLabel: 'Doobedu',     // UI label
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night',
  type: 'activity' | 'scenka',
  time: '10:30',
  endTime: '11:15',         // optional
  location: 'Vonku, chatky',
  detail: '...',            // 1-riadkový súhrn
  description: '...',       // plný popis (markdown-like formát)
  vedúciDna: 'Marta',
  vedúciProgramu: 'Bašky',  // optional
  animators: [
    { name: 'Tomáš', role: 'Vedúci hry' },
    { name: 'Jana' }        // role je optional
  ],
  animatorsNote: 'Cca 10 animátorov',  // optional
  materials: ['Mapy', 'Kartony'],       // optional array
  hasScoring: true,         // optional
  scoring: '...',           // pravidlá bodovania
  hasMtzNote: true,         // optional
  mtzNote: '...'            // poznámka pre metodikov
}
```

### Animator

```js
{
  name: 'Tomáš',
  category: 'CORE' | 'SDB/FMA' | ...,
  gender: 'male' | 'female',
  shirtSize: 'M' | 'L' | 'XL' | ...
}
```

### Group (skupinka)

```js
{
  grade: '5. ročník',
  boys: [{ name: 'Marek', shirtSize: 'M' }],
  girls: [{ name: 'Jana', shirtSize: 'S' }],
  animators: ['Tomáš', 'Jana']
}
```

## Referencie medzi entitami

```
days.schedule[].activityRef → activities.id
activities[].dayRef         → days.id
scenes[].dayRef             → days.id
prayers[].dayRef            → days.id  (ak existuje)
stretka[].dayRef            → days.id  (ak existuje)
```

## campData agregovaný objekt

`app.js` vytvára jeden `campData` objekt a predáva ho do render funkcií:

```js
campData = {
  campMeta, animatorRules, announcements, contacts, appendices,
  days, activities, scenes, prayers, stretka,
  groups, nameDays, animators
}
```

## Ako sa dáta načítavajú

1. Všetky `data/*.js` sú importované na vrchole `app.js`
2. `campData` je zostavený pri štarte, raz
3. Žiadne async operácie — všetko synchrónne
4. Chatbot si vytvorí vlastný MiniSearch index z `activities` pri `initChatbot()`
