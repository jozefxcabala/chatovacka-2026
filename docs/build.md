# Build & Deployment

## Lokálny vývoj

```bash
npm install
npm run dev      # Vite dev server na http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview build output
```

## Vite konfigurácia (`vite.config.js`)

- **Base path**: `/chatovacka-2026/` (GitHub Pages subdirectory)
- **PWA plugin**: auto-generuje manifest, registruje service worker
- **Workbox**: cache pre JS, CSS, HTML, SVG, PNG, WOFF

## GitHub Actions deploy (`.github/workflows/deploy.yml`)

**Trigger**: push na `main` branch alebo manuálny `workflow_dispatch`

**Kroky**:
1. Checkout kódu
2. Setup Node 20 (s npm cache)
3. `npm ci`
4. `npm run build` → `dist/`
5. Upload `dist/` ako GitHub Pages artifact
6. Deploy na GitHub Pages

**URL**: `https://{username}.github.io/chatovacka-2026/`

## PWA

- **`manifest.json`**: meno, ikony (icon.svg), theme color (#c8952a), background (#f2f2f2), display: standalone
- **`sw.js`**: manuálny service worker (cache-first stratégia pre všetky assets)
- Vite PWA plugin injectuje manifest a registruje SW automaticky pri builde

### Aktualizácia cache po builde

Ak sa zmení SW stratégia, treba inkrementovať verziu cache v `sw.js`:
```js
const CACHE = 'tabor-v3'  // → tabor-v4
```

## Build output (`dist/`)

- Minimalizovaný JS bundle
- Minimalizované CSS
- `index.html` s inject-nutými script/link tagmi
- `sw.js` skopírovaný (nie bundled)
- `manifest.json`
- `icon.svg`

`dist/` je v `.gitignore` — generuje sa vždy fresh pri CI.
