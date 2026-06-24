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
    text: `
Každá skupinka si vytiahne žáner svojej scénky a tému. Potom budú mať pol hodinku (prípadne 45 min.) na vymyslenie scénky. Chlapci a dievčatá budú hrať scénky oddelene. Najprv sa zahrá jedna dievčenská a potom jedna chlapčenská scénka atď.

Tumnus vyberie jednu chlapčenskú a jednu dievčenskú skupinku, ktorá dostane bonusové body.
    `
  },
  {
    id: 'sc-aslan',
    dayRef: 'stvrtok',
    title: 'Stretnutie Aslan & Biela čarodejnica',
    text: 'Hlavná scénka tábora – vyvrcholenie príbehu pred záverečným bojom.'
  }
];
