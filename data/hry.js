// ─────────────────────────────────────────────────────────────────────────────
// HRY / VOĽNÝ ČAS
// Kategórie hier a aktivít pre voľný čas.
// ─────────────────────────────────────────────────────────────────────────────

export const hryCategories = [
  {
    id: 'energizery',
    title: 'Energizéry',
    subtitle: 'Nápady na hry medzi aktivitami',
    icon: '⚡',
    games: [
      { id: 'e-hry-medzi',  name: 'Hry pomedzi aktivitami', description: '' },
      { id: 'e-volejbal',   name: 'Volejbal',               description: '' },
      { id: 'e-tanec',      name: 'Tanec',                  description: '' },
      { id: 'e-palermo',    name: 'Mestečko Palermo',        description: '' },
      { id: 'e-futbal',     name: 'Futbal',                  description: '' },
    ]
  },
  {
    id: 'vonkajsie',
    title: 'Vonkajšie hry',
    subtitle: null,
    icon: '🌤',
    games: [
      {
        id: 'v-nabera',
        name: 'Prenášanie vody pomocou naberačky',
        description:
          'Sú dva tímy, každý má nádobu s vodou a naberačku. Hráči sú znevýhodnení jedným z dvoch spôsobov:\n' +
          '- majú zviazané nohy, alebo\n' +
          '- majú na bedrách hula hop, ktorého sa nesmú dotknúť ani im nesmie spadnúť.\n' +
          '\n' +
          'Úlohou je preniesť pomocou naberačky všetku vodu na druhú stranu. Vyhráva tím, ktorému sa to podarí ako prvému.'
      },
      {
        id: 'v-balon',
        name: 'Podávanie balóna',
        description:
          'Dva tímy stoja v rade. Balón si podávajú:\n' +
          '- ponad hlavy od prvého hráča po posledného,\n' +
          '- následne popod nohy späť k prvému hráčovi.\n' +
          '\n' +
          'Pred prvým hráčom je pripravená stolička. Keď sa k nemu balón vráti, musí si naň sadnúť a prasknúť ho. Vyhráva tím, ktorý balón praskne ako prvý.'
      },
      {
        id: 'v-muka',
        name: 'Podávanie múky na kartičke',
        description:
          'Každý hráč drží v ústach kartičku. Prvý hráč naberie na kartičku múku a bez použitia rúk ju podáva ďalej z kartičky na kartičku až k poslednému hráčovi.\n' +
          '\n' +
          'Posledný hráč vysype múku do pripravenej misky. Vyhráva tím, ktorý bude mať na konci v miske najviac múky.'
      },
      {
        id: 'v-hadica',
        name: 'Hadica cez tričká',
        description:
          'Deti stoja vedľa seba. Cez rukávy tričiek si navzájom prevliekajú hadicu s tečúcou vodou.\n' +
          '\n' +
          'Keď sa hadica dostane k poslednému hráčovi, musí sa rovnakým spôsobom dostať späť na začiatok. Meria sa čas a vyhráva tím s lepším časom.'
      },
      {
        id: 'v-sekundovka',
        name: 'Sekundová ručička',
        description:
          'Vedúci spustí stopky a zastaví ich na náhodnom čase (napr. 8,30 s).\n' +
          '\n' +
          'Súťažia vždy dvaja hráči (po jednom z každého tímu). Ich úlohou je odhadnúť čo najpresnejšie daný čas. Bližší odhad získava bod pre svoj tím.\n' +
          '\n' +
          'Na konci vyhráva tím s najväčším počtom bodov.'
      },
      {
        id: 'v-penalty',
        name: 'Penalty',
        description:
          'Hráč sa 10–15× otočí okolo svojej osi s hlavou čo najnižšie pri kolenách a následne strieľa na bránku.\n' +
          '\n' +
          'Za úspešný gól získava bod pre svoj tím. Vyhráva tím s najvyšším počtom bodov.'
      },
      {
        id: 'v-piskorky',
        name: 'Piškôrky',
        description:
          'Na zemi sa z klobúčikov vytvorí hracia plocha 3 × 3. Namiesto krúžkov a krížikov sa používajú farebné šatky.\n' +
          '\n' +
          'Po umiestnení všetkých šatiek sa môžu presúvať. Vyhráva hráč alebo tím, ktorý ako prvý vytvorí tri šatky vedľa seba.'
      },
      {
        id: 'v-prelej',
        name: 'Prelej vodu',
        description:
          'Deti sedia za sebou na stoličkách. Každý má vedro, pričom vedrá sú postupne menšie.\n' +
          '\n' +
          'Prvý hráč má plné vedro a ponad hlavu prelieva vodu hráčovi za sebou. Cieľom je, aby v poslednom vedre zostalo viac vody než v poslednom vedre súperovho tímu.'
      },
      {
        id: 'v-vrece',
        name: 'Chodenie vo vreci',
        description: 'Klasické preteky vo vreci.'
      },
      {
        id: 'v-topanky',
        name: 'Beh s obrovskými topánkami',
        description:
          'Na veľké kartóny sa pripevnia flip-flopy, čím vzniknú obrovské topánky.\n' +
          '\n' +
          'Dva tímy súťažia formou štafety. Každý člen musí prejsť pripravenú trasu. Vyhráva tím s najlepším časom.'
      },
    ]
  },
  {
    id: 'dnove',
    title: 'Hry na dnu',
    subtitle: 'Môžu byť aj vonku',
    icon: '🏠',
    games: [
      {
        id: 'd-povely',
        name: 'Povely',
        description: ''
      },
      {
        id: 'd-pohare',
        name: 'Balansovanie pohárov na osobe',
        description:
          'Vyberie sa jeden hráč, na ktorom sa jeho tím snaží vybalansovať čo najviac plastových pohárov bez toho, aby spadli.\n' +
          '\n' +
          'Po uplynutí stanoveného času vyhráva tím s najväčším počtom pohárov.'
      },
      {
        id: 'd-21',
        name: 'Hra 21',
        description:
          'Všetci hráči majú zatvorené oči a postupne hovoria čísla od 1 do 21.\n' +
          '\n' +
          'Nikto nesmie povedať rovnaké číslo naraz s niekým iným. Ak sa to stane, hra sa začína od čísla 1.'
      },
      {
        id: 'd-slova',
        name: 'Slová',
        description: ''
      },
      {
        id: 'd-schovavacky',
        name: 'Schovávačky so zaviazanými očami',
        description: ''
      },
      {
        id: 'd-uzol',
        name: 'Ľudský uzol',
        description:
          'Hráči majú zatvorené oči a náhodne sa pochytajú za ruky, čím vytvoria uzol.\n' +
          '\n' +
          'Potom otvoria oči a ich úlohou je rozuzliť sa bez toho, aby sa pustili.'
      },
    ]
  }
];
