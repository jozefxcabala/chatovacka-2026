# UI & Layout

## Celkový layout

```
┌─────────────┬──────────────────────────────────┐
│   Sidebar   │  Topbar (fixed header)           │
│  (240px)    ├──────────────────────────────────┤
│             │  Content (scrollable)            │
│  collapsed: │                                  │
│  56px       │  <section id="..."> × N         │
└─────────────┴──────────────────────────────────┘
```

- **Sidebar**: collapsible (240px ↔ 56px), na mobile drawer (slide-in)
- **Topbar**: fixed, zobrazuje nadpis aktuálnej sekcie + menu button na mobile
- **Content**: jedna stránka, všetky `<section>` elementy, scrollovanie

## CSS súbory

| Súbor | Čo štylizuje |
|-------|-------------|
| `css/base.css` | Design tokens, celkový layout, sekcie, accordion, hero |
| `css/sidebar.css` | Sidebar, topbar, nav items, live clock |
| `css/activities.css` | Activity karty, filter bar, chipsy, empty state |
| `css/detail.css` | Detail view aktivity |
| `css/responsive.css` | Media queries (tablet 900px, mobile 500px) |
| `css/chatbot.css` | Chat widget, bubbles, shortcuts, typing indicator |

## Design tokens (`:root` v base.css)

**Farby**:
- `--color-ground`: #f2f2f2 (light) / #111111 (dark)
- `--color-text`: #1a1a1a (light) / #e8e4dc (dark)
- `--color-gold`: #c8952a (accent)
- `--color-sidebar-bg`: #120f28 (deep purple, both modes)

**Farby dní** (používané aj na kartách):
- pondelok: modrá, utorok: fialová, streda: zelená
- štvrtok: oranžová, piatok: červená, sobota: teal

**Dark mode**: automatický cez `@media (prefers-color-scheme: dark)`, žiadny manuálny toggle.

## Reusable UI vzory

### Accordion
Používaný v: dní, scénky, modlitby, skupinky, prílohy.
- Prvá položka je defaultne otvorená
- Hladké expand/collapse
- Tmavý ľavý border na otvorenom iteme

### Activity karty (grid)
- Farebný pruh podľa dňa
- Badges: deň, čas dňa, typ
- Animátor chipy s farebnými initials
- Expand chip ak animátorov > 3
- Klik → detail view

### Animator chipy
- Deterministická farba podľa mena animátora (20-color paleta)
- Rovnaký animátor = rovnaká farba vždy a všade

### Timeline (v dennom programe)
- Položky s ikonou podľa typu (activity/jedlo/system/scenka)
- Status badge: past/current/next/future
- Link na aktivitu ak má `activityRef`

### Detail view aktivity
- Back button s kontextom (odkiaľ prišiel user)
- Meta grid: čas, miesto, vedúci
- Sekcie: popis, animátori s rolami, pomôcky, bodovanie, MTZ poznámky

### Filter bar (aktivity sekcia)
- Search input (full-text)
- Custom select dropdown: deň
- Custom select dropdown: čas dňa
- Custom select dropdown: typ
- Multi-select s vyhľadávaním: animátori
- Clear button

## Responsive breakpointy

| Breakpoint | Zmeny |
|-----------|-------|
| < 900px | Sidebar sa stáva drawer (slide-in), topbar viditeľný |
| < 500px | Chat panel = fullscreen, karty full-width |

## Print/PDF

- Sekcia `.print-only` skrytá normálne, viditeľná len pri tlači
- `initPrintBrozurka()` dynamicky injectuje obsah pred tlačou
- CSS `@media print` riadi viditeľnosť elementov
