// ─────────────────────────────────────────────────────────────────────────────
// RENDER — čisté HTML buildery (vracajú HTML string, nemodifikujú DOM priamo)
// ─────────────────────────────────────────────────────────────────────────────

import { escapeHtml, el, ICONS, DAY_COLOR_MAP, dayCalendarIcon, formatTextToHtml,
         getDayConfig, getActivity, getTodayDayId, getScheduleStatus,
         getAnimatorColorMap } from './utils.js';
import { getFilteredActivities, getFiltersState } from './filters.js';


// ─── SIDEBAR NAV ──────────────────────────────────────────────────────────────

export function buildNavItems(days) {
  const items = [{ id: 'uvod', label: 'Úvod', icon: 'home' }];
  days.forEach(d => items.push({ id: d.id, label: d.label, icon: 'calendar', isDayItem: true, dayIndex: d.dayIndex }));
  items.push({ divider: true });
  items.push(
    { id: 'aktivity', label: 'Aktivity',  icon: 'activity' },
    { id: 'scenky',   label: 'Scénky',    icon: 'theater'  },
    { id: 'stretka',  label: 'Stretká',   icon: 'people'   },
    { id: 'modlitby', label: 'Modlitby',  icon: 'prayer'   },
    { id: 'prilohy',  label: 'Prílohy',   icon: 'list'     }
  );
  return items;
}

export function renderSidebar(campMeta, navItems, onNavigate, nameDay) {
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = '';

  navItems.forEach(item => {
    if (item.divider) {
      const div = document.createElement('div');
      div.className = 'sidebar-divider';
      nav.appendChild(div);
      return;
    }

    const btn = document.createElement('button');
    btn.className = 'sidebar-nav-item' + (item.isDayItem ? ' sidebar-nav-item--day' : '');
    btn.setAttribute('data-section', item.id);
    btn.setAttribute('aria-label', item.label);
    const iconHtml = item.isDayItem ? dayCalendarIcon(item.dayIndex) : (ICONS[item.icon] || '');
    btn.innerHTML =
      '<span class="nav-item-icon">' + iconHtml + '</span>' +
      '<span class="nav-item-label">' + escapeHtml(item.label) + '</span>';
    btn.addEventListener('click', () => onNavigate(item.id));
    nav.appendChild(btn);
  });

  const footer = document.getElementById('sidebarFooter');
  if (footer) {
    const now = new Date();
    const initTime = now.toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    footer.innerHTML =
      '<div class="sidebar-clock-row">' +
      '<span class="sidebar-clock-icon">🕐</span>' +
      '<span id="sidebar-live-time" class="sidebar-clock-time">' + escapeHtml(initTime) + '</span>' +
      '<span id="sidebar-nameday" class="sidebar-nameday">' + (nameDay ? '🎂 ' + escapeHtml(nameDay) : '') + '</span>' +
      '</div>' +
      '<span class="sidebar-version-text">' + escapeHtml(campMeta.version) + ' · ' + campMeta.year + '</span>';
  }
}

// ─── SEKCIA: ÚVOD ─────────────────────────────────────────────────────────────

function minsToTime(m) {
  const h = Math.floor(m / 60) % 24;
  const min = m % 60;
  return String(h).padStart(2, '0') + ':' + String(min).padStart(2, '0');
}

