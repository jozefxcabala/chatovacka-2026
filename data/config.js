// ─────────────────────────────────────────────────────────────────────────────
// KONFIGURÁCIA TÁBORA
// Zmeň tieto hodnoty každý rok.
// ─────────────────────────────────────────────────────────────────────────────

export const campMeta = {
  year:      2026,
  version:   'v2.0',
  campName:  'Narnia 2026',
  theme:     'Lev, čarodejnica a šatník',
  campDates: { start: '2026-06-28', end: '2026-07-04' },
  location:  'Chatovačka, Donovaly'
};

// ─────────────────────────────────────────────────────────────────────────────
// OZNAMY — zobrazujú sa na úvodnej stránke
// type: 'warning' | 'info'
// ─────────────────────────────────────────────────────────────────────────────

export const announcements = [
  { text: 'Dnes večer je nočná hra – pripravte sa!', type: 'warning' },
  { text: 'Ráno budenie o 7:30, raňajky o 8:00',    type: 'info'    },
  { text: 'Každý animátor dostane rolu – skontrolujte Aktivity', type: 'info' }
];

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

export const appendices = {
  note:   'Prílohy (rozdelenie skupiniek, distribúcia aktivít) budú doplnené vedúcim tábora.',
  groups: [],
  other:  []
};
