import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.mjoldak.pl',
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    // /admin/ poza sitemapą: panel stoi za Cloudflare Access i nie ma czego indeksować.
    sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/admin') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
