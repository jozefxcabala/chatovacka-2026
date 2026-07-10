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

  // ── RANNÉ MODLITBY ────────────────────────────────────────────────────────

  {
    id: 'pr-ranna-pon',
    dayRef: 'pondelok',
    title: 'Ranná modlitba — Lucy',
    character: 'Lucy',
    quote: 'Kráľovstvo Narnie nestojí na veľkých hradbách, ale na malých hrdinoch.',
    text: `Na modlitby si majú decká doniesť čo najmenšiu reálnu vec zbalenú z domu (2 minúty). Veci sa porovnajú, kto má najväčšiu vec, vyhráva malú sladkosť.

Podobenstvo o horčičnom zrnku:
Ježiš povedal: „K čomu prirovnáme Božie kráľovstvo a v akom podobenstve ho pripodobníme? Je ako horčičné zrno. Ono, po tom, čo bolo zasiate do zeme, je najmenšie zo všetkých zrniek, ktoré sú na zemi. A po tom, čo bolo zasiate do zeme, vystupuje a stáva sa najväčším zo všetkých rastlín a vyráža veľké konáre, takže je možné, že v jeho tieni prebýva vtáctvo." A v podobenstvách ako tieto rozprával im Ježiš podobenstvá; tak ako boli schopní počúvať. A okrem podobenstiev nerozprával s nimi. Svojim učeníkom však vysvetľoval všetko osamote.

★ Ježiš hovorí v podobenstvách — sú do istej miery pochopiteľné, no zároveň ukrývajú niečo na prvé počutie nepostrehnuteľné
★ Kráľovstvo Nebeského Otca prirovnal k semienku horčičného zrnka, nie k niečomu veľkému, ale k niečomu najmenšiemu
★ Avšak aj nepatrné malé semienko horčice dokáže vyrásť na niečo obrovské — strom
★ Strom vyrastá zo zeme, ktorá je symbolom človeka (hebrejsky sa povie zem = adamach a človek zase adam)
★ Ale nakoniec si v ňom nájdu svoje miesto aj nebeské vtáky, ktoré sú symbolom neba a teda Božieho sveta
★ Každý z nás je pozvaný vyrásť ako horčičné zrnko na strom, ktorý sa stane Božím domovom.

Praktická časť:
★ Použite predmety, ktoré decká priniesli — rozdeľte ich na polovicu + to najmenšie bude v strede
★ Skúste obrazne pomenovať veci na pravej strane, ktoré pomôžu semienku rásť (napr. voda, svetlo, živiny…)
★ A teraz pomenujte veci, ktoré zrnku prekážajú v raste (napr. škodcovia, sucho, kamene…)
★ V krste bol do nás zasiaty Boží život v podobe semienka večného života!
★ A Nebeský Otec túži, aby toto dobré dielo, ktoré v nás začal, aj dokončil.
★ Čo tomuto nebeskému životu v nás pomáha a čo mu naopak bráni rásť? (pomenujte aspoň 3 a 3 veci)
★ Na koniec si ako skupina vyberte 1 vec, čo pomáha a 1 vec, čo v raste zrnku bráni

PS: Inak viete, že celá Narnia vyrástla z jedného malého semienka?!`
  },

  {
    id: 'pr-ranna-uto',
    dayRef: 'utorok',
    title: 'Ranná modlitba — Edmund',
    character: 'Edmund',
    quote: 'Nie všetko, čo sa zdá na prvý pohľad dobré, aj dobré je.',
    text: `Podobenstvo o — (doplní sa)`
  },

  {
    id: 'pr-ranna-str',
    dayRef: 'streda',
    title: 'Ranná modlitba — Peter',
    character: 'Peter',
    quote: 'Obklopení dobrom môžeme bojovať proti zlu.',
    text: `Podobenstvo o — (doplní sa)`
  },

  {
    id: 'pr-ranna-stv',
    dayRef: 'stvrtok',
    title: 'Ranná modlitba — Susan',
    character: 'Susan',
    quote: 'Konfrontujme svoju vieru v dennodenných rozhodnutiach: Pre čo sa rozhodnem ja? Lucy sa už rozhodla.',
    text: `Podobenstvo o — (doplní sa)`
  },

  {
    id: 'pr-ranna-pia',
    dayRef: 'piatok',
    title: 'Ranná modlitba — Aslan',
    character: 'Aslan',
    quote: 'Máš odvahu zastať sa iných, si pripravený/á priniesť obetu?',
    text: `Podobenstvo o — (doplní sa)`
  },

  {
    id: 'pr-ranna-sob',
    dayRef: 'sobota',
    title: 'Ranná modlitba — Narnia a svet doma',
    character: 'Narnia a svet doma',
    quote: 'Veci sa nikdy nedejú rovnakým spôsobom dvakrát!',
    text: `Podobenstvo o — (doplní sa)`
  },

  // ── VEČERNÉ MODLITBY ──────────────────────────────────────────────────────

  {
    id: 'pr-vecerna-pon',
    dayRef: 'pondelok',
    title: 'Večerná modlitba',
    text: `Pane, ďakujeme za dnešný deň plný hier, smiechu a stretnutí. Odpusť nám, keď sme niekoho zranili, a pomôž nám zajtra byť lepšími. Daj nám pokojnú noc. Amen.`
  },

  {
    id: 'pr-vecerna-uto',
    dayRef: 'utorok',
    title: 'Večerná modlitba',
    text: `Ďakujeme za každý smiech, za každý objatí, za každé dobré slovo. Keď sme zlyhali, vieš o tom. Odpusť nám a veď nás ďalej. Amen.`
  }
];
