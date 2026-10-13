/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand v2.1 — derived from Marcin's coastal/travel photos (sea-dominant)
        background: '#FBFBFA',  // editorial canvas (v3) — ciepła biel, nie piasek
        primary: '#f2f2f1',     // warm mid surface
        accent: '#111111',      // deep sea blue
        dark: '#0a0a0a',        // deep sea navy
        sunset: '#6f6f6f',      // optional secondary — sunset terracotta
      },
      fontFamily: {
        // Brand v3 (12.10.2026) — anty-AI-slop: Newsreader × Geist × Geist Mono (self-hosted)
        sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Geist', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', '"SF Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
    },
  },
  plugins: [],
};
