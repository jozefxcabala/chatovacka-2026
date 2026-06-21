'use strict';

const PROGRAM = [
  {
    den: 'Pondelok',
    cas: 'Doobedu',
    program: 'Pokladovka',
    poznamka: 'Animátori pri skupinkách',
    animatori: []
  },
  {
    den: 'Pondelok',
    cas: 'Doobedu',
    program: 'Zoznamovačky',
    poznamka: 'Animátori pri skupinkách',
    animatori: []
  },
  {
    den: 'Pondelok',
    cas: 'Poobedie',
    program: 'Objavenie skrine',
    poznamka: '5 animátorov + profesor + 12 sluhov',
    animatori: [
      { meno: 'Mathias', rola: 'Hádanky' },
      { meno: 'Nina', rola: 'Hádanky' },
      { meno: 'Paulínka Harajdová', rola: 'Hádanky' },
      { meno: 'Marína Holubová', rola: 'Hádanky' },
      { meno: 'Kika Ondisková', rola: 'Hádanky' },
      { meno: 'Adam Paško', rola: 'Behač' },
      { meno: 'Hanka', rola: 'Behač' },
      { meno: 'Erika', rola: 'Behač' },
      { meno: 'Dianka Salanciová', rola: 'Behač' },
      { meno: 'Ondrej Mocák', rola: 'Behač' },
      { meno: 'Maroš', rola: 'Behač' },
      { meno: 'Filip', rola: 'Behač' },
      { meno: 'Barborka Bobaľová', rola: 'Behač' },
      { meno: 'Patrik Pekarovič', rola: 'Behač' }
    ]
  },
  {
    den: 'Pondelok',
    cas: 'Večer',
    program: 'Scénky skupiniek s Tumnusom',
    poznamka: 'Animátor pri každej skupinke',
    animatori: []
  },
  {
    den: 'Pondelok',
    cas: 'Nočná hra',
    program: 'Útek z Narnie pred čarodejnicou',
    poznamka: 'Cca 10 animátorov',
    animatori: [
      { meno: 'Nika' },
      { meno: 'Janko' },
      { meno: 'Ema' },
      { meno: 'Maroš' },
      { meno: 'Patrik Bača' },
      { meno: 'Boris Surničin' },
      { meno: 'Janko Katkovčin' },
      { meno: 'Filip Sukeľ' },
      { meno: 'Dano Chripák' },
      { meno: 'Peter Greňo' }
    ]
  },
  {
    den: 'Utorok',
    cas: 'Doobedu',
    program: 'Program s Kráľovnou',
    poznamka: 'Cca 17 animátorov',
    animatori: [
      { meno: 'Tomáš Blaha', rola: 'Lúka' },
      { meno: 'Josky', rola: 'Vzduchovka' },
      { meno: 'Dano Chripák', rola: 'Vzduchovka' },
      { meno: 'Patrik Pekarovič' },
      { meno: 'Paulínka Katkovčinová' },
      { meno: 'Čaby', rola: 'Futbal' },
      { meno: 'Adam Paško', rola: 'Cornhole' },
      { meno: 'Nina', rola: 'Meta' },
      { meno: 'Nika', rola: 'Meta' },
      { meno: 'Marína Holubová' },
      { meno: 'Kika Olajošová' },
      { meno: 'Kika Pichonská' },
      { meno: 'Barborky' },
      { meno: 'Paulínka Harajdová' },
      { meno: 'Peťo Hanzal' },
      { meno: 'Ajka' },
      { meno: 'Lívia FMA' },
      { meno: 'Sofia Dolobačová' },
      { meno: 'Mathias' },
      { meno: 'Filip G.' }
    ]
  },
  {
    den: 'Utorok',
    cas: 'Poobedie',
    program: 'Lucy vs Edmund',
    poznamka: '5 majstrov · 1 obchodník · 3 stanovištia · 1 kontrolor',
    animatori: [
      { meno: 'Ondrej Mocák', rola: 'Kontrolor' },
      { meno: 'Kika Ondisková', rola: 'Majster' },
      { meno: 'Nika', rola: 'Majster' },
      { meno: 'Erika', rola: 'Majster' },
      { meno: 'Janko Falát', rola: 'Majster' },
      { meno: 'Filip Sukeľ', rola: 'Majster' },
      { meno: 'Adam Paško', rola: 'Obchodník' },
      { meno: 'Hanka', rola: 'Stanovište' },
      { meno: 'Nina', rola: 'Stanovište' },
      { meno: 'Patrik Bača', rola: 'Stanovište' }
    ]
  },
  {
    den: 'Utorok',
    cas: 'Večer',
    program: 'Tumnus zmizol',
    poznamka: '7 animátorov',
    animatori: [
      { meno: 'Braňo Kováč', rola: 'Stanivská' },
      { meno: 'Dianka Salanciová', rola: 'Stanivská' },
      { meno: 'Boris Surničin', rola: 'Stanivská' },
      { meno: 'Mathias', rola: 'Stanivská' },
      { meno: 'Peťo Hanzal', rola: 'Stanivská' },
      { meno: 'Patrik Pekarovič', rola: 'Stanivská' },
      { meno: 'Nina', rola: 'Altánok' }
    ]
  },
  {
    den: 'Streda',
    cas: 'Doobedu',
    program: 'Výlet – stanoviská',
    poznamka: '8 stanovísk (MTZ doplní)',
    animatori: [
      { meno: 'Kika Ondisková', rola: 'Líška' },
      { meno: 'Ľuboš', rola: 'Mikuláš' },
      { meno: 'Boris Surničin', rola: 'Maugrim' },
      { meno: 'Pali P.', rola: 'Bobor' },
      { meno: 'Števo SDB', rola: 'Kentaur' }
    ]
  },
  {
    den: 'Streda',
    cas: 'Poobedie',
    program: 'Duchovná obnova',
    poznamka: '',
    animatori: []
  },
  {
    den: 'Streda',
    cas: 'Večer',
    program: 'Hľadanie Edmunda',
    poznamka: '10 + 5 animátorov',
    animatori: [
      { meno: 'Kika Ondisková', rola: 'Chytanie' },
      { meno: 'Peťo Hanzal', rola: 'Chytanie' },
      { meno: 'Nika', rola: 'Chytanie' },
      { meno: 'Maroš', rola: 'Chytanie' },
      { meno: 'Filip', rola: 'Chytanie' },
      { meno: 'Barborka Bobaľová', rola: 'Chytanie' },
      { meno: 'Patrik Bača', rola: 'Chytanie' },
      { meno: 'Janko Falát', rola: 'Chytanie' },
      { meno: 'Filip Sukeľ', rola: 'Chytanie' },
      { meno: 'Paulínka Katkovčinová', rola: 'Chytanie' },
      { meno: 'Hanka', rola: 'Beh' },
      { meno: 'Paulínka Harajdová', rola: 'Beh' },
      { meno: 'Boris Surničin', rola: 'Beh' },
      { meno: 'Dano Chripák', rola: 'Beh' },
      { meno: 'Janko Katkovčin', rola: 'Beh' }
    ]
  },
  {
    den: 'Štvrtok',
    cas: 'Doobedu',
    program: 'Tréning',
    poznamka: '15+ animátorov (zoznam doplniť)',
    animatori: []
  },
  {
    den: 'Štvrtok',
    cas: 'Poobedie',
    program: 'Stretnutie Aslan & čarodejnica',
    poznamka: '',
    animatori: [
      { meno: 'MTZ', rola: 'Armáda čarodejníc' },
      { meno: 'Adam Paško', rola: 'Ločkár' },
      { meno: 'Nina', rola: 'Ločkár' },
      { meno: 'Patrik Pekarovič', rola: 'Ločkár' },
      { meno: 'Barborka Kridlová', rola: 'Ločkár' },
      { meno: 'Paulínka Katkovčinová', rola: 'Ločkár' }
    ]
  },
  {
    den: 'Štvrtok',
    cas: 'Večer',
    program: 'Obeta za Narniu',
    poznamka: '20 animátorov',
    animatori: [
      { meno: 'Paulínka Harajdová', rola: 'Strašiak' },
      { meno: 'Marína Holubová', rola: 'Strašiak' },
      { meno: 'Nika', rola: 'Strašiak' },
      { meno: 'Bašká B.', rola: 'Strašiak' },
      { meno: 'Tomáš Blaha', rola: 'Strašiak' },
      { meno: 'Adam Paško', rola: 'Strašiak' },
      { meno: 'Ondrej Mocák', rola: 'Stratený' },
      { meno: 'Hanka', rola: 'Stratený' },
      { meno: 'Ema', rola: 'Stratený' },
      { meno: 'Patrik Pekarovič', rola: 'Stratený' },
      { meno: 'Filip', rola: 'Stratený' },
      { meno: 'Ajka', rola: 'Stratený' },
      { meno: 'Mathias', rola: 'Stratený' },
      { meno: 'Peter Greňo', rola: 'Stratený' },
      { meno: 'Kika Olajošová', rola: 'Stratený' },
      { meno: 'Barborka Kridlová', rola: 'Stratený' },
      { meno: 'Sofia Dolobačová', rola: 'Stratený' },
      { meno: 'Patrik Bača', rola: 'Stratený' },
      { meno: 'Janko Falát', rola: 'Stratený' },
      { meno: 'Paulínka Katkovčinová', rola: 'Stratený' }
    ]
  },
  {
    den: 'Štvrtok',
    cas: 'Skúška odvahy',
    program: 'Skúška odvahy',
    poznamka: '7 animátorov',
    animatori: [
      { meno: 'David' },
      { meno: 'Filip' },
      { meno: 'Dano Chripák' },
      { meno: 'Boris Surničin' },
      { meno: 'Braňo Kováč' },
      { meno: 'Dievča MTZ' },
      { meno: 'Dianka Salanciová' },
      { meno: 'Kika Ondisková' }
    ]
  },
  {
    den: 'Piatok',
    cas: 'Doobedu',
    program: 'Príprava na vojnu',
    poznamka: '15+ animátorov',
    animatori: [
      { meno: 'Patrik Pekarovič', rola: 'NEGÁCIA' },
      { meno: 'Janko Katkovčin', rola: 'NEGÁCIA' },
      { meno: 'Peter Greňo', rola: 'NEGÁCIA' },
      { meno: 'Ondrej Mocák', rola: 'NEGÁCIA' },
      { meno: 'Adam Paško', rola: 'NEGÁCIA' },
      { meno: 'Barborka Kridlová', rola: 'NEGÁCIA' },
      { meno: 'Ema', rola: 'NEGÁCIA' },
      { meno: 'Paulínka Katkovčinová', rola: 'NEGÁCIA' },
      { meno: 'Sofia Dolobačová', rola: 'NEGÁCIA' }
    ]
  },
  {
    den: 'Piatok',
    cas: 'Poobedie',
    program: 'Záverečný boj',
    poznamka: 'Všetci animátori',
    animatori: []
  },
  {
    den: 'Piatok',
    cas: 'Večer',
    program: 'Bál',
    poznamka: 'Všetci',
    animatori: []
  }
];