export function buildUvod(campData, navItems) {
  const { meta, announcements, days, activities, animatorRules } = campData;
  const todayId    = getTodayDayId(days);
  const todayDay   = todayId ? getDayConfig(days, todayId) : null;
  const displayDay = todayDay || days[0];

  let html = '';

  // Hero
  html += '<div class="uvod-hero">';
  html += '<p class="uvod-eyebrow">Tábor ' + meta.year + '</p>';
  html += '<h1 class="uvod-hero-title">' + escapeHtml(meta.campName) + '</h1>';
  html += '<p class="uvod-hero-theme">' + escapeHtml(meta.theme) + '</p>';
  html += '</div>';

  // Announcements strip (above dashboard)
  if (announcements.length) {
    html += '<div class="uvod-announcements">';
    announcements.forEach(a => {
      html += '<div class="announcement-item announcement-item--' + escapeHtml(a.type) + '">';
      html += '<span class="ann-icon">' + (a.type === 'warning' ? '⚠️' : 'ℹ️') + '</span>';
      html += '<span>' + escapeHtml(a.text) + '</span>';
      html += '</div>';
    });
    html += '</div>';
  }

  // Dashboard: two-column layout
  html += '<div class="uvod-dashboard">';

  // ── Left column ──────────────────────────────────────────────────────────
  html += '<div class="uvod-dashboard-left">';

  // Card: Harmonogram dňa
  html += '<div class="uvod-card">';
  html += '<h2 class="uvod-card-heading">Harmonogram dňa <span class="uvod-day-badge">' + escapeHtml(displayDay.label) + '</span></h2>';

  const schedItems = getScheduleStatus(displayDay.schedule);
  if (schedItems.length) {
    html += '<div class="uvod-schedule-list">';
    schedItems.forEach(item => {
      const endStr = minsToTime(item.endM);
      const act    = item.activityRef ? getActivity(activities, item.activityRef) : null;
      const loc    = act && act.location ? act.location : null;
      html += '<div class="uvod-schedule-item uvod-schedule-item--' + item.status + '">';
      html += '<span class="uvod-sched-time">' + escapeHtml(item.time) + '<span class="uvod-sched-sep">–</span>' + escapeHtml(endStr) + '</span>';
      html += '<div class="uvod-sched-body">';
      if (act) {
        html += '<button class="uvod-sched-label uvod-sched-label--link" data-act="' + escapeHtml(item.activityRef) + '">' + escapeHtml(item.label) + '</button>';
      } else {
        html += '<span class="uvod-sched-label">' + escapeHtml(item.label) + '</span>';
      }
      if (loc)               html += '<span class="uvod-sched-loc">' + escapeHtml(loc) + '</span>';
      if (item.note)         html += '<span class="uvod-sched-note">' + escapeHtml(item.note) + '</span>';
      html += '</div>';
      if (item.status === 'current') html += '<span class="uvod-sched-badge uvod-sched-badge--current">Prebieha</span>';
      if (item.status === 'next')    html += '<span class="uvod-sched-badge uvod-sched-badge--next">Ďalšie</span>';
      html += '</div>';
    });
    html += '</div>';
  } else {
    html += '<p class="uvod-empty-note">Program dňa nebol zadaný.</p>';
  }

  html += '<button class="uvod-goto-btn" data-nav="' + escapeHtml(displayDay.id) + '">Zobraziť celý program dňa →</button>';
  html += '</div>';

  html += '</div>'; // end left column

  // ── Right column ─────────────────────────────────────────────────────────
  html += '<div class="uvod-dashboard-right">';

  // Card: 10 animátora
  html += '<div class="uvod-card uvod-card--manifest">';
  html += '<h2 class="uvod-card-heading">10 animátora</h2>';
  if (animatorRules && animatorRules.length) {
    html += '<ol class="manifest-list">';
    animatorRules.forEach(rule => {
      html += '<li class="manifest-item">';
      html += '<span class="manifest-num">' + rule.id + '</span>';
      html += '<span class="manifest-text">' + escapeHtml(rule.text) + '</span>';
      html += '</li>';
    });
    html += '</ol>';
  }
  html += '</div>';

  html += '</div>'; // end right column
  html += '</div>'; // end dashboard

  return html;
}

// ─── SEKCIA: DEŇ ──────────────────────────────────────────────────────────────

function renderDayScheduleHtml(day, activities) {
  let html = '<h2 class="day-section-heading">Harmonogram</h2>';
  html += '<div class="day-timeline">';
  day.schedule.forEach(item => {
    const hasActivity = !!(item.activityRef && getActivity(activities, item.activityRef));
    html += '<div class="timeline-item timeline-item--' + item.type + '">';
    html += '<div class="timeline-left"><div class="timeline-dot"></div><div class="timeline-line"></div></div>';
    html += '<div class="timeline-body">';
    html += '<span class="timeline-time">' + escapeHtml(item.time) + '</span>';
    if (hasActivity) {
      html += '<button class="timeline-label timeline-label--link" data-day-act="' + escapeHtml(item.activityRef) + '">' + escapeHtml(item.label) + '</button>';
    } else {
      html += '<span class="timeline-label">' + escapeHtml(item.label) + '</span>';
    }
    if (item.note) html += '<span class="timeline-note">' + escapeHtml(item.note) + '</span>';
    html += '</div></div>';
  });
  html += '</div>';
  return html;
}

