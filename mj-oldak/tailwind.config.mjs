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
        primary: '#CAC2AE',     // warm mid surface
        accent: '#4F8EBA',      // deep sea blue
        dark: '#0D1B32',        // deep sea navy
        sunset: '#C87E3B',      // optional secondary — sunset terracotta
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
