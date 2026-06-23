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
    id: 'pr-ranna-pon',
    dayRef: 'pondelok',
    title: 'Ranná modlitba',
    text: `Pane Bože, ďakujeme Ti za nový deň. Daj nám silu, radosť a odvahu prežiť dnešný deň naplno. Nech sú naše srdcia otvorené pre Teba a pre seba navzájom. Amen.`
  },
  {
    id: 'pr-vecerna-pon',
    dayRef: 'pondelok',
    title: 'Večerná modlitba',
    text: `Pane, ďakujeme za dnešný deň plný hier, smiechu a stretnutí. Odpusť nám, keď sme niekoho zranili, a pomôž nám zajtra byť lepšími. Daj nám pokojnú noc. Amen.`
  },
  {
    id: 'pr-ranna-uto',
    dayRef: 'utorok',
    title: 'Ranná modlitba',
    text: `Pane, nový deň, nová šanca. Nech sme dnes bližšie k Tebe a k sebe navzájom. Otvor naše oči pre dobro okolo nás. Amen.`
  },
  {
    id: 'pr-vecerna-uto',
    dayRef: 'utorok',
    title: 'Večerná modlitba',
    text: `Ďakujeme za každý smiech, za každý objatí, za každé dobré slovo. Keď sme zlyhali, vieš o tom. Odpusť nám a veď nás ďalej. Amen.`
  }
];
