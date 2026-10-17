/** @type {import('tailwindcss').Config} */
const tono = (nome) => `rgb(var(--${nome}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      colors: {
        carta: tono('carta'),
        foglio: tono('foglio'),
        inchiostro: tono('inchiostro'),
        tenue: tono('tenue'),
        linea: tono('linea'),
        azzurro: tono('azzurro'),
        'azzurro-tinta': tono('azzurro-tinta'),
        oro: tono('oro'),
        verde: tono('verde'),
        ambra: tono('ambra'),
        viola: tono('viola'),
      },
    },
  },
  plugins: [],
}
