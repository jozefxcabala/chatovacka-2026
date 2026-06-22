'use strict';

// ═══════════════════════════════════════════════════════════════════
// CAMP CONFIGURATION
// ═══════════════════════════════════════════════════════════════════

var campConfig = {
  meta: {
    year: 2026,
    version: 'v2.0',
    campName: 'Narnia 2026',
    theme: 'Lev, čarodejnica a šatník',
    campDates: { start: '2026-06-28', end: '2026-07-04' },
    location: 'Chatovačka, Donovaly'
  },

  announcements: [
    { text: 'Dnes večer je nočná hra – pripravte sa!', type: 'warning' },
    { text: 'Ráno budenie o 7:30, raňajky o 8:00', type: 'info' },
    { text: 'Každý animátor dostane rolu – skontrolujte Aktivity', type: 'info' }
  ],

  days: [
    {
      id: 'pondelok', label: 'Pondelok', date: '2026-06-29', dayIndex: 1,
      thought: 'Začíname dobrodružstvo v Narnii. Srdcia otvorené, oči nahor!',
      thoughtAuthor: null,
      vedúciDna: 'Čaby',
      schedule: [
        { time: '07:30', label: 'Budenie', type: 'system' },
        { time: '08:00', label: 'Raňajky', type: 'jedlo' },
        { time: '09:00', label: 'Pokladovka', type: 'activity', activityRef: 'pon-pokladovka' },
        { time: '10:30', label: 'Zoznamovačky', type: 'activity', activityRef: 'pon-zoznamovacky' },
        { time: '12:30', label: 'Obed', type: 'jedlo' },
        { time: '14:30', label: 'Objavenie skrine', type: 'activity', activityRef: 'pon-skrinia' },
        { time: '18:00', label: 'Večera', type: 'jedlo' },
        { time: '20:00', label: 'Scénky skupiniek s Tumnusom', type: 'scenka', activityRef: 'pon-scenky' },
        { time: '22:00', label: 'Útek z Narnie – nočná hra', type: 'activity', activityRef: 'pon-utok', note: 'Nočná hra' }
      ]
    },
    {
      id: 'utorok', label: 'Utorok', date: '2026-06-30', dayIndex: 2,
      thought: 'Edmund vstupuje do temnoty. My vstupujeme do svetla.',
      thoughtAuthor: null,
      vedúciDna: null,
      schedule: [
        { time: '07:30', label: 'Budenie', type: 'system' },
        { time: '08:00', label: 'Raňajky', type: 'jedlo' },
        { time: '09:30', label: 'Program s Kráľovnou', type: 'activity', activityRef: 'uto-kralovnou' },
        { time: '12:30', label: 'Obed', type: 'jedlo' },
        { time: '14:30', label: 'Lucy vs Edmund', type: 'activity', activityRef: 'uto-lucy-edmund' },
        { time: '18:00', label: 'Večera', type: 'jedlo' },
        { time: '20:00', label: 'Tumnus zmizol', type: 'activity', activityRef: 'uto-tumnus' }
      ]
    },
    {
      id: 'streda', label: 'Streda', date: '2026-07-01', dayIndex: 3,
      thought: 'Dbáme o ducha. Deň pokoja a nájdenia sa.',
      thoughtAuthor: null,
      vedúciDna: null,
      schedule: [
        { time: '07:30', label: 'Budenie', type: 'system' },
        { time: '08:00', label: 'Raňajky', type: 'jedlo' },
        { time: '09:00', label: 'Výlet – stanoviská', type: 'activity', activityRef: 'str-vylet' },
        { time: '12:30', label: 'Obed', type: 'jedlo' },
        { time: '14:30', label: 'Duchovná obnova', type: 'activity', activityRef: 'str-obnova' },
        { time: '18:00', label: 'Večera', type: 'jedlo' },
        { time: '20:00', label: 'Hľadanie Edmunda', type: 'activity', activityRef: 'str-hladanie' }
      ]
    },
    {
      id: 'stvrtok', label: 'Štvrtok', date: '2026-07-02', dayIndex: 4,
      thought: 'Aslan dáva život. My sme jeho odraz.',
      thoughtAuthor: null,
      vedúciDna: null,
      schedule: [
        { time: '07:30', label: 'Budenie', type: 'system' },
        { time: '08:00', label: 'Raňajky', type: 'jedlo' },
        { time: '09:30', label: 'Tréning', type: 'activity', activityRef: 'stv-trening' },
        { time: '12:30', label: 'Obed', type: 'jedlo' },
        { time: '14:30', label: 'Stretnutie Aslan & čarodejnica', type: 'scenka', activityRef: 'stv-aslan' },
        { time: '18:00', label: 'Večera', type: 'jedlo' },
        { time: '20:00', label: 'Obeta za Narniu', type: 'activity', activityRef: 'stv-obeta' },
        { time: '23:00', label: 'Skúška odvahy', type: 'activity', activityRef: 'stv-skuska', note: 'Nočná' }
      ]
    },
    {
      id: 'piatok', label: 'Piatok', date: '2026-07-03', dayIndex: 5,
      thought: 'Finálna bitka. Narnia bude slobodná!',
      thoughtAuthor: null,
      vedúciDna: null,
      schedule: [
        { time: '07:30', label: 'Budenie', type: 'system' },
        { time: '08:00', label: 'Raňajky', type: 'jedlo' },
        { time: '09:30', label: 'Príprava na vojnu', type: 'activity', activityRef: 'pia-priprava' },
        { time: '12:30', label: 'Obed', type: 'jedlo' },
        { time: '14:30', label: 'Záverečný boj', type: 'activity', activityRef: 'pia-boj' },
        { time: '18:00', label: 'Večera', type: 'jedlo' },
        { time: '20:00', label: 'Bál', type: 'activity', activityRef: 'pia-bal' }
      ]
    },
    {
      id: 'sobota', label: 'Sobota', date: '2026-07-04', dayIndex: 6,
      thought: 'Koniec je začiatok. Narnia žije v nás.',
      thoughtAuthor: null,
      vedúciDna: null,
      schedule: [
        { time: '07:30', label: 'Budenie', type: 'system' },
        { time: '08:00', label: 'Raňajky', type: 'jedlo' },
        { time: '09:00', label: 'Upratovanie', type: 'system' },
        { time: '10:30', label: 'Záverečné stretnutie animátorov', type: 'activity', activityRef: 'sob-stretnutie' },
        { time: '12:00', label: 'Obed a rozchod', type: 'jedlo' }
      ]
    }
  ],

  activities: [
    // ── PONDELOK ──────────────────────────────────────────────
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
      description: 'Skupinky hľadajú poklad podľa mapy a plnia úlohy na stanovištiach.',
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
      description: 'Hry na zoznámenie – skupinky sa spoznávajú navzájom aj s animátormi.',
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
      description: 'Hlavná aktivita prvého dňa. Skupinky plnia hádanky a úlohy, ktoré ich vedú k objaveniu šatníka do Narnie. Každá skupinka má priradený behač a hádankára.',
      vedúciDna: 'Čaby',
      vedúciProgramu: 'Mathias',
      animators: [
        { name: 'Mathias', role: 'Hádanky' }, { name: 'Nina', role: 'Hádanky' },
        { name: 'Paulínka Harajdová', role: 'Hádanky' }, { name: 'Marína Holubová', role: 'Hádanky' },
        { name: 'Kika Ondisková', role: 'Hádanky' }, { name: 'Adam Paško', role: 'Behač' },
        { name: 'Hanka', role: 'Behač' }, { name: 'Erika', role: 'Behač' },
        { name: 'Dianka Salanciová', role: 'Behač' }, { name: 'Ondrej Mocák', role: 'Behač' },
        { name: 'Maroš', role: 'Behač' }, { name: 'Filip', role: 'Behač' },
        { name: 'Barborka Bobaľová', role: 'Behač' }, { name: 'Patrik Pekarovič', role: 'Behač' }
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
      description: 'Každá skupinka predvedie krátku scénku s Tumnusom ako ústrednou postavou.',
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
      description: 'Nočná hra – deti utekajú pred čarodejnicou a jej sluhami. Animátori hrajú sluhov a snažia sa chytať deti.',
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
    // ── UTOROK ────────────────────────────────────────────────
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
      description: 'Skupinky súťažia na rôznych stanovištiach – futbal, vzduchovka, cornhole, meta. Kráľovná (čarodejnica) hodnotí skupinky a rozhoduje o víťazoch.',
      vedúciDna: null,
      vedúciProgramu: 'Čaby',
      animators: [
        { name: 'Tomáš Blaha', role: 'Lúka' }, { name: 'Josky', role: 'Vzduchovka' },
        { name: 'Dano Chripák', role: 'Vzduchovka' }, { name: 'Patrik Pekarovič' },
        { name: 'Paulínka Katkovčinová' }, { name: 'Čaby', role: 'Futbal' },
        { name: 'Adam Paško', role: 'Cornhole' }, { name: 'Nina', role: 'Meta' },
        { name: 'Nika', role: 'Meta' }, { name: 'Marína Holubová' },
        { name: 'Kika Olajošová' }, { name: 'Kika Pichonská' },
        { name: 'Paulínka Harajdová' }, { name: 'Peťo Hanzal' },
        { name: 'Ajka' }, { name: 'Sofia Dolobačová' },
        { name: 'Mathias' }, { name: 'Filip G.' }
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
      description: 'Skupinky sú rozdelené na tím Lucy a tím Edmunda. Plnia úlohy u majstrov, nakupujú u obchodníka a súťažia o najlepšie výsledky.',
      vedúciDna: null,
      vedúciProgramu: 'Ondrej Mocák',
      animators: [
        { name: 'Ondrej Mocák', role: 'Kontrolor' }, { name: 'Kika Ondisková', role: 'Majster' },
        { name: 'Nika', role: 'Majster' }, { name: 'Erika', role: 'Majster' },
        { name: 'Janko Falát', role: 'Majster' }, { name: 'Filip Sukeľ', role: 'Majster' },
        { name: 'Adam Paško', role: 'Obchodník' }, { name: 'Hanka', role: 'Stanovište' },
        { name: 'Nina', role: 'Stanovište' }, { name: 'Patrik Bača', role: 'Stanovište' }
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
      description: 'Dramatická večerná aktivita – deti zistia, že Tumnus zmizol. Hľadajú stopy a riešia záhadu jeho zmiznutia.',
      vedúciDna: null,
      vedúciProgramu: 'Braňo Kováč',
      animators: [
        { name: 'Braňo Kováč', role: 'Stanivská' }, { name: 'Dianka Salanciová', role: 'Stanivská' },
        { name: 'Boris Surničin', role: 'Stanivská' }, { name: 'Mathias', role: 'Stanivská' },
        { name: 'Peťo Hanzal', role: 'Stanivská' }, { name: 'Patrik Pekarovič', role: 'Stanivská' },
        { name: 'Nina', role: 'Altánok' }
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
    // ── STREDA ────────────────────────────────────────────────
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
      description: 'Skupinky prechádzajú trasu s 8 stanoviskami. Na každom stanovisku na nich čakajú postavy z Narnie a úlohy.',
      vedúciDna: null,
      vedúciProgramu: null,
      animators: [
        { name: 'Kika Ondisková', role: 'Líška' }, { name: 'Ľuboš', role: 'Mikuláš' },
        { name: 'Boris Surničin', role: 'Maugrim' }, { name: 'Pali P.', role: 'Bobor' },
        { name: 'Števo SDB', role: 'Kentaur' }
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
      description: 'Deň duchovného stíšenia. Program vedie kňaz alebo duchovný sprevádzateľ.',
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
      description: 'Edmund je nezvestný a skupinky ho musia nájsť. Jedna skupina animátorov chytá deti, druhá skupinka utečencov pomáha deťom dostať sa k cieľu.',
      vedúciDna: null,
      vedúciProgramu: 'Kika Ondisková',
      animators: [
        { name: 'Kika Ondisková', role: 'Chytanie' }, { name: 'Peťo Hanzal', role: 'Chytanie' },
        { name: 'Nika', role: 'Chytanie' }, { name: 'Maroš', role: 'Chytanie' },
        { name: 'Filip', role: 'Chytanie' }, { name: 'Barborka Bobaľová', role: 'Chytanie' },
        { name: 'Patrik Bača', role: 'Chytanie' }, { name: 'Janko Falát', role: 'Chytanie' },
        { name: 'Filip Sukeľ', role: 'Chytanie' }, { name: 'Paulínka Katkovčinová', role: 'Chytanie' },
        { name: 'Hanka', role: 'Beh' }, { name: 'Paulínka Harajdová', role: 'Beh' },
        { name: 'Boris Surničin', role: 'Beh' }, { name: 'Dano Chripák', role: 'Beh' },
        { name: 'Janko Katkovčin', role: 'Beh' }
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
    // ── ŠTVRTOK ───────────────────────────────────────────────
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
      description: 'Skupinky sa pripravujú na záverečnú bitku. Tréning bojových zručností a tímovej spolupráce.',
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
      description: 'Kľúčová scénka tábora – Aslan a Biela čarodejnica sa stretávajú a uzatvárajú zmluvu. Deti sú svedkami.',
      vedúciDna: null,
      vedúciProgramu: null,
      animators: [
        { name: 'MTZ', role: 'Armáda čarodejníc' }, { name: 'Adam Paško', role: 'Ločkár' },
        { name: 'Nina', role: 'Ločkár' }, { name: 'Patrik Pekarovič', role: 'Ločkár' },
        { name: 'Barborka Kridlová', role: 'Ločkár' }, { name: 'Paulínka Katkovčinová', role: 'Ločkár' }
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
      description: 'Dramatická nočná aktivita – deti sú stratené v Narnii a musia nájsť cestu späť. Animátori ako strašiaci ich vedú na správnu cestu.',
      vedúciDna: null,
      vedúciProgramu: 'Adam Paško',
      animators: [
        { name: 'Paulínka Harajdová', role: 'Strašiak' }, { name: 'Marína Holubová', role: 'Strašiak' },
        { name: 'Nika', role: 'Strašiak' }, { name: 'Bašká B.', role: 'Strašiak' },
        { name: 'Tomáš Blaha', role: 'Strašiak' }, { name: 'Adam Paško', role: 'Strašiak' },
        { name: 'Ondrej Mocák', role: 'Stratený' }, { name: 'Hanka', role: 'Stratený' },
        { name: 'Ema', role: 'Stratený' }, { name: 'Patrik Pekarovič', role: 'Stratený' },
        { name: 'Filip', role: 'Stratený' }, { name: 'Ajka', role: 'Stratený' },
        { name: 'Mathias', role: 'Stratený' }, { name: 'Peter Greňo', role: 'Stratený' },
        { name: 'Kika Olajošová', role: 'Stratený' }, { name: 'Barborka Kridlová', role: 'Stratený' },
        { name: 'Sofia Dolobačová', role: 'Stratený' }, { name: 'Patrik Bača', role: 'Stratený' },
        { name: 'Janko Falát', role: 'Stratený' }, { name: 'Paulínka Katkovčinová', role: 'Stratený' }
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
      description: 'Skúška odvahy pre skupinky – každá skupinka prechádza trasou v tme.',
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
    // ── PIATOK ────────────────────────────────────────────────
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
      description: 'Skupinky sa pripravujú na záverečný boj – maľujú sa, cvičia a budujú tímového ducha.',
      vedúciDna: null,
      vedúciProgramu: 'Patrik Pekarovič',
      animators: [
        { name: 'Patrik Pekarovič', role: 'NEGÁCIA' }, { name: 'Janko Katkovčin', role: 'NEGÁCIA' },
        { name: 'Peter Greňo', role: 'NEGÁCIA' }, { name: 'Ondrej Mocák', role: 'NEGÁCIA' },
        { name: 'Adam Paško', role: 'NEGÁCIA' }, { name: 'Barborka Kridlová', role: 'NEGÁCIA' },
        { name: 'Ema', role: 'NEGÁCIA' }, { name: 'Paulínka Katkovčinová', role: 'NEGÁCIA' },
        { name: 'Sofia Dolobačová', role: 'NEGÁCIA' }
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
      description: 'Záverečná bitka o Narniu – všetci animátori a účastníci súťažia v tímovej hre.',
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
      description: 'Záverečný bál – tanec, súťaže a oslava konca tábora.',
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
    // ── SOBOTA ────────────────────────────────────────────────
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
      description: 'Záverečné stretnutie celého animátorského tímu – reflexia tábora, poďakovania.',
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
  ],

  scenes: [
    {
      id: 'sc-tumnus', dayRef: 'pondelok', title: 'Scénky skupiniek s Tumnusom',
      note: 'Každá skupinka predvedie krátku scénku s Tumnusom.'
    },
    {
      id: 'sc-aslan', dayRef: 'stvrtok', title: 'Stretnutie Aslan & Biela čarodejnica',
      note: 'Hlavná scénka tábora – vyvrcholenie príbehu pred záverečným bojom.'
    }
  ],

  prayers: [
    {
      id: 'pr-ranna', title: 'Ranná modlitba',
      text: 'Pane Bože, ďakujeme Ti za nový deň. Daj nám silu, radosť a odvahu prežiť dnešný deň naplno. Nech sú naše srdcia otvorené pre Teba a pre seba navzájom. Amen.'
    },
    {
      id: 'pr-vecerna', title: 'Večerná modlitba',
      text: 'Pane, ďakujeme za dnešný deň plný hier, smiechu a stretnutí. Odpusť nám, keď sme niekoho zranili, a pomôž nám zajtra byť lepšími. Daj nám pokojnú noc. Amen.'
    }
  ],

  appendices: {
    note: 'Prílohy (rozdelenie skupiniek, distribúcia aktivít) budú doplnené vedúcim tábora.',
    groups: [],
    other: []
  },

  contacts: [
    { name: 'Čaby', role: 'Vedúci tábora', phone: '' },
    { name: 'MTZ', role: 'Metodický tím', phone: '' }
  ]
};

// ═══════════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════════

function dayCalendarIcon(n) {
  return '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">' +
    '<rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>' +
    '<path d="M2 7h14" stroke="currentColor" stroke-width="1.5"/>' +
    '<path d="M6 1v4M12 1v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
    '<text x="9" y="14" text-anchor="middle" fill="currentColor" font-size="6.5" font-weight="700" font-family="-apple-system,system-ui,sans-serif">' + n + '</text>' +
    '</svg>';
}

var ICONS = {
  home:     '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 8L9 2l7 6v8a1 1 0 01-1 1h-4v-5H6v5H3a1 1 0 01-1-1V8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  calendar: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="4" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M6 2v3M12 2v3M2 8h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  activity: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 9h3l2-5 4 10 2-5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  theater:  '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="6.5" cy="7" r="3.5" stroke="currentColor" stroke-width="1.5"/><circle cx="11.5" cy="7" r="3.5" stroke="currentColor" stroke-width="1.5"/><path d="M4 14c0-1.66 1.12-3 2.5-3h5C12.88 11 14 12.34 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  prayer:   '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 2L3 7v9h12V7L9 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 16v-6h4v6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  list:     '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="3" y="2" width="12" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M6 6.5h6M6 9.5h6M6 12.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  chevronLeft:  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 2L4 8l6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevronRight: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 2l6 6-6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrowLeft:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5M5 8h9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

// ═══════════════════════════════════════════════════════════════════
// NAV ITEMS
// ═══════════════════════════════════════════════════════════════════

var NAV_ITEMS = (function() {
  var items = [{ id: 'uvod', label: 'Úvod', icon: 'home' }];
  campConfig.days.forEach(function(d) {
    items.push({ id: d.id, label: d.label, icon: 'calendar', isDayItem: true, dayIndex: d.dayIndex });
  });
  items.push({ divider: true });
  items.push(
    { id: 'aktivity', label: 'Aktivity',           icon: 'activity' },
    { id: 'scenky',   label: 'Scénky',              icon: 'theater'  },
    { id: 'stretka',  label: 'Stretká a modlitby', icon: 'prayer'   },
    { id: 'prilohy',  label: 'Prílohy',             icon: 'list'     }
  );
  return items;
}());

// ═══════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function el(tag, cls) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
}

function getDayConfig(dayId) {
  return campConfig.days.find(function(d) { return d.id === dayId; }) || null;
}

function getActivity(actId) {
  return campConfig.activities.find(function(a) { return a.id === actId; }) || null;
}

function getTodayDayId() {
  var today = new Date().toISOString().split('T')[0];
  var found = campConfig.days.find(function(d) { return d.date === today; });
  return found ? found.id : null;
}

var DAY_COLOR_MAP = {
  pondelok: 'var(--col-pondelok)',
  utorok:   'var(--col-utorok)',
  streda:   'var(--col-streda)',
  stvrtok:  'var(--col-stvrtok)',
  piatok:   'var(--col-piatok)',
  sobota:   'var(--col-sobota)'
};

// ═══════════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════════

var SIDEBAR_COLLAPSED_KEY = 'sidebarCollapsed';
var MOBILE_BREAKPOINT = 900;

function isMobile() { return window.innerWidth < MOBILE_BREAKPOINT; }

function initSidebar() {
  var toggle  = document.getElementById('sidebarToggle');
  var overlay = document.getElementById('sidebarOverlay');
  var menuBtn = document.getElementById('topbarMenuBtn');

  if (!isMobile()) {
    setSidebarCollapsed(localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true');
  }

  toggle.addEventListener('click', function() {
    if (isMobile()) {
      closeMobileSidebar();
    } else {
      var sidebar = document.getElementById('sidebar');
      setSidebarCollapsed(!sidebar.classList.contains('sidebar--collapsed'));
    }
  });

  menuBtn.addEventListener('click', openMobileSidebar);
  overlay.addEventListener('click', closeMobileSidebar);

  window.addEventListener('resize', function() {
    if (!isMobile()) {
      document.getElementById('sidebar').classList.remove('sidebar--mobile-open');
      document.getElementById('sidebarOverlay').classList.remove('sidebar-overlay--visible');
      document.body.classList.remove('sidebar-open');
    }
  });
}

function setSidebarCollapsed(collapsed) {
  var sidebar = document.getElementById('sidebar');
  var toggle  = document.getElementById('sidebarToggle');
  sidebar.classList.toggle('sidebar--collapsed', collapsed);
  toggle.innerHTML = collapsed ? ICONS.chevronRight : ICONS.chevronLeft;
  toggle.setAttribute('aria-label', collapsed ? 'Rozbaliť navigáciu' : 'Zbaliť navigáciu');
  localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
}

function openMobileSidebar() {
  document.getElementById('sidebar').classList.add('sidebar--mobile-open');
  document.getElementById('sidebarOverlay').classList.add('sidebar-overlay--visible');
  document.body.classList.add('sidebar-open');
}

function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('sidebar--mobile-open');
  document.getElementById('sidebarOverlay').classList.remove('sidebar-overlay--visible');
  document.body.classList.remove('sidebar-open');
}

// ═══════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════

var currentSection = 'uvod';
var currentActivityId = null;
var VALID_SECTION_IDS = [];

function renderSidebarNav() {
  var nav = document.getElementById('sidebarNav');
  nav.innerHTML = '';

  NAV_ITEMS.forEach(function(item) {
    if (item.divider) {
      var divEl = document.createElement('div');
      divEl.className = 'sidebar-divider';
      nav.appendChild(divEl);
      return;
    }

    var btn = document.createElement('button');
    btn.className = 'sidebar-nav-item' + (item.isDayItem ? ' sidebar-nav-item--day' : '');
    btn.setAttribute('data-section', item.id);
    btn.setAttribute('aria-label', item.label);
    var iconHtml = item.isDayItem ? dayCalendarIcon(item.dayIndex) : (ICONS[item.icon] || '');
    btn.innerHTML =
      '<span class="nav-item-icon">' + iconHtml + '</span>' +
      '<span class="nav-item-label">' + escapeHtml(item.label) + '</span>';

    btn.addEventListener('click', function() {
      navigateTo(item.id);
      if (isMobile()) closeMobileSidebar();
    });
    nav.appendChild(btn);
  });

  // Footer — version text only
  var footer = document.getElementById('sidebarFooter');
  if (footer) {
    footer.innerHTML = '<span class="sidebar-version-text">' +
      escapeHtml(campConfig.meta.version) + ' · ' + campConfig.meta.year +
      '</span>';
  }
}

function navigateTo(sectionId, param) {
  document.querySelectorAll('.section').forEach(function(s) {
    s.classList.remove('section--active');
  });

  if (sectionId === 'aktivity' && param) {
    currentActivityId = param;
    var sec = document.getElementById('section-aktivity');
    if (sec) {
      sec.classList.add('section--active');
      renderActivityDetail(param);
    }
    updateTopbarTitle('Aktivity');
    updateNavActive('aktivity');
    currentSection = 'aktivity';
    localStorage.setItem('lastSection', 'aktivity');
    scrollTop();
    return;
  }

  currentActivityId = null;

  var target = document.getElementById('section-' + sectionId);
  if (target) {
    target.classList.add('section--active');
    if (sectionId === 'aktivity') showActivityList();
  }

  updateNavActive(sectionId);

  var navItem = NAV_ITEMS.find(function(n) { return n && n.id === sectionId; });
  updateTopbarTitle(navItem ? navItem.label : 'Tábor');

  currentSection = sectionId;
  if (VALID_SECTION_IDS.indexOf(sectionId) !== -1) {
    localStorage.setItem('lastSection', sectionId);
  }
  scrollTop();
}

function updateNavActive(sectionId) {
  document.querySelectorAll('.sidebar-nav-item').forEach(function(btn) {
    btn.classList.toggle('sidebar-nav-item--active', btn.getAttribute('data-section') === sectionId);
  });
}

function updateTopbarTitle(title) {
  var titleEl = document.getElementById('topbarTitle');
  if (titleEl) titleEl.textContent = title;
}

function scrollTop() {
  var body = document.getElementById('appBody');
  if (body) body.scrollTop = 0;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION: ÚVOD
// ═══════════════════════════════════════════════════════════════════

function buildUvodSection() {
  var m = campConfig.meta;
  var todayId  = getTodayDayId();
  var todayDay = todayId ? getDayConfig(todayId) : null;
  var displayDay = todayDay || campConfig.days[0];
  var html = '';

  html += '<div class="uvod-hero">';
  html += '<p class="uvod-eyebrow">Tábor ' + m.year + '</p>';
  html += '<h1 class="uvod-hero-title">' + escapeHtml(m.campName) + '</h1>';
  html += '<p class="uvod-hero-theme">' + escapeHtml(m.theme) + '</p>';
  html += '</div>';

  html += '<div class="uvod-info-strip">';
  html += '<div class="uvod-info-item"><span class="uvod-info-icon">📍</span><div class="uvod-info-text"><strong>' + escapeHtml(m.location) + '</strong><span>Miesto</span></div></div>';
  if (todayDay) {
    html += '<div class="uvod-info-item"><span class="uvod-info-icon">📅</span><div class="uvod-info-text"><strong>Dnes: ' + escapeHtml(todayDay.label) + '</strong><span>Tábor práve prebieha</span></div></div>';
  } else {
    html += '<div class="uvod-info-item"><span class="uvod-info-icon">📅</span><div class="uvod-info-text"><strong>' + escapeHtml(m.campDates.start) + ' – ' + escapeHtml(m.campDates.end) + '</strong><span>Termín tábora</span></div></div>';
  }
  html += '</div>';

  html += '<div class="uvod-grid">';

  if (campConfig.announcements.length) {
    html += '<div class="uvod-card">';
    html += '<h2 class="uvod-card-heading">Oznamy</h2>';
    html += '<ul class="announcement-list">';
    campConfig.announcements.forEach(function(a) {
      html += '<li class="announcement-item announcement-item--' + escapeHtml(a.type) + '">';
      html += '<span class="ann-icon">' + (a.type === 'warning' ? '⚠️' : 'ℹ️') + '</span>';
      html += '<span>' + escapeHtml(a.text) + '</span>';
      html += '</li>';
    });
    html += '</ul></div>';
  }

  html += '<div class="uvod-card">';
  html += '<h2 class="uvod-card-heading">Myšlienka dňa <span class="uvod-day-badge">' + escapeHtml(displayDay.label) + '</span></h2>';
  if (displayDay.thought) {
    html += '<blockquote class="uvod-thought">' + escapeHtml(displayDay.thought) + '</blockquote>';
  }
  html += '<button class="uvod-goto-btn" data-nav="' + escapeHtml(displayDay.id) + '">Program dňa →</button>';
  html += '</div>';

  html += '<div class="uvod-card uvod-card--full">';
  html += '<h2 class="uvod-card-heading">Sekcie</h2>';
  html += '<div class="quick-links-grid">';
  NAV_ITEMS.filter(function(n) { return n && !n.divider && n.id !== 'uvod'; }).forEach(function(n) {
    html += '<button class="quick-link-item" data-nav="' + escapeHtml(n.id) + '">';
    html += '<span class="quick-link-icon">' + (ICONS[n.icon] || '') + '</span>';
    html += '<span class="quick-link-label">' + escapeHtml(n.label) + '</span>';
    html += '</button>';
  });
  html += '</div></div>';

  html += '</div>';
  return html;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION: DEŇ
// ═══════════════════════════════════════════════════════════════════

function buildDaySection(dayId) {
  var day = getDayConfig(dayId);
  if (!day) return '<p>Deň nenájdený.</p>';
  var color = DAY_COLOR_MAP[dayId] || 'var(--gold)';
  var html = '';

  html += '<div class="day-hero" style="border-color:' + color + '">';
  html += '<div class="day-hero-label" style="color:' + color + '">Deň ' + day.dayIndex + '</div>';
  html += '<h1 class="day-hero-title">' + escapeHtml(day.label) + '</h1>';
  html += '<p class="day-hero-date">' + escapeHtml(day.date) + '</p>';
  if (day.thought) {
    html += '<blockquote class="day-thought">' + escapeHtml(day.thought) + '</blockquote>';
  }
  if (day.vedúciDna) {
    html += '<p class="day-vedúci">Vedúci dňa: <strong>' + escapeHtml(day.vedúciDna) + '</strong></p>';
  }
  html += '</div>';

  html += '<div class="day-timeline-wrap">';
  html += '<h2 class="day-section-heading">Program dňa</h2>';
  html += '<div class="day-timeline">';
  day.schedule.forEach(function(item) {
    var actRef = item.activityRef ? getActivity(item.activityRef) : null;
    var isLink = !!actRef;
    html += '<div class="timeline-item timeline-item--' + item.type + '">';
    html += '<div class="timeline-left"><div class="timeline-dot"></div><div class="timeline-line"></div></div>';
    html += '<div class="timeline-body">';
    html += '<span class="timeline-time">' + escapeHtml(item.time) + '</span>';
    if (isLink) {
      html += '<button class="timeline-label timeline-label--link" data-act="' + escapeHtml(item.activityRef) + '">' + escapeHtml(item.label) + '</button>';
    } else {
      html += '<span class="timeline-label">' + escapeHtml(item.label) + '</span>';
    }
    if (item.note) html += '<span class="timeline-note">' + escapeHtml(item.note) + '</span>';
    html += '</div></div>';
  });
  html += '</div></div>';

  var dayActivities = campConfig.activities.filter(function(a) { return a.dayRef === dayId; });
  if (dayActivities.length) {
    html += '<div class="day-activities-wrap">';
    html += '<h2 class="day-section-heading">Aktivity dňa</h2>';
    html += '<div class="day-act-list">';
    dayActivities.forEach(function(act) {
      html += '<button class="day-act-item" data-act="' + escapeHtml(act.id) + '">';
      html += '<div class="day-act-info">';
      html += '<span class="day-act-name">' + escapeHtml(act.name) + '</span>';
      html += '<span class="day-act-time">' + escapeHtml(act.timeLabel) + '</span>';
      html += '</div>';
      html += '<span class="day-act-arrow">' + ICONS.chevronRight + '</span>';
      html += '</button>';
    });
    html += '</div></div>';
  }

  return html;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION: AKTIVITY (list + filters + detail)
// ═══════════════════════════════════════════════════════════════════

function buildAktivitySection() {
  var html = '';

  // ── List view ──────────────────────────────────────────────
  html += '<div id="aktivity-list-view">';

  html += '<div class="filters-bar">';
  html += '<div class="filters-inner">';

  // Search
  html += '<div class="filter-item filter-search">';
  html += '<input type="search" id="actSearch" class="filter-control" placeholder="Hľadaj aktivitu, animátora…" autocomplete="off" aria-label="Hľadaj">';
  html += '</div>';

  // Day filter
  html += '<div class="filter-item"><select id="actDayFilter" class="filter-control" aria-label="Deň">';
  html += '<option value="">Všetky dni</option>';
  campConfig.days.forEach(function(d) {
    html += '<option value="' + escapeHtml(d.id) + '">' + escapeHtml(d.label) + '</option>';
  });
  html += '</select></div>';

  // Time of day filter
  html += '<div class="filter-item"><select id="actTimeFilter" class="filter-control" aria-label="Čas dňa">';
  html += '<option value="">Každý čas</option>';
  [['morning','Doobedu'],['afternoon','Poobedie'],['evening','Večer'],['night','Nočná hra']].forEach(function(t) {
    html += '<option value="' + t[0] + '">' + t[1] + '</option>';
  });
  html += '</select></div>';

  // Type filter
  html += '<div class="filter-item"><select id="actTypeFilter" class="filter-control" aria-label="Typ">';
  html += '<option value="">Všetky typy</option>';
  html += '<option value="activity">Aktivita</option>';
  html += '<option value="scenka">Scénka</option>';
  html += '</select></div>';

  html += '<button id="actClearBtn" class="btn-clear">Vyčistiť</button>';
  html += '</div>';
  html += '<p id="actResultInfo" class="result-info" aria-live="polite"></p>';
  html += '</div>';

  html += '<div class="main-content">';
  html += '<div id="aktivityCardsGrid" class="cards-grid" role="list"></div>';
  html += '<div id="aktivityEmpty" class="empty-state" hidden><p>Žiadne aktivity nevyhovujú filtru.</p><button class="btn-clear-inline" id="actClearBtn2">Vyčistiť filtre</button></div>';
  html += '</div>';

  html += '</div>'; // aktivity-list-view

  // ── Detail view ────────────────────────────────────────────
  html += '<div id="aktivity-detail-view" class="aktivity-detail-view" hidden></div>';

  return html;
}

function getFilteredActivities() {
  var q    = ((document.getElementById('actSearch')     || {}).value || '').toLowerCase().trim();
  var dayF = (document.getElementById('actDayFilter')   || {}).value || '';
  var timeF= (document.getElementById('actTimeFilter')  || {}).value || '';
  var typeF= (document.getElementById('actTypeFilter')  || {}).value || '';

  return campConfig.activities.filter(function(act) {
    if (dayF  && act.dayRef    !== dayF)  return false;
    if (timeF && act.timeOfDay !== timeF) return false;
    if (typeF && act.type      !== typeF) return false;
    if (q) {
      var match = act.name.toLowerCase().includes(q) ||
        (act.description || '').toLowerCase().includes(q) ||
        act.animators.some(function(a) { return a.name.toLowerCase().includes(q); });
      if (!match) return false;
    }
    return true;
  });
}

function buildAktivityCards() {
  var grid  = document.getElementById('aktivityCardsGrid');
  var empty = document.getElementById('aktivityEmpty');
  var info  = document.getElementById('actResultInfo');
  if (!grid) return;

  var filtered = getFilteredActivities();
  grid.innerHTML = '';

  if (!filtered.length) {
    empty.hidden = false;
    if (info) info.textContent = '';
    return;
  }
  empty.hidden = true;
  var total = campConfig.activities.length;
  if (info) info.textContent = filtered.length < total
    ? filtered.length + ' z ' + total + ' aktivít'
    : total + ' aktivít';

  filtered.forEach(function(act) {
    var color   = DAY_COLOR_MAP[act.dayRef] || 'var(--gold)';
    var dayConf = getDayConfig(act.dayRef);

    var card = el('article', 'card card--' + act.dayRef);

    var stripe = el('div', 'card-stripe');
    stripe.style.background = color;
    card.appendChild(stripe);

    var body = el('div', 'card-body');

    var badges = el('div', 'card-badges');
    if (dayConf) {
      var db = el('span', 'badge badge-' + act.dayRef);
      db.textContent = dayConf.label;
      badges.appendChild(db);
    }
    var tb = el('span', 'badge badge-cas');
    tb.textContent = act.timeLabel;
    badges.appendChild(tb);
    if (act.type === 'scenka') {
      var scb = el('span', 'badge badge-scenka');
      scb.textContent = 'Scénka';
      badges.appendChild(scb);
    }
    body.appendChild(badges);

    var title = el('h2', 'card-title');
    title.textContent = act.name;
    body.appendChild(title);

    if (act.time) {
      var timeEl = el('p', 'card-time');
      timeEl.textContent = act.time + (act.endTime ? ' – ' + act.endTime : '') + (act.location ? '  ·  ' + act.location : '');
      body.appendChild(timeEl);
    }

    if (act.animatorsNote || act.animators.length) {
      var animDiv = el('div', 'card-animatori');
      var lbl = el('span', 'animatori-label');
      lbl.textContent = act.animatorsNote || ('Animátori (' + act.animators.length + ')');
      animDiv.appendChild(lbl);

      if (act.animators.length) {
        var chips = el('div', 'animatori-chips');
        act.animators.slice(0, 4).forEach(function(a) {
          var chip = el('span', 'chip');
          chip.textContent = a.name;
          chips.appendChild(chip);
        });
        if (act.animators.length > 4) {
          var more = el('span', 'chip chip--more');
          more.textContent = '+' + (act.animators.length - 4);
          chips.appendChild(more);
        }
        animDiv.appendChild(chips);
      }
      body.appendChild(animDiv);
    }

    var detailBtn = el('button', 'card-detail-btn');
    detailBtn.setAttribute('data-act', act.id);
    detailBtn.innerHTML = 'Detail ' + ICONS.chevronRight;
    body.appendChild(detailBtn);

    card.appendChild(body);
    grid.appendChild(card);
  });
}

function initAktivityFilters() {
  buildAktivityCards();
  ['actSearch','actDayFilter','actTimeFilter','actTypeFilter'].forEach(function(id) {
    var el2 = document.getElementById(id);
    if (el2) el2.addEventListener(id === 'actSearch' ? 'input' : 'change', buildAktivityCards);
  });
  function clearAll() {
    ['actSearch','actDayFilter','actTimeFilter','actTypeFilter'].forEach(function(id) {
      var el2 = document.getElementById(id);
      if (el2) el2.value = '';
    });
    buildAktivityCards();
  }
  var c1 = document.getElementById('actClearBtn');
  var c2 = document.getElementById('actClearBtn2');
  if (c1) c1.addEventListener('click', clearAll);
  if (c2) c2.addEventListener('click', clearAll);
}

function showActivityList() {
  var listView   = document.getElementById('aktivity-list-view');
  var detailView = document.getElementById('aktivity-detail-view');
  if (listView)   listView.hidden   = false;
  if (detailView) detailView.hidden = true;
  currentActivityId = null;
}

function renderActivityDetail(actId) {
  var act        = getActivity(actId);
  var detailView = document.getElementById('aktivity-detail-view');
  var listView   = document.getElementById('aktivity-list-view');
  if (!act || !detailView) return;

  if (listView) listView.hidden = true;
  detailView.hidden = false;

  var dayConf = getDayConfig(act.dayRef);
  var color   = DAY_COLOR_MAP[act.dayRef] || 'var(--gold)';
  var html = '';

  // Back bar
  html += '<div class="detail-topbar">';
  html += '<button class="detail-back-btn" id="detailBackBtn">' + ICONS.arrowLeft + 'Späť na aktivity</button>';
  html += '</div>';

  html += '<div class="detail-content">';

  // Header
  html += '<div class="detail-header" style="border-left-color:' + color + '">';
  html += '<div class="card-badges">';
  if (dayConf) html += '<span class="badge badge-' + act.dayRef + '">' + escapeHtml(dayConf.label) + '</span>';
  html += '<span class="badge badge-cas">' + escapeHtml(act.timeLabel) + '</span>';
  if (act.type === 'scenka') html += '<span class="badge badge-scenka">Scénka</span>';
  html += '</div>';
  html += '<h1 class="detail-title">' + escapeHtml(act.name) + '</h1>';
  html += '</div>';

  // Meta grid
  var metaItems = [];
  if (act.time) metaItems.push({ label: 'Čas', value: act.time + (act.endTime ? ' – ' + act.endTime : '') });
  if (act.location) metaItems.push({ label: 'Miesto', value: act.location });
  if (act.vedúciDna) metaItems.push({ label: 'Vedúci dňa', value: act.vedúciDna });
  if (act.vedúciProgramu) metaItems.push({ label: 'Vedúci programu', value: act.vedúciProgramu });

  if (metaItems.length) {
    html += '<div class="detail-meta-grid">';
    metaItems.forEach(function(m) {
      html += '<div class="detail-meta-item">';
      html += '<span class="detail-meta-label">' + escapeHtml(m.label) + '</span>';
      html += '<span class="detail-meta-value">' + escapeHtml(m.value) + '</span>';
      html += '</div>';
    });
    html += '</div>';
  }

  // Description
  if (act.description) {
    html += '<div class="detail-section">';
    html += '<h2 class="detail-section-title">Popis programu</h2>';
    html += '<p class="detail-description">' + escapeHtml(act.description) + '</p>';
    html += '</div>';
  }

  // Animators
  if (act.animators.length || act.animatorsNote) {
    html += '<div class="detail-section">';
    html += '<h2 class="detail-section-title">Potrební animátori';
    if (act.animators.length) html += ' <span class="detail-count">(' + act.animators.length + ')</span>';
    html += '</h2>';
    if (act.animatorsNote) html += '<p class="detail-animators-note">' + escapeHtml(act.animatorsNote) + '</p>';
    if (act.animators.length) {
      html += '<div class="animatori-chips">';
      act.animators.forEach(function(a) {
        html += '<span class="chip"><span class="chip-name">' + escapeHtml(a.name) + '</span>';
        if (a.role) html += '<span class="chip-rola">' + escapeHtml(a.role) + '</span>';
        html += '</span>';
      });
      html += '</div>';
    }
    html += '</div>';
  }

  // Materials — plain text list, read-only
  if (act.materials.length) {
    html += '<div class="detail-section">';
    html += '<h2 class="detail-section-title">Pomôcky</h2>';
    html += '<ul class="materials-plain-list">';
    act.materials.forEach(function(mat) {
      html += '<li>' + escapeHtml(mat) + '</li>';
    });
    html += '</ul>';
    html += '</div>';
  }

  // Scoring
  if (act.hasScoring && act.scoring) {
    html += '<div class="detail-section">';
    html += '<h2 class="detail-section-title">Hodnotenie</h2>';
    html += '<p class="detail-scoring">' + escapeHtml(act.scoring) + '</p>';
    html += '</div>';
  }

  // MTZ note
  if (act.hasMtzNote && act.mtzNote) {
    html += '<div class="detail-section detail-section--mtz">';
    html += '<h2 class="detail-section-title">MTZ poznámky</h2>';
    html += '<p class="detail-mtz">' + escapeHtml(act.mtzNote) + '</p>';
    html += '</div>';
  }

  html += '</div>'; // detail-content
  detailView.innerHTML = html;

  document.getElementById('detailBackBtn').addEventListener('click', function() {
    showActivityList();
    updateNavActive('aktivity');
    updateTopbarTitle('Aktivity');
    currentActivityId = null;
  });
}

// ═══════════════════════════════════════════════════════════════════
// SECTION: SCÉNKY
// ═══════════════════════════════════════════════════════════════════

function buildScenkySection() {
  var html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Scénky</h1>';
  html += '<p class="section-subtitle">Scénky zoradené podľa dní tábora.</p></div>';

  campConfig.days.forEach(function(day) {
    var dayScenes = campConfig.scenes.filter(function(s) { return s.dayRef === day.id; });
    if (!dayScenes.length) return;
    var color = DAY_COLOR_MAP[day.id] || 'var(--gold)';
    html += '<div class="scenky-day-group">';
    html += '<h2 class="scenky-day-heading" style="color:' + color + '">' + escapeHtml(day.label) + '</h2>';
    dayScenes.forEach(function(scene) {
      html += '<div class="scene-card">';
      html += '<h3 class="scene-title">' + escapeHtml(scene.title) + '</h3>';
      if (scene.note) html += '<p class="scene-note">' + escapeHtml(scene.note) + '</p>';
      html += '</div>';
    });
    html += '</div>';
  });

  if (!campConfig.scenes.length) {
    html += '<p class="placeholder-text">Scénky budú doplnené.</p>';
  }

  html += '</div>';
  return html;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION: STRETKÁ A MODLITBY
// ═══════════════════════════════════════════════════════════════════

function buildStretkaSection() {
  var html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Stretká a modlitby</h1>';
  html += '<p class="section-subtitle">Modlitby a stretká na každý deň tábora.</p></div>';
  html += '<div class="prayers-list">';
  campConfig.prayers.forEach(function(p) {
    html += '<div class="prayer-card">';
    html += '<h2 class="prayer-title">' + escapeHtml(p.title) + '</h2>';
    html += '<p class="prayer-text">' + escapeHtml(p.text) + '</p>';
    html += '</div>';
  });
  html += '</div></div>';
  return html;
}

// ═══════════════════════════════════════════════════════════════════
// SECTION: PRÍLOHY
// ═══════════════════════════════════════════════════════════════════

function buildPrilohySection() {
  var html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Prílohy</h1>';
  html += '<p class="section-subtitle">Rozdelenie skupín a ďalšie prílohy tábora.</p></div>';
  html += '<div class="info-block info-block--full">';
  html += '<div class="info-block-body"><p class="placeholder-text">' + escapeHtml(campConfig.appendices.note) + '</p></div>';
  html += '</div></div>';
  return html;
}

// ═══════════════════════════════════════════════════════════════════
// RENDER ALL SECTIONS
// ═══════════════════════════════════════════════════════════════════

function renderAllSections() {
  var main = document.getElementById('appMain');
  main.innerHTML = '';

  var sections = [{ id: 'uvod', fn: buildUvodSection }];
  campConfig.days.forEach(function(d) {
    sections.push({ id: d.id, fn: buildDaySection.bind(null, d.id) });
  });
  sections.push(
    { id: 'aktivity', fn: buildAktivitySection },
    { id: 'scenky',   fn: buildScenkySection   },
    { id: 'stretka',  fn: buildStretkaSection  },
    { id: 'prilohy',  fn: buildPrilohySection  }
  );

  sections.forEach(function(s) {
    var sec = document.createElement('section');
    sec.id = 'section-' + s.id;
    sec.className = 'section';
    sec.innerHTML = s.fn();
    main.appendChild(sec);
    VALID_SECTION_IDS.push(s.id);
  });
}

// ═══════════════════════════════════════════════════════════════════
// EVENT DELEGATION
// ═══════════════════════════════════════════════════════════════════

function initDelegation() {
  document.getElementById('appMain').addEventListener('click', function(e) {
    var navBtn = e.target.closest('[data-nav]');
    if (navBtn) { navigateTo(navBtn.getAttribute('data-nav')); return; }

    var actBtn = e.target.closest('[data-act]');
    if (actBtn) { navigateTo('aktivity', actBtn.getAttribute('data-act')); }
  });
}

// ═══════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
  renderSidebarNav();
  renderAllSections();
  initSidebar();
  initDelegation();
  initAktivityFilters();

  var last = localStorage.getItem('lastSection') || 'uvod';
  navigateTo(VALID_SECTION_IDS.indexOf(last) !== -1 ? last : 'uvod');
});
