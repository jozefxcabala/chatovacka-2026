// ─────────────────────────────────────────────────────────────────────────────
// SKUPINKY — prehľadová tabuľka a zoznamy členov
// ─────────────────────────────────────────────────────────────────────────────

export const groupsOverview = [
  {
    grade:          '4.–5. ročník',
    boys:           'Trpaslíci',
    girls:          'Nymfy (riečky)',
    color:          'Fialová',
    colorHex:       '#8b6dc4',
    boysAnimators:  ['Patrik Pekarovič', 'Dávid Krivjanský'],
    girlsAnimators: ['Barborka Kridlová', 'Paulínka Harajdová', 'Marína Holubová']
  },
  {
    grade:          '6. ročník (+ časť 5.)',
    boys:           'Orli',
    girls:          'Flóry',
    color:          'Ružová',
    colorHex:       '#d46090',
    boysAnimators:  ['Peter Greňo', 'Maroš Barňák'],
    girlsAnimators: ['Barborka Bobaľová', 'Kika Olajošová', 'Nina Radová']
  },
  {
    grade:          '7. ročník',
    boys:           'Jazvce',
    girls:          'Foresty',
    color:          'Zelená',
    colorHex:       '#3aaa72',
    boysAnimators:  ['Ján Katkovčin', 'Ján Falát'],
    girlsAnimators: ['Erika Ficíková', 'Kika Pichonská', 'Ema Taňkošová']
  },
  {
    grade:          '8. ročník',
    boys:           'Kentauri',
    girls:          'Dryády',
    color:          'Hnedá/Bordová',
    colorHex:       '#a05030',
    boysAnimators:  ['Ondrej Mocák', 'Mathias Mastiľák'],
    girlsAnimators: ['Hana Procházková', 'Pavlínka Katkovčinová']
  },
  {
    grade:          '8.–9. ročník',
    boys:           'Kyklopi',
    girls:          'Najády (oceán)',
    color:          'Modrá',
    colorHex:       '#4a80c4',
    boysAnimators:  ['Filip Goffa', 'Adam Paško'],
    girlsAnimators: ['Sofia Dolobačová', 'Dianka Salanciová']
  }
];