function renderActivityPreviewAccordionHtml(dayActivities) {
  if (!dayActivities.length) return '';
  let html = '<h2 class="day-section-heading">Aktivity dňa</h2>';
  html += '<div class="day-accordion">';
  dayActivities.forEach((act, index) => {
    const isOpen = index === 0;
    html += '<div class="day-accordion-item' + (isOpen ? ' day-accordion-item--open' : '') + '" data-accordion-id="' + escapeHtml(act.id) + '">';

    // Header
    html += '<button class="day-accordion-header" data-accordion-toggle="' + escapeHtml(act.id) + '" aria-expanded="' + (isOpen ? 'true' : 'false') + '">';
    html += '<div class="day-accordion-header-info">';
    html += '<span class="day-accordion-name">' + escapeHtml(act.name) + '</span>';
    html += '<span class="day-accordion-meta">' + escapeHtml(act.timeLabel) + (act.time ? ' · ' + escapeHtml(act.time) : '') + '</span>';
    html += '</div>';
    html += '<span class="day-accordion-chevron">' + ICONS.chevronRight + '</span>';
    html += '</button>';

    // Body (krátky náhľad)
    html += '<div class="day-accordion-body"' + (isOpen ? '' : ' hidden') + '>';
    html += '<div class="day-accordion-preview">';

    // Meta: čas, miesto, vedúci
    const metaItems = [];
    if (act.time) metaItems.push({ label: 'Čas', value: act.time + (act.endTime ? ' – ' + act.endTime : '') });
    if (act.location) metaItems.push({ label: 'Miesto', value: act.location });
    if (act.vedúciProgramu) metaItems.push({ label: 'Vedúci programu', value: act.vedúciProgramu });
    else if (act.vedúciDna) metaItems.push({ label: 'Vedúci dňa', value: act.vedúciDna });

    if (metaItems.length) {
      html += '<div class="day-preview-meta">';
      metaItems.forEach(m => {
        html += '<div class="day-preview-meta-item">';
        html += '<span class="day-preview-meta-label">' + escapeHtml(m.label) + '</span>';
        html += '<span class="day-preview-meta-value">' + escapeHtml(m.value) + '</span>';
        html += '</div>';
      });
      html += '</div>';
    }

    // Animátori
    if (act.animators && act.animators.length) {
      const SHOW = 3;
      html += '<div class="day-preview-row day-preview-row--animators">';
      html += '<span class="day-preview-row-label">Animátori</span>';
      html += '<div class="animatori-chips">';
      act.animators.forEach((a, i) => {
        html += '<span class="chip' + (i >= SHOW ? ' chip--hidden' : '') + '">';
        html += escapeHtml(a.name);
        if (a.role) html += ' <span class="chip-rola">' + escapeHtml(a.role) + '</span>';
        html += '</span>';
      });
      if (act.animators.length > SHOW) {
        html += '<button class="chip chip--more chip--expandable" data-expand-chips>+' + (act.animators.length - SHOW) + '</button>';
      }
      html += '</div>';
      html += '</div>';
    } else if (act.animatorsNote) {
      html += '<div class="day-preview-row">';
      html += '<span class="day-preview-row-label">Animátori</span>';
      html += '<span class="day-preview-row-value">' + escapeHtml(act.animatorsNote) + '</span>';
      html += '</div>';
    }

    // Pomôcky (max 3, zvyšok rozbaľovací)
    if (act.materials && act.materials.length) {
      const MAT_SHOW = 3;
      html += '<div class="day-preview-row">';
      html += '<span class="day-preview-row-label">Pomôcky</span>';
      html += '<span class="day-preview-row-value">';
      html += act.materials.slice(0, MAT_SHOW).map(m => escapeHtml(m)).join(', ');
      if (act.materials.length > MAT_SHOW) {
        const hidden = act.materials.slice(MAT_SHOW);
        html += '<span class="mat-hidden-group" hidden>, ' + hidden.map(m => escapeHtml(m)).join(', ') + '</span>';
        html += ' <button class="day-preview-more chip--expandable" data-expand-materials>+' + hidden.length + ' ďalšie</button>';
      }
      html += '</span>';
      html += '</div>';
    }

    // Krátky súhrn
    if (act.detail) {
      html += '<p class="day-preview-excerpt">' + escapeHtml(act.detail) + '</p>';
    } else if (act.description && act.description.trim()) {
      const excerpt = act.description.trim().split('\n')
        .map(l => l.trim())
        .find(l => l && !l.startsWith('#') && !l.startsWith('-'));
      if (excerpt) {
        html += '<p class="day-preview-excerpt">' + escapeHtml(excerpt) + '</p>';
      }
    }

    // Tlačidlo na plný detail
    html += '<button class="day-preview-detail-btn" data-act="' + escapeHtml(act.id) + '">Otvoriť detail aktivity ' + ICONS.chevronRight + '</button>';

    html += '</div>'; // .day-accordion-preview
    html += '</div>'; // .day-accordion-body
    html += '</div>'; // .day-accordion-item
  });
  html += '</div>'; // .day-accordion
  return html;
}

