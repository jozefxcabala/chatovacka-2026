// ─────────────────────────────────────────────────────────────────────────────
// APP — vstupný bod, navigácia, sidebar, inicializácia
// ─────────────────────────────────────────────────────────────────────────────

import { campMeta, announcements, contacts, appendices, animatorRules } from '../data/config.js';
import { nameDays } from '../data/nameDays.js';
import { days }       from '../data/days.js';
import { activities } from '../data/activities.js';
import { scenes }     from '../data/scenes.js';
import { prayers }    from '../data/prayers.js';
import { stretka }    from '../data/stretka.js';

import { ICONS, escapeHtml } from './utils.js';
import { buildNavItems, renderSidebar, renderAllSections,
         buildUvod, buildAktivityCards, buildActivityDetail } from './render.js';
import { clearFilters, showActivityList } from './filters.js';

// ─── DÁTA ────────────────────────────────────────────────────────────────────

const campData = { meta: campMeta, announcements, contacts, appendices, animatorRules, nameDays, days, activities, scenes, prayers, stretka };

// ─── NAVIGÁCIA ────────────────────────────────────────────────────────────────

let currentSection    = 'uvod';
let currentActivityId = null;
let validSectionIds   = [];
let previousSection   = null;

function navigateTo(sectionId, actParam, instant = false) {
  if (sectionId === 'aktivity' && actParam) {
    previousSection = currentSection;
    currentActivityId = actParam;
    const detailView = document.getElementById('aktivity-detail-view');
    const listView   = document.getElementById('aktivity-list-view');
    if (detailView && listView) {
      detailView.innerHTML = buildActivityDetail(actParam, campData);
      listView.hidden   = true;
      detailView.hidden = false;
      const backBtn = document.getElementById('detailBackBtn');
      if (backBtn) {
        const prevNavItem = navItems.find(n => n && n.id === previousSection);
        backBtn.innerHTML = ICONS.arrowLeft + (prevNavItem ? prevNavItem.label : 'Späť');
        backBtn.addEventListener('click', handleBackFromDetail);
      }
    }
    updateTopbarTitle('Aktivity');
    updateNavActive('aktivity');
    currentSection = 'aktivity';
    localStorage.setItem('lastSection', 'aktivity');
    scrollToSection('aktivity', instant);
    return;
  }

  currentActivityId = null;

  const target = document.getElementById('section-' + sectionId);
  if (target) {
    if (sectionId === 'uvod') {
      target.innerHTML = buildUvod(campData, navItems);
    }
    if (sectionId === 'aktivity') {
      showActivityList();
      buildAktivityCards(campData);
    }
    if (campData.days.some(d => d.id === sectionId)) {
      resetDayAccordion(target);
    }
  }

  updateNavActive(sectionId);

  const navItem = navItems.find(n => n && n.id === sectionId);
  updateTopbarTitle(navItem ? navItem.label : 'Tábor');

  currentSection = sectionId;
  if (validSectionIds.includes(sectionId)) {
    localStorage.setItem('lastSection', sectionId);
  }
  scrollToSection(sectionId, instant);
}

function scrollToSection(sectionId, instant = false) {
  const target = document.getElementById('section-' + sectionId);
  const body   = document.getElementById('appBody');
  if (!target || !body) return;
  const top = target.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop;
  body.scrollTo({ top, behavior: instant ? 'instant' : 'smooth' });
}

function handleBackFromDetail() {
  currentActivityId = null;
  const back = previousSection || 'aktivity';
  previousSection = null;
  navigateTo(back);
}

function updateNavActive(sectionId) {
  document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
    btn.classList.toggle('sidebar-nav-item--active', btn.getAttribute('data-section') === sectionId);
  });
}

