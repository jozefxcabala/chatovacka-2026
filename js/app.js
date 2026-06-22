// ─────────────────────────────────────────────────────────────────────────────
// APP — vstupný bod, navigácia, sidebar, inicializácia
// ─────────────────────────────────────────────────────────────────────────────

import { campMeta, announcements, contacts, appendices } from '../data/config.js';
import { days }       from '../data/days.js';
import { activities } from '../data/activities.js';
import { scenes }     from '../data/scenes.js';
import { prayers }    from '../data/prayers.js';

import { ICONS, escapeHtml } from './utils.js';
import { buildNavItems, renderSidebar, renderAllSections,
         buildAktivityCards, buildActivityDetail } from './render.js';
import { clearFilters, showActivityList } from './filters.js';

// ─── DÁTA ────────────────────────────────────────────────────────────────────

const campData = { meta: campMeta, announcements, contacts, appendices, days, activities, scenes, prayers };

// ─── NAVIGÁCIA ────────────────────────────────────────────────────────────────

let currentSection    = 'uvod';
let currentActivityId = null;
let validSectionIds   = [];

function navigateTo(sectionId, actParam) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('section--active'));

  if (sectionId === 'aktivity' && actParam) {
    currentActivityId = actParam;
    const sec = document.getElementById('section-aktivity');
    if (sec) {
      sec.classList.add('section--active');
      const detailView = document.getElementById('aktivity-detail-view');
      const listView   = document.getElementById('aktivity-list-view');
      if (detailView && listView) {
        detailView.innerHTML = buildActivityDetail(actParam, campData);
        listView.hidden   = true;
        detailView.hidden = false;
        document.getElementById('detailBackBtn').addEventListener('click', handleBackFromDetail);
      }
    }
    updateTopbarTitle('Aktivity');
    updateNavActive('aktivity');
    currentSection = 'aktivity';
    localStorage.setItem('lastSection', 'aktivity');
    scrollTop();
    return;
  }

  currentActivityId = null;

  const target = document.getElementById('section-' + sectionId);
  if (target) {
    target.classList.add('section--active');
    if (sectionId === 'aktivity') {
      showActivityList();
      buildAktivityCards(campData);
    }
  }

  updateNavActive(sectionId);

  const navItem = navItems.find(n => n && n.id === sectionId);
  updateTopbarTitle(navItem ? navItem.label : 'Tábor');

  currentSection = sectionId;
  if (validSectionIds.includes(sectionId)) {
    localStorage.setItem('lastSection', sectionId);
  }
  scrollTop();
}

function handleBackFromDetail() {
  showActivityList();
  buildAktivityCards(campData);
  updateNavActive('aktivity');
  updateTopbarTitle('Aktivity');
  currentActivityId = null;
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

function scrollTop() {
  const body = document.getElementById('appBody');
  if (body) body.scrollTop = 0;
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

  ['actSearch', 'actDayFilter', 'actTimeFilter', 'actTypeFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(id === 'actSearch' ? 'input' : 'change', () => buildAktivityCards(campData));
  });

  function handleClear() {
    clearFilters();
    buildAktivityCards(campData);
  }

  const c1 = document.getElementById('actClearBtn');
  const c2 = document.getElementById('actClearBtn2');
  if (c1) c1.addEventListener('click', handleClear);
  if (c2) c2.addEventListener('click', handleClear);
}

// ─── EVENT DELEGATION ────────────────────────────────────────────────────────

function initDelegation() {
  document.getElementById('appMain').addEventListener('click', e => {
    const navBtn = e.target.closest('[data-nav]');
    if (navBtn) { navigateTo(navBtn.getAttribute('data-nav')); return; }

    const actBtn = e.target.closest('[data-act]');
    if (actBtn) { navigateTo('aktivity', actBtn.getAttribute('data-act')); }
  });
}

// ─── INIT ────────────────────────────────────────────────────────────────────

const navItems = buildNavItems(days);

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar(campMeta, navItems, sectionId => {
    navigateTo(sectionId);
    if (isMobile()) closeMobileSidebar();
  });

  validSectionIds = renderAllSections(campData, navItems);

  initSidebar();
  initDelegation();
  initAktivityFilters();

  const last = localStorage.getItem('lastSection') || 'uvod';
  navigateTo(validSectionIds.includes(last) ? last : 'uvod');
});