export function buildDay(dayId, campData) {
  const { days, activities } = campData;
  const day = getDayConfig(days, dayId);
  if (!day) return '<p>Deň nenájdený.</p>';
  const color = DAY_COLOR_MAP[dayId] || 'var(--gold)';
  const dayActivities = activities.filter(a => a.dayRef === dayId);
  let html = '';

  // Hero (plná šírka)
  html += '<div class="day-hero" style="border-color:' + color + '">';
  html += '<div class="day-hero-label" style="color:' + color + '">Deň ' + day.dayIndex + '</div>';
  html += '<h1 class="day-hero-title">' + escapeHtml(day.label) + '</h1>';
  html += '<p class="day-hero-date">' + escapeHtml(day.date) + '</p>';
  if (day.thought) html += '<blockquote class="day-thought">' + escapeHtml(day.thought) + '</blockquote>';
  if (day.vedúciDna) html += '<p class="day-vedúci">Vedúci dňa: <strong>' + escapeHtml(day.vedúciDna) + '</strong></p>';
  html += '</div>';

  // Dvojstĺpcový layout
  html += '<div class="day-page-layout">';

  // Ľavý stĺpec: harmonogram
  html += '<div class="day-col day-col--schedule">';
  html += renderDayScheduleHtml(day, activities);
  html += '</div>';

  // Pravý stĺpec: accordion aktivít
  html += '<div class="day-col day-col--activities">';
  if (dayActivities.length) {
    html += renderActivityPreviewAccordionHtml(dayActivities);
  } else {
    html += '<p class="day-empty-note">Pre tento deň nie sú zadané aktivity.</p>';
  }
  html += '</div>';

  html += '</div>'; // .day-page-layout
  return html;
}

// ─── SEKCIA: AKTIVITY (scaffold + filtrovací panel) ───────────────────────────

export function buildAktivitySection(campData) {
  let html = '<div id="aktivity-list-view">';

  html += '<div class="filters-bar">';
  html += '<div class="filters-inner">';

  html += '<div class="filter-item filter-search">';
  html += '<input type="search" id="actSearch" class="filter-control" placeholder="Hľadaj aktivitu, animátora…" autocomplete="off" aria-label="Hľadaj">';
  html += '</div>';

  const CHEV = '<svg class="filter-custom-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  html += '<div class="filter-item filter-custom-wrap">';
  html += '<button type="button" id="actDayFilter" class="filter-control filter-custom-btn" data-value="" aria-haspopup="true" aria-expanded="false">';
  html += '<span class="filter-custom-label">Všetky dni</span>' + CHEV;
  html += '</button><div class="custom-select-panel" hidden>';
  html += '<div class="custom-select-option custom-select-option--active" data-value="">Všetky dni</div>';
  campData.days.forEach(d => {
    html += '<div class="custom-select-option" data-value="' + escapeHtml(d.id) + '">' + escapeHtml(d.label) + '</div>';
  });
  html += '</div></div>';

  html += '<div class="filter-item filter-custom-wrap">';
  html += '<button type="button" id="actTimeFilter" class="filter-control filter-custom-btn" data-value="" aria-haspopup="true" aria-expanded="false">';
  html += '<span class="filter-custom-label">Každý čas</span>' + CHEV;
  html += '</button><div class="custom-select-panel" hidden>';
  html += '<div class="custom-select-option custom-select-option--active" data-value="">Každý čas</div>';
  [['morning','Doobedu'],['afternoon','Poobedie'],['evening','Večer'],['night','Nočná hra']].forEach(([v, l]) => {
    html += '<div class="custom-select-option" data-value="' + v + '">' + l + '</div>';
  });
  html += '</div></div>';

  html += '<div class="filter-item filter-custom-wrap">';
  html += '<button type="button" id="actTypeFilter" class="filter-control filter-custom-btn" data-value="" aria-haspopup="true" aria-expanded="false">';
  html += '<span class="filter-custom-label">Všetky typy</span>' + CHEV;
  html += '</button><div class="custom-select-panel" hidden>';
  html += '<div class="custom-select-option custom-select-option--active" data-value="">Všetky typy</div>';
  html += '<div class="custom-select-option" data-value="activity">Aktivita</div>';
  html += '<div class="custom-select-option" data-value="scenka">Scénka</div>';
  html += '</div></div>';

  const animColorMap = getAnimatorColorMap(campData.activities);
  const allAnimators = [...animColorMap.keys()];
  if (allAnimators.length) {
    const chevronSvg = '<svg class="filter-animator-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    html += '<div class="filter-item filter-animator-wrap">';
    html += '<button type="button" id="actAnimatorBtn" class="filter-control filter-animator-btn" aria-haspopup="true" aria-expanded="false">';
    html += '<span class="filter-animator-label" id="actAnimatorLabel">Všetci animátori</span>';
    html += chevronSvg;
    html += '</button>';
    html += '<div id="actAnimatorPanel" class="animator-panel" hidden>';
    html += '<div class="animator-search-wrap"><input type="text" id="actAnimatorSearch" class="animator-search" placeholder="Hľadaj animátora…" autocomplete="off"></div>';
    allAnimators.forEach(name => {
      const color = animColorMap.get(name);
      html += '<label class="animator-option">';
      html += '<input type="checkbox" class="animator-check" value="' + escapeHtml(name) + '">';
      html += '<span class="animator-dot" style="background:' + color + '"></span>';
      html += '<span class="animator-name-label" style="color:' + color + '">' + escapeHtml(name) + '</span>';
      html += '</label>';
    });
    html += '</div>';
    html += '</div>';
  }

  html += '<button id="actClearBtn" class="btn-clear">Vyčistiť</button>';
  html += '</div>';
  html += '<p id="actResultInfo" class="result-info" aria-live="polite"></p>';
  html += '</div>';

  html += '<div class="main-content">';
  html += '<div id="aktivityCardsGrid" class="cards-grid" role="list"></div>';
  html += '<div id="aktivityEmpty" class="empty-state" hidden><p>Žiadne aktivity nevyhovujú filtru.</p><button class="btn-clear-inline" id="actClearBtn2">Vyčistiť filtre</button></div>';
  html += '</div>';
  html += '</div>';

  html += '<div id="aktivity-detail-view" class="aktivity-detail-view" hidden></div>';
  return html;
}

