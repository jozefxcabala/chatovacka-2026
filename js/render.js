// ─────────────────────────────────────────────────────────────────────────────
// RENDER — čisté HTML buildery (vracajú HTML string, nemodifikujú DOM priamo)
// ─────────────────────────────────────────────────────────────────────────────

import { escapeHtml, el, ICONS, DAY_COLOR_MAP, dayCalendarIcon, formatTextToHtml,
         getDayConfig, getActivity, getTodayDayId, getScheduleStatus } from './utils.js';
import { getFilteredActivities, getFiltersState } from './filters.js';

// ─── SIDEBAR NAV ──────────────────────────────────────────────────────────────

export function buildNavItems(days) {
  const items = [{ id: 'uvod', label: 'Úvod', icon: 'home' }];
  days.forEach(d => items.push({ id: d.id, label: d.label, icon: 'calendar', isDayItem: true, dayIndex: d.dayIndex }));
  items.push({ divider: true });
  items.push(
    { id: 'aktivity', label: 'Aktivity',           icon: 'activity' },
    { id: 'scenky',   label: 'Scénky',              icon: 'theater'  },
    { id: 'stretka',  label: 'Stretká a modlitby', icon: 'prayer'   },
    { id: 'prilohy',  label: 'Prílohy',             icon: 'list'     }
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
      (nameDay ? '<span class="sidebar-nameday">🎂 ' + escapeHtml(nameDay) + '</span>' : '') +
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
    if (act.animatorsNote) {
      html += '<div class="day-preview-row">';
      html += '<span class="day-preview-row-label">Animátori</span>';
      html += '<span class="day-preview-row-value">' + escapeHtml(act.animatorsNote) + '</span>';
      html += '</div>';
    }

    // Pomôcky (max 3)
    if (act.materials && act.materials.length) {
      html += '<div class="day-preview-row">';
      html += '<span class="day-preview-row-label">Pomôcky</span>';
      html += '<span class="day-preview-row-value">' + act.materials.slice(0, 3).map(m => escapeHtml(m)).join(', ');
      if (act.materials.length > 3) html += ' <span class="day-preview-more">+' + (act.materials.length - 3) + ' ďalšie</span>';
      html += '</span>';
      html += '</div>';
    }

    // Úryvok popisu (prvá normálna veta)
    if (act.description && act.description.trim()) {
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

  html += '<div class="filter-item"><select id="actDayFilter" class="filter-control" aria-label="Deň">';
  html += '<option value="">Všetky dni</option>';
  campData.days.forEach(d => {
    html += '<option value="' + escapeHtml(d.id) + '">' + escapeHtml(d.label) + '</option>';
  });
  html += '</select></div>';

  html += '<div class="filter-item"><select id="actTimeFilter" class="filter-control" aria-label="Čas dňa">';
  html += '<option value="">Každý čas</option>';
  [['morning','Doobedu'],['afternoon','Poobedie'],['evening','Večer'],['night','Nočná hra']].forEach(t => {
    html += '<option value="' + t[0] + '">' + t[1] + '</option>';
  });
  html += '</select></div>';

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

  const filtered = getFilteredActivities(campData.activities, getFiltersState());
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
        act.animators.slice(0, 4).forEach(a => {
          const chip = el('span', 'chip');
          chip.textContent = a.name;
          chips.appendChild(chip);
        });
        if (act.animators.length > 4) {
          const more = el('span', 'chip chip--more');
          more.textContent = '+' + (act.animators.length - 4);
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
      html += '<div class="animatori-chips">';
      act.animators.forEach(a => {
        html += '<span class="chip"><span class="chip-name">' + escapeHtml(a.name) + '</span>';
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

// ─── SEKCIA: SCÉNKY ───────────────────────────────────────────────────────────

export function buildScenky(campData) {
  const { days, scenes } = campData;
  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Scénky</h1>';
  html += '<p class="section-subtitle">Scénky zoradené podľa dní tábora.</p></div>';

  days.forEach(day => {
    const dayScenes = scenes.filter(s => s.dayRef === day.id);
    if (!dayScenes.length) return;
    const color = DAY_COLOR_MAP[day.id] || 'var(--gold)';
    html += '<div class="scenky-day-group">';
    html += '<h2 class="scenky-day-heading" style="color:' + color + '">' + escapeHtml(day.label) + '</h2>';
    dayScenes.forEach(scene => {
      html += '<div class="scene-card">';
      html += '<h3 class="scene-title">' + escapeHtml(scene.title) + '</h3>';
      if (scene.note) html += '<p class="scene-note">' + escapeHtml(scene.note) + '</p>';
      html += '</div>';
    });
    html += '</div>';
  });

  if (!scenes.length) html += '<p class="placeholder-text">Scénky budú doplnené.</p>';

  html += '</div>';
  return html;
}

// ─── SEKCIA: STRETKÁ A MODLITBY ───────────────────────────────────────────────

export function buildStretka(campData) {
  const { prayers } = campData;
  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Stretká a modlitby</h1>';
  html += '<p class="section-subtitle">Modlitby a stretká na každý deň tábora.</p></div>';
  html += '<div class="prayers-list">';
  prayers.forEach(p => {
    html += '<div class="prayer-card">';
    html += '<h2 class="prayer-title">' + escapeHtml(p.title) + '</h2>';
    html += '<div class="prayer-text">' + formatTextToHtml(p.text) + '</div>';
    html += '</div>';
  });
  html += '</div></div>';
  return html;
}

// ─── SEKCIA: PRÍLOHY ──────────────────────────────────────────────────────────

export function buildPrilohy(campData) {
  const { appendices } = campData;
  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Prílohy</h1>';
  html += '<p class="section-subtitle">Rozdelenie skupín a ďalšie prílohy tábora.</p></div>';
  html += '<div class="info-block info-block--full">';
  html += '<div class="info-block-body"><p class="placeholder-text">' + escapeHtml(appendices.note) + '</p></div>';
  html += '</div></div>';
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
