/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'space-cadet' : '#2D3142',
        'silver' : '#BFC0C0',
        'white' : '#FFFFFF',
        'orange' : '#EF8354',
        'black-coral' : '#4F5D75'
      }
    },
  },
  plugins: [],
}