// ─── AKTIVITY: KARTY (DOM mutácia — renderuje do gridu) ───────────────────────

export function buildAktivityCards(campData) {
  const grid  = document.getElementById('aktivityCardsGrid');
  const empty = document.getElementById('aktivityEmpty');
  const info  = document.getElementById('actResultInfo');
  if (!grid) return;

  const filtersState = getFiltersState();
  const filtered = getFilteredActivities(campData.activities, filtersState);
  const animColorMap = getAnimatorColorMap(campData.activities);
  grid.innerHTML = '';

  if (!filtered.length) {
    empty.hidden = false;
    if (info) info.textContent = '';
    return;
  }

  empty.hidden = true;
  const total = campData.activities.length;
  if (info) info.textContent = filtered.length < total
    ? filtered.length + ' z ' + total + ' aktivít'
    : total + ' aktivít';

  filtered.forEach(act => {
    const color   = DAY_COLOR_MAP[act.dayRef] || 'var(--gold)';
    const dayConf = getDayConfig(campData.days, act.dayRef);

    const card   = el('article', 'card card--' + act.dayRef);
    const stripe = el('div', 'card-stripe');
    stripe.style.background = color;
    card.appendChild(stripe);

    const body   = el('div', 'card-body');
    const badges = el('div', 'card-badges');

    if (dayConf) {
      const db = el('span', 'badge badge-' + act.dayRef);
      db.textContent = dayConf.label;
      badges.appendChild(db);
    }
    const tb = el('span', 'badge badge-cas');
    tb.textContent = act.timeLabel;
    badges.appendChild(tb);
    if (act.type === 'scenka') {
      const scb = el('span', 'badge badge-scenka');
      scb.textContent = 'Scénka';
      badges.appendChild(scb);
    }
    body.appendChild(badges);

    const title = el('h2', 'card-title');
    title.textContent = act.name;
    body.appendChild(title);

    if (act.time) {
      const timeEl = el('p', 'card-time');
      timeEl.textContent = act.time + (act.endTime ? ' – ' + act.endTime : '') + (act.location ? '  ·  ' + act.location : '');
      body.appendChild(timeEl);
    }

    if (act.animatorsNote || act.animators.length) {
      const animDiv = el('div', 'card-animatori');
      const lbl = el('span', 'animatori-label');
      lbl.textContent = act.animatorsNote || ('Animátori (' + act.animators.length + ')');
      animDiv.appendChild(lbl);

      if (act.animators.length) {
        const chips = el('div', 'animatori-chips');
        const selectedAnim = new Set(filtersState.animF || []);
        const makeChip = a => {
          const chip = el('span', 'chip');
          chip.textContent = a.name;
          if (selectedAnim.size && selectedAnim.has(a.name)) {
            const c = animColorMap.get(a.name);
            if (c) {
              const r = parseInt(c.slice(1,3), 16), g = parseInt(c.slice(3,5), 16), b = parseInt(c.slice(5,7), 16);
              chip.style.background  = 'rgba(' + r + ',' + g + ',' + b + ',0.13)';
              chip.style.borderColor = 'rgba(' + r + ',' + g + ',' + b + ',0.5)';
              chip.style.color       = c;
            }
          }
          return chip;
        };
        const sortedAnimators = selectedAnim.size
          ? [...act.animators].sort((a, b) => (selectedAnim.has(a.name) ? 0 : 1) - (selectedAnim.has(b.name) ? 0 : 1))
          : act.animators;
        sortedAnimators.slice(0, 4).forEach(a => chips.appendChild(makeChip(a)));
        if (sortedAnimators.length > 4) {
          const more = el('span', 'chip chip--more chip--expandable');
          more.textContent = '+' + (sortedAnimators.length - 4);
          more.title = 'Zobraziť všetkých';
          more.addEventListener('click', e => {
            e.stopPropagation();
            more.remove();
            sortedAnimators.slice(4).forEach(a => chips.appendChild(makeChip(a)));
          });
          chips.appendChild(more);
        }
        animDiv.appendChild(chips);
      }
      body.appendChild(animDiv);
    }

    const detailBtn = el('button', 'card-detail-btn');
    detailBtn.setAttribute('data-act', act.id);
    detailBtn.innerHTML = 'Detail ' + ICONS.chevronRight;
    body.appendChild(detailBtn);

    card.appendChild(body);
    grid.appendChild(card);
  });
}