const DEN_SLUG = {
  'Pondelok': 'pondelok',
  'Utorok': 'utorok',
  'Streda': 'streda',
  'Štvrtok': 'stvrtok',
  'Piatok': 'piatok'
};

const CAS_SLUG = {
  'Doobedu': 'doobedu',
  'Poobedie': 'poobedie',
  'Večer': 'vecer',
  'Nočná hra': 'nocna',
  'Skúška odvahy': 'skuska'
};

const SKIP_FROM_FILTER = new Set(['MTZ', 'Barborky', 'Dievča MTZ']);

function getUniqueAnimators() {
  const names = new Set();
  PROGRAM.forEach(function(row) {
    row.animatori.forEach(function(a) {
      if (!SKIP_FROM_FILTER.has(a.meno)) names.add(a.meno);
    });
  });
  return Array.from(names).sort(function(a, b) {
    return a.localeCompare(b, 'sk');
  });
}

function countUniqueAnimators() {
  const names = new Set();
  PROGRAM.forEach(function(row) {
    row.animatori.forEach(function(a) {
      if (!SKIP_FROM_FILTER.has(a.meno)) names.add(a.meno);
    });
  });
  return names.size;
}

function populateAnimatorDropdown() {
  var sel = document.getElementById('animatorFilter');
  getUniqueAnimators().forEach(function(name) {
    var opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });
}

