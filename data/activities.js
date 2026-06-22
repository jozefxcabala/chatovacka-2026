// ─────────────────────────────────────────────────────────────────────────────
// AKTIVITY TÁBORA
//
// Každá aktivita má:
//   id              — unikátny identifikátor (napr. 'pon-pokladovka')
//   name            — názov aktivity
//   dayRef          — ID dňa (z days.js)
//   timeLabel       — štítok času (Doobedu / Poobedie / Večer / Nočná hra)
//   timeOfDay       — interný kód času: 'morning' | 'afternoon' | 'evening' | 'night'
//   type            — 'activity' | 'scenka'
//   time            — čas začiatku (HH:MM)
//   endTime         — čas konca (HH:MM alebo null)
//   location        — miesto konania
//   description     — popis aktivity (pozri nižšie ako písať dlhý text)
//   vedúciDna       — meno vedúceho dňa
//   vedúciProgramu  — meno vedúceho programu (alebo null)
//   animators       — pole { name, role? }
//   animatorsNote   — poznámka k animátorom (napr. 'Cca 10 animátorov')
//   materials       — pole stringov: pomôcky
//   hasScoring      — true ak aktivita má hodnotenie
//   scoring         — popis hodnotenia (alebo null)
//   hasMtzNote      — true ak je MTZ poznámka
//   mtzNote         — MTZ poznámka (alebo null)
//
// ─────────────────────────────────────────────────────────────────────────────
// AKO PÍSAŤ DLHÝ TEXT AKTIVITY (pole `description`)
//
// Použi multiline template string (backtick). Formát textu:
//
//   Normálny odsek — každá neprázdna línia je odsek.
//   Prázdny riadok oddeľuje odseky.
//
//   ## Nadpis sekcie
//   (riadok začínajúci ## je podnadpis)
//
//   - položka zoznamu
//   - ďalšia položka
//   (riadky začínajúce "- " sú zoznam)
//
// Príklad:
//   description: `
//   Skupinky hľadajú poklad podľa mapy.
//
//   ## Priebeh
//   - skupinky dostanú prvú indíciu
//   - postupne hľadajú ďalšie body
//   - cieľom je nájsť truhlicu
//
//   ## Poznámky
//   Dávaj pozor, aby deti nevybehli mimo priestoru.
//   `
//
// AKO PÍSAŤ POMÔCKY (pole `materials`)
//   Každá pomôcka je samostatný string v poli:
//   materials: [
//     'Mapa pokladu – 1 ks / skupinka',
//     'Tašky na poklad – 10 ks'
//   ]
// ─────────────────────────────────────────────────────────────────────────────