// ─── AKTIVITY: DETAIL ─────────────────────────────────────────────────────────

export function buildActivityDetail(actId, campData) {
  const act     = getActivity(campData.activities, actId);
  if (!act) return '<p>Aktivita nenájdená.</p>';
  const dayConf = getDayConfig(campData.days, act.dayRef);
  const color   = DAY_COLOR_MAP[act.dayRef] || 'var(--gold)';
  let html = '';

  html += '<div class="detail-topbar">';
  html += '<button class="detail-back-btn" id="detailBackBtn">' + ICONS.arrowLeft + 'Späť na aktivity</button>';
  html += '</div>';

  html += '<div class="detail-content">';

  html += '<div class="detail-header" style="border-left-color:' + color + '">';
  html += '<div class="card-badges">';
  if (dayConf) html += '<span class="badge badge-' + act.dayRef + '">' + escapeHtml(dayConf.label) + '</span>';
  html += '<span class="badge badge-cas">' + escapeHtml(act.timeLabel) + '</span>';
  if (act.type === 'scenka') html += '<span class="badge badge-scenka">Scénka</span>';
  html += '</div>';
  html += '<h1 class="detail-title">' + escapeHtml(act.name) + '</h1>';
  html += '</div>';

  const metaItems = [];
  if (act.time)           metaItems.push({ label: 'Čas',             value: act.time + (act.endTime ? ' – ' + act.endTime : '') });
  if (act.location)       metaItems.push({ label: 'Miesto',          value: act.location });
  if (act.vedúciDna)      metaItems.push({ label: 'Vedúci dňa',      value: act.vedúciDna });
  if (act.vedúciProgramu) metaItems.push({ label: 'Vedúci programu', value: act.vedúciProgramu });

  if (metaItems.length) {
    html += '<div class="detail-meta-grid">';
    metaItems.forEach(m => {
      html += '<div class="detail-meta-item">';
      html += '<span class="detail-meta-label">' + escapeHtml(m.label) + '</span>';
      html += '<span class="detail-meta-value">' + escapeHtml(m.value) + '</span>';
      html += '</div>';
    });
    html += '</div>';
  }

  if (act.description && act.description.trim()) {
    html += '<div class="detail-section">';
    html += '<h2 class="detail-section-title">Popis programu</h2>';
    html += '<div class="detail-description">' + formatTextToHtml(act.description) + '</div>';
    html += '</div>';
  }

  if (act.animators.length || act.animatorsNote) {
    html += '<div class="detail-section">';
    html += '<h2 class="detail-section-title">Potrební animátori';
    if (act.animators.length) html += ' <span class="detail-count">(' + act.animators.length + ')</span>';
    html += '</h2>';
    if (act.animatorsNote) html += '<p class="detail-animators-note">' + escapeHtml(act.animatorsNote) + '</p>';
    if (act.animators.length) {
      const detailColorMap = getAnimatorColorMap(campData.activities);
      html += '<div class="animatori-chips">';
      act.animators.forEach(a => {
        const c = detailColorMap.get(a.name);
        let chipStyle = '', nameStyle = '';
        if (c) {
          const r = parseInt(c.slice(1,3), 16), g = parseInt(c.slice(3,5), 16), b = parseInt(c.slice(5,7), 16);
          chipStyle = ' style="background:rgba(' + r + ',' + g + ',' + b + ',0.13);border-color:rgba(' + r + ',' + g + ',' + b + ',0.5)"';
          nameStyle = ' style="color:' + c + '"';
        }
        html += '<span class="chip"' + chipStyle + '><span class="chip-name"' + nameStyle + '>' + escapeHtml(a.name) + '</span>';
        if (a.role) html += '<span class="chip-rola">' + escapeHtml(a.role) + '</span>';
        html += '</span>';
      });
      html += '</div>';
    }
    html += '</div>';
  }

  if (act.materials.length) {
    html += '<div class="detail-section">';
    html += '<h2 class="detail-section-title">Pomôcky</h2>';
    html += '<ul class="materials-plain-list">';
    act.materials.forEach(mat => { html += '<li>' + escapeHtml(mat) + '</li>'; });
    html += '</ul>';
    html += '</div>';
  }

  if (act.hasScoring && act.scoring) {
    html += '<div class="detail-section">';
    html += '<h2 class="detail-section-title">Hodnotenie</h2>';
    html += '<p class="detail-scoring">' + escapeHtml(act.scoring) + '</p>';
    html += '</div>';
  }

  if (act.hasMtzNote && act.mtzNote) {
    html += '<div class="detail-section detail-section--mtz">';
    html += '<h2 class="detail-section-title">MTZ poznámky</h2>';
    html += '<p class="detail-mtz">' + escapeHtml(act.mtzNote) + '</p>';
    html += '</div>';
  }

  html += '</div>';
  return html;
}

