// ─────────────────────────────────────────────────────────────────────────────
// SCÉNKY TÁBORA
//
// Každá scénka má:
//   id      — unikátny identifikátor
//   dayRef  — ID dňa (z days.js)
//   title   — názov scénky
//   note    — krátka poznámka / popis (môže byť null)
// ─────────────────────────────────────────────────────────────────────────────

export const scenes = [
  {
    id: 'sc-tumnus',
    dayRef: 'pondelok',
    title: 'Scénky skupiniek s Tumnusom',
    note: 'Každá skupinka predvedie krátku scénku s Tumnusom.'
  },
  {
    id: 'sc-aslan',
    dayRef: 'stvrtok',
    title: 'Stretnutie Aslan & Biela čarodejnica',
    note: 'Hlavná scénka tábora – vyvrcholenie príbehu pred záverečným bojom.'
  }
];
