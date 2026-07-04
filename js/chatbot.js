import MiniSearch from 'minisearch';

// ─── TEXT NORMALIZÁCIA (Slovak diacritics → ASCII) ───────────────────────────

function norm(text) {
  if (!text) return '';
  return String(text).toLowerCase()
    .replace(/[áä]/g, 'a').replace(/[čć]/g, 'c').replace(/[ď]/g, 'd')
    .replace(/[éě]/g, 'e').replace(/[í]/g, 'i').replace(/[ľĺ]/g, 'l')
    .replace(/[ňń]/g, 'n').replace(/[óô]/g, 'o').replace(/[řŕ]/g, 'r')
    .replace(/[šś]/g, 's').replace(/[ť]/g, 't').replace(/[úůü]/g, 'u')
    .replace(/[ý]/g, 'y').replace(/[žź]/g, 'z');
}

// ─── INICIALIZÁCIA ────────────────────────────────────────────────────────────

export function initChatbot({ activities, days, animators = [], onNavigate = null }) {

  // ── DATA ADAPTÉR ─────────────────────────────────────────────────────────────

  const docs = activities.map(act => {
    const day = days.find(d => d.id === act.dayRef);
    const materialsArr = Array.isArray(act.materials) ? act.materials : [];
    const animatorsRaw = Array.isArray(act.animators) ? act.animators : [];
    return {
      id:               act.id,
      name:             act.name             || '',
      dayRef:           act.dayRef           || '',
      day:              day?.label           || '',
      date:             day?.date            || '',
      time:             act.time             || '',
      endTime:          act.endTime          || '',
      timeLabel:        act.timeLabel        || '',
      timeOfDay:        act.timeOfDay        || '',
      location:         act.location         || '',
      detail:           act.detail           || '',
      description:      act.description      || '',
      vedúciDna:        act.vedúciDna        || '',
      vedúciProgramu:   act.vedúciProgramu   || '',
      animatorsRaw,
      animators:        animatorsRaw.map(a => a.name).join(' '),
      animatorRoles:    animatorsRaw.map(a => `${a.name} ${a.role || ''}`).join(' '),
      animatorsNote:    act.animatorsNote    || '',
      materials:        materialsArr.join(' '),
      materialsArr,
      scoring:          act.scoring          || '',
      hasScoring:       !!act.hasScoring,
      mtzNote:          act.mtzNote          || '',
      hasMtzNote:       !!act.hasMtzNote,
    };
  });

  // ── MINISEARCH INDEX ──────────────────────────────────────────────────────────

  const miniSearch = new MiniSearch({
    idField: 'id',
    fields: ['name', 'detail', 'description', 'materials', 'scoring', 'mtzNote',
             'day', 'location', 'animators', 'vedúciDna', 'vedúciProgramu'],
    storeFields: [
      'id', 'name', 'dayRef', 'day', 'date', 'time', 'endTime', 'timeLabel', 'timeOfDay',
      'location', 'detail', 'materials', 'materialsArr', 'animatorsRaw', 'animators',
      'animatorsNote', 'scoring', 'hasScoring', 'mtzNote', 'hasMtzNote',
      'vedúciDna', 'vedúciProgramu',
    ],
    searchOptions: {
      boost: { name: 4, vedúciProgramu: 3, animators: 2.5, detail: 2, materials: 1.5, scoring: 1.2 },
      prefix: true,
      fuzzy: 0.2,
    },
    processTerm: term => norm(term),
  });
  miniSearch.addAll(docs);

  // ── ENTITY EXTRACTION ─────────────────────────────────────────────────────────

  const DAY_PATTERNS = [
    [/pondelok|pondelk/,                   'pondelok'],
    [/utorok|utork|utorn/,                  'utorok'],  // +utorňajší → utornajsi
    [/streda|stredu|stredaj/,               'streda'],
    [/stvrtok|stvrtk|štvrtok|štvrtk|štvr/, 'stvrtok'],
    [/piatok|piatk/,                        'piatok'],
    [/sobota|sobot/,                        'sobota'],
    [/nedela|nedel/,                        'nedela'],
  ];

  const TOD_PATTERNS = [
    [/po obede|poobedie|poobedu|olovrante|poludni|poobede/, 'afternoon'],
    [/\brano\b|\branné|\branný|\bdoobeda|\bdoobedu|\bdoobedn/, 'morning'],
    [/nočn|nocn|\bnoc\b|\bnocna\b|\bnocny\b/, 'night'],
    [/večern|vecern|\bvecer\b/, 'evening'],
  ];

  function extractDay(q) {
    const nq = norm(q);
    // Explicit day names always take priority over "dnes"/"zajtra"
    for (const [pattern, id] of DAY_PATTERNS) {
      if (pattern.test(nq)) return id;
    }
    if (/\bdnes\b/.test(nq)) {
      const today = new Date().toISOString().slice(0, 10);
      const td = days.find(d => d.date === today);
      if (td) return td.id;
    }
    return null;
  }

  function extractTimeOfDay(q) {
    const nq = norm(q);
    for (const [pattern, tod] of TOD_PATTERNS) {
      if (pattern.test(nq)) return tod;
    }
    return null;
  }

  // 'game' ak query obsahuje hra/hru/hre — preferuj hernú aktivitu pred scénkami/omšou/...
  function extractActivityType(q) {
    if (/\b(hra|hru|hre)\b/.test(norm(q))) return 'game';
    return null;
  }

  // Extrahuje meno osoby z dotazu – prehľadáva vedúcich + animátorov vo všetkých aktivitách
  function extractPersonName(q) {
    const nq = norm(q);
    const nqWords = nq.split(/\W+/).filter(w => w.length >= 3);
    const allNames = new Set();

    animators.forEach(a => { if (a.name) allNames.add(a.name); });
    days.forEach(d => {
      if (d.vedúciDna) d.vedúciDna.split(/,|a /).forEach(n => allNames.add(n.trim()));
    });
    activities.forEach(act => {
      if (act.vedúciDna) act.vedúciDna.split(/,|a /).forEach(n => allNames.add(n.trim()));
      if (act.vedúciProgramu) act.vedúciProgramu.split(/,|a /).forEach(n => allNames.add(n.trim()));
      (act.animators || []).forEach(a => { if (a.name) allNames.add(a.name); });
    });

    let bestName = null;
    let bestScore = 0;
    for (const name of allNames) {
      if (!name || name.length < 3) continue;
      const parts = name.split(/\s+/).filter(p => p.length >= 3);
      let score = 0;
      for (const part of parts) {
        const partNorm = norm(part);
        if (nq.includes(partNorm)) {
          score += partNorm.length;
        } else if (partNorm.length >= 4) {
          // Stem match pre skloňované tvary: "nina" → hľadáme slová začínajúce na "nin"
          const stem = partNorm.slice(0, -1);
          if (nqWords.some(w => w.startsWith(stem))) score += partNorm.length;
        }
      }
      if (score > bestScore) { bestScore = score; bestName = name; }
    }
    return bestScore >= 4 ? bestName : null;
  }

  // Extrahuje najrelevantnejšiu aktivitu z dotazu (word-overlap + stem matching pre skloňovanie)
  function extractActivityDoc(q) {
    const nq = norm(q);
    const qWords = nq.split(/\W+/).filter(w => w.length >= 4);
    if (!qWords.length) return null;

    let best = null;
    let bestScore = 0;
    for (const doc of docs) {
      const nameNorm = norm(doc.name);
      let score = 0;
      for (const w of qWords) {
        if (nameNorm.includes(w)) {
          score += w.length;                         // presná zhoda
        } else if (w.length >= 5) {
          const stem = w.slice(0, -1);               // stem: odstrán posledný znak (skloňovanie)
          if (nameNorm.includes(stem)) score += stem.length;
        }
      }
      if (score > bestScore) { bestScore = score; best = doc; }
    }
    return bestScore >= 4 ? best : null;
  }

  // ── INTENT DETEKCIA ───────────────────────────────────────────────────────────

  function detectIntent(query) {
    const nq = norm(query);

    if (/briefing|brifing|bref\b/.test(nq)) return 'briefing';
    if (/strucne|stručne|kratke zhrnutie|krátko|nemam cas|nemám čas|rýchlo vysvetl|skrátene/.test(nq)) return 'summary';

    // ── ACTIVITY DETAIL — explicitné frázy, musí byť PRED schedule ─────────────
    // "povedz mi o programe X", "čo je X", "vysvetli X", "detail X", atď.
    if (/povedz mi o (programe|aktivite)|co (je|bolo)\b|čo (je|bolo)\b|vysvetl|detail\b|popis(mi)?\b|ako funguje|o c[oč]o ide/.test(nq)) {
      if (extractActivityDoc(query)) return 'activity_detail';
    }

    // Owner lookup — "kto" questions (must come BEFORE schedule check because "program" is often present)
    if (/kto (vedie|organizuje)|kto je veduc|vedúci (dna|hry|programu|dnes)/.test(nq)) return 'leader';
    if (/kto ma.*na starosti|kto je zodpovedn/.test(nq)) return 'leader';
    // Collaborator lookup — must come BEFORE schedule (query often contains "program"/"pri")
    if (/kto pomaha|kto je (s |pri |spolu)|kto spolupracuje|kto robi s|kto ma program s|s kym (je|robi)|ktori animatori|animatori (maju|na starosti)|ktori su pri/.test(nq)) return 'collaborator_lookup';
    // Person + responsibility — "som X" or name + "zodpovednosť" (before generic zodpovedn→leader)
    if (/kde je|kde bude|co robi\b|čo robí\b|co ma na starosti|hladam\b|hľadám\b|zodpovedn|mam.*zodpovednost/.test(nq)) {
      if (extractPersonName(query)) return 'person';
    }
    if (/\bsom\b/.test(nq) && extractPersonName(query)) return 'person';
    // Generic responsibility/owner question without specific person
    if (/zodpovedn/.test(nq)) return 'leader';
    if (/som (pri|animator|animátor)|co robim|čo robím|moja rola|moja úloha|aka je moja/.test(nq)) return 'my-role';
    if (/pravidl|ako sa hra|ako to funguje|vysvetli (mi |)(hru|hra\b)|co sa stane|kolko (bod|papier)/.test(nq)) return 'rules';
    if (/po obede|po olovrant|po omsi|po ranajk|co nasleduje|co pride po/.test(nq))  return 'after-event';
    if (/pomocky?|material|potrebujem|co treba|zoznam (vybaven|pomoc)|vybavenie/.test(nq)) return 'materials';
    if (/prsi|dazd|mokry|ked prsi|ak prsi|dazdivo/.test(nq)) return 'rain';
    if (/kde sa hra|kde sa sretame|kde (sa )?(zacina|kona|stretnem)|miesto (konania|hry)|kde budem/.test(nq)) return 'location';
    if ((/kedy (zacinaju?|zacina|su\b|je\b|bude\b|budu\b)|o kolkej/.test(nq))
        && !/program\b|harmonogram|rozvrh/.test(nq)) {
      return 'time_lookup';
    }

    // ── "program [aktivita]" — fallback pred schedule ────────────────────────────
    // Odstrán slovo "program" a skontroluj, či ostatok odkazuje na aktivitu.
    // Chráni: "aký je program v pondelok" → schedule (extractActivityDoc vráti null)
    //          "program Obeta za Narniu"   → activity_detail
    if (/\bprogram/.test(nq)) {
      const stripped = query.replace(/\bprograme?\b/gi, '').trim();
      if (stripped.length >= 3 && extractActivityDoc(stripped)) return 'activity_detail';
    }

    if (/co robime|čo robíme|program|harmonogram|rozvrh|kedy (je|bude)|čo mame|ce je po/.test(nq)) return 'schedule';
    if (/\bdnes\b|\bvecer(n|)\b|\bnoc(n|)\b|\brano\b|\bpoobed|\bdoobedu|\bdoobedie|\bdoobeda|\bdoobedn/.test(nq)) return 'schedule';
    if (/najdi|nájdi|ukaz|ukaž|kde je hra/.test(nq)) return 'find';

    return 'search';
  }

  // ── HELPERS ───────────────────────────────────────────────────────────────────

  function getTodayDay() {
    const today = new Date().toISOString().slice(0, 10);
    return days.find(d => d.date === today) || null;
  }

  function getNextCampDay() {
    const today = new Date().toISOString().slice(0, 10);
    return [...days].sort((a, b) => a.date.localeCompare(b.date)).find(d => d.date >= today) || null;
  }

  function fmtTime(time, endTime) {
    if (!time) return '';
    return endTime ? `${time}–${endTime}` : time;
  }

  function extractMokrySection(act) {
    const parts = [];
    if (act.mtzNote) {
      const lines = act.mtzNote.split('\n');
      let cap = false;
      for (const line of lines) {
        if (/mokr/i.test(line)) {
          cap = true;
          const clean = line.replace(/^Mokr[ý]?\s*[Pp]rogram[:\s]*/i, '').trim();
          if (clean) parts.push(clean);
        } else if (cap) {
          if (line.trim()) parts.push(line.trim());
          else break;
        }
      }
    }
    if (!parts.length && act.description) {
      const m = act.description.match(/##\s*Mokr[ý]?\s*[Pp]rogram\s*\n([\s\S]*?)(?=\n##|$)/i);
      if (m) parts.push(...m[1].trim().split('\n').slice(0, 3).filter(Boolean));
    }
    return parts.join(' ').slice(0, 300) || null;
  }

  function extractRulesSection(act) {
    if (!act.description) return null;
    const m = act.description.match(/##\s*Pravidl[aá]\s*\n([\s\S]*?)(?=\n##|$)/i);
    if (m) return m[1].trim().slice(0, 700);
    return act.description.trim().slice(0, 500);
  }

  // Mapuje čas dňa na časový rozsah (pre filtrovanie harmonogramu)
  const TOD_RANGES = {
    morning:   { from: '07:00', to: '12:29' },
    afternoon: { from: '12:30', to: '16:59' },
    evening:   { from: '17:00', to: '21:29' },
    night:     { from: '21:30', to: '23:59' },
  };

  function scheduleInRange(item, tod) {
    if (!tod) return true;
    const r = TOD_RANGES[tod];
    if (!r) return true;
    // nočná hra môže byť aj po polnoci (00:xx) — špeciálny prípad
    if (tod === 'night' && item.time < '07:00') return true;
    return item.time >= r.from && item.time <= r.to;
  }

  const TOD_LABELS = { morning: 'ranný', afternoon: 'popoludňajší', evening: 'večerný', night: 'nočný' };
  const TOD_ICONS  = { morning: '🌅', afternoon: '☀️', evening: '🌆', night: '🌙' };

  const DAY_LOCATIVE = {
    pondelok: 'v pondelok',
    utorok:   'v utorok',
    streda:   'v stredu',
    stvrtok:  'vo štvrtok',
    piatok:   'v piatok',
    sobota:   'v sobotu',
    nedela:   'v nedeľu',
  };

  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

  // Nájde hernú aktivitu (hra v názve) pre daný deň/čas — preferuje pred scénkami/omšou
  // pre timeOfDay='evening' prehľadáva aj nočné aktivity (nočná hra je 21:30 = night)
  function pickGameActivity(dayId, timeOfDay) {
    const GAME_POS = /\bhra\b/;
    const GAME_NEG = /\bscenk|\bomsa\b|\bmodlitba\b|\bporada\b|\bbriefing\b|\bvolno\b|\branajky\b|\bolivrant\b/;
    const allowedTOD = timeOfDay === 'evening'
      ? ['evening', 'night']
      : timeOfDay ? [timeOfDay] : null;

    let best = null;
    let bestScore = -Infinity;
    for (const doc of docs) {
      if (dayId && doc.dayRef !== dayId) continue;
      if (allowedTOD && !allowedTOD.includes(doc.timeOfDay)) continue;
      const n = norm(doc.name);
      let score = 0;
      if (GAME_POS.test(n)) score += 100;
      if (GAME_NEG.test(n)) score -= 100;
      if (score > bestScore) { bestScore = score; best = doc; }
    }
    return bestScore > 0 ? best : null;
  }

  // Spoločný renderer: vedúci programu + animátori pre aktivitu (bez osoby)
  function renderPeopleAtActivity(d) {
    const lines = [`**${d.name}**`];
    if (d.day && d.time) lines.push(`📅 ${d.day}, **${fmtTime(d.time, d.endTime)}**`);
    if (d.location) lines.push(`📍 ${d.location}`);
    lines.push('');
    if (d.vedúciProgramu) {
      lines.push('## Vedúci programu');
      d.vedúciProgramu.split(/,\s*|\/\s*/).map(n => n.trim()).filter(Boolean)
        .forEach(n => lines.push(`• **${n}**`));
    }
    if (d.animatorsRaw.length) {
      lines.push('## Animátori');
      d.animatorsRaw.forEach(a => lines.push(`• **${a.name}**${a.role ? ` — _${a.role}_` : ''}`));
    }
    if (!d.vedúciProgramu && !d.animatorsRaw.length) lines.push('_Zoznam animátorov nie je v brožúrke uvedený._');
    return lines.join('\n');
  }

  // ── SCHEDULE ALIASES ──────────────────────────────────────────────────────────
  // Normalized phrase → canonical schedule item label (longest match wins)
  const SCHED_CANON_ENTRIES = [
    ['vecierka deti',         'Večierka deti'],
    ['detska vecierka',       'Večierka deti'],
    ['vecierka animatori',    'Večierka animátori'],
    ['vecierka animatorov',   'Večierka animátori'],
    ['animatorska vecierka',  'Večierka animátori'],
    ['modlitba animatorov',   'Modlitby animátorov'],
    ['porada animatorov',     'Animátorská porada'],
  ];

  // Ambiguous generic terms → multiple canonical labels
  const SCHED_GROUPS = {
    vecierka: ['Večierka deti', 'Večierka animátori'],
  };

  function resolveSchedAlias(term) {
    let best = null;
    for (const [phrase, label] of SCHED_CANON_ENTRIES) {
      if (term.includes(phrase) && (!best || phrase.length > best.phrase.length)) {
        best = { phrase, label };
      }
    }
    if (best) return { type: 'canon', label: best.label };
    for (const [key, labels] of Object.entries(SCHED_GROUPS)) {
      if (term === key) return { type: 'group', labels };
    }
    return null;
  }

  function findSchedByLabel(label) {
    const normLabel = norm(label);
    const result = [];
    for (const day of days) {
      for (const item of (day.schedule || [])) {
        if (norm(item.label) === normLabel) result.push({ day, item });
      }
    }
    return result;
  }

  // ── HANDLERY ─────────────────────────────────────────────────────────────────

  function handleBriefing(query) {
    const dayId = extractDay(query);
    const targetDay = dayId
      ? days.find(d => d.id === dayId)
      : (getTodayDay() || getNextCampDay());

    if (!targetDay) return '📋 Neviem, ktorý deň zobraziť. Skús napísať napr. _"briefing pondelka"_.';

    const dayActs = docs.filter(d => d.dayRef === targetDay.id);
    const allMats = [...new Set(dayActs.flatMap(d => d.materialsArr))].filter(Boolean);
    const rainItems = dayActs
      .map(d => ({ name: d.name, text: extractMokrySection(activities.find(a => a.id === d.id)) }))
      .filter(r => r.text);

    const lines = [`📋 **Briefing: ${targetDay.label}** (${targetDay.date})`, ''];
    if (targetDay.vedúciDna) lines.push(`👑 **Vedúci dňa:** ${targetDay.vedúciDna}`);
    if (targetDay.thought)   lines.push(`💭 _${targetDay.thought}${targetDay.thoughtAuthor ? ' — ' + targetDay.thoughtAuthor : ''}_`);

    lines.push('', '## Harmonogram');
    targetDay.schedule.forEach(s => {
      const icon = s.type === 'jedlo' ? '🍽' : s.type === 'activity' ? '🎯' : s.type === 'scenka' ? '🎭' : '·';
      lines.push(`${icon} **${s.time}** ${s.label}${s.note ? ` _(${s.note})_` : ''}`);
    });

    if (dayActs.length) {
      lines.push('', '## Hlavné aktivity');
      dayActs.forEach(d => {
        const leader = d.vedúciProgramu || d.vedúciDna;
        const leaderStr = leader ? ` — vedúci: **${leader}**` : '';
        lines.push(`• **${d.name}** (${d.time})${leaderStr}`);
      });
    }

    if (allMats.length) {
      lines.push('', '## Potrebné pomôcky');
      allMats.slice(0, 14).forEach(m => lines.push(`• ${m}`));
      if (allMats.length > 14) lines.push(`• … +${allMats.length - 14} ďalšie`);
    }

    if (rainItems.length) {
      lines.push('', '## ☔ Mokrý program');
      rainItems.forEach(r => lines.push(`• **${r.name}:** ${r.text.slice(0, 160)}${r.text.length > 160 ? '…' : ''}`));
    }

    return lines.join('\n').trim();
  }

  function handleSchedule(query) {
    const dayId    = extractDay(query);
    const timeOfDay = extractTimeOfDay(query);
    const targetDay = dayId
      ? days.find(d => d.id === dayId)
      : (getTodayDay() || getNextCampDay());

    if (!targetDay) return 'Tábor sa ešte nezačal alebo už skončil.';

    const items = timeOfDay
      ? targetDay.schedule.filter(s => scheduleInRange(s, timeOfDay))
      : targetDay.schedule;

    const todLabel = timeOfDay ? TOD_LABELS[timeOfDay] + ' ' : '';
    const lines = [`**${targetDay.label} – ${todLabel}program**`, ''];
    if (targetDay.vedúciDna) lines.push(`👑 Vedúci dňa: **${targetDay.vedúciDna}**`);
    lines.push('');

    items.forEach(s => {
      const icon = s.type === 'jedlo' ? '🍽' : s.type === 'activity' ? '🎯' : s.type === 'scenka' ? '🎭' : '·';
      lines.push(`${icon} **${s.time}** ${s.label}${s.note ? ` _(${s.note})_` : ''}`);
    });

    // Pre večer/noc pridaj detail aktivít
    if (timeOfDay === 'evening' || timeOfDay === 'night') {
      const relActs = docs.filter(d => d.dayRef === targetDay.id && d.timeOfDay === timeOfDay);
      if (relActs.length) {
        lines.push('', '## Detaily aktivít');
        relActs.forEach(d => {
          lines.push(`**${d.name}**`);
          if (d.location)        lines.push(`📍 ${d.location}`);
          if (d.vedúciProgramu)  lines.push(`👤 Vedúci: **${d.vedúciProgramu}**`);
          if (d.animatorsNote)   lines.push(`👥 ${d.animatorsNote}`);
          if (d.detail)          lines.push(d.detail.trim().slice(0, 200));
          lines.push('');
        });
      }
    }

    return lines.join('\n').trim();
  }

  function handleLeader(query) {
    const dayId        = extractDay(query);
    const timeOfDay    = extractTimeOfDay(query);
    const activityType = extractActivityType(query);

    // Pre "hra/hru/hre" preferuj hernú aktivitu pred všeobecným výpisom
    const actDoc = activityType === 'game'
      ? (pickGameActivity(dayId, timeOfDay) || extractActivityDoc(query))
      : extractActivityDoc(query);

    // Only use actDoc if it belongs to the queried day (avoids cross-day false matches on "program")
    if (actDoc && (!dayId || actDoc.dayRef === dayId)) {
      // Hernú aktivitu renderuj cez spoločný renderer (vedúci + animátori)
      if (activityType === 'game') return renderPeopleAtActivity(actDoc);

      const leader = actDoc.vedúciProgramu || actDoc.vedúciDna;
      const lines  = [];
      if (leader) {
        lines.push(`**${actDoc.name}** vedie **${leader}**.`);
      } else {
        lines.push(`**${actDoc.name}** — vedúci nie je v brožúrke uvedený.`);
      }
      lines.push('');
      lines.push(`📅 ${actDoc.day}, **${fmtTime(actDoc.time, actDoc.endTime)}**`);
      if (actDoc.location) lines.push(`📍 ${actDoc.location}`);

      if (actDoc.animatorsRaw.length) {
        lines.push('', '## Animátori');
        actDoc.animatorsRaw.slice(0, 10).forEach(a => {
          lines.push(`• **${a.name}**${a.role ? ` — _${a.role}_` : ''}`);
        });
        if (actDoc.animatorsRaw.length > 10) lines.push(`• … +${actDoc.animatorsRaw.length - 10} ďalší`);
        if (actDoc.animatorsNote) lines.push(`_${actDoc.animatorsNote}_`);
      }
      return lines.join('\n');
    }

    const targetDay = dayId ? days.find(d => d.id === dayId) : getTodayDay();

    // Day + timeOfDay: show leaders of activities in that time slot
    if (targetDay && timeOfDay) {
      const todLabel  = TOD_LABELS[timeOfDay] || timeOfDay;
      const timeActs  = docs.filter(d => d.dayRef === targetDay.id && d.timeOfDay === timeOfDay);
      const inDay     = DAY_LOCATIVE[dayId] || targetDay.label.toLowerCase();
      const lines = [`## Vedúci — ${targetDay.label}, ${todLabel} program`, ''];

      if (timeActs.length) {
        let anyLeader = false;
        timeActs.forEach(d => {
          const leader = d.vedúciProgramu || d.vedúciDna;
          if (leader) { anyLeader = true; lines.push(`• **${d.name}** (${d.time}) — vedúci: **${leader}**`); }
          else        { lines.push(`• **${d.name}** (${d.time}) — vedúci nie je uvedený`); }
        });
        if (!anyLeader && targetDay.vedúciDna) {
          lines.push('');
          lines.push(`👑 Vedúci celého dňa: **${targetDay.vedúciDna}**`);
        }
      } else {
        lines.push(`${cap(inDay)} nie sú v brožúrke definované konkrétne aktivity pre ${todLabel} čas.`);
        if (targetDay.vedúciDna) lines.push('', `👑 Vedúci dňa: **${targetDay.vedúciDna}**`);
      }
      return lines.join('\n');
    }

    // Vedúci dňa (bez timeOfDay)
    if (targetDay?.vedúciDna) {
      const lines = [`👑 Vedúci ${targetDay.label === 'Dnes' ? 'dnes' : targetDay.label.toLowerCase().slice(0, -1) + 'a'}: **${targetDay.vedúciDna}**`];
      const dayActs = docs.filter(d => d.dayRef === targetDay.id && d.vedúciProgramu);
      if (dayActs.length) {
        lines.push('', '## Vedúci programov');
        dayActs.forEach(d => lines.push(`• **${d.name}** (${d.time}) — ${d.vedúciProgramu}`));
      }
      return lines.join('\n');
    }

    // Výpis vedúcich všetkých dní
    const lines = ['## Vedúci jednotlivých dní'];
    days.forEach(d => {
      if (d.vedúciDna) lines.push(`• **${d.label}:** ${d.vedúciDna}`);
    });
    return lines.join('\n');
  }

  function handlePerson(query) {
    const person = extractPersonName(query);
    if (!person) return '👤 Neviem, koho hľadáš. Skús napísať celé meno alebo priezvisko.';

    const dayId    = extractDay(query);
    const nPerson  = norm(person);
    const nameParts = nPerson.split(/\s+/).filter(p => p.length >= 3);

    const led = docs.filter(d =>
      (!dayId || d.dayRef === dayId) &&
      nameParts.some(p => norm(d.vedúciProgramu).includes(p) || norm(d.vedúciDna).includes(p))
    );

    const animIn = docs.filter(d =>
      (!dayId || d.dayRef === dayId) &&
      d.animatorsRaw.some(a => nameParts.some(p => norm(a.name).includes(p)))
    );

    const vedúciDna = days.filter(d =>
      (!dayId || d.id === dayId) &&
      d.vedúciDna && nameParts.some(p => norm(d.vedúciDna).includes(p))
    );

    // Day-specific query with no results
    if (dayId && !led.length && !animIn.length && !vedúciDna.length) {
      const inDay = DAY_LOCATIVE[dayId] || `v ${(days.find(d => d.id === dayId)?.label || dayId).toLowerCase()}`;
      return `${cap(inDay)} som pre **${person}** nenašiel žiadnu konkrétnu zodpovednosť v brožúrke.`;
    }

    const inDay = dayId ? (DAY_LOCATIVE[dayId] || `v ${(days.find(d => d.id === dayId)?.label || dayId).toLowerCase()}`) : null;
    const lines = dayId
      ? [`${cap(inDay)} má **${person}** tieto zodpovednosti:`, '']
      : [`**${person}**`, ''];

    if (!dayId) {
      const anim = animators.find(a => nameParts.some(p => norm(a.name).includes(p)));
      if (anim) {
        const cats = { core: 'Core tím', 'sdb-fma': 'SDB/FMA', skupinky: 'Skupinkár', mtz: 'MTZ', zdravotnik: 'Zdravotník' };
        lines.push(`🏷 ${cats[anim.category] || anim.category}`);
      }
    }

    if (led.length) {
      lines.push('', '## Vedie programy');
      led.forEach(d => lines.push(`• **${d.name}** — ${d.day}, ${d.time}`));
    }

    if (animIn.length) {
      lines.push('', '## Animátor pri hrách');
      animIn.forEach(d => {
        const myRole = d.animatorsRaw.find(a => nameParts.some(p => norm(a.name).includes(p)));
        const roleStr = myRole?.role ? ` — _${myRole.role}_` : '';
        lines.push(`• **${d.name}** (${d.day}, ${d.time})${roleStr}`);
      });
    }

    if (vedúciDna.length) {
      lines.push('', '## Vedúci dňa');
      vedúciDna.forEach(d => lines.push(`• **${d.label}** (${d.date})`));
    }

    if (!dayId && !led.length && !animIn.length && !vedúciDna.length) {
      lines.push('Táto osoba nie je priamo priradená k aktivitám v brožúrke.');
    }

    return lines.join('\n');
  }

  function handleMyRole(query) {
    const actDoc = extractActivityDoc(query);
    const person = extractPersonName(query);

    if (!actDoc && !person) {
      return '🤔 Ku ktorej hre sa pýtaš? Napíš napr. _"Som pri Pokladovke, čo robím?"_ alebo _"Čo robím pri Skríni?"_';
    }
    if (!actDoc && person) return handlePerson(query);

    const lines = [`**${actDoc.name}** — roly animátorov`, ''];
    if (actDoc.animatorsRaw.length) {
      actDoc.animatorsRaw.forEach(a => {
        lines.push(`• **${a.name}**${a.role ? ` — _${a.role}_` : ''}`);
      });
    } else {
      lines.push('Zoznam animátorov nie je v brožúrke uvedený.');
    }
    if (actDoc.animatorsNote) { lines.push(''); lines.push(`ℹ️ ${actDoc.animatorsNote}`); }
    if (actDoc.vedúciProgramu) { lines.push(''); lines.push(`👑 Vedúci programu: **${actDoc.vedúciProgramu}**`); }

    return lines.join('\n');
  }

  function handleMaterials(query) {
    const actDoc   = extractActivityDoc(query);
    const dayId    = extractDay(query);

    // Konkrétna aktivita
    if (actDoc) {
      const lines = [`🔧 **Pomôcky — ${actDoc.name}** (${actDoc.day}, ${actDoc.time})`, ''];
      if (actDoc.materialsArr.length) {
        actDoc.materialsArr.forEach(m => lines.push(`• ${m}`));
      } else {
        lines.push('Žiadne špeciálne pomôcky nie sú uvedené.');
      }
      return lines.join('\n');
    }

    // Konkrétny deň
    const targetDay = dayId ? days.find(d => d.id === dayId) : getTodayDay();
    if (targetDay) {
      const todayDocs = docs.filter(d => d.dayRef === targetDay.id && d.materialsArr.length);
      if (todayDocs.length) {
        const lines = [`🔧 **Pomôcky na ${targetDay.label}:**`, ''];
        todayDocs.forEach(d => {
          lines.push(`**${d.name}** (${d.time}):`);
          d.materialsArr.forEach(m => lines.push(`  • ${m}`));
          lines.push('');
        });
        return lines.join('\n').trim();
      }
    }

    // Fulltext fallback
    let results = [];
    try { results = miniSearch.search(query, { boost: { name: 5, materials: 4 } }).slice(0, 2); } catch (_) {}
    if (!results.length) return '🔧 Nenašiel som pomôcky pre hľadanú aktivitu.';
    return results.map(r => {
      const lines = [`🔧 **${r.name}** (${r.day}, ${r.time}):`];
      r.materialsArr?.length
        ? r.materialsArr.forEach(m => lines.push(`  • ${m}`))
        : lines.push('  Žiadne špeciálne pomôcky.');
      return lines.join('\n');
    }).join('\n\n');
  }

  function handleRain(query) {
    const dayId  = extractDay(query);
    const rainy  = activities.filter(act =>
      (act.hasMtzNote && act.mtzNote && /mokr/i.test(act.mtzNote)) ||
      (act.description && /##\s*Mokr/i.test(act.description))
    );
    const filtered = dayId ? rainy.filter(a => a.dayRef === dayId) : rainy;

    if (!filtered.length) return '☔ Mokrý program nebol nájdený v brožúrke.';

    const lines = ['☔ **Mokrý program (keď prší):**', ''];
    filtered.forEach(act => {
      const day  = days.find(d => d.id === act.dayRef);
      const text = extractMokrySection(act);
      lines.push(`**${act.name}** (${day?.label || ''}, ${act.time})`);
      if (text) lines.push(text.slice(0, 250) + (text.length > 250 ? '…' : ''));
      lines.push('');
    });
    return lines.join('\n').trim();
  }

  function handleRules(query) {
    const actDoc = extractActivityDoc(query);

    if (actDoc) {
      const act   = activities.find(a => a.id === actDoc.id);
      const rules = extractRulesSection(act);
      const lines = [`📋 **Pravidlá — ${actDoc.name}**`, ''];
      lines.push(`📅 ${actDoc.day}, **${fmtTime(actDoc.time, actDoc.endTime)}**`);
      if (actDoc.location) lines.push(`📍 ${actDoc.location}`);
      lines.push('');
      if (rules) lines.push(rules);
      if (actDoc.hasScoring && actDoc.scoring) {
        lines.push('', `🏆 **Bodovanie:** ${actDoc.scoring.trim().slice(0, 350)}`);
      }
      return lines.join('\n');
    }

    const scored = docs.filter(d => d.hasScoring && d.scoring);
    if (!scored.length) return '🏆 Žiadne aktivity s bodovaním neboli nájdené.';
    const lines = ['🏆 **Aktivity s bodovaním:**', ''];
    scored.forEach(d => {
      lines.push(`**${d.name}** (${d.day}, ${d.time})`);
      lines.push(d.scoring.trim().split('\n')[0].slice(0, 220));
      lines.push('');
    });
    return lines.join('\n').trim();
  }

  function handleLocation(query) {
    const actDoc = extractActivityDoc(query);
    if (actDoc) {
      const lines = [`📍 **${actDoc.name}**`, ''];
      if (actDoc.location) lines.push(`Miesto: **${actDoc.location}**`);
      lines.push(`📅 ${actDoc.day}, ${fmtTime(actDoc.time, actDoc.endTime)}`);
      if (actDoc.detail) lines.push('', actDoc.detail.trim().slice(0, 200));
      return lines.join('\n');
    }
    // Vypíš všetky miesta
    const locations = [...new Set(docs.map(d => d.location).filter(Boolean))];
    if (!locations.length) return '📍 Miesta konania nie sú uvedené.';
    const lines = ['📍 **Miesta konania aktivít:**', ''];
    docs.filter(d => d.location).forEach(d => lines.push(`• **${d.name}** — ${d.location} (${d.day}, ${d.time})`));
    return lines.join('\n');
  }

  function handleSummary(query) {
    const actDoc = extractActivityDoc(query);
    if (!actDoc) {
      return '📌 Napíš názov aktivity. Napr. _"Stručne vysvetli Pokladovku"_ alebo _"Kratko Skriňa"_.';
    }
    const act   = activities.find(a => a.id === actDoc.id);
    const rules = extractRulesSection(act);
    const lines = [`📌 **Stručne: ${actDoc.name}**`, ''];

    lines.push(`📅 ${actDoc.day}, **${fmtTime(actDoc.time, actDoc.endTime)}** (${actDoc.timeLabel})`);
    if (actDoc.location)        lines.push(`📍 ${actDoc.location}`);
    if (actDoc.vedúciProgramu)  lines.push(`👑 Vedúci: **${actDoc.vedúciProgramu}**`);
    if (actDoc.animatorsNote)   lines.push(`👥 ${actDoc.animatorsNote}`);

    if (actDoc.detail) {
      lines.push('', '## Cieľ');
      lines.push(actDoc.detail.trim());
    }

    if (actDoc.materialsArr.length) {
      lines.push('', '## Pomôcky');
      actDoc.materialsArr.slice(0, 7).forEach(m => lines.push(`• ${m}`));
      if (actDoc.materialsArr.length > 7) lines.push(`• … +${actDoc.materialsArr.length - 7} ďalšie`);
    }

    if (actDoc.hasScoring && actDoc.scoring) {
      lines.push('', `🏆 **Bodovanie:** ${actDoc.scoring.trim().split('\n')[0].slice(0, 200)}`);
    }

    if (rules) {
      lines.push('', '## Pravidlá (skrátene)');
      lines.push(rules.slice(0, 450) + (rules.length > 450 ? '…' : ''));
    }

    return lines.join('\n').trim();
  }

  function handleAfterEvent(query) {
    const nq = norm(query);
    const dayId    = extractDay(query);
    const targetDay = dayId
      ? days.find(d => d.id === dayId)
      : (getTodayDay() || getNextCampDay());

    if (!targetDay) return 'Tábor sa ešte nezačal alebo už skončil.';

    let afterTime = null;
    let afterLabel = '';
    if (/po obede/.test(nq))             { afterTime = '12:30'; afterLabel = 'po obede'; }
    else if (/po olovrant/.test(nq))     { afterTime = '14:30'; afterLabel = 'po olovrantí'; }
    else if (/po (omsi|omši)/.test(nq))  { afterTime = '17:00'; afterLabel = 'po omši'; }
    else if (/po (ranajk|raňajk)/.test(nq)) { afterTime = '08:00'; afterLabel = 'po raňajkách'; }
    else if (/po rozcvick/.test(nq))     { afterTime = '07:45'; afterLabel = 'po rozcvičke'; }
    else if (/po vecer(i|i)/.test(nq))   { afterTime = '18:00'; afterLabel = 'po večeri'; }

    if (!afterTime) return handleSchedule(query);

    const after = targetDay.schedule.filter(s => s.time > afterTime).slice(0, 5);
    if (!after.length) return `Po ${afterLabel} nie sú ďalšie položky v programe **${targetDay.label}**.`;

    const lines = [`📅 **${targetDay.label} — ${afterLabel}:**`, ''];
    after.forEach(s => {
      const icon = s.type === 'jedlo' ? '🍽' : s.type === 'activity' ? '🎯' : s.type === 'scenka' ? '🎭' : '·';
      lines.push(`${icon} **${s.time}** ${s.label}`);
    });
    return lines.join('\n');
  }

  function handleTimeLookup(query) {
    const nq = norm(query);

    if (/program\b|harmonogram|rozvrh/.test(nq)) return handleSchedule(query);

    let searchTerm = nq
      .replace(/kedy (zacinaju?|zacina|su\b|je\b|budu?\b|bude\b|konaju?)\s*/g, '')
      .replace(/o (kolkej|ko[lľ]kej)\s*(je|su|zacina|zacinaju)?\s*/g, '')
      .replace(/\bcas\b\s*/g, '')
      .trim();

    const dayId = extractDay(query);

    // Strip all day-word forms (nominative + Slovak cases: genitive, accusative, adjective)
    searchTerm = searchTerm
      .replace(/\bpondelok\w*/g, '')
      .replace(/\butorok|\butork\w*|\butorn\w*/g, '')
      .replace(/\bstred\w*/g, '')
      .replace(/\bstvrtok\w*|\bstvrtk\w*/g, '')
      .replace(/\bpiatok|\bpiatk\w*/g, '')
      .replace(/\bsobot\w*/g, '')
      .replace(/\bnedel\w*/g, '')
      .replace(/\bdnes\b/g, '')
      .replace(/\b(v|na|vo|pri|po)\b\s*/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!searchTerm || searchTerm.length < 3) return handleSchedule(query);

    // ── ALIAS RESOLUTION ──────────────────────────────────────────────────────
    const alias = resolveSchedAlias(searchTerm);
    if (alias) {
      const targetDay = dayId ? days.find(d => d.id === dayId) : null;
      const inDay = dayId ? (DAY_LOCATIVE[dayId] || `v ${(targetDay?.label || dayId).toLowerCase()}`) : null;

      if (alias.type === 'canon') {
        const allM = findSchedByLabel(alias.label);
        if (!allM.length) return `**${alias.label}** som nenašiel v harmonograme.`;

        if (dayId) {
          const dayM = allM.filter(m => m.day.id === dayId);
          if (!dayM.length) {
            const others = allM
              .filter((m, i, a) => a.findIndex(x => x.day.id === m.day.id) === i)
              .sort((a, b) => (a.day.dayIndex || 0) - (b.day.dayIndex || 0));
            const uniqueTimes = [...new Set(others.map(m => m.item.time))];
            if (uniqueTimes.length === 1) {
              return `${cap(inDay)} som **${alias.label}** nenašiel. V ostatné dni je o **${uniqueTimes[0]}**.`;
            }
            const noLines = [`${cap(inDay)} som **${alias.label}** nenašiel. V ostatné dni:`];
            others.forEach(m => noLines.push(`• **${m.day.label}:** ${m.item.time}`));
            return noLines.join('\n');
          }
          if (dayM.length === 1) return `${cap(inDay)} je **${alias.label}** o **${dayM[0].item.time}**.`;
          const dayLines = [`${cap(inDay)}:`];
          dayM.forEach(m => dayLines.push(`• **${m.item.label}:** ${m.item.time}`));
          return dayLines.join('\n');
        }

        const uniqueDays = allM
          .filter((m, i, a) => a.findIndex(x => x.day.id === m.day.id) === i)
          .sort((a, b) => (a.day.dayIndex || 0) - (b.day.dayIndex || 0));
        if (uniqueDays.length === 1) {
          return `**${alias.label}** je o **${uniqueDays[0].item.time}** (${uniqueDays[0].day.label}).`;
        }
        const allDayLines = [`**${alias.label}** sa nachádza v programe viackrát:`, ''];
        uniqueDays.forEach(m => allDayLines.push(`• **${m.day.label}:** ${m.item.time}`));
        return allDayLines.join('\n');
      }

      // type === 'group' — ambiguous, show all subtypes
      const groupData = alias.labels.map(lbl => ({
        label: lbl,
        matches: findSchedByLabel(lbl)
          .filter((m, i, a) => a.findIndex(x => x.day.id === m.day.id) === i)
          .sort((a, b) => (a.day.dayIndex || 0) - (b.day.dayIndex || 0)),
      })).filter(g => g.matches.length);

      if (!groupData.length) return 'Toto som nenašiel v harmonograme.';

      if (dayId) {
        const found = groupData
          .map(g => ({ label: g.label, match: g.matches.find(m => m.day.id === dayId) }))
          .filter(r => r.match);
        if (!found.length) {
          return `${cap(inDay)} som večierku nenašiel v programe.`;
        }
        if (found.length === 1) {
          return `${cap(inDay)} je **${found[0].label}** o **${found[0].match.item.time}**.`;
        }
        const gDayLines = [`${cap(inDay)}:`];
        found.forEach(r => gDayLines.push(`• **${r.label}:** ${r.match.item.time}`));
        return gDayLines.join('\n');
      }

      const gLines = ['Večierka sa v programe nachádza vo viacerých podobách:', ''];
      groupData.forEach(g => {
        const times = [...new Set(g.matches.map(m => m.item.time))];
        if (times.length === 1) {
          gLines.push(`• **${g.label}:** každý deň o **${times[0]}**`);
        } else {
          gLines.push(`• **${g.label}:**`);
          g.matches.forEach(m => gLines.push(`  - ${m.day.label}: ${m.item.time}`));
        }
      });
      gLines.push('', '_Chceš detskú alebo animátorskú?_');
      return gLines.join('\n');
    }

    // ── WORD-OVERLAP SEARCH ────────────────────────────────────────────────────
    const searchWords = searchTerm.split(/\s+/).filter(w => w.length >= 3);
    if (!searchWords.length) return handleSchedule(query);

    // 1. Search ALL days in schedule items (day context comes from parent day object)
    const allSchedMatches = [];
    for (const day of days) {
      for (const item of (day.schedule || [])) {
        const itemNorm = norm(item.label);
        let score = 0;
        for (const w of searchWords) {
          if (itemNorm.includes(w)) score += w.length;
        }
        if (score >= 4) allSchedMatches.push({ day, item, score });
      }
    }

    // 2. Activity name fallback — search all docs
    const allActMatches = [];
    if (!allSchedMatches.length) {
      for (const doc of docs) {
        const nameNorm = norm(doc.name);
        let score = 0;
        for (const w of searchWords) {
          if (nameNorm.includes(w)) score += w.length;
        }
        if (score >= 5 && doc.time) {
          const dayObj = days.find(d => d.id === doc.dayRef);
          if (dayObj) allActMatches.push({ day: dayObj, doc, score });
        }
      }
    }

    // Nothing found anywhere → generic fallback only if entity unknown
    if (!allSchedMatches.length && !allActMatches.length) {
      return 'Presný čas som nenašiel v harmonograme. ' + handleSearch(query);
    }

    // ── DAY FILTER ────────────────────────────────────────────────────────────
    if (dayId) {
      const targetDay = days.find(d => d.id === dayId);
      const inDay     = DAY_LOCATIVE[dayId] || `v ${(targetDay?.label || dayId).toLowerCase()}`;

      const daySchedM = allSchedMatches.filter(m => m.day.id === dayId);
      const dayActM   = allActMatches.filter(m => m.day.id === dayId);

      if (!daySchedM.length && !dayActM.length) {
        // Entity known (found in other days), but absent in the requested day
        const useScheds  = allSchedMatches.length > 0;
        const allMatches = useScheds ? allSchedMatches : allActMatches;
        const entityName = useScheds ? allMatches[0].item.label : allMatches[0].doc.name;

        const seenDays = new Set();
        const otherDays = allMatches
          .filter(m => { if (seenDays.has(m.day.id)) return false; seenDays.add(m.day.id); return true; })
          .sort((a, b) => (a.day.dayIndex || 0) - (b.day.dayIndex || 0));

        const otherTimes  = otherDays.map(m => useScheds ? m.item.time : m.doc.time);
        const uniqueTimes = [...new Set(otherTimes)];

        if (uniqueTimes.length === 1) {
          return `${cap(inDay)} som **${entityName}** v harmonograme nenašiel. V ostatné dni je o **${uniqueTimes[0]}**.`;
        }
        const lines = [`${cap(inDay)} som **${entityName}** v harmonograme nenašiel. V ostatné dni:`];
        otherDays.forEach((m, i) => {
          lines.push(`• **${m.day.label}:** ${otherTimes[i]}`);
        });
        return lines.join('\n');
      }

      // Found in requested day — pick highest-scoring match
      if (daySchedM.length) {
        daySchedM.sort((a, b) => b.score - a.score || a.item.time.localeCompare(b.item.time));
        const topScore = daySchedM[0].score;
        const best = daySchedM.filter(m => m.score === topScore);
        if (best.length === 1) {
          const { item } = best[0];
          return `${cap(inDay)} je **${item.label}** o **${item.time}**.`;
        }
        const lines = [`${cap(inDay)}:`];
        best.forEach(({ item }) => lines.push(`• **${item.label}:** ${item.time}`));
        return lines.join('\n');
      }
      dayActM.sort((a, b) => b.score - a.score);
      const { doc } = dayActM[0];
      const endStr = doc.endTime ? `–${doc.endTime}` : '';
      return `${cap(inDay)} začína **${doc.name}** o **${doc.time}**${endStr}.`;
    }

    // ── NO DAY FILTER — show all occurrences ──────────────────────────────────
    if (allSchedMatches.length) {
      allSchedMatches.sort((a, b) => b.score - a.score || a.item.time.localeCompare(b.item.time));
      const topScore = allSchedMatches[0].score;
      const best = allSchedMatches.filter(m => m.score >= topScore * 0.75);

      const seen = new Set();
      const deduped = best.filter(m => {
        const key = `${m.day.id}||${m.item.time}||${norm(m.item.label)}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      const eventName = deduped[0].item.label;

      if (deduped.length === 1) {
        const { day, item } = deduped[0];
        return `**${item.label}** je o **${item.time}** (${day.label}).`;
      }

      const lines = [`**${eventName}** sa nachádza v programe viackrát:`, ''];
      deduped.forEach(({ day, item }) => {
        const labelSuffix = norm(item.label) !== norm(eventName) ? ` — ${item.label}` : '';
        lines.push(`• **${day.label}:** ${item.time}${labelSuffix}`);
      });
      return lines.join('\n');
    }

    // Activity matches (no day filter)
    allActMatches.sort((a, b) => b.score - a.score);
    const topScore = allActMatches[0].score;
    const best = allActMatches.filter(m => m.score >= topScore * 0.75);

    if (best.length === 1) {
      const { day, doc } = best[0];
      const endStr = doc.endTime ? `–${doc.endTime}` : '';
      return `**${doc.name}** začína o **${doc.time}**${endStr} (${day.label}).`;
    }

    const actName = best[0].doc.name;
    const lines = [`**${actName}** — časy:`, ''];
    best.forEach(({ day, doc }) => {
      lines.push(`• **${day.label}:** ${doc.time}${doc.endTime ? '–' + doc.endTime : ''}`);
    });
    return lines.join('\n');
  }

  function handleSearch(query) {
    const dayId    = extractDay(query);
    const timeOfDay = extractTimeOfDay(query);

    let results = [];
    try { results = miniSearch.search(query); } catch (_) {}

    // Aplikuj filtre
    if (dayId)    results = results.filter(r => r.dayRef === dayId);
    if (timeOfDay) {
      const exact = results.filter(r => r.timeOfDay === timeOfDay);
      if (exact.length) results = exact;
    }

    if (!results.length) {
      // Fallback podľa dňa/času
      const fallback = docs.filter(d =>
        (!dayId || d.dayRef === dayId) && (!timeOfDay || d.timeOfDay === timeOfDay)
      );
      if (fallback.length && (dayId || timeOfDay)) {
        const label = [dayId ? days.find(d => d.id === dayId)?.label : '', timeOfDay ? TOD_ICONS[timeOfDay] + ' ' + TOD_LABELS[timeOfDay] : ''].filter(Boolean).join(' · ');
        const lines = [label ? `Aktivity — ${label}:` : 'Aktivity:', ''];
        fallback.forEach(d => {
          lines.push(`**${d.name}** — ${d.day}, ${d.time}`);
          if (d.detail) lines.push(d.detail.trim().slice(0, 130));
          lines.push('');
        });
        return lines.join('\n').trim();
      }
      return 'Toto som v brožúrke nenašiel. Skús inak alebo pozri priamo programovú brožúrku.';
    }

    const top   = results.slice(0, 3);
    const label = top.length === 1 ? 'Našiel som aktivitu:' : `Nájdené aktivity (${top.length}):`;
    const lines = [label, ''];

    top.forEach((r, i) => {
      lines.push(`**${r.name}**`);
      if (r.day && r.time) lines.push(`📅 ${r.day}, **${fmtTime(r.time, r.endTime)}** (${r.timeLabel})`);
      if (r.location)       lines.push(`📍 ${r.location}`);
      if (r.vedúciProgramu) lines.push(`👤 Vedúci: **${r.vedúciProgramu}**`);
      if (r.detail) {
        const d = r.detail.trim();
        lines.push(d.slice(0, 160) + (d.length > 160 ? '…' : ''));
      }
      if (r.materialsArr?.length) {
        const shown = r.materialsArr.slice(0, 3);
        const more  = r.materialsArr.length - 3;
        lines.push(`🔧 ${shown.join(', ')}${more > 0 ? ` +${more} ďalšie` : ''}`);
      }
      if (r.scoring) lines.push(`🏆 ${r.scoring.trim().slice(0, 140)}`);
      if (i < top.length - 1) lines.push('');
    });
    return lines.join('\n');
  }

  // ── ACTIVITY DETAIL ───────────────────────────────────────────────────────────
  // Plný detail aktivity s linkom "Otvoriť v brožúrke"

  function handleActivityDetail(query) {
    const actDoc = extractActivityDoc(query);
    if (!actDoc) return handleSearch(query);

    const lines = [`**${actDoc.name}**`, ''];

    lines.push(`📅 ${actDoc.day}, **${fmtTime(actDoc.time, actDoc.endTime)}** (${actDoc.timeLabel})`);
    if (actDoc.location) lines.push(`📍 ${actDoc.location}`);
    lines.push('');

    if (actDoc.vedúciProgramu) {
      lines.push('## Vedúci programu');
      actDoc.vedúciProgramu.split(/,\s*\/\s*|\/\s*|,\s*/).map(n => n.trim()).filter(Boolean)
        .forEach(n => lines.push(`• **${n}**`));
    }

    if (actDoc.animatorsRaw.length) {
      lines.push('## Animátori');
      actDoc.animatorsRaw.slice(0, 9).forEach(a =>
        lines.push(`• **${a.name}**${a.role ? ` — _${a.role}_` : ''}`)
      );
      if (actDoc.animatorsRaw.length > 9) lines.push(`• … +${actDoc.animatorsRaw.length - 9} ďalší`);
      if (actDoc.animatorsNote) lines.push(`_${actDoc.animatorsNote}_`);
    } else if (!actDoc.vedúciProgramu) {
      lines.push('## Animátori');
      lines.push('_Nie sú v brožúrke uvedení._');
    }

    if (actDoc.materialsArr.length) {
      lines.push('## Pomôcky');
      actDoc.materialsArr.slice(0, 9).forEach(m => lines.push(`• ${m}`));
      if (actDoc.materialsArr.length > 9) lines.push(`• … +${actDoc.materialsArr.length - 9} ďalšie`);
    }

    if (actDoc.detail) {
      lines.push('## Stručne');
      lines.push(actDoc.detail.trim().slice(0, 280));
    }

    lines.push('');
    lines.push(`[[act:${actDoc.id}|Otvoriť v brožúrke →]]`);

    return lines.join('\n').trim();
  }

  // TOD adverbiálne formy pre výpis viet (nie adjektíva)
  const TOD_LOCATIVE = { morning: 'ráno', afternoon: 'poobede', evening: 'večer', night: 'v noci' };

  function handleCollaboratorLookup(query) {
    const person       = extractPersonName(query);
    const timeOfDay    = extractTimeOfDay(query);
    const dayId        = extractDay(query);
    const activityType = extractActivityType(query);

    // Extrakcia aktivity:
    // — pre "hra/hru/hre": použij game-aware picker (preferuje hra, penalizuje scénky/omša…)
    // — inak: name-overlap s noise-strippingom (vecer/program/… sa neberú ako názvy aktivít)
    let actDoc;
    if (activityType === 'game') {
      actDoc = pickGameActivity(dayId, timeOfDay);
    } else {
      const cleanNq = norm(query)
        .replace(/\bprogram\w*|\baktivit\w*|\bharmonogram\w*/g, '')
        .replace(/\bvecer\b|\brano\b|\bpoobedie\b|\bpoobedu\b|\bpoobede\b|\bdoobeda\b|\bdoobedu\b/g, '');
      const actQWords = cleanNq.split(/\W+/).filter(w => w.length >= 4);
      actDoc = null;
      if (actQWords.length) {
        let bestScore = 0;
        for (const doc of docs) {
          const nameNorm = norm(doc.name);
          let score = 0;
          for (const w of actQWords) {
            if (nameNorm.includes(w)) score += w.length;
          }
          if (score > bestScore) { bestScore = score; actDoc = doc; }
        }
        if (bestScore < 5) actDoc = null;
      }
    }

    // Pre hernú otázku ("večernú hru") zahrň aj nočné aktivity — nočná hra je 21:30 = night
    const effectiveTOD = (activityType === 'game' && timeOfDay === 'evening')
      ? ['evening', 'night']
      : (timeOfDay ? [timeOfDay] : null);

    const inDayStr  = dayId
      ? (DAY_LOCATIVE[dayId] || `v ${(days.find(d => d.id === dayId)?.label || dayId).toLowerCase()}`)
      : null;
    const todLocStr = timeOfDay ? ' ' + TOD_LOCATIVE[timeOfDay] : '';

    // ── BEZ OSOBY ────────────────────────────────────────────────────────────
    if (!person) {
      // Konkrétna aktivita nájdená a platná pre daný deň
      if (actDoc && (!dayId || actDoc.dayRef === dayId)) {
        return renderPeopleAtActivity(actDoc);
      }

      // Žiadna konkrétna aktivita — vypiš aktivity pre deň + časť dňa
      if (!dayId && !timeOfDay) {
        return '👤 Neviem, koho ani akú aktivitu hľadáš. Skús napr. _"Kto pomáha Paškymu?"_ alebo _"Kto je pri nočnej hre?"_';
      }
      const filteredActs = docs.filter(d => {
        if (dayId && d.dayRef !== dayId) return false;
        if (effectiveTOD && !effectiveTOD.includes(d.timeOfDay)) return false;
        return true;
      });
      if (!filteredActs.length) {
        const prefix = inDayStr ? `${cap(inDayStr)}${todLocStr}` : cap(todLocStr.trim());
        return `${prefix} nie sú v programe žiadne aktivity.`;
      }
      const header = inDayStr
        ? `${cap(inDayStr)}${todLocStr} sú v programe tieto aktivity:`
        : `Tieto aktivity sú v programe:`;
      const lines = [header, ''];
      filteredActs.forEach(d => {
        const leader = d.vedúciProgramu || d.vedúciDna;
        const leaderStr = leader ? ` — vedú **${leader}**` : '';
        lines.push(`• **${d.time}** ${d.name}${leaderStr}`);
      });
      return lines.join('\n');
    }

    // ── OSOBA NÁJDENÁ ─────────────────────────────────────────────────────────
    const nPerson   = norm(person);
    const nameParts = nPerson.split(/\s+/).filter(p => p.length >= 3);

    let personActs = docs.filter(d => {
      if (dayId && d.dayRef !== dayId) return false;
      if (effectiveTOD && !effectiveTOD.includes(d.timeOfDay)) return false;
      const inVeduci    = d.vedúciProgramu && nameParts.some(p => norm(d.vedúciProgramu).includes(p));
      const inAnimators = d.animatorsRaw.some(a => a.name && nameParts.some(p => norm(a.name).includes(p)));
      const inVeduciDna = d.vedúciDna && nameParts.some(p => norm(d.vedúciDna).includes(p));
      return inVeduci || inAnimators || inVeduciDna;
    });

    // Zúži na konkrétnu aktivitu, ak bola explicitne uvedená
    if (actDoc) {
      const narrowed = personActs.filter(d => d.id === actDoc.id);
      if (narrowed.length) personActs = narrowed;
    }

    if (!personActs.length) {
      const prefix = inDayStr ? `${cap(inDayStr)}${todLocStr} som` : 'Nenašiel som';
      return `${prefix} **${person}** pri žiadnom programe.`;
    }

    const lines = [];
    if (personActs.length === 1) {
      const d = personActs[0];
      const prefix = inDayStr ? `${cap(inDayStr)}${todLocStr} som` : 'Našiel som';
      lines.push(`${prefix} **${person}** pri programe **${d.name}** o ${d.time}.`);
      lines.push('');
    } else {
      const prefix = inDayStr ? `${cap(inDayStr)}${todLocStr} je` : 'Je';
      lines.push(`${prefix} **${person}** pri ${personActs.length} programoch:`);
      lines.push('');
    }

    personActs.forEach((d, i) => {
      if (personActs.length > 1) lines.push(`**${i + 1}. ${d.name}** — ${d.time}`);

      const allVeduci = d.vedúciProgramu
        ? d.vedúciProgramu.split(/,\s*|\/\s*/).map(n => n.trim()).filter(Boolean)
        : [];
      const coVeduci    = allVeduci.filter(n => !nameParts.some(p => norm(n).includes(p)));
      const coAnimators = d.animatorsRaw.filter(a => a.name && !nameParts.some(p => norm(a.name).includes(p)));

      if (coVeduci.length) {
        lines.push('## Vedúci programu');
        coVeduci.forEach(n => lines.push(`• **${n}**`));
      }
      if (coAnimators.length) {
        lines.push('## Animátori');
        coAnimators.slice(0, 15).forEach(a => lines.push(`• **${a.name}**${a.role ? ` — _${a.role}_` : ''}`));
        if (coAnimators.length > 15) lines.push(`• … +${coAnimators.length - 15} ďalší`);
      }
      if (!coVeduci.length && !coAnimators.length) {
        lines.push('_Pri tejto aktivite nie sú iní animátori uvedení._');
      }
      if (i < personActs.length - 1) lines.push('');
    });

    return lines.join('\n');
  }

  // ── DISPATCH ──────────────────────────────────────────────────────────────────

  function processQuery(query) {
    const intent = detectIntent(query);
    switch (intent) {
      case 'briefing':            return handleBriefing(query);
      case 'summary':             return handleSummary(query);
      case 'activity_detail':     return handleActivityDetail(query);
      case 'collaborator_lookup': return handleCollaboratorLookup(query);
      case 'schedule':            return handleSchedule(query);
      case 'leader':              return handleLeader(query);
      case 'person':              return handlePerson(query);
      case 'my-role':             return handleMyRole(query);
      case 'materials':           return handleMaterials(query);
      case 'rain':                return handleRain(query);
      case 'rules':               return handleRules(query);
      case 'location':            return handleLocation(query);
      case 'after-event':         return handleAfterEvent(query);
      case 'time_lookup':         return handleTimeLookup(query);
      case 'find':                return handleSearch(query);
      default:                    return handleSearch(query);
    }
  }

  // ── MARKDOWN RENDERER ──────────────────────────────────────────────────────────

  function renderMd(text) {
    const esc    = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const inline = s => s
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>');

    return text.split('\n').map(raw => {
      const trimmed = raw.trim();
      const escaped = esc(raw);
      const lined   = inline(escaped);
      if (!trimmed)                   return '<br>';
      if (/^---+$/.test(trimmed))     return '<hr class="cb-divider">';
      if (/^## /.test(raw))           return `<div class="cb-heading">${inline(esc(raw.slice(3)))}</div>`;
      // [[act:id|label]] — link na aktivitu v brožúrke
      if (/^\[\[act:/.test(trimmed)) {
        const m = trimmed.match(/^\[\[act:([^\]|]+)(?:\|([^\]]*))?\]\]$/);
        if (m) {
          const id  = esc(m[1]);
          const lbl = esc(m[2] || 'Otvoriť v brožúrke →');
          return `<div class="cb-act-link-wrap"><button class="cb-act-link" data-act="${id}">${lbl}</button></div>`;
        }
      }
      if (/^[ \t]*[•\-] /.test(raw)) {
        const content = lined.replace(/^[ \t]*[•\-] /, '');
        const nested  = /^[ \t]{2,}/.test(raw);
        return `<div class="cb-li${nested ? ' cb-li--nested' : ''}">${content}</div>`;
      }
      return `<div>${lined}</div>`;
    }).join('');
  }


  function escAttr(v) {
    return String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── GUIDE STATE MACHINE ───────────────────────────────────────────────────────

  const guideState = { screen: 'home', stack: [], ctx: {} };

  function navTo(screen, ctx) {
    guideState.stack.push({ screen: guideState.screen, ctx: Object.assign({}, guideState.ctx) });
    guideState.screen = screen;
    guideState.ctx = Object.assign({}, guideState.ctx, ctx || {});
    renderGuide();
  }

  function navBack() {
    if (!guideState.stack.length) return;
    const prev = guideState.stack.pop();
    guideState.screen = prev.screen;
    guideState.ctx = prev.ctx;
    renderGuide();
  }

  function navHome() {
    guideState.stack = [];
    guideState.screen = 'home';
    guideState.ctx = {};
    renderGuide();
  }

  // ── GUIDE DATA ────────────────────────────────────────────────────────────────

  const TODAY_DATE = new Date().toISOString().slice(0, 10);

  function getNowTime() {
    const d = new Date();
    return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  }

  function addMins(t, m) {
    const [h, mn] = t.split(':').map(Number);
    const tot = h * 60 + mn + m;
    return String(Math.floor(tot / 60) % 24).padStart(2,'0') + ':' + String(tot % 60).padStart(2,'0');
  }

  // Returns { actId: 'now'|'next' } for today's activities
  function getTimeBadges(acts) {
    const todayDay = days.find(d => d.date === TODAY_DATE);
    if (!todayDay) return {};
    const now = getNowTime();
    const badges = {};
    let nextTime = null;
    acts.forEach(a => {
      if (a.dayRef !== todayDay.id || !a.time) return;
      const end = a.endTime || addMins(a.time, 90);
      if (now >= a.time && now <= end) {
        badges[a.id] = 'now';
      } else if (a.time > now) {
        if (!nextTime || a.time < nextTime) nextTime = a.time;
      }
    });
    if (nextTime && !Object.values(badges).includes('now')) {
      acts.forEach(a => {
        if (a.dayRef === todayDay.id && a.time === nextTime) badges[a.id] = 'next';
      });
    }
    return badges;
  }

  // Badge HTML helper
  function timeBadge(status) {
    if (status === 'now')  return '<span class="cb-badge cb-badge--now">Teraz</span>';
    if (status === 'next') return '<span class="cb-badge cb-badge--next">Ďalšie</span>';
    return '';
  }

  const TOD_OPTIONS_GUIDE = [
    { id: 'morning',   icon: '🌅', label: 'Ráno'         },
    { id: 'doobedu',   icon: '🌤',  label: 'Doobedu'      },
    { id: 'afternoon', icon: '☀️',  label: 'Poobedie'     },
    { id: 'evening',   icon: '🌆', label: 'Večer'         },
    { id: 'night',     icon: '🌙', label: 'Nočný program' },
    { id: 'all',       icon: '📋', label: 'Celý deň', wide: true },
  ];

  const TOD_TIME_RANGES = {
    morning:   { from: '07:00', to: '12:29' },
    doobedu:   { from: '07:00', to: '12:29' },
    afternoon: { from: '12:30', to: '16:59' },
    evening:   { from: '17:00', to: '21:29' },
    night:     { from: '21:30', to: '23:59' },
  };

  const DAY_COLORS = {
    pondelok: '#5b8fcc', utorok: '#8b6dc4', streda: '#3aaa72',
    stvrtok: '#d4881a', piatok: '#c8404e', sobota: '#2a8a8a', nedela: '#999999',
  };

  const SCREEN_TITLES = {
    home:              '🦁 Sprievodca',
    'program-day':     '📅 Program',
    'program-tod':     '📅 Program',
    'program-result':  '📅 Harmonogram',
    ludia:             '👥 Ľudia',
    'activity-list':   '🎮 Aktivity',
    'activity-detail': '🎮 Aktivita',
    'animator-select': '⭐ Som animátor',
    'animator-menu':   '⭐ Som animátor',
    'animator-result': '⭐ Som animátor',
    mokry:             '🌧️ Mokrý program',
    pomucky:           '🧰 Pomôcky',
    'pomucky-day':     '🧰 Pomôcky',
    'veduci-dna':      '🗓️ Vedúci dňa',
    pravidla:          '📖 Pravidlá',
  };

  // ── SCREEN RENDERERS ──────────────────────────────────────────────────────────

  function renderHome() {
    return `<div class="cb-welcome">
      <div class="cb-welcome-icon">🦁</div>
      <div class="cb-welcome-title">Ahoj!</div>
      <div class="cb-welcome-sub">Som sprievodca programovou brožúrkou. Čo chceš zistiť?</div>
    </div>
    <div class="cb-home-grid">
      <button class="cb-hcard" data-nav="program-day">
        <span class="cb-hcard-icon">📅</span><span class="cb-hcard-label">Program</span>
      </button>
      <button class="cb-hcard" data-nav="activity-list">
        <span class="cb-hcard-icon">🎮</span><span class="cb-hcard-label">Aktivity</span>
      </button>
      <button class="cb-hcard" data-nav="ludia">
        <span class="cb-hcard-icon">👥</span><span class="cb-hcard-label">Ľudia</span>
      </button>
      <button class="cb-hcard" data-nav="pomucky">
        <span class="cb-hcard-icon">🧰</span><span class="cb-hcard-label">Pomôcky</span>
      </button>
      <button class="cb-hcard" data-nav="pravidla">
        <span class="cb-hcard-icon">📖</span><span class="cb-hcard-label">Pravidlá</span>
      </button>
      <button class="cb-hcard" data-nav="mokry">
        <span class="cb-hcard-icon">🌧️</span><span class="cb-hcard-label">Mokrý program</span>
      </button>
      <button class="cb-hcard cb-hcard--wide" data-nav="animator-select">
        <span class="cb-hcard-icon">⭐</span><span class="cb-hcard-label">Som animátor</span>
      </button>
    </div>`;
  }

  function renderProgramDay() {
    const rows = days.map(d => {
      const isToday = d.date === TODAY_DATE;
      const color = DAY_COLORS[d.id] || '#888';
      return `<button class="cb-day-btn${isToday ? ' cb-day-btn--today' : ''}"
          data-nav="program-tod" data-day-id="${escAttr(d.id)}">
        <span class="cb-day-dot" style="background:${color}"></span>
        <div class="cb-day-info">
          <span class="cb-day-name">${isToday ? 'Dnes — ' : ''}${escAttr(d.label)}</span>
          <span class="cb-day-date">${escAttr(d.date)}</span>
        </div>
        ${isToday ? '<span class="cb-day-badge">dnes</span>' : ''}
      </button>`;
    }).join('');
    return `<div class="cb-screen-head">
      <p class="cb-screen-eyebrow">Program</p>
      <h3 class="cb-screen-h">Vyber deň</h3>
    </div>
    <div class="cb-day-list">${rows}</div>`;
  }

  function renderProgramTOD() {
    const dayId = guideState.ctx.dayId;
    const day = days.find(d => d.id === dayId);
    const color = DAY_COLORS[dayId] || '#888';
    const btns = TOD_OPTIONS_GUIDE.map(t =>
      `<button class="cb-tod-btn${t.wide ? ' cb-tod-btn--wide' : ''}"
          data-nav="program-result" data-tod="${escAttr(t.id)}" data-tod-label="${escAttr(t.label)}">
        <span class="cb-tod-icon">${t.icon}</span>
        <span class="cb-tod-label">${escAttr(t.label)}</span>
      </button>`
    ).join('');
    return `<div class="cb-screen-head">
      <p class="cb-screen-eyebrow" style="color:${color}">📅 ${escAttr(day ? day.label : dayId)}</p>
      <h3 class="cb-screen-h">Aká časť dňa?</h3>
    </div>
    <div class="cb-tod-grid">${btns}</div>`;
  }

  function renderProgramResult() {
    const ctx = guideState.ctx;
    const day = days.find(d => d.id === ctx.dayId);
    if (!day) return '<div class="cb-empty">Deň nenájdený.</div>';
    const color = DAY_COLORS[ctx.dayId] || '#888';

    let items = day.schedule || [];
    if (ctx.tod && ctx.tod !== 'all' && TOD_TIME_RANGES[ctx.tod]) {
      const r = TOD_TIME_RANGES[ctx.tod];
      const filtered = items.filter(s => s.time >= r.from && s.time <= r.to);
      if (filtered.length) items = filtered;
    }

    const typeColors = { system: 'var(--cb-muted)', jedlo: '#8aaf7a', activity: 'var(--cb-gold)', scenka: '#c87c40' };

    // Determine current/next schedule item for today
    const isToday = day.date === TODAY_DATE;
    const now = getNowTime();
    let nowIdx = -1, nextIdx = -1;
    if (isToday) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].time <= now) nowIdx = i;
      }
      if (nowIdx < items.length - 1) nextIdx = nowIdx + 1;
      else if (nowIdx === -1 && items.length) nextIdx = 0;
    }

    const rows = items.map((s, i) => {
      const isAct = (s.type === 'activity' || s.type === 'scenka') && s.activityRef;
      const isCurrent = isToday && i === nowIdx;
      const isNext    = isToday && i === nextIdx && nowIdx !== nextIdx;
      const badge = isCurrent ? timeBadge('now') : isNext ? timeBadge('next') : '';
      const nowClass = isCurrent ? ' cb-sitem--now' : isNext ? ' cb-sitem--next' : '';
      return `<div class="cb-sitem${isAct ? ' cb-sitem--act' : ''}${nowClass}"
          ${isAct ? `data-nav="activity-detail" data-act-id="${escAttr(s.activityRef)}"` : ''}>
        <span class="cb-stime">${escAttr(s.time)}</span>
        <span class="cb-sdot" style="background:${typeColors[s.type] || '#888'}"></span>
        <span class="cb-slabel">${escAttr(s.label)}${s.note ? ` <em>(${escAttr(s.note)})</em>` : ''}${badge}</span>
        ${isAct ? '<span class="cb-sarr">›</span>' : ''}
      </div>`;
    }).join('');

    return `<div class="cb-sched-header">
      <p class="cb-screen-eyebrow" style="color:${color}">
        📅 ${escAttr(day.label)} · ${escAttr(ctx.todLabel || 'celý deň')}
      </p>
      ${day.vedúciDna ? `<p class="cb-sched-veduci">👑 Vedúci dňa: <strong>${escAttr(day.vedúciDna)}</strong></p>` : ''}
    </div>
    <div class="cb-sched-list">${rows}</div>`;
  }

  function renderLudia() {
    return `<div class="cb-screen-head">
      <p class="cb-screen-eyebrow">Ľudia</p>
      <h3 class="cb-screen-h">Čo chceš vedieť?</h3>
    </div>
    <div class="cb-submenu">
      <button class="cb-smenu-btn" data-nav="activity-list" data-list-mode="leader">
        <span class="cb-smenu-icon">👑</span>
        <div class="cb-smenu-text">
          <span class="cb-smenu-label">Kto vedie aktivitu</span>
          <span class="cb-smenu-desc">Vyber aktivitu → vedúci a ich roly</span>
        </div><span class="cb-smenu-arr">›</span>
      </button>
      <button class="cb-smenu-btn" data-nav="activity-list" data-list-mode="animatori">
        <span class="cb-smenu-icon">👥</span>
        <div class="cb-smenu-text">
          <span class="cb-smenu-label">Kto je pri aktivite</span>
          <span class="cb-smenu-desc">Vyber aktivitu → zoznam animátorov</span>
        </div><span class="cb-smenu-arr">›</span>
      </button>
      <button class="cb-smenu-btn" data-nav="animator-select" data-anim-mode="info">
        <span class="cb-smenu-icon">👤</span>
        <div class="cb-smenu-text">
          <span class="cb-smenu-label">Info o animátorovi</span>
          <span class="cb-smenu-desc">Vyber meno → jeho aktivity a roly</span>
        </div><span class="cb-smenu-arr">›</span>
      </button>
      <button class="cb-smenu-btn" data-nav="veduci-dna">
        <span class="cb-smenu-icon">🗓️</span>
        <div class="cb-smenu-text">
          <span class="cb-smenu-label">Vedúci dňa</span>
          <span class="cb-smenu-desc">Kto má zodpovednosť za každý deň</span>
        </div><span class="cb-smenu-arr">›</span>
      </button>
    </div>`;
  }

  function renderActivityList() {
    const listMode = guideState.ctx.listMode || '';
    const eyebrowMap = { leader: 'Kto vedie', animatori: 'Animátori', pravidla: 'Pravidlá', pomucky: 'Pomôcky' };
    const eyebrow = eyebrowMap[listMode] || 'Aktivity';

    // Context-dependent: clicking leads to focused section, not full detail
    const sectionMap = { leader: 'leader', animatori: 'animatori', pomucky: 'pomucky' };
    const targetSection = sectionMap[listMode] || '';
    const targetNav = targetSection ? 'act-section' : 'activity-detail';

    const badges = getTimeBadges(activities);
    const rows = activities.map(a => {
      const day = days.find(d => d.id === a.dayRef);
      const color = DAY_COLORS[a.dayRef] || '#888';
      let subMeta = `${day ? day.label : ''} · ${a.time || ''}`;
      if (listMode === 'leader') {
        const v = a.vedúciProgramu || a.vedúciDna || '';
        if (v) subMeta = `👑 ${v}`;
      } else if (listMode === 'animatori') {
        const cnt = Array.isArray(a.animators) ? a.animators.length : 0;
        if (cnt) subMeta += ` · ${cnt} animátorov`;
      } else if (listMode === 'pomucky') {
        const cnt = Array.isArray(a.materials) ? a.materials.length : 0;
        if (cnt) subMeta += ` · ${cnt} pomôcok`;
      }
      const badge = timeBadge(badges[a.id]);
      const nowClass = badges[a.id] === 'now' ? ' cb-aitem--now' : badges[a.id] === 'next' ? ' cb-aitem--next' : '';
      const sectionAttr = targetSection ? `data-section="${escAttr(targetSection)}"` : '';
      return `<button class="cb-aitem${nowClass}" data-nav="${targetNav}" ${sectionAttr} data-act-id="${escAttr(a.id)}">
        <span class="cb-aitem-dot" style="background:${color}"></span>
        <div class="cb-aitem-body">
          <span class="cb-aitem-name">${escAttr(a.name)}${badge}</span>
          <span class="cb-aitem-meta">${escAttr(subMeta)}</span>
        </div>
        <span class="cb-aitem-arr">›</span>
      </button>`;
    }).join('');
    return `<div class="cb-screen-head">
      <p class="cb-screen-eyebrow">${escAttr(eyebrow)}</p>
      <h3 class="cb-screen-h">Vyber aktivitu</h3>
    </div>
    <div class="cb-act-search">
      <input class="cb-act-search-input" type="text" id="cbActSearch"
        placeholder="🔍  Hľadaj aktivitu…" autocomplete="off">
    </div>
    <div class="cb-act-list" id="cbActList">${rows}</div>`;
  }

  function renderActivityDetail() {
    const actId = guideState.ctx.actId;
    const act = activities.find(a => a.id === actId);
    if (!act) return '<div class="cb-empty">Aktivita nenájdená.</div>';

    const day = days.find(d => d.id === act.dayRef);
    const color = DAY_COLORS[act.dayRef] || '#888';
    const fmtT = act.endTime ? `${act.time}–${act.endTime}` : (act.time || '');
    const animArr = Array.isArray(act.animators) ? act.animators : [];
    const matsArr = Array.isArray(act.materials) ? act.materials : [];

    const animatorsHtml = animArr.length ? `
      <div class="cb-card-section">
        <div class="cb-card-sec-title">Animátori (${animArr.length})</div>
        <div class="cb-card-items">
          ${animArr.slice(0, 8).map(a =>
            `<div class="cb-card-item">${escAttr(a.name)}${a.role ? ` <em>— ${escAttr(a.role)}</em>` : ''}</div>`
          ).join('')}
          ${animArr.length > 8 ? `<div class="cb-card-item cb-card-item--more">+${animArr.length - 8} ďalší</div>` : ''}
          ${act.animatorsNote ? `<div class="cb-card-note">${escAttr(act.animatorsNote)}</div>` : ''}
        </div>
      </div>` : '';

    const materialsHtml = matsArr.length ? `
      <div class="cb-card-section">
        <div class="cb-card-sec-title">Pomôcky (${matsArr.length})</div>
        <div class="cb-card-items">
          ${matsArr.map(m => `<div class="cb-card-item">${escAttr(m)}</div>`).join('')}
        </div>
      </div>` : '';

    const hasRain = act.hasMtzNote || (act.description && /##\s*Mokr/i.test(act.description));
    const hasRules = act.hasScoring || (act.description && /##\s*Pravidl/i.test(act.description));

    const ctaRow = [
      animArr.length ? `<button class="cb-cta" data-nav="act-section" data-section="animatori" data-act-id="${escAttr(actId)}">👥 Animátori</button>` : '',
      matsArr.length ? `<button class="cb-cta" data-nav="act-section" data-section="pomucky" data-act-id="${escAttr(actId)}">🧰 Pomôcky</button>` : '',
      hasRules ? `<button class="cb-cta" data-nav="act-section" data-section="pravidla" data-act-id="${escAttr(actId)}">📖 Pravidlá</button>` : '',
      hasRain  ? `<button class="cb-cta" data-nav="act-section" data-section="mokry" data-act-id="${escAttr(actId)}">🌧️ Mokrý</button>` : '',
    ].filter(Boolean).join('');

    return `<div class="cb-act-hero">
      <h3 class="cb-act-name">${escAttr(act.name)}</h3>
      <div class="cb-act-meta">
        <div class="cb-act-meta-row">
          <span class="cb-act-meta-icon">📅</span>
          <span style="color:${color}">${escAttr(day ? day.label : '')}</span>
          <strong style="margin-left:4px">${escAttr(fmtT)}</strong>
        </div>
        <div class="cb-act-meta-row">
          <span class="cb-act-meta-icon">⏰</span><span>${escAttr(act.timeLabel || '')}</span>
        </div>
        ${act.location ? `<div class="cb-act-meta-row">
          <span class="cb-act-meta-icon">📍</span><span>${escAttr(act.location)}</span>
        </div>` : ''}
        ${act.vedúciProgramu ? `<div class="cb-act-meta-row">
          <span class="cb-act-meta-icon">👑</span>
          <span>Vedúci: </span><strong>${escAttr(act.vedúciProgramu)}</strong>
        </div>` : act.vedúciDna ? `<div class="cb-act-meta-row">
          <span class="cb-act-meta-icon">👑</span>
          <span>Vedúci dňa: </span><strong>${escAttr(act.vedúciDna)}</strong>
        </div>` : ''}
      </div>
    </div>
    ${act.detail ? `<div class="cb-card-section">
      <div class="cb-card-sec-title">Stručne</div>
      <div class="cb-card-detail-text">${escAttr(act.detail)}</div>
    </div>` : ''}
    ${animatorsHtml}
    ${materialsHtml}
    <div class="cb-cta-wrap">
      ${ctaRow ? `<div class="cb-cta-row">${ctaRow}</div>` : ''}
      <div class="cb-cta-row cb-cta-row--primary">
        <button class="cb-cta cb-cta--primary" data-act="${escAttr(actId)}">📍 Otvoriť v brožúrke →</button>
      </div>
    </div>`;
  }

  function renderAnimatorSelect() {
    const seen = new Set();
    const names = [];
    animators.forEach(a => { if (a.name && !seen.has(a.name)) { seen.add(a.name); names.push(a.name); } });
    activities.forEach(act => {
      (act.animators || []).forEach(a => {
        if (a.name && !seen.has(a.name)) { seen.add(a.name); names.push(a.name); }
      });
      [act.vedúciProgramu, act.vedúciDna].forEach(v => {
        if (v) v.split(/,\s*|\/\s*/).forEach(n => {
          const t = n.trim();
          if (t && !seen.has(t)) { seen.add(t); names.push(t); }
        });
      });
    });
    // animMode="info" (from Ľudia) → skip submenu, go straight to full activity list
    const isInfo = guideState.ctx.animMode === 'info';
    const targetNav = isInfo ? 'animator-result' : 'animator-menu';
    const whatAttr  = isInfo ? 'data-what="all"' : '';
    const rows = names.map(n =>
      `<button class="cb-anim-btn" data-nav="${targetNav}" ${whatAttr} data-anim-name="${escAttr(n)}">${escAttr(n)}</button>`
    ).join('');
    const eyebrow = isInfo ? 'Info o animátorovi' : 'Som animátor';
    const heading  = isInfo ? 'Vyber animátora' : 'Vyber svoje meno';
    return `<div class="cb-screen-head">
      <p class="cb-screen-eyebrow">${eyebrow}</p>
      <h3 class="cb-screen-h">${heading}</h3>
    </div>
    <div class="cb-anim-search">
      <input class="cb-anim-search-input" type="text" id="cbAnimSearch"
        placeholder="🔍  Hľadaj meno…" autocomplete="off">
    </div>
    <div class="cb-anim-grid" id="cbAnimGrid">${rows}</div>`;
  }

  function renderAnimatorMenu() {
    const name = guideState.ctx.animName || '';
    const anim = animators.find(a => a.name === name);
    const catMap = { core: 'Core tím', 'sdb-fma': 'SDB / FMA', skupinky: 'Skupinkár', mtz: 'MTZ', zdravotnik: 'Zdravotník' };
    const cat = anim ? (catMap[anim.category] || anim.category) : 'Animátor';
    const initials = name.split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
    return `<div class="cb-anim-hero">
      <div class="cb-anim-avatar">${escAttr(initials)}</div>
      <div>
        <div class="cb-anim-name">${escAttr(name)}</div>
        <div class="cb-anim-cat">${escAttr(cat)}</div>
      </div>
    </div>
    <div class="cb-screen-head" style="padding-top:14px">
      <p class="cb-screen-eyebrow">Čo chceš vedieť?</p>
    </div>
    <div class="cb-submenu">
      <button class="cb-smenu-btn" data-nav="animator-result" data-what="today">
        <span class="cb-smenu-icon">📅</span>
        <div class="cb-smenu-text">
          <span class="cb-smenu-label">Čo dnes robím</span>
          <span class="cb-smenu-desc">Moje aktivity a zodpovednosti dnes</span>
        </div><span class="cb-smenu-arr">›</span>
      </button>
      <button class="cb-smenu-btn" data-nav="animator-result" data-what="all">
        <span class="cb-smenu-icon">🎮</span>
        <div class="cb-smenu-text">
          <span class="cb-smenu-label">Moje aktivity</span>
          <span class="cb-smenu-desc">Všetky aktivity počas celého tábora</span>
        </div><span class="cb-smenu-arr">›</span>
      </button>
      <button class="cb-smenu-btn" data-nav="animator-result" data-what="collab">
        <span class="cb-smenu-icon">👥</span>
        <div class="cb-smenu-text">
          <span class="cb-smenu-label">Kto je so mnou</span>
          <span class="cb-smenu-desc">Spolupracovníci pri mojich aktivitách</span>
        </div><span class="cb-smenu-arr">›</span>
      </button>
      <button class="cb-smenu-btn" data-nav="animator-result" data-what="materials">
        <span class="cb-smenu-icon">🧰</span>
        <div class="cb-smenu-text">
          <span class="cb-smenu-label">Moje pomôcky</span>
          <span class="cb-smenu-desc">Čo si musím pripraviť</span>
        </div><span class="cb-smenu-arr">›</span>
      </button>
    </div>`;
  }

  function renderAnimatorResult() {
    const ctx = guideState.ctx;
    const animName = ctx.animName || '';
    const what = ctx.what || 'today';
    const nAnimName = norm(animName);
    const nameParts = nAnimName.split(/\s+/).filter(p => p.length >= 3);

    const myDocs = docs.filter(d => {
      const inVeduci    = d.vedúciProgramu && nameParts.some(p => norm(d.vedúciProgramu).includes(p));
      const inAnimators = d.animatorsRaw.some(a => nameParts.some(p => norm(a.name).includes(p)));
      const inVeduciDna = d.vedúciDna && nameParts.some(p => norm(d.vedúciDna).includes(p));
      return inVeduci || inAnimators || inVeduciDna;
    });

    const todayDay = days.find(d => d.date === TODAY_DATE);
    const displayDocs = what === 'today' ? myDocs.filter(d => d.date === TODAY_DATE) : myDocs;

    const titleMap = {
      today: 'Čo dnes robím' + (todayDay ? ` (${todayDay.label})` : ''),
      all:       'Moje aktivity',
      collab:    'Kto je so mnou',
      materials: 'Moje pomôcky',
    };

    const header = `<div class="cb-anim-result-header">
      <p class="cb-screen-eyebrow">${escAttr(animName)}</p>
      <h3 class="cb-screen-h">${escAttr(titleMap[what] || '')}</h3>
    </div>`;

    if (!displayDocs.length) {
      const emptyMsg = what === 'today'
        ? 'Dnes nie si priamo priradený k žiadnej aktivite v brožúrke.'
        : 'Nenašli sa žiadne aktivity.';
      return `${header}<div class="cb-empty">${emptyMsg}</div>`;
    }

    if (what === 'collab') {
      const cards = displayDocs.map(d => {
        const color = DAY_COLORS[d.dayRef] || '#888';
        const coVeduci = d.vedúciProgramu
          ? d.vedúciProgramu.split(/,\s*|\/\s*/).filter(n => !nameParts.some(p => norm(n).includes(p)))
          : [];
        const coAnimators = d.animatorsRaw.filter(a => !nameParts.some(p => norm(a.name).includes(p)));
        return `<div class="cb-anim-role-card" data-nav="activity-detail" data-act-id="${escAttr(d.id)}">
          <div class="cb-arc-name">${escAttr(d.name)}</div>
          <div class="cb-arc-meta">
            <span style="color:${color}">${escAttr(d.day)}</span>
            <span>⏰ ${escAttr(d.time)}</span>
          </div>
          ${coVeduci.map(n => `<div class="cb-arc-collab cb-arc-collab--leader">👑 ${escAttr(n)}</div>`).join('')}
          ${coAnimators.slice(0, 5).map(a => `<div class="cb-arc-collab">👤 ${escAttr(a.name)}</div>`).join('')}
          ${coAnimators.length > 5 ? `<div class="cb-arc-collab cb-arc-collab--more">+${coAnimators.length - 5} ďalší</div>` : ''}
        </div>`;
      }).join('');
      return `${header}<div class="cb-anim-list">${cards}</div>`;
    }

    if (what === 'materials') {
      const filtered = displayDocs.filter(d => d.materialsArr && d.materialsArr.length);
      if (!filtered.length) return `${header}<div class="cb-empty">Pre tvoje aktivity nie sú špeciálne pomôcky uvedené.</div>`;
      const cards = filtered.map(d => {
        const color = DAY_COLORS[d.dayRef] || '#888';
        return `<div class="cb-anim-role-card" data-nav="activity-detail" data-act-id="${escAttr(d.id)}">
          <div class="cb-arc-name">${escAttr(d.name)}</div>
          <div class="cb-arc-meta"><span style="color:${color}">${escAttr(d.day)}</span></div>
          ${d.materialsArr.map(m => `<div class="cb-card-item">${escAttr(m)}</div>`).join('')}
        </div>`;
      }).join('');
      return `${header}<div class="cb-anim-list">${cards}</div>`;
    }

    // today + all: show activities with role
    const dispActs = displayDocs.map(d => activities.find(a => a.id === d.id)).filter(Boolean);
    const animBadges = getTimeBadges(dispActs);
    const cards = displayDocs.map(d => {
      const color = DAY_COLORS[d.dayRef] || '#888';
      const isLeader = d.vedúciProgramu && nameParts.some(p => norm(d.vedúciProgramu).includes(p));
      const myEntry = d.animatorsRaw.find(a => nameParts.some(p => norm(a.name).includes(p)));
      const role = isLeader ? 'Vedúci programu' : (myEntry && myEntry.role ? myEntry.role : 'Animátor');
      const badge = timeBadge(animBadges[d.id]);
      const nowClass = animBadges[d.id] === 'now' ? ' cb-arc--now' : animBadges[d.id] === 'next' ? ' cb-arc--next' : '';
      return `<div class="cb-anim-role-card${nowClass}" data-nav="activity-detail" data-act-id="${escAttr(d.id)}">
        <div class="cb-arc-name">${escAttr(d.name)}${badge}</div>
        <div class="cb-arc-meta">
          <span style="color:${color}">${escAttr(d.day)}</span>
          <span>⏰ ${escAttr(d.time)}</span>
          ${d.location ? `<span>📍 ${escAttr(d.location)}</span>` : ''}
        </div>
        <span class="cb-arc-role">${escAttr(role)}</span>
      </div>`;
    }).join('');
    return `${header}<div class="cb-anim-list">${cards}</div>`;
  }

  function renderMokry() {
    const rainy = activities.filter(a =>
      (a.hasMtzNote && a.mtzNote && /mokr/i.test(a.mtzNote)) ||
      (a.description && /##\s*Mokr/i.test(a.description))
    );
    if (!rainy.length) {
      return `<div class="cb-screen-head">
        <p class="cb-screen-eyebrow">Mokrý program</p>
        <h3 class="cb-screen-h">Keď prší</h3>
      </div>
      <div class="cb-empty">Mokrý program nebol nájdený v brožúrke.</div>`;
    }
    const rows = rainy.map(a => {
      const day = days.find(d => d.id === a.dayRef);
      const color = DAY_COLORS[a.dayRef] || '#888';
      let note = '';
      if (a.mtzNote) {
        const lines = a.mtzNote.split('\n');
        let cap = false;
        const parts = [];
        for (const line of lines) {
          if (/mokr/i.test(line)) {
            cap = true;
            const c = line.replace(/^Mokr[ý]?\s*[Pp]rogram[:\s]*/i, '').trim();
            if (c) parts.push(c);
          } else if (cap) {
            if (line.trim()) parts.push(line.trim()); else break;
          }
        }
        note = parts.join(' ').slice(0, 180);
      }
      if (!note && a.description) {
        const m = a.description.match(/##\s*Mokr[ý]?\s*[Pp]rogram\s*\n([\s\S]*?)(?=\n##|$)/i);
        if (m) note = m[1].trim().slice(0, 180);
      }
      return `<button class="cb-aitem" data-nav="act-section" data-section="mokry" data-act-id="${escAttr(a.id)}">
        <span class="cb-aitem-dot" style="background:${color}"></span>
        <div class="cb-aitem-body">
          <span class="cb-aitem-name">${escAttr(a.name)}</span>
          <span class="cb-aitem-meta">${escAttr(day ? day.label : '')} · ${escAttr(a.time || '')}</span>
          ${note ? `<span class="cb-aitem-note">${escAttr(note)}${note.length >= 180 ? '…' : ''}</span>` : ''}
        </div>
        <span class="cb-aitem-arr">›</span>
      </button>`;
    }).join('');
    return `<div class="cb-screen-head">
      <p class="cb-screen-eyebrow">Mokrý program</p>
      <h3 class="cb-screen-h">Keď prší</h3>
    </div>
    <div class="cb-act-list">${rows}</div>`;
  }

  function renderPomucky() {
    return `<div class="cb-screen-head">
      <p class="cb-screen-eyebrow">Pomôcky</p>
      <h3 class="cb-screen-h">Pre čo?</h3>
    </div>
    <div class="cb-submenu">
      <button class="cb-smenu-btn" data-nav="activity-list" data-list-mode="pomucky">
        <span class="cb-smenu-icon">🎮</span>
        <div class="cb-smenu-text">
          <span class="cb-smenu-label">Pre aktivitu</span>
          <span class="cb-smenu-desc">Zoznam pomôcok pre konkrétnu aktivitu</span>
        </div><span class="cb-smenu-arr">›</span>
      </button>
      <button class="cb-smenu-btn" data-nav="pomucky-day">
        <span class="cb-smenu-icon">📅</span>
        <div class="cb-smenu-text">
          <span class="cb-smenu-label">Pre celý deň</span>
          <span class="cb-smenu-desc">Všetky pomôcky zhrnuté podľa dňa</span>
        </div><span class="cb-smenu-arr">›</span>
      </button>
    </div>`;
  }

  function renderPravidla() {
    const withRules = activities.filter(a =>
      a.hasScoring || (a.description && /##\s*Pravidl/i.test(a.description))
    );
    if (!withRules.length) {
      return `<div class="cb-screen-head">
        <p class="cb-screen-eyebrow">Pravidlá</p>
      </div><div class="cb-empty">Žiadne aktivity s pravidlami neboli nájdené.</div>`;
    }
    const rows = withRules.map(a => {
      const day = days.find(d => d.id === a.dayRef);
      const color = DAY_COLORS[a.dayRef] || '#888';
      return `<button class="cb-aitem" data-nav="activity-detail" data-act-id="${escAttr(a.id)}">
        <span class="cb-aitem-dot" style="background:${color}"></span>
        <div class="cb-aitem-body">
          <span class="cb-aitem-name">${escAttr(a.name)}</span>
          <span class="cb-aitem-meta">${escAttr(day ? day.label : '')} · ${escAttr(a.time || '')}${a.hasScoring ? ' · 🏆 Bodovanie' : ''}</span>
        </div>
        <span class="cb-aitem-arr">›</span>
      </button>`;
    }).join('');
    return `<div class="cb-screen-head">
      <p class="cb-screen-eyebrow">Pravidlá</p>
      <h3 class="cb-screen-h">Vyber aktivitu</h3>
    </div>
    <div class="cb-act-list">${rows}</div>`;
  }

  // ── VEDÚCI DŇA ───────────────────────────────────────────────────────────────

  function renderVeduciDna() {
    const rows = days.map(d => {
      const color = DAY_COLORS[d.id] || '#888';
      const veduci = d.vedúciDna || '—';
      return `<div class="cb-sitem">
        <div class="cb-sdot" style="background:${color}"></div>
        <div class="cb-slabel">
          <strong style="color:${color}">${escAttr(d.label)}</strong>
          <em style="display:block;font-style:normal;font-size:12px;margin-top:1px">👑 ${escAttr(veduci)}</em>
        </div>
      </div>`;
    }).join('');
    return `<div class="cb-screen-head">
      <p class="cb-screen-eyebrow">Vedúci dňa</p>
      <h3 class="cb-screen-h">Zodpovednosť za deň</h3>
    </div>
    <div class="cb-sched-list">${rows}</div>`;
  }

  // ── POMÔCKY PRE DEŇ ──────────────────────────────────────────────────────────

  function renderPomuckyDay() {
    const dayId = guideState.ctx.dayId;
    if (!dayId) {
      // Day not yet selected — show day picker
      const rows = days.map(d => {
        const color = DAY_COLORS[d.id] || '#888';
        const actWithMats = activities.filter(a => a.dayRef === d.id && Array.isArray(a.materials) && a.materials.length);
        return `<button class="cb-day-btn" data-nav="pomucky-day" data-day-id="${escAttr(d.id)}">
          <span class="cb-day-dot" style="background:${color}"></span>
          <div class="cb-day-info">
            <span class="cb-day-name">${escAttr(d.label)}</span>
            <span class="cb-day-date">${actWithMats.length} aktivít s pomôckami</span>
          </div>
          <span class="cb-sarr">›</span>
        </button>`;
      }).join('');
      return `<div class="cb-screen-head">
        <p class="cb-screen-eyebrow">Pomôcky</p>
        <h3 class="cb-screen-h">Vyber deň</h3>
      </div>
      <div class="cb-day-list">${rows}</div>`;
    }

    // Day selected — show all materials for that day grouped by activity
    const day = days.find(d => d.id === dayId);
    const color = DAY_COLORS[dayId] || '#888';
    const dayActs = activities.filter(a => a.dayRef === dayId && Array.isArray(a.materials) && a.materials.length);
    if (!dayActs.length) {
      return `<div class="cb-screen-head">
        <p class="cb-screen-eyebrow" style="color:${color}">${escAttr(day ? day.label : '')}</p>
        <h3 class="cb-screen-h">Pomôcky</h3>
      </div><div class="cb-empty">Žiadne pomôcky v brožúrke pre tento deň.</div>`;
    }
    const sections = dayActs.map(a => {
      const matRows = a.materials.map(m =>
        `<div class="cb-sitem">
          <div class="cb-sdot" style="background:${color};opacity:.5"></div>
          <div class="cb-slabel">${escAttr(m)}</div>
        </div>`
      ).join('');
      return `<div class="cb-card-section">
        <div class="cb-card-sec-title">${escAttr(a.name)} · ${escAttr(a.time || '')}</div>
        <div class="cb-sched-list" style="margin:0 -14px">${matRows}</div>
      </div>`;
    }).join('');
    return `<div class="cb-screen-head">
      <p class="cb-screen-eyebrow" style="color:${color}">🧰 ${escAttr(day ? day.label : '')}</p>
      <h3 class="cb-screen-h">Pomôcky na celý deň</h3>
    </div>
    ${sections}`;
  }

  // ── ACT SECTION (context-specific sub-screens) ───────────────────────────────

  function renderActSection() {
    const actId   = guideState.ctx.actId;
    const section = guideState.ctx.section;
    const act     = activities.find(a => a.id === actId);
    if (!act) return '<div class="cb-empty">Aktivita nenájdená.</div>';

    const color = DAY_COLORS[act.dayRef] || '#888';

    const heroHtml = `<div class="cb-act-hero" style="padding-bottom:10px">
      <h3 class="cb-act-name" style="font-size:14px;margin-bottom:0">${escAttr(act.name)}</h3>
    </div>`;

    const detailCta = `<div class="cb-cta-wrap">
      <div class="cb-cta-row cb-cta-row--primary">
        <button class="cb-cta cb-cta--primary" data-nav="activity-detail" data-act-id="${escAttr(actId)}">📋 Celá aktivita →</button>
      </div>
    </div>`;

    function wrap(inner) { return heroHtml + inner + detailCta; }

    if (section === 'leader') {
      const animArr = Array.isArray(act.animators) ? act.animators : [];
      const veduci = (act.vedúciProgramu || act.vedúciDna || '').split(/,\s*|\/\s*/).map(s => s.trim()).filter(Boolean);
      const others = animArr.filter(a => !veduci.some(v => norm(v).includes(norm(a.name.split(' ')[0]))));
      const veduciRows = veduci.map(v => `
        <div class="cb-sitem">
          <div class="cb-sdot" style="background:${color}"></div>
          <div class="cb-slabel"><strong>${escAttr(v)}</strong> <em>— vedúci</em></div>
        </div>`).join('');
      const otherRows = others.map(a => `
        <div class="cb-sitem">
          <div class="cb-sdot" style="background:${color};opacity:.45"></div>
          <div class="cb-slabel">${escAttr(a.name)}${a.role ? ` <em>— ${escAttr(a.role)}</em>` : ''}</div>
        </div>`).join('');
      return wrap(`
        <div class="cb-screen-head" style="padding-top:8px;padding-bottom:6px">
          <p class="cb-screen-eyebrow">Vedúci a tím</p>
        </div>
        <div class="cb-sched-list">${veduciRows}${otherRows || ''}</div>`);
    }

    if (section === 'animatori') {
      const animArr = Array.isArray(act.animators) ? act.animators : [];
      if (!animArr.length) return wrap('<div class="cb-empty">Žiadni animátori.</div>');
      const rows = animArr.map(a => `
        <div class="cb-sitem">
          <div class="cb-sdot" style="background:${color}"></div>
          <div class="cb-slabel">${escAttr(a.name)}${a.role ? ` <em>— ${escAttr(a.role)}</em>` : ''}</div>
        </div>`).join('');
      return wrap(`
        <div class="cb-screen-head" style="padding-top:8px;padding-bottom:6px">
          <p class="cb-screen-eyebrow">Animátori · ${animArr.length}</p>
        </div>
        <div class="cb-sched-list">${rows}</div>
        ${act.animatorsNote ? `<div class="cb-card-section"><div class="cb-card-note">${escAttr(act.animatorsNote)}</div></div>` : ''}`);
    }

    if (section === 'pomucky') {
      const matsArr = Array.isArray(act.materials) ? act.materials : [];
      if (!matsArr.length) return wrap('<div class="cb-empty">Žiadne pomôcky.</div>');
      const rows = matsArr.map(m => `
        <div class="cb-sitem">
          <div class="cb-sdot" style="background:${color}"></div>
          <div class="cb-slabel">${escAttr(m)}</div>
        </div>`).join('');
      return wrap(`
        <div class="cb-screen-head" style="padding-top:8px;padding-bottom:6px">
          <p class="cb-screen-eyebrow">Pomôcky · ${matsArr.length} položiek</p>
        </div>
        <div class="cb-sched-list">${rows}</div>`);
    }

    if (section === 'mokry') {
      let text = '';
      if (act.mtzNote) {
        const lines = act.mtzNote.split('\n');
        let cap = false; const parts = [];
        for (const line of lines) {
          if (/mokr/i.test(line)) {
            cap = true;
            const c = line.replace(/^Mokr[ý]?\s*[Pp]rogram[:\s]*/i, '').trim();
            if (c) parts.push(c);
          } else if (cap) {
            if (line.trim()) parts.push(line.trim()); else break;
          }
        }
        text = parts.join('\n');
      }
      if (!text && act.description) {
        const m = act.description.match(/##\s*Mokr[ý]?\s*[Pp]rogram\s*\n([\s\S]*?)(?=\n##|$)/i);
        if (m) text = m[1].trim();
      }
      return wrap(`
        <div class="cb-card-section">
          <div class="cb-card-sec-title">🌧️ Mokrý program — čo ak prší?</div>
          <div class="cb-card-detail-text" style="white-space:pre-line">${escAttr(text || 'Informácia nie je v brožúrke.')}</div>
        </div>`);
    }

    if (section === 'pravidla') {
      let text = '';
      if (act.scoring) text = act.scoring;
      if (!text && act.description) {
        const m = act.description.match(/##\s*Pravidl[aá]\s*\n([\s\S]*?)(?=\n##|$)/i);
        if (m) text = m[1].trim();
      }
      return wrap(`
        <div class="cb-card-section">
          <div class="cb-card-sec-title">📖 Pravidlá a bodovanie</div>
          <div class="cb-card-detail-text" style="white-space:pre-line">${escAttr(text || 'Pravidlá nie sú v brožúrke.')}</div>
        </div>`);
    }

    return '<div class="cb-empty">Neznáma sekcia.</div>';
  }

  // ── MASTER RENDER ─────────────────────────────────────────────────────────────

  function renderGuide() {
    const renderers = {
      home:              renderHome,
      'program-day':     renderProgramDay,
      'program-tod':     renderProgramTOD,
      'program-result':  renderProgramResult,
      ludia:             renderLudia,
      'activity-list':   renderActivityList,
      'activity-detail': renderActivityDetail,
      'animator-select': renderAnimatorSelect,
      'animator-menu':   renderAnimatorMenu,
      'animator-result': renderAnimatorResult,
      mokry:             renderMokry,
      pomucky:           renderPomucky,
      'pomucky-day':     renderPomuckyDay,
      'veduci-dna':      renderVeduciDna,
      'act-section':     renderActSection,
      pravidla:          renderPravidla,
    };

    const fn = renderers[guideState.screen] || renderHome;
    content.innerHTML = fn();

    // Move .cb-cta-wrap out of scroll area into a pinned footer
    const prevFooter = panel.querySelector('.cb-panel-footer');
    if (prevFooter) prevFooter.remove();
    const cta = content.querySelector('.cb-cta-wrap');
    if (cta) {
      const footer = document.createElement('div');
      footer.className = 'cb-panel-footer';
      footer.appendChild(cta);
      panel.appendChild(footer);
    }

    const sectionTitleMap = { leader: '👑 Kto vedie', animatori: '👥 Animátori', pomucky: '🧰 Pomôcky', pravidla: '📖 Pravidlá', mokry: '🌧️ Mokrý program' };
    const screenTitle = guideState.screen === 'act-section'
      ? (sectionTitleMap[guideState.ctx.section] || '🎮 Aktivita')
      : (SCREEN_TITLES[guideState.screen] || '🦁 Sprievodca');
    headerTitle.textContent = screenTitle;
    backBtn.hidden  = guideState.stack.length === 0;
    homeBtn.hidden  = guideState.stack.length === 0;

    content.scrollTop = 0;

    // Bind live search inputs after render
    const actSearch = content.querySelector('#cbActSearch');
    if (actSearch) {
      actSearch.addEventListener('input', function() {
        const q = norm(this.value);
        content.querySelectorAll('#cbActList .cb-aitem').forEach(el => {
          const name = norm(el.querySelector('.cb-aitem-name') ? el.querySelector('.cb-aitem-name').textContent : '');
          el.style.display = name.includes(q) ? '' : 'none';
        });
      });
    }

    const animSearch = content.querySelector('#cbAnimSearch');
    if (animSearch) {
      animSearch.addEventListener('input', function() {
        const q = norm(this.value);
        content.querySelectorAll('#cbAnimGrid .cb-anim-btn').forEach(el => {
          el.style.display = norm(el.textContent).includes(q) ? '' : 'none';
        });
      });
    }
  }

  // ── DOM ───────────────────────────────────────────────────────────────────────

  const root = document.createElement('div');
  root.className = 'cb-root';
  root.innerHTML = `
    <div class="cb-panel" id="cb-panel" hidden aria-hidden="true" role="dialog"
        aria-label="Sprievodca programovou brožúrkou">
      <div class="cb-header">
        <button class="cb-back" id="cb-back" hidden aria-label="Späť">‹</button>
        <div class="cb-header-title" id="cb-header-title">🦁 Sprievodca</div>
        <button class="cb-home-btn" id="cb-home-btn" hidden aria-label="Domov" title="Domov">⌂</button>
        <button class="cb-close" id="cb-close" aria-label="Zatvoriť sprievodcu">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="cb-content" id="cb-content"></div>
    </div>
    <button class="cb-toggle" id="cb-toggle" aria-label="Otvoriť sprievodcu brožúrkou" aria-expanded="false">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor" opacity=".9"/>
        <path d="M7 9h10M7 13h7" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  `;

  document.body.appendChild(root);

  const panel       = root.querySelector('#cb-panel');
  const toggle      = root.querySelector('#cb-toggle');
  const closeBtn    = root.querySelector('#cb-close');
  const backBtn     = root.querySelector('#cb-back');
  const homeBtn     = root.querySelector('#cb-home-btn');
  const headerTitle = root.querySelector('#cb-header-title');
  const content     = root.querySelector('#cb-content');

  let isOpen = false;

  function openPanel() {
    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    isOpen = true;
    renderGuide();
  }

  function closePanel() {
    panel.hidden = true;
    panel.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    isOpen = false;
  }

  // ── EVENTS ────────────────────────────────────────────────────────────────────

  toggle.addEventListener('click', function() { isOpen ? closePanel() : openPanel(); });
  closeBtn.addEventListener('click', closePanel);
  backBtn.addEventListener('click', navBack);
  homeBtn.addEventListener('click', navHome);

  panel.addEventListener('click', function(e) {
    // "Otvoriť v brožúrke" — primary CTA (has data-act but no data-nav)
    const actLink = e.target.closest('[data-act]');
    if (actLink && !actLink.dataset.nav) {
      if (onNavigate) {
        closePanel();
        onNavigate('aktivity', actLink.dataset.act);
      }
      return;
    }

    const btn = e.target.closest('[data-nav]');
    if (!btn) return;

    const ctx = {};
    if (btn.dataset.dayId)    ctx.dayId    = btn.dataset.dayId;
    if (btn.dataset.tod)      ctx.tod      = btn.dataset.tod;
    if (btn.dataset.todLabel) ctx.todLabel = btn.dataset.todLabel;
    if (btn.dataset.actId)    ctx.actId    = btn.dataset.actId;
    if (btn.dataset.animName) ctx.animName = btn.dataset.animName;
    if (btn.dataset.what)     ctx.what     = btn.dataset.what;
    if (btn.dataset.listMode) ctx.listMode = btn.dataset.listMode;
    if (btn.dataset.section)  ctx.section  = btn.dataset.section;
    if (btn.dataset.animMode) ctx.animMode = btn.dataset.animMode;

    navTo(btn.dataset.nav, ctx);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

  document.addEventListener('click', function(e) {
    if (isOpen && document.body.contains(e.target) && !root.contains(e.target)) closePanel();
  });

  // Initial render on first open
  renderGuide();
}