// ─── SEKCIA: SCÉNKY / STRETKÁ / MODLITBY (spoločný builder + exporty) ────────

function buildDayAccordionSection(title, subtitle, items, days, textClass, placeholder) {
  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">' + escapeHtml(title) + '</h1>';
  html += '<p class="section-subtitle">' + escapeHtml(subtitle) + '</p></div>';

  let hasAny = false;
  let firstOpened = false;
  days.forEach(day => {
    const dayItems = items.filter(i => i.dayRef === day.id);
    if (!dayItems.length) return;
    hasAny = true;
    const color = DAY_COLOR_MAP[day.id] || 'var(--gold)';

    html += '<div class="scenky-day-group">';
    html += '<h2 class="scenky-day-heading" style="color:' + color + '">' + escapeHtml(day.label) + '</h2>';
    html += '<div class="day-accordion">';

    dayItems.forEach(item => {
      const isOpen = !firstOpened;
      if (isOpen) firstOpened = true;
      html += '<div class="day-accordion-item' + (isOpen ? ' day-accordion-item--open' : '') + '" data-accordion-id="' + escapeHtml(item.id) + '">';
      html += '<button class="day-accordion-header" data-accordion-toggle="' + escapeHtml(item.id) + '" aria-expanded="' + (isOpen ? 'true' : 'false') + '">';
      html += '<div class="day-accordion-header-info"><span class="day-accordion-name">' + escapeHtml(item.title) + '</span></div>';
      html += '<span class="day-accordion-chevron">' + ICONS.chevronRight + '</span>';
      html += '</button>';
      html += '<div class="day-accordion-body"' + (isOpen ? '' : ' hidden') + '>';
      html += '<div class="day-accordion-preview">';
      html += '<div class="' + textClass + '">' + formatTextToHtml(item.text) + '</div>';
      html += '</div></div></div>';
    });

    html += '</div></div>';
  });

  if (!hasAny) html += '<p class="placeholder-text">' + escapeHtml(placeholder) + '</p>';
  html += '</div>';
  return html;
}

