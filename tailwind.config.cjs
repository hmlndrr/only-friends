/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6e8ff',
          100: '#d2d5ff',
          200: '#aeb0ff',
          300: '#7e7dff',
          400: '#5f4aff',
          500: '#4e21ff',
          600: '#4900ff',
          700: '#4500ff',
          800: '#3a00d8',
          900: '#21056e',
        },
      }
    },
  },
  plugins: [],
}
