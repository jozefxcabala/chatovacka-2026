// ─────────────────────────────────────────────────────────────────────────────
// MODLITBY A STRETKÁ
//
// Každá modlitba má:
//   id    — unikátny identifikátor
//   title — názov
//   text  — text modlitby (môže byť multiline template string)
//
// Pre dlhší text modlitby môžeš použiť rovnaký formát ako v activities.js:
//   text: `
//   Prvý odsek modlitby.
//
//   Druhý odsek.
//   `
// ─────────────────────────────────────────────────────────────────────────────

export const prayers = [
  {
    id: 'pr-ranna',
    title: 'Ranná modlitba',
    text: `Pane Bože, ďakujeme Ti za nový deň. Daj nám silu, radosť a odvahu prežiť dnešný deň naplno. Nech sú naše srdcia otvorené pre Teba a pre seba navzájom. Amen.`
  },
  {
    id: 'pr-vecerna',
    title: 'Večerná modlitba',
    text: `Pane, ďakujeme za dnešný deň plný hier, smiechu a stretnutí. Odpusť nám, keď sme niekoho zranili, a pomôž nám zajtra byť lepšími. Daj nám pokojnú noc. Amen.`
  }
];
