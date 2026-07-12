// ─────────────────────────────────────────────────────────────────────────────
// FILTERS — logika filtrovania aktivít
// ─────────────────────────────────────────────────────────────────────────────

// Čistá funkcia — vráti pole aktivít vyhovujúcich filtrom.
// Fulltext hľadá v názve, popise aj menách animátorov.
export function getFilteredActivities(activities, { q, dayF, timeF, typeF, animF }) {
  return activities.filter(act => {
    if (dayF  && act.dayRef    !== dayF)  return false;
    if (timeF && act.timeOfDay !== timeF) return false;
    if (typeF && act.type      !== typeF) return false;
    if (animF && animF.length) {
      const vp = act.vedúciProgramu || '';
      const vd = act.vedúciDna || '';
      const inAnimators = act.animators.some(a => animF.includes(a.name));
      const inVedúci    = animF.some(n => vp.includes(n) || vd.includes(n));
      if (!inAnimators && !inVedúci) return false;
    }
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
  const checked = document.querySelectorAll('.animator-check:checked');
  return {
    q:     ((document.getElementById('actSearch') || {}).value || '').toLowerCase().trim(),
    dayF:  document.getElementById('actDayFilter')?.dataset.value  || '',
    timeF: document.getElementById('actTimeFilter')?.dataset.value || '',
    typeF: document.getElementById('actTypeFilter')?.dataset.value || '',
    animF: checked ? [...checked].map(cb => cb.value) : []
  };
}

// Vymaže všetky filtre.
export function clearFilters() {
  const search = document.getElementById('actSearch');
  if (search) search.value = '';

  ['actDayFilter', 'actTimeFilter', 'actTypeFilter'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.dataset.value = '';
    const panel = btn.parentElement?.querySelector('.custom-select-panel');
    if (panel) {
      panel.querySelectorAll('.custom-select-option').forEach((o, i) =>
        o.classList.toggle('custom-select-option--active', i === 0));
      const labelEl = btn.querySelector('.filter-custom-label');
      if (labelEl && panel.firstElementChild) labelEl.textContent = panel.firstElementChild.textContent;
    }
  });

  document.querySelectorAll('.animator-check:checked').forEach(cb => { cb.checked = false; });
  const labelEl = document.getElementById('actAnimatorLabel');
  if (labelEl) labelEl.textContent = 'Všetci animátori';
}

// Zobrazí zoznam aktivít, skryje detail.
export function showActivityList() {
  const listView   = document.getElementById('aktivity-list-view');
  const detailView = document.getElementById('aktivity-detail-view');
  if (listView)   listView.hidden   = false;
  if (detailView) detailView.hidden = true;
}