function updateTopbarTitle(title) {
  const titleEl = document.getElementById('topbarTitle');
  if (titleEl) titleEl.textContent = title;
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

const SIDEBAR_COLLAPSED_KEY = 'sidebarCollapsed';
const MOBILE_BREAKPOINT = 900;

function isMobile() { return window.innerWidth < MOBILE_BREAKPOINT; }

function setSidebarCollapsed(collapsed) {
  const sidebar = document.getElementById('sidebar');
  const toggle  = document.getElementById('sidebarToggle');
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

function initSidebar() {
  const toggle  = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('sidebarOverlay');
  const menuBtn = document.getElementById('topbarMenuBtn');

  if (!isMobile()) {
    setSidebarCollapsed(localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true');
  }

  toggle.addEventListener('click', () => {
    if (isMobile()) {
      closeMobileSidebar();
    } else {
      const sidebar = document.getElementById('sidebar');
      setSidebarCollapsed(!sidebar.classList.contains('sidebar--collapsed'));
    }
  });

  menuBtn.addEventListener('click', openMobileSidebar);
  overlay.addEventListener('click', closeMobileSidebar);

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      document.getElementById('sidebar').classList.remove('sidebar--mobile-open');
      document.getElementById('sidebarOverlay').classList.remove('sidebar-overlay--visible');
      document.body.classList.remove('sidebar-open');
    }
  });
}

// ─── FILTRE ──────────────────────────────────────────────────────────────────

