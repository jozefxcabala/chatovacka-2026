// ─────────────────────────────────────────────────────────────────────────────
// KONFIGURÁCIA TÁBORA
// Zmeň tieto hodnoty každý rok.
// ─────────────────────────────────────────────────────────────────────────────

export const campMeta = {
  year:      2026,
  version:   'v3.7',
  campName:  'Narnia 2026',
  theme:     'Lev, čarodejnica a šatník',
  motto:     'Narnia je v každom z nás a okolo nás.\nVnútorné prežívanie boja dobra so zlom, prežívanie vzťahu s Aslanom.',
  campDates: { start: '2026-06-28', end: '2026-07-04' },
  location:  'Chatovačka, Donovaly'
};

// ─────────────────────────────────────────────────────────────────────────────
// OZNAMY — zobrazujú sa na úvodnej stránke
// type: 'warning' | 'info'
// ─────────────────────────────────────────────────────────────────────────────

export const announcements = [];

// ─────────────────────────────────────────────────────────────────────────────
// KONTAKTY
// ─────────────────────────────────────────────────────────────────────────────

export const contacts = [
  { name: 'Čaby',  role: 'Vedúci tábora', phone: '' },
  { name: 'MTZ',   role: 'Metodický tím',  phone: '' }
];

// ─────────────────────────────────────────────────────────────────────────────
// PRÍLOHY
// ─────────────────────────────────────────────────────────────────────────────

export const appendices = [];

// ─────────────────────────────────────────────────────────────────────────────
// 10 PRAVIDIEL ANIMÁTORA
// Upravuj tu — zobrazí sa na úvodnej stránke v karte „10 animátora".
// ─────────────────────────────────────────────────────────────────────────────

export const animatorRules = [
  { id: 1,  text: 'TRÁVIM MAXIMUM ČASU SO SVOJOU SKUPINKOU' },
  { id: 2,  text: 'NA ANIMÁTORSKEJ CHATKE TRÁVIM MINIMUM ČASU' },
  { id: 3,  text: 'K DEŤOM SA SNAŽÍM PRISTUPOVAŤ S LÁSKOU' },
  { id: 4,  text: 'NAHROMADENÉ NEGATÍVNE POCITY ZDIEĽAM S NIEKÝM STARŠÍM' },
  { id: 5,  text: 'IDEM JA' },
  { id: 6,  text: 'POZNÁM SVOJE LIMITY' },
  { id: 7,  text: 'SOM V OBRAZE (poznám program)' },
  { id: 8,  text: 'KONFLIKT RIEŠIM S CHLADNOU HLAVOU' },
  { id: 9,  text: 'STRÁŽIM SI SVOJ PODIEL NA PROGRAME' },
  { id: 10, text: 'VŠETKO MÁ SVOJE MIESTO' }
];
