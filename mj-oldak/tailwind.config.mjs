/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand v2.1 — derived from Marcin's coastal/travel photos (sea-dominant)
        background: '#E4DBCD',  // warm sand/linen
        primary: '#CAC2AE',     // warm mid surface
        accent: '#4F8EBA',      // deep sea blue
        dark: '#0D1B32',        // deep sea navy
        sunset: '#C87E3B',      // optional secondary — sunset terracotta
      },
      fontFamily: {
        // Brand v2.1 — Manrope (display) + Fraunces (italic em) + Inter (body) + JetBrains Mono (tech)
        sans: ['Inter', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
        serif: ['Fraunces', '"DM Serif Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'ui-monospace', 'monospace'],
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
