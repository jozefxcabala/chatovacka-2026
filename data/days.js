// ─────────────────────────────────────────────────────────────────────────────
// DNI TÁBORA
//
// Každý deň má:
//   id          — identifikátor (pondelok, utorok, …)
//   label       — zobrazovaný názov dňa
//   date        — dátum (YYYY-MM-DD)
//   dayIndex    — poradové číslo dňa tábora
//   thought     — citát / myšlienka dňa
//   thoughtAuthor — autor citátu (alebo null)
//   vedúciDna   — meno vedúceho dňa (alebo null)
//   schedule    — zoznam položiek programu dňa:
//     { time, label, type, activityRef?, note? }
//     type: 'system' | 'jedlo' | 'activity' | 'scenka'
//     activityRef: ID aktivity z activities.js (optional)
// ─────────────────────────────────────────────────────────────────────────────

export const days = [
  {
    id: 'pondelok', label: 'Pondelok', date: '2026-06-29', dayIndex: 1,
    thought: 'Veci sa nikdy neudejú rovnakým spôsobom dvakrát',
    thoughtAuthor: null,
    vedúciDna: 'Marta, Josky',
    schedule: [
      { time: '07:30', label: 'Animátori – nástup na parkovisko',           type: 'system'   },
      { time: '08:00', label: 'Stretnutie na parkovisku pri mestskej hale', type: 'system'   },
      { time: '08:30', label: 'Odchod autobusu, cesta a vyloženie batožiny', type: 'system'  },
      { time: '10:30', label: 'Privítanie + pokladovka + výroba erbov',     type: 'activity', activityRef: 'pon-pokladovka'   },
      { time: '11:15', label: 'Zoznamovačky',                               type: 'activity', activityRef: 'pon-zoznamovacky' },
      { time: '12:00', label: 'Stretko',                                    type: 'activity' },
      { time: '12:30', label: 'Obed',                                       type: 'jedlo'    },
      { time: '14:30', label: 'Schovávačka + olovrant',                     type: 'activity', activityRef: 'pon-schovavacka'  },
      { time: '15:45', label: 'Hľadanie skrine',                            type: 'activity', activityRef: 'pon-skrinia'      },
      { time: '16:30', label: 'Scénka: Lucy sa stretáva s Tumnusom',        type: 'scenka'   },
      { time: '17:00', label: 'Omša',                                       type: 'system'   },
      { time: '18:00', label: 'Večera',                                     type: 'jedlo'    },
      { time: '19:00', label: 'Voľno',                                      type: 'system'   },
      { time: '20:00', label: 'Večer u pána Tumnusa + scénka príprava na útek', type: 'scenka', activityRef: 'pon-scenky' },
      { time: '21:30', label: 'Nočná hra – útek z Narnie',                  type: 'activity', activityRef: 'pon-utok', note: 'Nočná hra' },
      { time: '22:30', label: 'Modlitba v skupinkách',                      type: 'system'   },
      { time: '23:30', label: 'Večierka deti',                              type: 'system'   },
      { time: '23:00', label: 'Animátorská porada',                         type: 'system'   },
      { time: '00:00', label: 'Večierka animátori',                         type: 'system'   }
    ]
  },
  {
    id: 'utorok', label: 'Utorok', date: '2026-06-30', dayIndex: 2,
    thought: 'Nie všetko, čo sa zdá na prvý pohľad dobré, aj dobré je!',
    thoughtAuthor: null,
    vedúciDna: 'Miška',
    schedule: [
      { time: '07:15', label: 'Modlitby animátorov',   type: 'system'   },
      { time: '07:30', label: 'Budenie',               type: 'system'   },
      { time: '07:45', label: 'Rozcvička',             type: 'system'   },
      { time: '08:00', label: 'Raňajky',               type: 'jedlo'    },
      { time: '08:30', label: 'Modlitby',              type: 'system',   prayerRef: 'pr-ranna-uto' },
      { time: '09:00', label: 'Program s Kráľovnou',   type: 'activity', activityRef: 'uto-kralovnou'   },
      { time: '12:30', label: 'Obed',                  type: 'jedlo'    },
      { time: '14:30', label: 'Lucy vs Edmund',         type: 'activity', activityRef: 'uto-lucy-edmund' },
      { time: '17:00', label: 'Omša',                  type: 'system'   },
      { time: '18:00', label: 'Večera',                 type: 'jedlo'    },
      { time: '19:00', label: 'Voľno',                  type: 'system'   },
      { time: '19:30', label: 'Stretko',                type: 'activity' },
      { time: '20:00', label: 'Tumnus zmizol',          type: 'activity', activityRef: 'uto-tumnus'      },
      { time: '21:30', label: 'Modlitba v skupinkách',  type: 'system'   },
      { time: '22:30', label: 'Animátorská porada',     type: 'system'   },
      { time: '23:00', label: 'Večierka deti',          type: 'system'   },
      { time: '00:00', label: 'Večierka animátori',     type: 'system'   }
    ]
  },
  {
    id: 'streda', label: 'Streda', date: '2026-07-01', dayIndex: 3,
    thought: 'Obklopení dobrom môžeme bojovať proti zlu.',
    thoughtAuthor: null,
    vedúciDna: 'Tomáš Blaha',
    schedule: [
      { time: '07:15', label: 'Modlitby animátorov',   type: 'system'   },
      { time: '07:30', label: 'Budenie',               type: 'system'   },
      { time: '07:45', label: 'Rozcvička',             type: 'system'   },
      { time: '08:00', label: 'Raňajky',               type: 'jedlo'    },
      { time: '08:30', label: 'Modlitby',              type: 'system',   prayerRef: 'pr-ranna-str' },
      { time: '09:00', label: 'Výlet',                 type: 'activity', activityRef: 'str-vylet'   },
      { time: '12:30', label: 'Obed',                  type: 'jedlo'    },
      { time: '14:30', label: 'Duchovná obnova',       type: 'activity', activityRef: 'str-obnova'  },
      { time: '17:00', label: 'Omša',                  type: 'system'   },
      { time: '18:00', label: 'Večera',                type: 'jedlo'    },
      { time: '19:00', label: 'Voľno',                 type: 'system'   },
      { time: '20:00', label: 'Hľadanie Edmunda',      type: 'activity', activityRef: 'str-hladanie' },
      { time: '22:00', label: 'Modlitba v skupinkách', type: 'system'   },
      { time: '22:30', label: 'Animátorská porada',    type: 'system'   },
      { time: '23:00', label: 'Večierka deti',         type: 'system'   },
      { time: '00:00', label: 'Večierka animátori',    type: 'system'   }
    ]
  },
  {
    id: 'stvrtok', label: 'Štvrtok', date: '2026-07-02', dayIndex: 4,
    thought: 'Konfrontujem svoju vieru v dennodenných rozhodnutiach. Pre čo sa rozhodnem ja? Lucy sa už rozhodla!',
    thoughtAuthor: null,
    vedúciDna: 'Čaby',
    schedule: [
      { time: '07:15', label: 'Modlitby animátorov',             type: 'system'   },
      { time: '07:30', label: 'Budenie',                         type: 'system'   },
      { time: '07:45', label: 'Rozcvička',                       type: 'system'   },
      { time: '08:00', label: 'Raňajky',                         type: 'jedlo'    },
      { time: '08:30', label: 'Modlitby',                       type: 'system',   prayerRef: 'pr-ranna-stv' },
      { time: '09:00', label: 'Príprava na vojnu',               type: 'activity', activityRef: 'stv-trening' },
      { time: '11:30', label: 'Veľkolepý zápas starších členov armády vo futbale a méte (?)', type: 'activity' },
      { time: '12:30', label: 'Obed',                            type: 'jedlo'    },
      { time: '14:00', label: 'Stretnutie Aslan & čarodejnica',  type: 'activity', activityRef: 'stv-aslan'   },
      { time: '17:00', label: 'Omša',                            type: 'system'   },
      { time: '18:00', label: 'Večera',                          type: 'jedlo'    },
      { time: '19:00', label: 'Voľno',                           type: 'system'   },
      { time: '19:30', label: 'Stretko',                         type: 'activity' },
      { time: '20:00', label: 'Obeta za Narniu – Vol 1',         type: 'activity', activityRef: 'stv-obeta'   },
      { time: '21:15', label: 'Modlitba v skupinkách',           type: 'system'   },
      { time: '21:45', label: 'Obeta za Narniu – Vol 2',         type: 'activity', activityRef: 'stv-obeta'   },
      { time: '21:45', label: 'Skúška odvahy',                   type: 'activity', activityRef: 'stv-skuska', note: 'Nočná' },
      { time: '23:30', label: 'Animátorská porada',              type: 'system'   },
      { time: '00:00', label: 'Večierka deti',                   type: 'system'   },
      { time: '00:30', label: 'Večierka animátori',              type: 'system'   }
    ]
  },
  {
    id: 'piatok', label: 'Piatok', date: '2026-07-03', dayIndex: 5,
    thought: 'Máš odvahu zastať sa iných? Si pripravený priniesť obetu?',
    thoughtAuthor: null,
    vedúciDna: 'Ajka',
    schedule: [
      { time: '07:15', label: 'Modlitby animátorov',   type: 'system'   },
      { time: '07:30', label: 'Budenie',               type: 'system'   },
      { time: '07:45', label: 'Rozcvička',             type: 'system'   },
      { time: '08:00', label: 'Raňajky',               type: 'jedlo'    },
      { time: '08:30', label: 'Modlitby',              type: 'system',   prayerRef: 'pr-ranna-pia' },
      { time: '09:00', label: 'Príprava na vojnu',     type: 'activity', activityRef: 'pia-priprava' },
      { time: '12:30', label: 'Obed',                  type: 'jedlo'    },
      { time: '14:00', label: 'Stretko',               type: 'activity' },
      { time: '14:30', label: 'Záverečný boj',         type: 'activity', activityRef: 'pia-boj'      },
      { time: '17:00', label: 'Omša',                  type: 'system'   },
      { time: '18:00', label: 'Večera',                type: 'jedlo'    },
      { time: '19:00', label: 'Voľno',                 type: 'system'   },
      { time: '20:00', label: 'Bál (+ vyhodnotenie)',          type: 'activity', activityRef: 'pia-bal' },
      { time: '22:30', label: 'Fotky + modlitby',            type: 'system'   },
      { time: '23:00', label: 'Animátorská porada',          type: 'system'   },
      { time: '23:30', label: 'Večierka deti',               type: 'system'   },
      { time: '00:00', label: 'Večierka animátori',          type: 'system'   }
    ]
  },
  {
    id: 'sobota', label: 'Sobota', date: '2026-07-04', dayIndex: 6,
    thought: 'Koniec je začiatok. Narnia žije v nás.',
    thoughtAuthor: null,
    vedúciDna: null,
    schedule: [
      { time: '07:15', label: 'Modlitby animátorov',               type: 'system'   },
      { time: '07:30', label: 'Budíček',                           type: 'system'   },
      { time: '07:45', label: 'Rozcvička',                        type: 'system'   },
      { time: '08:00', label: 'Raňajky',                          type: 'jedlo'    },
      { time: '08:30', label: 'Modlitby',                         type: 'system',   prayerRef: 'pr-ranna-sob' },
      { time: '09:00', label: 'Upratovanie a balenie',            type: 'system'   },
      { time: '09:30', label: 'Omša',                             type: 'system'   },
      { time: '10:15', label: 'Fotenie + vyhodnotenie',           type: 'system'   },
      { time: '10:30', label: 'Odkazovačka',                      type: 'activity' },
      { time: '12:00', label: 'Odchod',                           type: 'system'   }
    ]
  }
];