function initAktivityFilters() {
  buildAktivityCards(campData);

  const searchEl = document.getElementById('actSearch');
  if (searchEl) searchEl.addEventListener('input', () => buildAktivityCards(campData));

  // Zatvorí všetky otvorené panely okrem exceptWrap
  function closeAllPanels(exceptWrap) {
    document.querySelectorAll('.custom-select-panel, #actAnimatorPanel').forEach(p => {
      if (p.hidden) return;
      const wrap = p.closest('.filter-custom-wrap, .filter-animator-wrap');
      if (wrap && wrap !== exceptWrap) {
        p.hidden = true;
        const btn = wrap.querySelector('[aria-expanded]');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Generický single-select dropdown
  function initCustomSelect(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const wrap  = btn.closest('.filter-custom-wrap');
    const panel = wrap && wrap.querySelector('.custom-select-panel');
    if (!panel) return;

    btn.addEventListener('click', e => {
      e.stopPropagation();
      closeAllPanels(wrap);
      const isOpen = !panel.hidden;
      panel.hidden = isOpen;
      btn.setAttribute('aria-expanded', String(!isOpen));
    });

    panel.addEventListener('click', e => {
      const opt = e.target.closest('.custom-select-option');
      if (!opt) return;
      panel.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('custom-select-option--active'));
      opt.classList.add('custom-select-option--active');
      btn.dataset.value = opt.dataset.value;
      const labelEl = btn.querySelector('.filter-custom-label');
      if (labelEl) labelEl.textContent = opt.textContent;
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      buildAktivityCards(campData);
    });
  }

  initCustomSelect('actDayFilter');
  initCustomSelect('actTimeFilter');
  initCustomSelect('actTypeFilter');

  // Animator dropdown
  const animBtn    = document.getElementById('actAnimatorBtn');
  const animPanel  = document.getElementById('actAnimatorPanel');
  const animSearch = document.getElementById('actAnimatorSearch');
  const animWrap   = animBtn?.closest('.filter-animator-wrap');

  if (animBtn && animPanel) {
    animBtn.addEventListener('click', e => {
      e.stopPropagation();
      closeAllPanels(animWrap);
      const isOpen = !animPanel.hidden;
      animPanel.hidden = isOpen;
      animBtn.setAttribute('aria-expanded', String(!isOpen));
      if (!isOpen && animSearch) {
        animSearch.value = '';
        animPanel.querySelectorAll('.animator-option').forEach(o => o.style.display = '');
        setTimeout(() => animSearch.focus(), 30);
      }
    });

    animPanel.addEventListener('change', e => {
      if (e.target.classList.contains('animator-check')) {
        const checked = animPanel.querySelectorAll('.animator-check:checked');
        const labelEl = document.getElementById('actAnimatorLabel');
        if (labelEl) {
          labelEl.textContent = !checked.length ? 'Všetci animátori'
            : checked.length === 1 ? checked[0].value
            : checked.length + ' animátori';
        }
        buildAktivityCards(campData);
      }
    });

    if (animSearch) {
      animSearch.addEventListener('input', () => {
        const q = animSearch.value.toLowerCase();
        animPanel.querySelectorAll('.animator-option').forEach(opt => {
          const name = (opt.querySelector('.animator-name-label')?.textContent || '').toLowerCase();
          opt.style.display = name.includes(q) ? '' : 'none';
        });
      });
      animSearch.addEventListener('click', e => e.stopPropagation());
    }
  }

  // Zatvor panel pri kliku mimo
  document.addEventListener('click', e => {
    document.querySelectorAll('.custom-select-panel, #actAnimatorPanel').forEach(p => {
      if (p.hidden) return;
      const wrap = p.closest('.filter-custom-wrap, .filter-animator-wrap');
      if (wrap && !wrap.contains(e.target)) {
        p.hidden = true;
        const btn = wrap.querySelector('[aria-expanded]');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  function handleClear() {
    clearFilters();
    document.querySelectorAll('.custom-select-panel, #actAnimatorPanel').forEach(p => { p.hidden = true; });
    document.querySelectorAll('[aria-expanded]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    buildAktivityCards(campData);
  }

  const c1 = document.getElementById('actClearBtn');
  const c2 = document.getElementById('actClearBtn2');
  if (c1) c1.addEventListener('click', handleClear);
  if (c2) c2.addEventListener('click', handleClear);
}

// ─── ACCORDION ───────────────────────────────────────────────────────────────

function closeAccordion(accordion) {
  accordion.querySelectorAll('.day-accordion-item').forEach(item => {
    item.classList.remove('day-accordion-item--open');
    const body   = item.querySelector('.day-accordion-body');
    const header = item.querySelector('.day-accordion-header');
    if (body)   body.hidden = true;
    if (header) header.setAttribute('aria-expanded', 'false');
  });
}

function openAccordionItem(accordion, targetItem, section) {
  const isAlreadyOpen = targetItem.classList.contains('day-accordion-item--open');
  // Zatvoriť všetky accordion skupiny v sekcii (pre stretka: iba jedna naraz)
  if (section) {
    section.querySelectorAll('.day-accordion').forEach(a => closeAccordion(a));
  } else {
    closeAccordion(accordion);
  }
  if (!isAlreadyOpen) {
    targetItem.classList.add('day-accordion-item--open');
    const body   = targetItem.querySelector('.day-accordion-body');
    const header = targetItem.querySelector('.day-accordion-header');
    if (body)   body.hidden = false;
    if (header) header.setAttribute('aria-expanded', 'true');
  }
}

function resetDayAccordion(sectionEl) {
  const accordion = sectionEl.querySelector('.day-accordion');
  if (!accordion) return;
  closeAccordion(accordion);
  const firstItem = accordion.querySelector('.day-accordion-item');
  if (firstItem) {
    firstItem.classList.add('day-accordion-item--open');
    const body   = firstItem.querySelector('.day-accordion-body');
    const header = firstItem.querySelector('.day-accordion-header');
    if (body)   body.hidden = false;
    if (header) header.setAttribute('aria-expanded', 'true');
  }
}

// ─── SCROLL OBSERVER (sidebar / topbar sleduje scroll) ───────────────────────

function initSectionObserver() {
  const body = document.getElementById('appBody');
  if (!body) return;

  let saveTimer = null;

  body.addEventListener('scroll', () => {
    if (currentActivityId) return;

    const bodyRect = body.getBoundingClientRect();
    const checkY   = bodyRect.top + body.clientHeight * 0.25;

    let found = null;
    document.querySelectorAll('.section').forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.top <= checkY && r.bottom > checkY) found = sec;
    });

    if (!found) {
      // keď sme pod poslednou sekciou, vyberieme poslednú viditeľnú
      document.querySelectorAll('.section').forEach(sec => {
        const r = sec.getBoundingClientRect();
        if (r.top <= bodyRect.bottom) found = sec;
      });
    }

    if (!found) return;
    const sectionId = found.id.replace('section-', '');
    if (sectionId === currentSection) return;

    currentSection = sectionId;
    updateNavActive(sectionId);
    const navItem = navItems.find(n => n && n.id === sectionId);
    updateTopbarTitle(navItem ? navItem.label : 'Tábor');

    if (validSectionIds.includes(sectionId)) {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => localStorage.setItem('lastSection', sectionId), 400);
    }
  }, { passive: true });
}

// ─── EVENT DELEGATION ────────────────────────────────────────────────────────

function initDelegation() {
  document.getElementById('appMain').addEventListener('click', e => {
    const navBtn = e.target.closest('[data-nav]');
    if (navBtn) { navigateTo(navBtn.getAttribute('data-nav')); return; }

    // Rozbalit skrytych animátorov v day preview
    const expandChipsBtn = e.target.closest('[data-expand-chips]');
    if (expandChipsBtn) {
      e.stopPropagation();
      const chips = expandChipsBtn.closest('.animatori-chips');
      if (chips) {
        chips.querySelectorAll('.chip--hidden').forEach(c => c.classList.remove('chip--hidden'));
        expandChipsBtn.remove();
      }
      return;
    }

    // Rozbalit skryté pomôcky v day preview
    const expandMatBtn = e.target.closest('[data-expand-materials]');
    if (expandMatBtn) {
      e.stopPropagation();
      const hiddenGroup = expandMatBtn.closest('.day-preview-row-value').querySelector('.mat-hidden-group');
      if (hiddenGroup) hiddenGroup.removeAttribute('hidden');
      expandMatBtn.remove();
      return;
    }

    // Accordion toggle
    const accordionBtn = e.target.closest('[data-accordion-toggle]');
    if (accordionBtn) {
      const actId    = accordionBtn.getAttribute('data-accordion-toggle');
      const accordion = accordionBtn.closest('.day-accordion');
      if (accordion) {
        const item    = accordion.querySelector('[data-accordion-id="' + actId + '"]');
        const section = accordionBtn.closest('.section') || null;
        if (item) openAccordionItem(accordion, item, section);
      }
      return;
    }

    // Klik na timeline link (ľavý stĺpec) → otvoriť accordion v pravom stĺpci
    const dayActBtn = e.target.closest('[data-day-act]');
    if (dayActBtn) {
      const actId     = dayActBtn.getAttribute('data-day-act');
      const daySection = dayActBtn.closest('.section');
      const accordion  = daySection && daySection.querySelector('.day-accordion');
      if (accordion) {
        const item = accordion.querySelector('[data-accordion-id="' + actId + '"]');
        if (item) {
          openAccordionItem(accordion, item);
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }
      }
      // fallback: navigácia na detail aktivity
      navigateTo('aktivity', actId);
      return;
    }

    // Klik na [data-act] → plný detail aktivity v sekcii Aktivity
    const actBtn = e.target.closest('[data-act]');
    if (actBtn) { navigateTo('aktivity', actBtn.getAttribute('data-act')); }
  });
}

// ─── PRINT / PDF ─────────────────────────────────────────────────────────────

function initPrintBrozurka() {
  document.addEventListener('click', e => {
    if (e.target.closest('#btnPrintBrozurka')) window.print();
  });

  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.day-accordion-body').forEach(b => {
      if (b.hasAttribute('hidden')) {
        b.removeAttribute('hidden');
        b.dataset.printExpanded = '1';
      }
    });
  });

  window.addEventListener('afterprint', () => {
    document.querySelectorAll('.day-accordion-body[data-print-expanded]').forEach(b => {
      b.setAttribute('hidden', '');
      delete b.dataset.printExpanded;
    });
  });
}

// ─── INIT ────────────────────────────────────────────────────────────────────

const navItems = buildNavItems(days);

document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const mmdd  = String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  const nameDay = nameDays[mmdd] || null;

  renderSidebar(campMeta, navItems, sectionId => {
    navigateTo(sectionId);
    if (isMobile()) closeMobileSidebar();
  }, nameDay);

  validSectionIds = renderAllSections(campData, navItems);

  initSidebar();
  initDelegation();
  initAktivityFilters();
  initSectionObserver();
  initPrintBrozurka();

  const last = localStorage.getItem('lastSection') || 'uvod';
  navigateTo(validSectionIds.includes(last) ? last : 'uvod', null, true);

  setInterval(() => {
    const now = new Date();
    const timeEl = document.getElementById('sidebar-live-time');
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    const ndEl = document.getElementById('sidebar-nameday');
    if (ndEl) {
      const key = String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
      const nd  = nameDays[key] || null;
      ndEl.textContent = nd ? '🎂 ' + nd : '';
    }
  }, 1000);

  setInterval(() => {
    if (currentSection === 'uvod') {
      const uvodEl = document.getElementById('section-uvod');
      if (uvodEl) uvodEl.innerHTML = buildUvod(campData, navItems);
    }
  }, 60000);
});
