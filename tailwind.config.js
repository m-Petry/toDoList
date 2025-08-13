/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#15202B',
          surface: '#1E2732',
          'text-primary': '#FFFFFF',
          'text-secondary': '#8899A6',
        }
      }
    },
  },
  plugins: [],
}