// Každý člen: { name: string, shirtSize: string }
export const girlsGroupDetails = [
  {
    id:        'nymfy',
    name:      'Nymfy (riečky)',
    grade:     '4.–5. ročník',
    color:     'Fialová',
    colorHex:  '#8b6dc4',
    animators: ['Barbora Kríd', 'Paulínka Haraj', 'Marína Holubová'],
    members:   [
      { name: 'Karin Helmecioná',   shirtSize: '152 (158)' },
      { name: 'Kristína Pančurová', shirtSize: '152'       },
      { name: 'Eliška Salanciová',  shirtSize: '146'       },
      { name: 'Karolína Dunajová',  shirtSize: '134'       },
      { name: 'Barbora Dunajová',   shirtSize: '134'       },
      { name: 'Barbora Mikitová',   shirtSize: '164'       },
      { name: 'Daška (UA)',         shirtSize: 'XS'        },
      { name: 'Ema Maturová',       shirtSize: '140–146'   },
      { name: 'Ema Fejková',        shirtSize: 'M'         },
      { name: 'Lenka Poljaková',    shirtSize: 'XS/S'      },
      { name: 'Sára Karandošová',   shirtSize: 'S'         },
      { name: 'Zuzka Harakaľová',   shirtSize: '146'       },
      { name: 'Emília Šustová',     shirtSize: '164'       },
    ]
  },
  {
    id:        'flory',
    name:      'Flóry',
    grade:     '6. ročník (+ časť 5.)',
    color:     'Ružová',
    colorHex:  '#d46090',
    animators: ['Barbora Bobaľ', 'Kika Ol', 'Nina Radová'],
    members:   [
      { name: 'Terezka Fajčáková',  shirtSize: 'nemá' },
      { name: 'Hanka Havrilková',   shirtSize: 'L'    },
      { name: 'Majka Jenčíková',    shirtSize: 'M'    },
      { name: 'Evka Vojtúňová',     shirtSize: 'M'    },
      { name: 'Lucia Blahová',      shirtSize: 'M'    },
      { name: 'Tamara Tovarňáková', shirtSize: 'M'    },
      { name: 'Viki Kuľhová',       shirtSize: 'M'    },
      { name: 'Sofia Vu Tu Uyen',   shirtSize: 'XS'   },
      { name: 'Hanka Jamborová',    shirtSize: 'S'    },
      { name: 'Veronika Karoľová',  shirtSize: 'nemá' },
      { name: 'Bibiana Kičiková',   shirtSize: '164'  },
    ]
  },
  {
    id:        'foresty',
    name:      'Foresty',
    grade:     '7. ročník',
    color:     'Zelená',
    colorHex:  '#3aaa72',
    animators: ['Erika Ficíková', 'Kika Pichon', 'Ema Taňkoš'],
    members:   [
      { name: 'Alžbetka Macková',    shirtSize: 'M'    },
      { name: 'Simonka Behúnová',    shirtSize: 'S'    },
      { name: 'Katka Šalatová',      shirtSize: 'M'    },
      { name: 'Hanka Macková',       shirtSize: 'S'    },
      { name: 'Petronela Vajsová',   shirtSize: 'nemá' },
      { name: 'Ester Holubová',      shirtSize: 'XL'   },
      { name: 'Laura Vasilová',      shirtSize: 'L'    },
      { name: 'Katarína Krivjanská', shirtSize: 'S'    },
      { name: 'Michaela Britanová',  shirtSize: 'S'    },
      { name: 'Anna Mária Šepeľová', shirtSize: 'S'    },
    ]
  },
  {
    id:        'dryady',
    name:      'Dryády',
    grade:     '8. ročník',
    color:     'Hnedá/Bordová',
    colorHex:  '#a05030',
    animators: ['Hana Procházková', 'Pavlínka Katkovčin'],
    members:   [
      { name: 'Paulína Lipová',    shirtSize: 'M'    },
      { name: 'Andrea Solejová',   shirtSize: 'nemá' },
      { name: 'Miška Šalatová',    shirtSize: 'M'    },
      { name: 'Tamara Feďová',     shirtSize: 'L'    },
      { name: 'Miriam Lomagová',   shirtSize: 'S'    },
      { name: 'Hanka Surničinová', shirtSize: 'M'    },
      { name: 'Julka Salaková',    shirtSize: 'M'    },
      { name: 'Karin Švigárová',   shirtSize: 'M'    },
      { name: 'Dominika Baníková', shirtSize: 'S'    },
    ]
  },
  {
    id:        'najady',
    name:      'Najády (oceán)',
    grade:     '8.–9. ročník',
    color:     'Modrá',
    colorHex:  '#4a80c4',
    animators: ['Sofia Dolob', 'Dianka Salanci'],
    members:   [
      { name: 'Adela Tkáčová',      shirtSize: 'XS'   },
      { name: 'Lea Kolesárová',     shirtSize: 'S'    },
      { name: 'Katka Procházková',  shirtSize: 'M'    },
      { name: 'Nela Demková',       shirtSize: 'M'    },
      { name: 'Tiffany',            shirtSize: 'L'    },
      { name: 'Sofia Sabová',       shirtSize: 'nemá' },
      { name: 'Ema Širá',           shirtSize: 'M'    },
      { name: 'Eliška Margitanová', shirtSize: 'S'    },
      { name: 'Gréta Džujková',     shirtSize: 'S'    },
      { name: 'Valentína Baricová', shirtSize: 'L'    },
    ]
  }
];

