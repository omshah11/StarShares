/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    maxHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
     },
     minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
     },
     maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
     },
     minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
     },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['active', 'hover', 'focus'],
      textColor: ['active', 'hover', 'focus'],
    },
  },
}
