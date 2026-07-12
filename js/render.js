// ─────────────────────────────────────────────────────────────────────────────
// RENDER — čisté HTML buildery (vracajú HTML string, nemodifikujú DOM priamo)
// ─────────────────────────────────────────────────────────────────────────────

import { escapeHtml, el, ICONS, DAY_COLOR_MAP, dayCalendarIcon, formatTextToHtml,
         getDayConfig, getActivity, getTodayDayId, getScheduleStatus,
         getAnimatorColorMap } from './utils.js';
import { getFilteredActivities, getFiltersState } from './filters.js';


// ─── MOKRÝ PROGRAM HELPERS ───────────────────────────────────────────────────

function getMokryProgram(act) {
  if (act.description) {
    const m = act.description.match(/##\s*Mokr[ý]?\s*[Pp]rogram[^\n]*\n([\s\S]*?)(?=\n##|$)/i);
    if (m && m[1].trim()) return m[1].trim();
  }
  if (act.mtzNote) {
    for (const line of act.mtzNote.split('\n')) {
      if (/mokr/i.test(line)) {
        return line.replace(/^Mokr[ý]?\s*[Pp]rogram[:\s]*/i, '').trim();
      }
    }
  }
  return null;
}

function stripDescriptionMokry(desc) {
  if (!desc) return desc;
  return desc
    .replace(/\n##\s*Mokr[ý]?\s*[Pp]rogram[\s\S]*/i, '')
    .replace(/^##\s*Mokr[ý]?\s*[Pp]rogram[\s\S]*/i, '')
    .trim();
}

function stripMtzNoteMokry(note) {
  if (!note) return note;
  const lines = note.split('\n').filter(l => !/mokr/i.test(l));
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  return lines.join('\n').trim();
}

// ─── SIDEBAR NAV ──────────────────────────────────────────────────────────────

export function buildNavItems(days) {
  const items = [{ id: 'uvod', label: 'Úvod', icon: 'home' }];
  days.forEach(d => items.push({ id: d.id, label: d.label, icon: 'calendar', isDayItem: true, dayIndex: d.dayIndex }));
  items.push({ divider: true });
  items.push(
    { id: 'aktivity',  label: 'Aktivity',  icon: 'activity' },
    { id: 'scenky',    label: 'Scénky',    icon: 'theater'  },
    { id: 'stretka',   label: 'Stretká',   icon: 'people'   },
    { id: 'modlitby',  label: 'Modlitby',  icon: 'prayer'   },
    { id: 'skupinky',  label: 'Skupinky',  icon: 'groups'     },
    { id: 'animatori', label: 'Animátori',        icon: 'personStar' },
    { id: 'hry',       label: 'Hry / voľný čas', icon: 'games'      },
    { id: 'prilohy',   label: 'Prílohy',          icon: 'list'       }
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
      '<span class="nav-item-icon" title="' + escapeHtml(item.label) + '">' + iconHtml + '</span>' +
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
  if (meta.motto) {
    html += '<blockquote class="uvod-hero-motto">' +
      escapeHtml(meta.motto).replace(/\n/g, '<br>') + '</blockquote>';
  }
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
      const timeHtml = (!item.endIsDefault && endStr !== item.time)
        ? escapeHtml(item.time) + '<span class="uvod-sched-sep">–</span>' + escapeHtml(endStr)
        : escapeHtml(item.time);
      html += '<div class="uvod-schedule-item uvod-schedule-item--' + item.status + '">';
      html += '<span class="uvod-sched-time">' + timeHtml + '</span>';
      html += '<div class="uvod-sched-body">';
      if (act) {
        html += '<button class="uvod-sched-label uvod-sched-label--link" data-act="' + escapeHtml(item.activityRef) + '">' + escapeHtml(item.label) + '</button>';
      } else if (item.prayerRef) {
        html += '<button class="uvod-sched-label uvod-sched-label--link" data-prayer="' + escapeHtml(item.prayerRef) + '">' + escapeHtml(item.label) + '</button>';
      } else if (item.stretkoRef) {
        html += '<button class="uvod-sched-label uvod-sched-label--link" data-stretko="' + escapeHtml(item.stretkoRef) + '">' + escapeHtml(item.label) + '</button>';
      } else {
        html += '<span class="uvod-sched-label">' + escapeHtml(item.label) + '</span>';
      }
      if (loc)       html += '<span class="uvod-sched-loc">' + escapeHtml(loc) + '</span>';
      if (item.note) html += '<span class="uvod-sched-note">' + escapeHtml(item.note) + '</span>';
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
    const hasPrayer   = !!(item.prayerRef);
    const hasStretko  = !!(item.stretkoRef);
    html += '<div class="timeline-item timeline-item--' + item.type + '">';
    html += '<div class="timeline-left"><div class="timeline-dot"></div><div class="timeline-line"></div></div>';
    html += '<div class="timeline-body">';
    html += '<span class="timeline-time">' + escapeHtml(item.time) + '</span>';
    if (hasActivity) {
      html += '<button class="timeline-label timeline-label--link" data-day-act="' + escapeHtml(item.activityRef) + '">' + escapeHtml(item.label) + '</button>';
      html += '<a href="#print-act-' + escapeHtml(item.activityRef) + '" class="timeline-label print-link">' + escapeHtml(item.label) + '</a>';
    } else if (hasPrayer) {
      html += '<button class="timeline-label timeline-label--link" data-prayer="' + escapeHtml(item.prayerRef) + '">' + escapeHtml(item.label) + '</button>';
    } else if (hasStretko) {
      html += '<button class="timeline-label timeline-label--link" data-stretko="' + escapeHtml(item.stretkoRef) + '">' + escapeHtml(item.label) + '</button>';
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
    html += '<div class="day-accordion-item' + (isOpen ? ' day-accordion-item--open' : '') + '" data-accordion-id="' + escapeHtml(act.id) + '" id="print-act-' + escapeHtml(act.id) + '">';

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

    // Mokrý program
    const mokryText = getMokryProgram(act);
    if (mokryText) {
      html += '<div class="day-preview-mokry">☔ ' + escapeHtml(mokryText) + '</div>';
    }

    // Krátky súhrn (screen only)
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

    // Plný popis (print only) — bez Mokrý program sekcie (zobrazuje sa osobitne vyššie)
    const printDesc = stripDescriptionMokry(act.description);
    if (printDesc && printDesc.trim()) {
      html += '<div class="print-full-desc">' + formatTextToHtml(printDesc) + '</div>';
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

  html += '<div class="filters-bar" id="aktivityFiltersBar">';
  html += '<button type="button" id="actFiltersToggle" class="filters-toggle-btn" aria-expanded="false">';
  html += '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>';
  html += '<span id="actFiltersToggleLabel">Zobraziť filtre</span>';
  html += '<svg class="filters-toggle-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  html += '</button>';
  html += '<div class="filters-inner" id="actFiltersInner">';
  html += '<button type="button" id="actViewToggle" class="view-toggle-btn" data-view-toggle aria-label="Zobraziť ako tabuľku" title="Zobraziť ako tabuľku">';
  html += '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><rect x="0.5" y="0.5" width="14" height="4" rx="0.75" stroke="currentColor" stroke-width="1.5"/><rect x="0.5" y="6" width="14" height="3" rx="0.75" stroke="currentColor" stroke-width="1.5"/><rect x="0.5" y="10.5" width="14" height="4" rx="0.75" stroke="currentColor" stroke-width="1.5"/></svg>';
  html += '</button>';

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
  const listView = document.getElementById('aktivity-list-view');
  const viewMode = listView ? (listView.dataset.view || 'cards') : 'cards';
  grid.className = viewMode === 'table' ? 'cards-grid cards-grid--table' : 'cards-grid';
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

  if (viewMode === 'table') {
    let tHtml = '<table class="activity-table"><thead><tr><th>Aktivita</th><th>Deň</th><th>Animátori</th></tr></thead><tbody>';
    filtered.forEach(act => {
      const dayConf = getDayConfig(campData.days, act.dayRef);
      const selectedAnim = new Set(filtersState.animF || []);
      const animDisplay = act.animators.length
        ? act.animators.map(a => {
            const n = escapeHtml(a.name);
            return (selectedAnim.size && selectedAnim.has(a.name)) ? '<span class="act-table-anim--active">' + n + '</span>' : n;
          }).join(', ')
        : (act.animatorsNote ? escapeHtml(act.animatorsNote) : '');
      tHtml += '<tr class="activity-table-row" data-act="' + escapeHtml(act.id) + '">';
      tHtml += '<td class="act-table-name">' + escapeHtml(act.name) + '</td>';
      tHtml += '<td class="act-table-day"><span class="badge badge-' + escapeHtml(act.dayRef) + '">' + escapeHtml(dayConf ? dayConf.label : act.dayRef) + '</span></td>';
      tHtml += '<td class="act-table-animators">' + (animDisplay || '—') + '</td>';
      tHtml += '</tr>';
    });
    tHtml += '</tbody></table>';
    grid.innerHTML = tHtml;
    return;
  }

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

  const mokryText = getMokryProgram(act);
  const cleanDesc = stripDescriptionMokry(act.description);
  if (cleanDesc && cleanDesc.trim()) {
    html += '<div class="detail-section">';
    html += '<h2 class="detail-section-title">Popis programu</h2>';
    html += '<div class="detail-description">' + formatTextToHtml(cleanDesc) + '</div>';
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
    const cleanMtz = (mokryText && /mokr/i.test(act.mtzNote))
      ? stripMtzNoteMokry(act.mtzNote)
      : act.mtzNote;
    if (cleanMtz && cleanMtz.trim()) {
      html += '<div class="detail-section detail-section--mtz">';
      html += '<h2 class="detail-section-title">MTZ poznámky</h2>';
      html += '<p class="detail-mtz">' + escapeHtml(cleanMtz) + '</p>';
      html += '</div>';
    }
  }

  if (mokryText) {
    html += '<div class="detail-section detail-section--mokry">';
    html += '<h2 class="detail-section-title">☔ Mokrý program</h2>';
    html += '<p class="detail-mokry">' + escapeHtml(mokryText) + '</p>';
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

// ─── SEKCIA: SKUPINKY ─────────────────────────────────────────────────────────

export function buildSkupinky(campData) {
  const { groupsOverview, groupDetails, girlsGroupDetails } = campData;
  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Skupinky</h1>';
  html += '<p class="section-subtitle">Rozdelenie chlapcov a dievčat podľa ročníkov.</p></div>';

  html += '<div class="skupiny-blocks">';

  groupsOverview.forEach(row => {
    const boysDetail  = (groupDetails      || []).find(g => g.name === row.boys)  || null;
    const girlsDetail = (girlsGroupDetails || []).find(g => g.name === row.girls) || null;
    const hex = escapeHtml(row.colorHex);

    html += '<div class="skupiny-block" style="border-top-color:' + hex + '">';

    // ── Header: ročník + animátori ─────────────────────────────────────────
    html += '<div class="skupiny-block-header" style="border-bottom-color:' + hex + '20">';
    html += '<div class="skupiny-block-grade" style="color:' + hex + '">' + escapeHtml(row.grade) + '</div>';
    html += '<div class="skupiny-block-animators">';

    // chlapci animátori
    html += '<div class="skupiny-block-anim-row">';
    html += '<span class="skupiny-block-anim-gender">♂</span>';
    if (row.boysAnimators.length) {
      html += '<span>' + row.boysAnimators.map(a => escapeHtml(a)).join(', ') + '</span>';
    } else {
      html += '<span class="skupiny-empty-note">—</span>';
    }
    html += '</div>';

    // dievčatá animátori
    html += '<div class="skupiny-block-anim-row">';
    html += '<span class="skupiny-block-anim-gender">♀</span>';
    if (row.girlsAnimators.length) {
      html += '<span>' + row.girlsAnimators.map(a => escapeHtml(a)).join(', ') + '</span>';
    } else {
      html += '<span class="skupiny-empty-note">Doplniť neskôr</span>';
    }
    html += '</div>';

    html += '</div>'; // .skupiny-block-animators
    html += '</div>'; // .skupiny-block-header

    // ── Telo: chlapci | dievčatá ───────────────────────────────────────────
    html += '<div class="skupiny-block-body">';

    // Chlapci
    html += '<div class="skupiny-block-col skupiny-block-col--boys">';
    html += '<div class="skupiny-block-col-name" style="color:' + hex + '">' + escapeHtml(row.boys) + '</div>';
    if (boysDetail && boysDetail.members.length) {
      html += '<ol class="skupiny-member-list">';
      boysDetail.members.forEach((m, i) => {
        const name = (typeof m === 'object') ? m.name : m;
        const size = (typeof m === 'object' && m.shirtSize) ? m.shirtSize : null;
        html += '<li class="skupiny-member-item"><span class="skupiny-member-num">' + (i + 1) + '.</span>';
        html += escapeHtml(name);
        if (size) {
          const cls = size === 'NEOVERENÉ' ? ' skupiny-shirt-size--neoverene' : '';
          html += '<span class="skupiny-shirt-size' + cls + '">' + escapeHtml(size) + '</span>';
        }
        html += '</li>';
      });
      html += '</ol>';
      if (boysDetail.note) {
        html += '<p class="skupiny-col-note">' + escapeHtml(boysDetail.note) + '</p>';
      }
    } else {
      html += '<p class="skupiny-empty-note">Doplniť neskôr</p>';
    }
    html += '</div>';

    // Dievčatá
    html += '<div class="skupiny-block-col skupiny-block-col--girls">';
    html += '<div class="skupiny-block-col-name" style="color:' + hex + '">' + escapeHtml(row.girls) + '</div>';
    if (girlsDetail && girlsDetail.members.length) {
      html += '<ol class="skupiny-member-list">';
      girlsDetail.members.forEach((m, i) => {
        const name = (typeof m === 'object') ? m.name : m;
        const size = (typeof m === 'object' && m.shirtSize) ? m.shirtSize : null;
        html += '<li class="skupiny-member-item"><span class="skupiny-member-num">' + (i + 1) + '.</span>';
        html += escapeHtml(name);
        if (size) {
          const cls = size === 'nemá' ? ' skupiny-shirt-size--nema' : '';
          html += '<span class="skupiny-shirt-size' + cls + '">' + escapeHtml(size) + '</span>';
        }
        html += '</li>';
      });
      html += '</ol>';
    } else {
      html += '<p class="skupiny-empty-note">Doplniť neskôr</p>';
    }
    html += '</div>';

    html += '</div>'; // .skupiny-block-body
    html += '</div>'; // .skupiny-block
  });

  html += '</div>'; // .skupiny-blocks
  html += '</div>';
  return html;
}

// ─── SEKCIA: ANIMÁTORI ────────────────────────────────────────────────────────

const ANIMATOR_ZODP_MAP = {
  'Tomáš Blaha':        ['🎭 Scénky'],
  'Andrea Spišáková':   ['🎤 Nástupy / moderovanie', '📖 Kronika'],
  'SDB Josky':          ['🙏 Večerné modlitby'],
  'Čaby':               ['🎲 Voľný čas', '🌙 Večerné porady', '📋 Brožúrka'],
  'Kika Ondisková':     ['📦 Pomôcky'],
  'Dávid Bača':         ['🔊 Technika', '🛒 Bufet', '📦 Pomôcky'],
  'Marta Baňošová FMA': ['🍎 Desiata / Olovrant'],
  'Miška Blahová':      ['📖 Kronika', '⛪ Omše', '🎵 Hudba / Spev / Zborík', '⭐ Bodovanie'],
  'Lívia FMA':          ['🛒 Bufet'],
  'Nina Radová':        ['🛒 Bufet', '🍎 Desiata / Olovrant'],
  'Peter Hanzal':       ['🛒 Bufet', '⛪ Omše'],
  'Boris Surničin':     ['🎵 Hudba / Spev / Zborík', '🍎 Desiata / Olovrant'],
  'Nika Nováková':      ['🍎 Desiata / Olovrant'],
  'Patrik Pekarovič':   ['⛪ Omše', '🏃 Rozcvičky'],
  'Kika Olajošová':     ['🏃 Rozcvičky'],
  'Mathias Mastiľák':   ['🏃 Rozcvičky'],
  'Dianka Salanciová':  ['🎵 Hudba / Spev / Zborík'],
  'Sofia Dolobačová':   ['🎵 Hudba / Spev / Zborík'],
  'Patrik Bača':        ['🔊 Technika'],
};

const ANIM_CATEGORIES = [
  { key: 'core',        label: 'CORE'        },
  { key: 'sdb-fma',     label: 'SDB / FMA'   },
  { key: 'skupinky',    label: 'Skupinky'    },
  { key: 'mtz',         label: 'MTZ'         },
  { key: 'zdravotnik',  label: 'Zdravotník'  },
];

export function buildAnimatori(campData) {
  const { animators } = campData;
  const allZodp = [...new Set(Object.values(ANIMATOR_ZODP_MAP).flat())];

  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Animátori</h1>';
  html += '<p class="section-subtitle">Zoznam animátorov, veľkosti tričiek a zodpovednosti.</p></div>';

  // Filter bar
  html += '<div class="animatori-zodp-filter">';
  html += '<span class="animatori-filter-label">Zodpovednosť:</span>';
  html += '<div class="animatori-filter-chips">';
  allZodp.forEach(z => {
    html += '<button class="chip animatori-filter-chip" data-zodp-filter="' + escapeHtml(z) + '">' + escapeHtml(z) + '</button>';
  });
  html += '</div>';
  html += '<button class="chip animatori-filter-clear" hidden>× Zrušiť filter</button>';
  html += '</div>';

  html += '<div class="animatori-table-wrap">';
  html += '<table class="animatori-zodp-table">';
  html += '<thead><tr>';
  html += '<th class="animatori-th animatori-th--num">#</th>';
  html += '<th class="animatori-th">Meno</th>';
  html += '<th class="animatori-th animatori-th--size">Veľkosť</th>';
  html += '<th class="animatori-th animatori-th--zodp">Zodpovednosť</th>';
  html += '</tr></thead>';
  html += '<tbody>';

  let rowNum = 0;
  ANIM_CATEGORIES.forEach(cat => {
    const group = (animators || []).filter(a => a.category === cat.key);
    if (!group.length) return;
    html += '<tr class="animatori-size-group-row"><td colspan="4">' + escapeHtml(cat.label) + '</td></tr>';
    group.forEach(a => {
      rowNum++;
      const zodp = ANIMATOR_ZODP_MAP[a.name] || [];
      const ZODP_SHOW = 2;
      html += '<tr data-zodp-row data-zodp-list="' + escapeHtml(zodp.join('||')) + '">';
      html += '<td class="animatori-td animatori-td--num">' + rowNum + '.</td>';
      html += '<td class="animatori-td">' + escapeHtml(a.name) + '</td>';
      html += '<td class="animatori-td animatori-td--size">' + escapeHtml(a.shirtSize) + '</td>';
      html += '<td class="animatori-td animatori-td--zodp">';
      if (zodp.length) {
        html += '<div class="animatori-chips">';
        zodp.forEach((z, i) => {
          const overflow = i >= ZODP_SHOW;
          html += '<span class="chip' + (overflow ? ' chip--hidden' : '') + '"' +
                  (overflow ? ' data-chip-overflow' : '') + '>' + escapeHtml(z) + '</span>';
        });
        if (zodp.length > ZODP_SHOW) {
          html += '<button class="chip chip--more chip--expandable" data-expand-chips>+' + (zodp.length - ZODP_SHOW) + '</button>';
        }
        html += '</div>';
      }
      html += '</td>';
      html += '</tr>';
    });
  });

  html += '</tbody></table>';
  html += '</div>';
  html += '<p class="priloha-summary-note" style="margin-top:0.75rem">Budíček chlapcov-animátorov na ranné modlitby zabezpečuje SDB/FMA.</p>';
  html += '</div>';
  return html;
}

// ─── PRÍLOHA: pomocné funkcie pre veľkosti tričiek ───────────────────────────

const SHIRT_LETTER_SIZES = ['XS', 'XS/S', 'S', 'M', 'L', 'XL'];

function computeSizeSummary(groups, skipSizes) {
  const counts = {};
  (groups || []).forEach(g => {
    (g.members || []).forEach(m => {
      const size = typeof m === 'object' ? m.shirtSize : null;
      if (!size || (skipSizes || []).includes(size)) return;
      counts[size] = (counts[size] || 0) + 1;
    });
  });
  const letterSizes = SHIRT_LETTER_SIZES.filter(s => counts[s]);
  const numericSizes = Object.keys(counts)
    .filter(s => !SHIRT_LETTER_SIZES.includes(s))
    .sort((a, b) => {
      const na = parseInt(a, 10), nb = parseInt(b, 10);
      return (!isNaN(na) && !isNaN(nb)) ? na - nb : a.localeCompare(b, 'sk');
    });
  return [...letterSizes, ...numericSizes].map(s => ({ size: s, count: counts[s] }));
}

function buildSummaryTable(rows, note) {
  const total = rows.reduce((s, r) => s + r.count, 0);
  let html = '<table class="priloha-table priloha-summary-table">';
  html += '<thead><tr>';
  html += '<th class="priloha-th">Veľkosť</th>';
  html += '<th class="priloha-th priloha-th--count">Počet</th>';
  html += '</tr></thead>';
  html += '<tbody>';
  rows.forEach(row => {
    html += '<tr class="priloha-row">';
    html += '<td class="priloha-td priloha-td--sizekey">' + escapeHtml(row.size) + '</td>';
    html += '<td class="priloha-td priloha-td--count">' + row.count + '</td>';
    html += '</tr>';
  });
  html += '</tbody>';
  html += '<tfoot><tr>';
  html += '<td class="priloha-td priloha-tfoot-label">Spolu</td>';
  html += '<td class="priloha-td priloha-td--count priloha-tfoot-total">' + total + '</td>';
  html += '</tr></tfoot>';
  html += '</table>';
  if (note) html += '<p class="priloha-summary-note">' + escapeHtml(note) + '</p>';
  return html;
}

// ─── (legacy, zachované pre prípadné budúce použitie) ─────────────────────────

function buildPrilohaSkupinkyChlapci(campData) {
  const { groupDetails } = campData;
  if (!groupDetails || !groupDetails.length) return '';

  let html = '<div class="priloha-skupinky">';
  html += '<div class="priloha-heading-block">';
  html += '<h2 class="priloha-heading">Zoznam skupiniek – chlapci</h2>';
  html += '<p class="priloha-heading-note">Príloha k táboru Narnia 2026</p>';
  html += '</div>';

  groupDetails.forEach(group => {
    const hex = escapeHtml(group.colorHex || '#888');
    html += '<div class="priloha-group">';

    html += '<div class="priloha-group-header" style="border-color:' + hex + '">';
    html += '<span class="priloha-group-name" style="color:' + hex + '">' + escapeHtml(group.name) + '</span>';
    if (group.color) {
      html += '<span class="priloha-group-color">' + escapeHtml(group.color) + '</span>';
    }
    html += '</div>';

    html += '<p class="priloha-group-animators">Animátori: ';
    html += '<strong>' + group.animators.map(a => escapeHtml(a)).join(', ') + '</strong></p>';

    html += '<table class="priloha-table">';
    html += '<thead><tr>';
    html += '<th class="priloha-th priloha-th--num">#</th>';
    html += '<th class="priloha-th">Meno</th>';
    html += '<th class="priloha-th priloha-th--size">Veľkosť trička</th>';
    html += '</tr></thead>';
    html += '<tbody>';
    group.members.forEach((m, i) => {
      const name = (typeof m === 'object') ? m.name : m;
      const size = (typeof m === 'object' && m.shirtSize) ? m.shirtSize : '—';
      const isNeoverene = size === 'NEOVERENÉ';
      html += '<tr class="priloha-row">';
      html += '<td class="priloha-td priloha-td--num">' + (i + 1) + '.</td>';
      html += '<td class="priloha-td">' + escapeHtml(name) + '</td>';
      html += '<td class="priloha-td priloha-td--size' + (isNeoverene ? ' priloha-td--neoverene' : '') + '">' + escapeHtml(size) + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    html += '</div>';
  });

  // Súhrn veľkostí tričiek
  html += '<div class="priloha-summary">';
  html += '<h3 class="priloha-summary-title">Súhrn veľkostí tričiek – chlapci</h3>';
  html += '<table class="priloha-table priloha-summary-table">';
  html += '<thead><tr>';
  html += '<th class="priloha-th">Veľkosť</th>';
  html += '<th class="priloha-th priloha-th--count">Počet</th>';
  html += '</tr></thead>';
  html += '<tbody>';
  SHIRT_SIZE_SUMMARY.forEach(row => {
    html += '<tr class="priloha-row">';
    html += '<td class="priloha-td priloha-td--sizekey">' + escapeHtml(row.size) + '</td>';
    html += '<td class="priloha-td priloha-td--count">' + row.count + '</td>';
    html += '</tr>';
  });
  html += '</tbody>';
  html += '<tfoot><tr>';
  html += '<td class="priloha-td priloha-tfoot-label">Spolu</td>';
  html += '<td class="priloha-td priloha-td--count priloha-tfoot-total">50</td>';
  html += '</tr></tfoot>';
  html += '</table>';
  html += '<p class="priloha-summary-note">Sebastián Papcún (Orli) – veľkosť NEOVERENÁ, nezapočítaná do súčtu.</p>';
  html += '</div>';

  html += '</div>';
  return html;
}

// ─── PRÍLOHA: Zoznam skupiniek – dievčatá ────────────────────────────────────

const GIRLS_SIZE_ORDER = ['XS', 'XS/S', 'S', 'M', 'L', 'XL'];

function computeGirlsSizeSummary(girlsGroups) {
  const counts = {};
  (girlsGroups || []).forEach(g => {
    g.members.forEach(m => {
      const size = typeof m === 'object' ? m.shirtSize : null;
      if (!size || size === 'nemá') return;
      counts[size] = (counts[size] || 0) + 1;
    });
  });
  const letterSizes = GIRLS_SIZE_ORDER.filter(s => counts[s]);
  const numericSizes = Object.keys(counts)
    .filter(s => !GIRLS_SIZE_ORDER.includes(s))
    .sort((a, b) => {
      const na = parseInt(a, 10), nb = parseInt(b, 10);
      return (!isNaN(na) && !isNaN(nb)) ? na - nb : a.localeCompare(b, 'sk');
    });
  return [...letterSizes, ...numericSizes].map(s => ({ size: s, count: counts[s] }));
}

function buildPrilohaSkupinkyDievcat(campData) {
  const { girlsGroupDetails } = campData;
  if (!girlsGroupDetails || !girlsGroupDetails.length) return '';

  const sizeSummary = computeGirlsSizeSummary(girlsGroupDetails);
  const totalWithSize = sizeSummary.reduce((s, r) => s + r.count, 0);
  const nemaCnt = (girlsGroupDetails || []).reduce((s, g) =>
    s + g.members.filter(m => (typeof m === 'object' ? m.shirtSize : null) === 'nemá').length, 0);

  let html = '<div class="priloha-skupinky">';
  html += '<div class="priloha-heading-block">';
  html += '<h2 class="priloha-heading">Zoznam skupiniek – dievčatá</h2>';
  html += '<p class="priloha-heading-note">Príloha k táboru Narnia 2026</p>';
  html += '</div>';

  girlsGroupDetails.forEach(group => {
    const hex = escapeHtml(group.colorHex || '#888');
    html += '<div class="priloha-group">';

    html += '<div class="priloha-group-header" style="border-color:' + hex + '">';
    html += '<span class="priloha-group-name" style="color:' + hex + '">' + escapeHtml(group.name) + '</span>';
    if (group.color) {
      html += '<span class="priloha-group-color">' + escapeHtml(group.color) + '</span>';
    }
    html += '</div>';

    html += '<p class="priloha-group-animators">Animátorky: ';
    html += '<strong>' + group.animators.map(a => escapeHtml(a)).join(', ') + '</strong></p>';

    html += '<table class="priloha-table">';
    html += '<thead><tr>';
    html += '<th class="priloha-th priloha-th--num">#</th>';
    html += '<th class="priloha-th">Meno</th>';
    html += '<th class="priloha-th priloha-th--size">Veľkosť trička</th>';
    html += '</tr></thead>';
    html += '<tbody>';
    group.members.forEach((m, i) => {
      const name = (typeof m === 'object') ? m.name : m;
      const size = (typeof m === 'object' && m.shirtSize) ? m.shirtSize : '—';
      const isNema = size === 'nemá';
      html += '<tr class="priloha-row">';
      html += '<td class="priloha-td priloha-td--num">' + (i + 1) + '.</td>';
      html += '<td class="priloha-td">' + escapeHtml(name) + '</td>';
      html += '<td class="priloha-td priloha-td--size' + (isNema ? ' priloha-td--nema' : '') + '">' + escapeHtml(size) + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    html += '</div>';
  });

  // Súhrn veľkostí tričiek
  html += '<div class="priloha-summary">';
  html += '<h3 class="priloha-summary-title">Súhrn veľkostí tričiek – dievčatá</h3>';
  html += '<table class="priloha-table priloha-summary-table">';
  html += '<thead><tr>';
  html += '<th class="priloha-th">Veľkosť</th>';
  html += '<th class="priloha-th priloha-th--count">Počet</th>';
  html += '</tr></thead>';
  html += '<tbody>';
  sizeSummary.forEach(row => {
    html += '<tr class="priloha-row">';
    html += '<td class="priloha-td priloha-td--sizekey">' + escapeHtml(row.size) + '</td>';
    html += '<td class="priloha-td priloha-td--count">' + row.count + '</td>';
    html += '</tr>';
  });
  html += '</tbody>';
  html += '<tfoot><tr>';
  html += '<td class="priloha-td priloha-tfoot-label">Spolu</td>';
  html += '<td class="priloha-td priloha-td--count priloha-tfoot-total">53</td>';
  html += '</tr></tfoot>';
  html += '</table>';
  if (nemaCnt > 0) {
    html += '<p class="priloha-summary-note">' + nemaCnt + ' dievčat tričko nepotrebuje (nemá) — nezapočítané do súčtu.</p>';
  }
  html += '</div>';

  html += '</div>';
  return html;
}

// ─── PRÍLOHA: Animátori ───────────────────────────────────────────────────────

function buildPrilohaAnimatori(campData) {
  const { animators } = campData;
  if (!animators || !animators.length) return '';

  let html = '<div class="priloha-skupinky">';
  html += '<div class="priloha-heading-block">';
  html += '<h2 class="priloha-heading">Animátori</h2>';
  html += '<p class="priloha-heading-note">Príloha k táboru Narnia 2026</p>';
  html += '</div>';

  html += '<table class="priloha-table">';
  html += '<thead><tr>';
  html += '<th class="priloha-th priloha-th--num">#</th>';
  html += '<th class="priloha-th">Meno</th>';
  html += '<th class="priloha-th priloha-th--size">Veľkosť trička</th>';
  html += '</tr></thead>';
  html += '<tbody>';

  let rowNum = 0;
  ANIM_CATEGORIES.forEach(cat => {
    const group = (animators || []).filter(a => a.category === cat.key);
    if (!group.length) return;
    html += '<tr class="animatori-size-group-row"><td colspan="3">' + escapeHtml(cat.label) + '</td></tr>';
    group.forEach(a => {
      rowNum++;
      html += '<tr class="priloha-row">';
      html += '<td class="priloha-td priloha-td--num">' + rowNum + '.</td>';
      html += '<td class="priloha-td">' + escapeHtml(a.name) + '</td>';
      html += '<td class="priloha-td priloha-td--size">' + escapeHtml(a.shirtSize) + '</td>';
      html += '</tr>';
    });
  });

  html += '</tbody></table>';

  const boys = animators.filter(a => a.gender === 'M');
  const girls = animators.filter(a => a.gender === 'F');
  const boysSummary  = computeSizeSummary([{ members: boys  }], []);
  const girlsSummary = computeSizeSummary([{ members: girls }], []);

  html += '<div class="priloha-summary priloha-summary--two-col">';
  html += '<div class="priloha-summary-col">';
  html += '<h3 class="priloha-summary-title">Veľkosti – chlapci</h3>';
  html += buildSummaryTable(boysSummary, null);
  html += '</div>';
  html += '<div class="priloha-summary-col">';
  html += '<h3 class="priloha-summary-title">Veľkosti – dievčatá</h3>';
  html += buildSummaryTable(girlsSummary, null);
  html += '</div>';
  html += '</div>';

  html += '</div>';
  return html;
}

// ─── SEKCIA: ANIMÁTORI ZODPOVEDNOSTI ─────────────────────────────────────────

const ANIMATORI_ZODP_DATA = [
  { oblast: '🎭 Scénky (dejová línia tábora)',        zodp: 'Tomáš',                              size: 'M',           poznamka: '' },
  { oblast: '🎤 Nástupy / moderovanie',               zodp: 'Ajka',                               size: 'L',           poznamka: 'hlavný moderátor' },
  { oblast: '🙏 Večerné modlitby',                    zodp: 'Josky',                              size: 'M',           poznamka: 'príprava pomôcok a organizácia' },
  { oblast: '🎲 Voľný čas',                          zodp: 'Čaby',                               size: 'XL',          poznamka: '' },
  { oblast: '📦 Pomôcky',                            zodp: 'Kika Ondisková',                     size: 'M',           poznamka: 'koordinuje pomôcky' },
  { oblast: '🔊 Technika',                           zodp: 'Patrik Bača (hlavný), Dávid Bača',   size: '—, L',        poznamka: 'Dávid zaučí, Čaby dohliada' },
  { oblast: '🍎 Desiata / Olovrant',                 zodp: 'Marta + MTZ tím',                    size: 'XL',          poznamka: 'Boris + Nika/Kika' },
  { oblast: '📅 Program jednotlivých dní',          zodp: 'Vedúci konkrétneho dňa',             size: '',            poznamka: '' },
  { oblast: '🌙 Večerné porady',                     zodp: 'Čaby',                               size: 'XL',          poznamka: 'koordinácia porád' },
  { oblast: '🛒 Bufet + občerstvenie animátorov',   zodp: 'Lívia + Dávid + Nina + Hanzi',       size: 'M, L, S, L',  poznamka: 'nákup + zásobovanie + predaj' },
  { oblast: '📖 Kronika',                           zodp: 'Miška + Ajka',                       size: 'S, L',        poznamka: '' },
  { oblast: '🌅 Ranné modlitby animátorov',         zodp: 'SDB + FMA',                          size: '',            poznamka: '' },
  { oblast: '⛪ Omše',                               zodp: 'Miška + Peťo H. + Patrik Pekarovič', size: 'S, L, M',     poznamka: '' },
  { oblast: '🎵 Hudba / Spev / Zborík',             zodp: 'Miška + Boris + Dianka + Sofka',     size: 'S, L, S, L',  poznamka: '' },
  { oblast: '🏃 Rozcvičky',                         zodp: 'Kika Ol + Mathias + Paťo',           size: 'S, M, M',     poznamka: '' },
  { oblast: '⭐ Bodovanie',                          zodp: 'Miška',                              size: 'S',           poznamka: '' },
  { oblast: '📋 Brožúrka',                           zodp: 'Čaby',                               size: 'XL',          poznamka: '' },
];

const DJ_PIATOK_DATA = [
  { uloha: 'Moderátor',         zodp: 'Pašky' },
  { uloha: 'DJ',                zodp: 'Paťo'  },
  { uloha: 'Playlist',          zodp: 'Ajka'  },
  { uloha: 'Spotify playlist',  zodp: 'Sofka' },
];

const HYMNA_MEMBERS = ['Dianka', 'Maroš', 'Boris', 'Kika O.', 'Ajka', 'Pašky'];

const POZNAMKY_TEXT =
'## Ranné modlitby\n' +
'- Chlapci chcú spoločný budíček.\n' +
'- Dievčatá budíček nechcú.\n' +
'- Overiť spôsob organizácie.\n' +
'\n' +
'## Omše\n' +
'- Patrik Pekarovič má byť zaučený Peťom H.\n' +
'- Do budúcna má vedieť organizáciu prevziať.\n' +
'\n' +
'## Rozcvičky\n' +
'- Vedie Kika Ol.\n' +
'- Pomáhajú: Mathias, Paťo.\n' +
'\n' +
'## Farby tričiek\n' +
'- Kika pripraví niekoľko vhodných farebných variantov.\n' +
'- Animátori si z nich vyberú.\n' +
'- Zachovať odkaz na Malfini.\n' +
'\n' +
'## Pomôcky\n' +
'- Hlavná zodpovednosť: Kika.\n' +
'- Pomoc: Nika, Dávid.\n' +
'\n' +
'## Technika\n' +
'- Patrik Bača je hlavný.\n' +
'- Dávid zaučí.\n' +
'- Čaby dohliada.\n' +
'- Vytvoriť playlist.\n' +
'- Konzultovať s Mišom Šefčíkom.\n' +
'\n' +
'## MTZ\n' +
'Predstaviť zodpovednosti:\n' +
'- Desiata — Marta + Boris + Nika/Kika\n' +
'- Technika — Čaby\n' +
'- Pomôcky — Kika\n' +
'- Bufet — Lívia + Dávid + Nina + Hanzi\n' +
'\n' +
'## Brožúrka\n' +
'- Čaby pripraví brožúrku tábora.\n' +
'\n' +
'## Otázky\n' +
'Nechať priestor na pripomienky animátorov.';

export function buildAnimatoriZodp(campData) {
  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Animátori zodpovednosti</h1>';
  html += '<p class="section-subtitle">Prehľad zodpovedností animátorov tábora Narnia 2026.</p></div>';

  // Zodpovednosti table
  html += '<div class="animatori-table-wrap">';
  html += '<table class="animatori-zodp-table">';
  html += '<thead><tr>';
  html += '<th class="animatori-th animatori-th--zodp">Oblasť</th>';
  html += '<th class="animatori-th">Zodpovedný</th>';
  html += '<th class="animatori-th">Poznámka</th>';
  html += '</tr></thead>';
  html += '<tbody>';
  ANIMATORI_ZODP_DATA.forEach(row => {
    html += '<tr>';
    html += '<td class="animatori-td">' + escapeHtml(row.oblast) + '</td>';
    html += '<td class="animatori-td">' + escapeHtml(row.zodp) + '</td>';
    html += '<td class="animatori-td animatori-td--zodp">' + escapeHtml(row.poznamka) + '</td>';
    html += '</tr>';
  });
  html += '</tbody></table>';
  html += '</div>';

  html += '<p class="priloha-summary-note" style="margin-top: 0.75rem">Poznámka: budíček chlapcov-animátorov na ranné modlitby zabezpečuje SDB/FMA.</p>';

  html += '</div>';
  return html;
}

// ─── SEKCIA: PRÍLOHY ─────────────────────────────────────────────────────────

export function buildPrilohy(campData) {
  const { groupDetails, girlsGroupDetails, animators } = campData;

  const boysSummary       = computeSizeSummary(groupDetails,      ['NEOVERENÉ']);
  const girlsSummary      = computeSizeSummary(girlsGroupDetails, ['nemá']);
  const animBoys  = (animators || []).filter(a => a.gender === 'M');
  const animGirls = (animators || []).filter(a => a.gender === 'F');
  const animBoysSummary  = computeSizeSummary([{ members: animBoys  }], []);
  const animGirlsSummary = computeSizeSummary([{ members: animGirls }], []);

  const nemaGirls = (girlsGroupDetails || []).flatMap(g =>
    g.members
      .filter(m => (typeof m === 'object' ? m.shirtSize : null) === 'nemá')
      .map(m => ({ name: m.name, group: g.name }))
  );

  const girlsExtra = nemaGirls.length
    ? '<p class="priloha-summary-note">Bez trička: ' + nemaGirls.map(g => escapeHtml(g.name)).join(', ') + '.</p>'
    : '';

  const tablesHtml =
    '<div class="priloha-duo">' +
    '<div class="priloha-duo-card"><h3 class="priloha-summary-title">Chlapci</h3>' +
    buildSummaryTable(boysSummary, null) + '</div>' +
    '<div class="priloha-duo-card"><h3 class="priloha-summary-title">Dievčatá</h3>' +
    buildSummaryTable(girlsSummary, null) + girlsExtra + '</div>' +
    '<div class="priloha-duo-card"><h3 class="priloha-summary-title">Animátori – chlapci</h3>' +
    buildSummaryTable(animBoysSummary, null) + '</div>' +
    '<div class="priloha-duo-card"><h3 class="priloha-summary-title">Animátori – dievčatá</h3>' +
    buildSummaryTable(animGirlsSummary, null) + '</div>' +
    '</div>';

  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Prílohy</h1>';
  html += '<p class="section-subtitle">Prílohy k táboru Narnia 2026.</p></div>';

  html += '<div class="day-accordion">';

  html += '<div class="day-accordion-item day-accordion-item--open" data-accordion-id="priloha-tricky">';
  html += '<button class="day-accordion-header" data-accordion-toggle="priloha-tricky" aria-expanded="true">';
  html += '<div class="day-accordion-header-info">';
  html += '<span class="day-accordion-name">Veľkosti tričiek</span>';
  html += '<span class="day-accordion-meta">chlapci · dievčatá · animátori</span>';
  html += '</div>';
  html += '<span class="day-accordion-chevron">' + ICONS.chevronRight + '</span>';
  html += '</button>';
  html += '<div class="day-accordion-body">';
  html += '<div class="day-accordion-preview">' + tablesHtml + '</div>';
  html += '</div>';
  html += '</div>';

  html += '<div class="day-accordion-item" data-accordion-id="priloha-heslo">';
  html += '<button class="day-accordion-header" data-accordion-toggle="priloha-heslo" aria-expanded="false">';
  html += '<div class="day-accordion-header-info">';
  html += '<span class="day-accordion-name">Heslo</span>';
  html += '<span class="day-accordion-meta">WiFi · zariadenia</span>';
  html += '</div>';
  html += '<span class="day-accordion-chevron">' + ICONS.chevronRight + '</span>';
  html += '</button>';
  html += '<div class="day-accordion-body">';
  html += '<div class="day-accordion-preview">';
  html += '<div class="priloha-duo">';
  html += '<div class="priloha-duo-card">';
  html += '<h3 class="priloha-summary-title">Heslo</h3>';
  html += '<p style="margin:0.25rem 0 0.1rem;color:var(--color-text-muted,#888);font-size:0.85rem">Sieť</p>';
  html += '<p style="font-size:1.25rem;font-weight:700;letter-spacing:0.05em;margin:0 0 0.75rem">Hatfa</p>';
  html += '<p style="margin:0.25rem 0 0.1rem;color:var(--color-text-muted,#888);font-size:0.85rem">Heslo</p>';
  html += '<p style="font-size:1.5rem;font-weight:700;letter-spacing:0.05em;margin:0">Hatfa2007</p>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

  html += '</div>';
  html += '</div>';
  return html;
}

// ─── SEKCIA: HRY / VOĽNÝ ČAS ─────────────────────────────────────────────────

export function buildHry(campData) {
  const categories = campData.hryCategories || [];

  let html = '<div class="section-inner">';
  html += '<div class="section-header"><h1 class="section-title">Hry / voľný čas</h1>';
  html += '<p class="section-subtitle">Energizéry, vonkajšie hry a hry na dnu.</p></div>';

  categories.forEach(cat => {
    html += '<div class="hry-category">';
    html += '<div class="hry-category-header">';
    html += '<span class="hry-category-icon">' + escapeHtml(cat.icon) + '</span>';
    html += '<div>';
    html += '<h2 class="hry-category-title">' + escapeHtml(cat.title) + '</h2>';
    if (cat.subtitle) {
      html += '<p class="hry-category-subtitle">' + escapeHtml(cat.subtitle) + '</p>';
    }
    html += '</div>';
    html += '</div>';

    const hasDescriptions = cat.games.some(g => g.description && g.description.trim());

    if (!hasDescriptions) {
      // Energizéry — jednoduché chipy bez popisu
      html += '<div class="hry-chips-list">';
      cat.games.forEach(g => {
        html += '<span class="chip hry-chip">' + escapeHtml(g.name) + '</span>';
      });
      html += '</div>';
    } else {
      // Hry s opisom — accordion
      html += '<div class="day-accordion">';
      cat.games.forEach((g, index) => {
        const isOpen = index === 0;
        const hasDesc = g.description && g.description.trim();
        html += '<div class="day-accordion-item' + (isOpen ? ' day-accordion-item--open' : '') + '" data-accordion-id="' + escapeHtml(g.id) + '">';
        html += '<button class="day-accordion-header" data-accordion-toggle="' + escapeHtml(g.id) + '" aria-expanded="' + (isOpen ? 'true' : 'false') + '">';
        html += '<div class="day-accordion-header-info">';
        html += '<span class="day-accordion-name">' + escapeHtml(g.name) + '</span>';
        if (!hasDesc) {
          html += '<span class="day-accordion-meta hry-meta--todo">pravidlá sa dopĺňajú</span>';
        }
        html += '</div>';
        html += '<span class="day-accordion-chevron">' + ICONS.chevronRight + '</span>';
        html += '</button>';
        html += '<div class="day-accordion-body"' + (isOpen ? '' : ' hidden') + '>';
        html += '<div class="day-accordion-preview">';
        if (hasDesc) {
          html += '<div class="prayer-text">' + formatTextToHtml(g.description) + '</div>';
        } else {
          html += '<p class="placeholder-text">Pravidlá budú doplnené.</p>';
        }
        html += '</div></div>';
        html += '</div>';
      });
      html += '</div>';
    }

    html += '</div>';
  });

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
    { id: 'aktivity',  html: buildAktivitySection(campData) },
    { id: 'scenky',    html: buildScenky(campData)          },
    { id: 'stretka',   html: buildStretka(campData)         },
    { id: 'modlitby',  html: buildModlitby(campData)        },
    { id: 'skupinky',  html: buildSkupinky(campData)        },
    { id: 'animatori', html: buildAnimatori(campData) },
    { id: 'hry',       html: buildHry(campData)       },
    { id: 'prilohy',   html: buildPrilohy(campData)  }
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
