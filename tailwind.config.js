/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        'bg-2': 'rgb(var(--bg-2) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Anton', 'Impact', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        script: ['"Mrs Saint Delafield"', '"Herr Von Muellerhoff"', 'cursive'],
      },
      letterSpacing: { tightest: '-0.06em', display: '-0.045em' },
      maxWidth: { frame: '1440px' },
    },
  },
  plugins: [],
};