export const activities = [

  // ── PONDELOK ──────────────────────────────────────────────────────────────

  {
    id: 'pon-pokladovka',
    name: 'Pokladovka',
    dayRef: 'pondelok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:00',
    endTime: '10:30',
    location: 'Areál chatovačky',
    description: `
Skupinky hľadajú poklad podľa mapy a plnia úlohy na stanovištiach.
    `,
    vedúciDna: 'Čaby',
    vedúciProgramu: null,
    animators: [],
    animatorsNote: 'Animátori pri skupinkách',
    materials: [
      'Mapa pokladu – 1 ks / skupinka',
      'Predmety na stanovištiach (podľa plánu)',
      'Tašky na poklad – 10 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'pon-zoznamovacky',
    name: 'Zoznamovačky',
    dayRef: 'pondelok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '10:30',
    endTime: '12:00',
    location: 'Areál chatovačky',
    description: `
Hry na zoznámenie – skupinky sa spoznávajú navzájom aj s animátormi.
    `,
    vedúciDna: 'Čaby',
    vedúciProgramu: null,
    animators: [],
    animatorsNote: 'Animátori pri skupinkách',
    materials: [
      'Nálepky so menami – 80 ks',
      'Kartičky na hry – 1 sada'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'pon-skrinia',
    name: 'Objavenie skrine',
    dayRef: 'pondelok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:30',
    endTime: '17:00',
    location: 'Lúka pri chatovačke',
    description: `
Hlavná aktivita prvého dňa. Skupinky plnia hádanky a úlohy, ktoré ich vedú k objaveniu šatníka do Narnie.

## Rozdelenie rolí
- každá skupinka má priradený behač a hádankára
- behač nosí riešenia medzi stanoviskami
- hádankár číta a rieši úlohy so skupinkou

## Záver
Po nájdení šatníka skupinky prejdú symbolickým vstupom do Narnie – spoločnou scénkou alebo gestom.
    `,
    vedúciDna: 'Čaby',
    vedúciProgramu: 'Mathias',
    animators: [
      { name: 'Mathias',           role: 'Hádanky' },
      { name: 'Nina',              role: 'Hádanky' },
      { name: 'Paulínka Harajdová', role: 'Hádanky' },
      { name: 'Marína Holubová',   role: 'Hádanky' },
      { name: 'Kika Ondisková',    role: 'Hádanky' },
      { name: 'Adam Paško',        role: 'Behač'   },
      { name: 'Hanka',             role: 'Behač'   },
      { name: 'Erika',             role: 'Behač'   },
      { name: 'Dianka Salanciová', role: 'Behač'   },
      { name: 'Ondrej Mocák',      role: 'Behač'   },
      { name: 'Maroš',             role: 'Behač'   },
      { name: 'Filip',             role: 'Behač'   },
      { name: 'Barborka Bobaľová', role: 'Behač'   },
      { name: 'Patrik Pekarovič',  role: 'Behač'   }
    ],
    animatorsNote: '5 hádankárov + 9 behačov',
    materials: [
      'Šatník (rekvizita) – 1 ks',
      'Krabice s hádankami – 5 ks',
      'Balíky s bodmi – 14 ks',
      'Píšťalky – 2 ks'
    ],
    hasScoring: true,
    scoring: '1. miesto = 5 bodov, 2. = 3, 3. = 2, ostatní = 1 bod',
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'pon-scenky',
    name: 'Scénky skupiniek s Tumnusom',
    dayRef: 'pondelok',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'scenka',
    time: '20:00',
    endTime: '21:30',
    location: 'Záhrada / altánok',
    description: `
Každá skupinka predvedie krátku scénku s Tumnusom ako ústrednou postavou.
    `,
    vedúciDna: 'Čaby',
    vedúciProgramu: null,
    animators: [],
    animatorsNote: 'Animátor pri každej skupinke',
    materials: [],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'pon-utok',
    name: 'Útek z Narnie pred čarodejnicou',
    dayRef: 'pondelok',
    timeLabel: 'Nočná hra',
    timeOfDay: 'night',
    type: 'activity',
    time: '22:00',
    endTime: '00:00',
    location: 'Areál chatovačky + les',
    description: `
Nočná hra – deti utekajú pred čarodejnicou a jej sluhami. Animátori hrajú sluhov a snažia sa chytať deti.
    `,
    vedúciDna: 'Čaby',
    vedúciProgramu: 'Nika',
    animators: [
      { name: 'Nika' }, { name: 'Janko' }, { name: 'Ema' }, { name: 'Maroš' },
      { name: 'Patrik Bača' }, { name: 'Boris Surničin' }, { name: 'Janko Katkovčin' },
      { name: 'Filip Sukeľ' }, { name: 'Dano Chripák' }, { name: 'Peter Greňo' }
    ],
    animatorsNote: 'Cca 10 animátorov',
    materials: [
      'Baterky – 10 ks',
      'Pásky na chytanie – 80 ks',
      'Píšťalky – 5 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── UTOROK ────────────────────────────────────────────────────────────────

  {
    id: 'uto-kralovnou',
    name: 'Program s Kráľovnou',
    dayRef: 'utorok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:30',
    endTime: '12:00',
    location: 'Lúka + ihrisko',
    description: `
Skupinky súťažia na rôznych stanovištiach. Kráľovná (čarodejnica) hodnotí skupinky a rozhoduje o víťazoch.

## Stanovištia
- futbal
- vzduchovka
- cornhole
- meta
    `,
    vedúciDna: null,
    vedúciProgramu: 'Čaby',
    animators: [
      { name: 'Tomáš Blaha',         role: 'Lúka'       },
      { name: 'Josky',               role: 'Vzduchovka' },
      { name: 'Dano Chripák',        role: 'Vzduchovka' },
      { name: 'Patrik Pekarovič'                        },
      { name: 'Paulínka Katkovčinová'                   },
      { name: 'Čaby',                role: 'Futbal'     },
      { name: 'Adam Paško',          role: 'Cornhole'   },
      { name: 'Nina',                role: 'Meta'       },
      { name: 'Nika',                role: 'Meta'       },
      { name: 'Marína Holubová'                         },
      { name: 'Kika Olajošová'                          },
      { name: 'Kika Pichonská'                          },
      { name: 'Paulínka Harajdová'                      },
      { name: 'Peťo Hanzal'                             },
      { name: 'Ajka'                                    },
      { name: 'Sofia Dolobačová'                        },
      { name: 'Mathias'                                 },
      { name: 'Filip G.'                                }
    ],
    animatorsNote: 'Cca 17 animátorov',
    materials: [
      'Lopty (futbal) – 2 ks',
      'Cornhole sada – 1 sada',
      'Kužele (Meta) – 20 ks'
    ],
    hasScoring: true,
    scoring: 'Bodujú jednotlivé stanovištia – vedúci stanovišťa zaznamenáva výsledky.',
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'uto-lucy-edmund',
    name: 'Lucy vs Edmund',
    dayRef: 'utorok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:30',
    endTime: '17:00',
    location: 'Areál chatovačky',
    description: `
Skupinky sú rozdelené na tím Lucy a tím Edmunda. Plnia úlohy u majstrov, nakupujú u obchodníka a súťažia o najlepšie výsledky.
    `,
    vedúciDna: null,
    vedúciProgramu: 'Ondrej Mocák',
    animators: [
      { name: 'Ondrej Mocák',     role: 'Kontrolor'  },
      { name: 'Kika Ondisková',   role: 'Majster'    },
      { name: 'Nika',             role: 'Majster'    },
      { name: 'Erika',            role: 'Majster'    },
      { name: 'Janko Falát',      role: 'Majster'    },
      { name: 'Filip Sukeľ',      role: 'Majster'    },
      { name: 'Adam Paško',       role: 'Obchodník'  },
      { name: 'Hanka',            role: 'Stanovište' },
      { name: 'Nina',             role: 'Stanovište' },
      { name: 'Patrik Bača',      role: 'Stanovište' }
    ],
    animatorsNote: '5 majstrov, 1 obchodník, 3 stanovištia, 1 kontrolor',
    materials: [
      'Žetóny / body – 200 ks',
      'Stôl pre obchodníka – 1 ks',
      'Tovar (rekvizity) – 1 sada'
    ],
    hasScoring: true,
    scoring: 'Tím s najviac bodmi od obchodníka na konci vyhráva.',
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'uto-tumnus',
    name: 'Tumnus zmizol',
    dayRef: 'utorok',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'activity',
    time: '20:00',
    endTime: '21:30',
    location: 'Stanivská + altánok',
    description: `
Dramatická večerná aktivita – deti zistia, že Tumnus zmizol. Hľadajú stopy a riešia záhadu jeho zmiznutia.
    `,
    vedúciDna: null,
    vedúciProgramu: 'Braňo Kováč',
    animators: [
      { name: 'Braňo Kováč',       role: 'Stanivská' },
      { name: 'Dianka Salanciová', role: 'Stanivská' },
      { name: 'Boris Surničin',    role: 'Stanivská' },
      { name: 'Mathias',           role: 'Stanivská' },
      { name: 'Peťo Hanzal',       role: 'Stanivská' },
      { name: 'Patrik Pekarovič',  role: 'Stanivská' },
      { name: 'Nina',              role: 'Altánok'   }
    ],
    animatorsNote: '7 animátorov',
    materials: [
      'Sviečky – 20 ks',
      'Reproduktor – 1 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── STREDA ────────────────────────────────────────────────────────────────

  {
    id: 'str-vylet',
    name: 'Výlet – stanoviská',
    dayRef: 'streda',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:00',
    endTime: '12:00',
    location: 'Trasa okolo chatovačky',
    description: `
Skupinky prechádzajú trasu s 8 stanoviskami. Na každom stanovisku na nich čakajú postavy z Narnie a úlohy.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [
      { name: 'Kika Ondisková', role: 'Líška'    },
      { name: 'Ľuboš',         role: 'Mikuláš'  },
      { name: 'Boris Surničin', role: 'Maugrim'  },
      { name: 'Pali P.',        role: 'Bobor'    },
      { name: 'Števo SDB',      role: 'Kentaur'  }
    ],
    animatorsNote: '8 stanovísk (MTZ doplní zoznam)',
    materials: [
      'Mapy trasy – 10 ks',
      'Karty stanovísk – 8 sád',
      'Pečiatky / razidlá – 8 ks'
    ],
    hasScoring: true,
    scoring: 'Skupinky zbierajú pečiatky – čím viac, tým lepšie.',
    hasMtzNote: true,
    mtzNote: 'MTZ doplní zoznam animátorov na jednotlivé stanoviská.'
  },

  {
    id: 'str-obnova',
    name: 'Duchovná obnova',
    dayRef: 'streda',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:30',
    endTime: '17:00',
    location: 'Kaplnka / záhrada',
    description: `
Deň duchovného stíšenia. Program vedie kňaz alebo duchovný sprevádzateľ.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [],
    animatorsNote: null,
    materials: [],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'str-hladanie',
    name: 'Hľadanie Edmunda',
    dayRef: 'streda',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'activity',
    time: '20:00',
    endTime: '22:00',
    location: 'Areál chatovačky',
    description: `
Edmund je nezvestný a skupinky ho musia nájsť.

## Rozdelenie animátorov
- jedna skupina animátorov chytá deti
- druhá skupinka utečencov pomáha deťom dostať sa k cieľu
    `,
    vedúciDna: null,
    vedúciProgramu: 'Kika Ondisková',
    animators: [
      { name: 'Kika Ondisková',        role: 'Chytanie' },
      { name: 'Peťo Hanzal',           role: 'Chytanie' },
      { name: 'Nika',                  role: 'Chytanie' },
      { name: 'Maroš',                 role: 'Chytanie' },
      { name: 'Filip',                 role: 'Chytanie' },
      { name: 'Barborka Bobaľová',     role: 'Chytanie' },
      { name: 'Patrik Bača',           role: 'Chytanie' },
      { name: 'Janko Falát',           role: 'Chytanie' },
      { name: 'Filip Sukeľ',           role: 'Chytanie' },
      { name: 'Paulínka Katkovčinová', role: 'Chytanie' },
      { name: 'Hanka',                 role: 'Beh'      },
      { name: 'Paulínka Harajdová',    role: 'Beh'      },
      { name: 'Boris Surničin',        role: 'Beh'      },
      { name: 'Dano Chripák',          role: 'Beh'      },
      { name: 'Janko Katkovčin',       role: 'Beh'      }
    ],
    animatorsNote: '10 chytajúcich + 5 utečencov',
    materials: [
      'Baterky – 15 ks',
      'Pásky – 80 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── ŠTVRTOK ───────────────────────────────────────────────────────────────

  {
    id: 'stv-trening',
    name: 'Tréning',
    dayRef: 'stvrtok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:30',
    endTime: '12:00',
    location: 'Ihrisko',
    description: `
Skupinky sa pripravujú na záverečnú bitku. Tréning bojových zručností a tímovej spolupráce.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [],
    animatorsNote: '15+ animátorov (zoznam doplniť)',
    materials: [
      'Rekvizity na boj – 1 sada',
      'Lopty – 4 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: true,
    mtzNote: 'MTZ doplní rozdelenie animátorov.'
  },

  {
    id: 'stv-aslan',
    name: 'Stretnutie Aslan & čarodejnica',
    dayRef: 'stvrtok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'scenka',
    time: '14:30',
    endTime: '16:00',
    location: 'Lúka',
    description: `
Kľúčová scénka tábora – Aslan a Biela čarodejnica sa stretávajú a uzatvárajú zmluvu. Deti sú svedkami.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [
      { name: 'MTZ',                   role: 'Armáda čarodejníc' },
      { name: 'Adam Paško',            role: 'Ločkár'            },
      { name: 'Nina',                  role: 'Ločkár'            },
      { name: 'Patrik Pekarovič',      role: 'Ločkár'            },
      { name: 'Barborka Kridlová',     role: 'Ločkár'            },
      { name: 'Paulínka Katkovčinová', role: 'Ločkár'            }
    ],
    animatorsNote: null,
    materials: [],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'stv-obeta',
    name: 'Obeta za Narniu',
    dayRef: 'stvrtok',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'activity',
    time: '20:00',
    endTime: '22:00',
    location: 'Celý areál',
    description: `
Dramatická nočná aktivita – deti sú stratené v Narnii a musia nájsť cestu späť. Animátori ako strašiaci ich vedú na správnu cestu.
    `,
    vedúciDna: null,
    vedúciProgramu: 'Adam Paško',
    animators: [
      { name: 'Paulínka Harajdová',    role: 'Strašiak' },
      { name: 'Marína Holubová',       role: 'Strašiak' },
      { name: 'Nika',                  role: 'Strašiak' },
      { name: 'Bašká B.',              role: 'Strašiak' },
      { name: 'Tomáš Blaha',           role: 'Strašiak' },
      { name: 'Adam Paško',            role: 'Strašiak' },
      { name: 'Ondrej Mocák',          role: 'Stratený' },
      { name: 'Hanka',                 role: 'Stratený' },
      { name: 'Ema',                   role: 'Stratený' },
      { name: 'Patrik Pekarovič',      role: 'Stratený' },
      { name: 'Filip',                 role: 'Stratený' },
      { name: 'Ajka',                  role: 'Stratený' },
      { name: 'Mathias',               role: 'Stratený' },
      { name: 'Peter Greňo',           role: 'Stratený' },
      { name: 'Kika Olajošová',        role: 'Stratený' },
      { name: 'Barborka Kridlová',     role: 'Stratený' },
      { name: 'Sofia Dolobačová',      role: 'Stratený' },
      { name: 'Patrik Bača',           role: 'Stratený' },
      { name: 'Janko Falát',           role: 'Stratený' },
      { name: 'Paulínka Katkovčinová', role: 'Stratený' }
    ],
    animatorsNote: '20 animátorov',
    materials: [
      'Baterky – 20 ks',
      'Kostýmy strašiakov – 6 ks',
      'Reproduktor – 1 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'stv-skuska',
    name: 'Skúška odvahy',
    dayRef: 'stvrtok',
    timeLabel: 'Nočná',
    timeOfDay: 'night',
    type: 'activity',
    time: '23:00',
    endTime: '00:30',
    location: 'Les + areál',
    description: `
Skúška odvahy pre skupinky – každá skupinka prechádza trasou v tme.
    `,
    vedúciDna: null,
    vedúciProgramu: 'David',
    animators: [
      { name: 'David' }, { name: 'Filip' }, { name: 'Dano Chripák' },
      { name: 'Boris Surničin' }, { name: 'Braňo Kováč' },
      { name: 'Dianka Salanciová' }, { name: 'Kika Ondisková' }
    ],
    animatorsNote: '7 animátorov',
    materials: [
      'Baterky – 8 ks',
      'Rekvizity (strach) – 1 sada'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── PIATOK ────────────────────────────────────────────────────────────────

  {
    id: 'pia-priprava',
    name: 'Príprava na vojnu',
    dayRef: 'piatok',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '09:30',
    endTime: '12:00',
    location: 'Ihrisko + okolie',
    description: `
Skupinky sa pripravujú na záverečný boj – maľujú sa, cvičia a budujú tímového ducha.
    `,
    vedúciDna: null,
    vedúciProgramu: 'Patrik Pekarovič',
    animators: [
      { name: 'Patrik Pekarovič',      role: 'NEGÁCIA' },
      { name: 'Janko Katkovčin',       role: 'NEGÁCIA' },
      { name: 'Peter Greňo',           role: 'NEGÁCIA' },
      { name: 'Ondrej Mocák',          role: 'NEGÁCIA' },
      { name: 'Adam Paško',            role: 'NEGÁCIA' },
      { name: 'Barborka Kridlová',     role: 'NEGÁCIA' },
      { name: 'Ema',                   role: 'NEGÁCIA' },
      { name: 'Paulínka Katkovčinová', role: 'NEGÁCIA' },
      { name: 'Sofia Dolobačová',      role: 'NEGÁCIA' }
    ],
    animatorsNote: '15+ animátorov',
    materials: [
      'Rekvizity na vojnu – 1 sada',
      'Farby na tvár – 10 ks'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'pia-boj',
    name: 'Záverečný boj',
    dayRef: 'piatok',
    timeLabel: 'Poobedie',
    timeOfDay: 'afternoon',
    type: 'activity',
    time: '14:30',
    endTime: '17:00',
    location: 'Celý areál',
    description: `
Záverečná bitka o Narniu – všetci animátori a účastníci súťažia v tímovej hre.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [],
    animatorsNote: 'Všetci animátori',
    materials: [
      'Zástavky tímov – 2 ks',
      'Farebné pásky – 80 ks'
    ],
    hasScoring: true,
    scoring: 'Víťazný tím získa bonusové body pre skupinky.',
    hasMtzNote: false,
    mtzNote: null
  },

  {
    id: 'pia-bal',
    name: 'Bál',
    dayRef: 'piatok',
    timeLabel: 'Večer',
    timeOfDay: 'evening',
    type: 'activity',
    time: '20:00',
    endTime: '23:00',
    location: 'Záhrada / jedáleň',
    description: `
Záverečný bál – tanec, súťaže a oslava konca tábora.
    `,
    vedúciDna: null,
    vedúciProgramu: null,
    animators: [],
    animatorsNote: 'Všetci',
    materials: [
      'Dekorácie – 1 sada',
      'Reproduktor – 1 ks',
      'Sviečky / svetlá – 1 sada'
    ],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  },

  // ── SOBOTA ────────────────────────────────────────────────────────────────

  {
    id: 'sob-stretnutie',
    name: 'Záverečné stretnutie animátorov',
    dayRef: 'sobota',
    timeLabel: 'Doobedu',
    timeOfDay: 'morning',
    type: 'activity',
    time: '10:30',
    endTime: '11:30',
    location: 'Záhrada',
    description: `
Záverečné stretnutie celého animátorského tímu – reflexia tábora, poďakovania.
    `,
    vedúciDna: null,
    vedúciProgramu: 'Čaby',
    animators: [],
    animatorsNote: 'Všetci animátori',
    materials: [],
    hasScoring: false,
    scoring: null,
    hasMtzNote: false,
    mtzNote: null
  }

];