export function buildStretka(campData) {
  const { days, stretka } = campData;
  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Stretká</h1>';
  html += '<p class="section-subtitle">Stretká na každý deň tábora.</p></div>';

  const ordered = days.map(d => ({
    day: d,
    stretko: stretka.find(s => s.dayRef === d.id) || null
  })).filter(x => x.stretko);

  if (!ordered.length) {
    html += '<p class="placeholder-text">Stretká budú doplnené.</p>';
    html += '</div>';
    return html;
  }

  html += '<div class="day-accordion">';
  ordered.forEach(({ day, stretko }, index) => {
    const isOpen  = index === 0;
    const color   = DAY_COLOR_MAP[day.id] || 'var(--gold)';
    html += '<div class="day-accordion-item' + (isOpen ? ' day-accordion-item--open' : '') + '" data-accordion-id="' + escapeHtml(stretko.id) + '" style="border-left: 3px solid ' + color + '">';
    html += '<button class="day-accordion-header" data-accordion-toggle="' + escapeHtml(stretko.id) + '" aria-expanded="' + (isOpen ? 'true' : 'false') + '">';
    html += '<div class="day-accordion-header-info">';
    html += '<span class="stretko-day-label" style="color:' + color + '">' + escapeHtml(day.label) + '</span>';
    html += '<span class="day-accordion-name">' + escapeHtml(stretko.title) + '</span>';
    html += '</div>';
    html += '<span class="day-accordion-chevron">' + ICONS.chevronRight + '</span>';
    html += '</button>';
    html += '<div class="day-accordion-body"' + (isOpen ? '' : ' hidden') + '>';
    html += '<div class="day-accordion-preview">';
    html += '<div class="prayer-text">' + formatTextToHtml(stretko.text) + '</div>';
    html += '</div></div>';
    html += '</div>';
  });
  html += '</div>';

  html += '</div>';
  return html;
}

export function buildModlitby(campData) {
  return buildDayAccordionSection(
    'Modlitby', 'Modlitby na každý deň tábora.',
    campData.prayers, campData.days,
    'prayer-text', 'Modlitby budú doplnené.'
  );
}

export function buildScenky(campData) {
  return buildDayAccordionSection(
    'Scénky', 'Scénky zoradené podľa dní tábora.',
    campData.scenes, campData.days,
    'prayer-text', 'Scénky budú doplnené.'
  );
}

// ─── SEKCIA: PRÍLOHY ──────────────────────────────────────────────────────────

export function buildPrilohy(campData) {
  const { appendices } = campData;
  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Prílohy</h1>';
  html += '<p class="section-subtitle">Rozdelenie skupín a ďalšie prílohy tábora.</p></div>';

  if (!appendices.length) {
    html += '<p class="placeholder-text">Prílohy budú doplnené.</p>';
    html += '</div>';
    return html;
  }

  html += '<div class="day-accordion">';
  appendices.forEach((item, index) => {
    const isOpen = index === 0;
    html += '<div class="day-accordion-item' + (isOpen ? ' day-accordion-item--open' : '') + '" data-accordion-id="' + escapeHtml(item.id) + '">';
    html += '<button class="day-accordion-header" data-accordion-toggle="' + escapeHtml(item.id) + '" aria-expanded="' + (isOpen ? 'true' : 'false') + '">';
    html += '<div class="day-accordion-header-info">';
    html += '<span class="day-accordion-name">' + escapeHtml(item.title) + '</span>';
    html += '</div>';
    html += '<span class="day-accordion-chevron">' + ICONS.chevronRight + '</span>';
    html += '</button>';
    html += '<div class="day-accordion-body"' + (isOpen ? '' : ' hidden') + '>';
    html += '<div class="day-accordion-preview">';
    html += '<div class="prayer-text">' + formatTextToHtml(item.text) + '</div>';
    html += '</div></div>';
    html += '</div>';
  });
  html += '</div>';

  html += '</div>';
  return html;
}

// ─── RENDEROVANIE VŠETKÝCH SEKCIÍ ─────────────────────────────────────────────

export function renderAllSections(campData, navItems) {
  const main = document.getElementById('appMain');
  main.innerHTML = '';

  const sections = [{ id: 'uvod', html: buildUvod(campData, navItems) }];

  campData.days.forEach(d => {
    sections.push({ id: d.id, html: buildDay(d.id, campData) });
  });

  sections.push(
    { id: 'aktivity', html: buildAktivitySection(campData) },
    { id: 'scenky',   html: buildScenky(campData)          },
    { id: 'stretka',  html: buildStretka(campData)         },
    { id: 'modlitby', html: buildModlitby(campData)        },
    { id: 'prilohy',  html: buildPrilohy(campData)         }
  );

  const ids = [];
  sections.forEach(s => {
    const sec = document.createElement('section');
    sec.id = 'section-' + s.id;
    sec.className = 'section';
    sec.innerHTML = s.html;
    main.appendChild(sec);
    ids.push(s.id);
  });

  return ids;
}