export const groupDetails = [
  {
    id:        'trpaslici',
    name:      'Trpaslíci',
    grade:     '4.–5. ročník',
    color:     'Modrá',
    colorHex:  '#4a80c4',
    animators: ['Patrik Pekarovič', 'Dávid Krivjanský'],
    members:   [
      { name: 'Olivek Kapko',     shirtSize: 'M'   },
      { name: 'Marek Vasiľ',      shirtSize: 'M'   },
      { name: 'Marko Kolesár',    shirtSize: '158' },
      { name: 'Ondrej Britan',    shirtSize: 'S'   },
      { name: 'Peter Krivjanský', shirtSize: 'S'   },
      { name: 'Šimon Bachura',    shirtSize: '152' },
      { name: 'Tomáš Tatár',      shirtSize: '158' },
      { name: 'Dávid Pichoňský',  shirtSize: 'XS'  },
      { name: 'Sebastián Bednář', shirtSize: '164' },
      { name: 'Tobiáš Kaňuch',    shirtSize: 'M'   },
      { name: 'Ondrej Hudák',     shirtSize: '164' },
    ]
  },
  {
    id:        'orli',
    name:      'Orli',
    grade:     '5.–6. ročník',
    color:     'Ružová',
    colorHex:  '#d46090',
    animators: ['Peter Greňo', 'Maroš Barňák'],
    members:   [
      { name: 'Félix Goffa',      shirtSize: '146'       },
      { name: 'Matej Tatár',      shirtSize: 'M'         },
      { name: 'Jakub Rusinko',    shirtSize: 'S'         },
      { name: 'Martin Karoľ',     shirtSize: '146'       },
      { name: 'Sebastián Papcún', shirtSize: 'NEOVERENÉ' },
      { name: 'Juraj Dunaj',      shirtSize: 'M'         },
      { name: 'Benjamín Falát',   shirtSize: 'M'         },
      { name: 'Ján Cmár',         shirtSize: '145'       },
      { name: 'Lukáš Harvan',     shirtSize: '158'       },
      { name: 'Jozef Koudelka',   shirtSize: '176'       },
      { name: 'Alexander UA',     shirtSize: 'M'         },
    ]
  },
  {
    id:        'jazvce',
    name:      'Jazvce',
    grade:     '6.–7. ročník',
    color:     'Zelená',
    colorHex:  '#3aaa72',
    animators: ['Ján Katkovčin', 'Ján Falát'],
    members:   [
      { name: 'Samuel Mikita',   shirtSize: 'S'   },
      { name: 'Dominik Cmár',    shirtSize: '145' },
      { name: 'Anton Kovaľ',     shirtSize: 'S'   },
      { name: 'Filip Matías',    shirtSize: '164' },
      { name: 'Matej Uličný',    shirtSize: 'S'   },
      { name: 'Karol Stoček',    shirtSize: 'M'   },
      { name: 'Jakub Průša',     shirtSize: 'XL'  },
      { name: 'Adam Ruščanský',  shirtSize: 'S'   },
      { name: 'Matúš Behún',     shirtSize: '170' },
      { name: 'Denis Max Roman', shirtSize: 'S'   },
      { name: 'Mychajlo UA',     shirtSize: 'M'   },
    ]
  },
  {
    id:        'kentauri',
    name:      'Kentauri',
    grade:     '8. ročník',
    color:     'Hnedá/Bordová',
    colorHex:  '#a05030',
    animators: ['Ondrej Mocák', 'Mathias Mastiľák'],
    members:   [
      { name: 'Pavol Mikloš',    shirtSize: 'L'   },
      { name: 'Štefan Tomčák',   shirtSize: 'S'   },
      { name: 'Michal Karoľ',    shirtSize: 'S'   },
      { name: 'Leo Henyig',      shirtSize: 'S'   },
      { name: 'Adam Lazorčík',   shirtSize: 'M'   },
      { name: 'Matej Koudelka',  shirtSize: '146' },
      { name: 'William Krajník', shirtSize: 'S'   },
      { name: 'Šimon Karas',     shirtSize: 'M'   },
      { name: 'Teodor Orinín',   shirtSize: 'L'   },
      { name: 'Jakub Chalčák',   shirtSize: 'M'   },
    ]
  },
  {
    id:        'kyklopi',
    name:      'Kyklopi',
    grade:     '8.–9. ročník',
    color:     'Modrá',
    colorHex:  '#4a80c4',
    animators: ['Filip Goffa', 'Adam Paško'],
    members:   [
      { name: 'Boris Gaľan',       shirtSize: 'L' },
      { name: 'Lukáš Blaha',       shirtSize: 'M' },
      { name: 'Martin Krivjanský', shirtSize: 'L' },
      { name: 'Ján Rusinko',       shirtSize: 'L' },
      { name: 'Šimon Čižmár',      shirtSize: 'L' },
      { name: 'Simon Baláž',       shirtSize: 'S' },
      { name: 'Tobias Max',        shirtSize: 'M' },
    ]
  }
];
