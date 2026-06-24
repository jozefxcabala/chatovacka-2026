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
    thought: 'Začíname dobrodružstvo v Narnii. Srdcia otvorené, oči nahor!',
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
      { time: '19:30', label: 'Večer u pána Tumnusa + scénka príprava na útek', type: 'scenka', activityRef: 'pon-scenky' },
      { time: '21:30', label: 'Nočná hra – útek z Narnie',                  type: 'activity', activityRef: 'pon-utok', note: 'Nočná hra' },
      { time: '22:30', label: 'Modlitba v skupinkách',                      type: 'system'   },
      { time: '23:00', label: 'Večierka deti',                              type: 'system'   },
      { time: '23:00', label: 'Animátorská porada',                         type: 'system'   },
      { time: '00:00', label: 'Večierka animátori',                         type: 'system'   }
    ]
  },
  {
    id: 'utorok', label: 'Utorok', date: '2026-06-30', dayIndex: 2,
    thought: 'Edmund vstupuje do temnoty. My vstupujeme do svetla.',
    thoughtAuthor: null,
    vedúciDna: 'Miška',
    schedule: [
      { time: '07:30', label: 'Budenie',              type: 'system'   },
      { time: '08:00', label: 'Raňajky',              type: 'jedlo'    },
      { time: '09:30', label: 'Program s Kráľovnou',  type: 'activity', activityRef: 'uto-kralovnou'   },
      { time: '12:30', label: 'Obed',                 type: 'jedlo'    },
      { time: '14:30', label: 'Lucy vs Edmund',        type: 'activity', activityRef: 'uto-lucy-edmund' },
      { time: '18:00', label: 'Večera',                type: 'jedlo'    },
      { time: '20:00', label: 'Tumnus zmizol',         type: 'activity', activityRef: 'uto-tumnus'      }
    ]
  },
  {
    id: 'streda', label: 'Streda', date: '2026-07-01', dayIndex: 3,
    thought: 'Dbáme o ducha. Deň pokoja a nájdenia sa.',
    thoughtAuthor: null,
    vedúciDna: 'Tomáš Blaha',
    schedule: [
      { time: '07:30', label: 'Budenie',              type: 'system'   },
      { time: '08:00', label: 'Raňajky',              type: 'jedlo'    },
      { time: '09:00', label: 'Výlet',                type: 'activity', activityRef: 'str-vylet'   },
      { time: '12:30', label: 'Obed',                 type: 'jedlo'    },
      { time: '14:30', label: 'Duchovná obnova',      type: 'activity', activityRef: 'str-obnova'  },
      { time: '18:00', label: 'Večera',               type: 'jedlo'    },
      { time: '20:00', label: 'Hľadanie Edmunda',     type: 'activity', activityRef: 'str-hladanie' }
    ]
  },
  {
    id: 'stvrtok', label: 'Štvrtok', date: '2026-07-02', dayIndex: 4,
    thought: 'Aslan dáva život. My sme jeho odraz.',
    thoughtAuthor: null,
    vedúciDna: 'Čaby',
    schedule: [
      { time: '07:30', label: 'Budenie',                         type: 'system'   },
      { time: '08:00', label: 'Raňajky',                         type: 'jedlo'    },
      { time: '09:30', label: 'Príprava na vojnu',               type: 'activity', activityRef: 'stv-trening' },
      { time: '12:30', label: 'Obed',                            type: 'jedlo'    },
      { time: '14:00', label: 'Stretnutie Aslan & čarodejnica',  type: 'activity', activityRef: 'stv-aslan'   },
      { time: '18:00', label: 'Večera',                          type: 'jedlo'    },
      { time: '20:00', label: 'Obeta za Narniu',                 type: 'activity', activityRef: 'stv-obeta'   },
      { time: '23:00', label: 'Skúška odvahy',                   type: 'activity', activityRef: 'stv-skuska', note: 'Nočná' }
    ]
  },
  {
    id: 'piatok', label: 'Piatok', date: '2026-07-03', dayIndex: 5,
    thought: 'Finálna bitka. Narnia bude slobodná!',
    thoughtAuthor: null,
    vedúciDna: 'Ajka',
    schedule: [
      { time: '07:30', label: 'Budenie',          type: 'system'   },
      { time: '08:00', label: 'Raňajky',          type: 'jedlo'    },
      { time: '09:30', label: 'Príprava na vojnu', type: 'activity', activityRef: 'pia-priprava' },
      { time: '12:30', label: 'Obed',              type: 'jedlo'    },
      { time: '14:30', label: 'Záverečný boj',     type: 'activity', activityRef: 'pia-boj'      },
      { time: '18:00', label: 'Večera',            type: 'jedlo'    },
      { time: '20:00', label: 'Bál',               type: 'activity', activityRef: 'pia-bal'      }
    ]
  },
  {
    id: 'sobota', label: 'Sobota', date: '2026-07-04', dayIndex: 6,
    thought: 'Koniec je začiatok. Narnia žije v nás.',
    thoughtAuthor: null,
    vedúciDna: null,
    schedule: [
      { time: '07:30', label: 'Budenie',                          type: 'system'   },
      { time: '08:00', label: 'Raňajky',                          type: 'jedlo'    },
      { time: '09:00', label: 'Upratovanie',                      type: 'system'   },
      { time: '10:30', label: 'Záverečné stretnutie animátorov',  type: 'activity', activityRef: 'sob-stretnutie' },
      { time: '12:00', label: 'Obed a rozchod',                   type: 'jedlo'    }
    ]
  }
];
