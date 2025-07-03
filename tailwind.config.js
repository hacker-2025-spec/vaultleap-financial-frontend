/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables toggling dark mode via a 'dark' class on <html> or <body>
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './views/**/*.{js,ts,jsx,tsx}',
    './main.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
