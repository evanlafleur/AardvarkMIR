/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFCF2',
        secondary: '#CCC5B9',
        'accent-dark': '#403D39',
        text: '#252422',
        cta: '#EB5E28',
      },
    },
  },
  plugins: [],
}
