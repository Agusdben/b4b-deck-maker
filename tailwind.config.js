/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      borderWidth: {
        1: '1px'
      },
      colors: {
        black: '#000000',
        'black-800': '#151515',
        white: '#f2f2f2',
        gray: '#b3b3b3',
        primary: '#e7001a'
      },
      gridTemplateRows: {
        layout: 'auto minmax(640px, 1fr) auto'
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      transitionProperty: {
        right: 'right'
      }
    }
  },
  plugins: []
}