function getFiltered() {
  var q = document.getElementById('searchInput').value.toLowerCase().trim();
  var den = document.getElementById('denFilter').value;
  var animator = document.getElementById('animatorFilter').value;

  return PROGRAM.filter(function(row) {
    if (den && row.den !== den) return false;
    if (animator && !row.animatori.some(function(a) { return a.meno === animator; })) return false;
    if (q) {
      var inProgram = row.program.toLowerCase().includes(q);
      var inCas = row.cas.toLowerCase().includes(q);
      var inDen = row.den.toLowerCase().includes(q);
      var inAnimatori = row.animatori.some(function(a) {
        return a.meno.toLowerCase().includes(q);
      });
      if (!inProgram && !inCas && !inDen && !inAnimatori) return false;
    }
    return true;
  });
}

function el(tag, className) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function renderCard(row, highlightAnimator) {
  var denSlug = DEN_SLUG[row.den] || row.den.toLowerCase();
  var casSlug = CAS_SLUG[row.cas] || 'other';

  var card = el('article', 'card card--' + denSlug);

  var stripe = el('div', 'card-stripe');
  card.appendChild(stripe);

  var body = el('div', 'card-body');

  var badges = el('div', 'card-badges');

  var denBadge = el('span', 'badge badge-' + denSlug);
  denBadge.textContent = row.den;
  badges.appendChild(denBadge);

  var casBadge = el('span', 'badge badge-cas badge-' + casSlug);
  casBadge.textContent = row.cas;
  badges.appendChild(casBadge);

  body.appendChild(badges);

  var title = el('h2', 'card-title');
  title.textContent = row.program;
  body.appendChild(title);

  if (row.poznamka) {
    var note = el('p', 'card-note');
    note.textContent = row.poznamka;
    body.appendChild(note);
  }

  if (row.animatori.length > 0) {
    var animDiv = el('div', 'card-animatori');

    var label = el('span', 'animatori-label');
    label.textContent = 'Animátori';
    animDiv.appendChild(label);

    var chips = el('div', 'animatori-chips');

    row.animatori.forEach(function(a) {
      var isHighlight = highlightAnimator && a.meno === highlightAnimator;
      var chip = el('span', 'chip' + (isHighlight ? ' chip--highlight' : ''));

      var nameSpan = el('span', 'chip-name');
      nameSpan.textContent = a.meno;
      chip.appendChild(nameSpan);

      if (a.rola) {
        var rolaSpan = el('span', 'chip-rola');
        rolaSpan.textContent = a.rola;
        chip.appendChild(rolaSpan);
      }

      chips.appendChild(chip);
    });

    animDiv.appendChild(chips);
    body.appendChild(animDiv);
  } else {
    var allText = row.poznamka || '';
    if (allText) {
      var allDiv = el('div', 'card-animatori-all');
      allDiv.textContent = allText;
      body.appendChild(allDiv);
    }
  }

  card.appendChild(body);
  return card;
}

