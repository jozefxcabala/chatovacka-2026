// ─────────────────────────────────────────────────────────────────────────────
// FILTERS — logika filtrovania aktivít
// ─────────────────────────────────────────────────────────────────────────────

// Čistá funkcia — vráti pole aktivít vyhovujúcich filtrom.
// Fulltext hľadá v názve, popise aj menách animátorov.
export function getFilteredActivities(activities, { q, dayF, timeF, typeF }) {
  return activities.filter(act => {
    if (dayF  && act.dayRef    !== dayF)  return false;
    if (timeF && act.timeOfDay !== timeF) return false;
    if (typeF && act.type      !== typeF) return false;
    if (q) {
      const haystack = [
        act.name,
        act.description || '',
        act.location    || '',
        act.animatorsNote || '',
        ...act.animators.map(a => a.name),
        act.vedúciProgramu || '',
        act.vedúciDna      || ''
      ].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

// Načíta aktuálny stav filtrov z DOM.
export function getFiltersState() {
  return {
    q:     ((document.getElementById('actSearch')    || {}).value || '').toLowerCase().trim(),
    dayF:  (document.getElementById('actDayFilter')  || {}).value || '',
    timeF: (document.getElementById('actTimeFilter') || {}).value || '',
    typeF: (document.getElementById('actTypeFilter') || {}).value || ''
  };
}

// Vymaže všetky filtre.
export function clearFilters() {
  ['actSearch', 'actDayFilter', 'actTimeFilter', 'actTypeFilter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

// Zobrazí zoznam aktivít, skryje detail.
export function showActivityList() {
  const listView   = document.getElementById('aktivity-list-view');
  const detailView = document.getElementById('aktivity-detail-view');
  if (listView)   listView.hidden   = false;
  if (detailView) detailView.hidden = true;
}
