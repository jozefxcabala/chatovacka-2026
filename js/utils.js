// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES — čisté pomocné funkcie, žiadne DOM mutácie
// ─────────────────────────────────────────────────────────────────────────────

export const DAY_COLOR_MAP = {
  pondelok: 'var(--col-pondelok)',
  utorok:   'var(--col-utorok)',
  streda:   'var(--col-streda)',
  stvrtok:  'var(--col-stvrtok)',
  piatok:   'var(--col-piatok)',
  sobota:   'var(--col-sobota)'
};

export const ICONS = {
  home:     '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 8L9 2l7 6v8a1 1 0 01-1 1h-4v-5H6v5H3a1 1 0 01-1-1V8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  calendar: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="4" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M6 2v3M12 2v3M2 8h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  activity: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M9 2.5C6.2 5.2 6.2 12.8 9 15.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/><path d="M2.5 9c2.7-2.8 10.3-2.8 13 0" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>',
  theater:  '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><ellipse cx="6.5" cy="6.5" rx="5" ry="4.5" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 7.5c.5 1.5 3.5 1.5 4 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><ellipse cx="12" cy="12" rx="4.5" ry="4" stroke="currentColor" stroke-width="1.4"/><path d="M10 13.5c.5-1.5 3.5-1.5 4 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
  prayer:   '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 2v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 6.5h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  people:   '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="6.5" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="12.5" cy="5.5" r="2" stroke="currentColor" stroke-width="1.3"/><path d="M1.5 15c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13 11.2c2 .4 3.5 1.6 3.5 3.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
  list:     '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="3" y="2" width="12" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M6 6.5h6M6 9.5h6M6 12.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  chevronLeft:  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 2L4 8l6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevronRight: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 2l6 6-6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrowLeft:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3L5 8l5 5M5 8h9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

// ─────────────────────────────────────────────────────────────────────────────

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function el(tag, cls) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
}

export function dayCalendarIcon(n) {
  return '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">' +
    '<rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>' +
    '<path d="M2 7h14" stroke="currentColor" stroke-width="1.5"/>' +
    '<path d="M6 1v4M12 1v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
    '<text x="9" y="14" text-anchor="middle" fill="currentColor" font-size="6.5" font-weight="700" font-family="-apple-system,system-ui,sans-serif">' + n + '</text>' +
    '</svg>';
}

export function getDayConfig(days, dayId) {
  return days.find(d => d.id === dayId) || null;
}

export function getActivity(activities, actId) {
  return activities.find(a => a.id === actId) || null;
}

export function getTodayDayId(days) {
  const today = new Date().toISOString().split('T')[0];
  const found = days.find(d => d.date === today);
  return found ? found.id : null;
}

export function getScheduleStatus(schedule) {
  if (!schedule || !schedule.length) return [];

  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  function parseM(t) {
    const p = t.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }

  const withEnd = schedule.map((item, i) => {
    const startM = parseM(item.time);
    const endM = i + 1 < schedule.length ? parseM(schedule[i + 1].time) : startM + 90;
    return { ...item, startM, endM };
  });

  let currentIdx = -1;
  for (let i = 0; i < withEnd.length; i++) {
    if (nowMins >= withEnd[i].startM && nowMins < withEnd[i].endM) {
      currentIdx = i;
      break;
    }
  }

  let nextIdx = -1;
  for (let i = 0; i < withEnd.length; i++) {
    if (nowMins < withEnd[i].startM) {
      nextIdx = i;
      break;
    }
  }

  return withEnd.map((item, i) => {
    let status;
    if (i === currentIdx)       status = 'current';
    else if (i === nextIdx)     status = 'next';
    else if (nowMins >= item.endM) status = 'past';
    else                        status = 'future';
    return { ...item, status };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// formatTextToHtml — prevádza jednoduchý formátovaný text na bezpečné HTML
//
// Podporovaný formát (pozri activities.js pre príklad):
//   Normálny text      → <p>
//   ## Nadpis          → <h3>
//   - položka zoznamu  → <ul><li>
//   Prázdny riadok     → oddeľovač odsekov
//
// NIKDY nevkladaj surové HTML do pola description — vždy použi tento formát.
// ─────────────────────────────────────────────────────────────────────────────

export const ANIMATOR_PALETTE = [
  '#e74c3c', '#3498db', '#27ae60', '#f39c12', '#9b59b6',
  '#1abc9c', '#e67e22', '#2980b9', '#d35400', '#8e44ad',
  '#16a085', '#c0392b', '#607d8b', '#e91e63', '#00bcd4',
  '#795548', '#ff5722', '#4caf50', '#673ab7', '#f06292'
];

export function getAnimatorColorMap(activities) {
  const names = [...new Set(
    activities.flatMap(a => a.animators.map(x => x.name))
  )].sort();
  const map = new Map();
  names.forEach((name, i) => map.set(name, ANIMATOR_PALETTE[i % ANIMATOR_PALETTE.length]));
  return map;
}

export function formatTextToHtml(text) {
  if (!text || !text.trim()) return '';

  const blocks = text.trim().split(/\n[ \t]*\n/);
  let html = '';

  for (const block of blocks) {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) continue;

    let inList = false;

    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<h3 class="formatted-heading">' + escapeHtml(line.slice(3)) + '</h3>';
      } else if (line.startsWith('- ')) {
        if (!inList) { html += '<ul class="formatted-list">'; inList = true; }
        html += '<li>' + escapeHtml(line.slice(2)) + '</li>';
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<p class="formatted-para">' + escapeHtml(line) + '</p>';
      }
    }

    if (inList) { html += '</ul>'; inList = false; }
  }

  return html;
}