function render() {
  var grid = document.getElementById('cardsGrid');
  var emptyState = document.getElementById('emptyState');
  var resultInfo = document.getElementById('resultInfo');
  var myScheduleBanner = document.getElementById('myScheduleBanner');
  var myScheduleName = document.getElementById('myScheduleName');
  var myScheduleCount = document.getElementById('myScheduleCount');
  var highlightAnimator = document.getElementById('animatorFilter').value;

  var filtered = getFiltered();

  // Clear existing cards
  while (grid.firstChild) grid.removeChild(grid.firstChild);

  if (highlightAnimator && !SKIP_FROM_FILTER.has(highlightAnimator)) {
    myScheduleBanner.hidden = false;
    myScheduleName.textContent = highlightAnimator;
    myScheduleCount.textContent = filtered.length + (filtered.length === 1 ? ' aktivita' : filtered.length < 5 ? ' aktivity' : ' aktivít');
  } else {
    myScheduleBanner.hidden = true;
  }

  if (filtered.length === 0) {
    emptyState.hidden = false;
    resultInfo.textContent = '';
  } else {
    emptyState.hidden = true;
    filtered.forEach(function(row) {
      grid.appendChild(renderCard(row, highlightAnimator));
    });

    var total = PROGRAM.length;
    if (filtered.length < total) {
      resultInfo.textContent = filtered.length + ' z ' + total + ' aktivít';
    } else {
      resultInfo.textContent = total + ' aktivít · ' + countUniqueAnimators() + ' animátorov';
    }
  }
}

function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('denFilter').value = '';
  document.getElementById('animatorFilter').value = '';
  render();
}

document.addEventListener('DOMContentLoaded', function() {
  populateAnimatorDropdown();
  render();

  document.getElementById('searchInput').addEventListener('input', render);
  document.getElementById('denFilter').addEventListener('change', render);
  document.getElementById('animatorFilter').addEventListener('change', render);
  document.getElementById('clearBtn').addEventListener('click', clearFilters);
  document.getElementById('clearBtn2').addEventListener('click', clearFilters);
});
