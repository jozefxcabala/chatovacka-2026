import { defineConfig } from 'vite';
import { VitePWA }    from 'vite-plugin-pwa';

export default defineConfig({
  base: '/chatovacka-2026/',

  plugins: [
    VitePWA({
      registerType:   'autoUpdate',
      injectRegister: 'auto',
      includeAssets:  ['icon.svg'],

      manifest: {
        name:             'Narnia 2026 – Animátori',
        short_name:       'Narnia 2026',
        description:      'Program tábora Narnia 2026 pre animátorov',
        start_url:        '/chatovacka-2026/',
        scope:            '/chatovacka-2026/',
        display:          'standalone',
        background_color: '#f2f2f2',
        theme_color:      '#c8952a',
        icons: [
          {
            src:     'icon.svg',
            sizes:   'any',
            type:    'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,ico,png,woff,woff2}'],
      },
    }),
  ],
});
