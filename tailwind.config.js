const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#382D8B',
      secondary: '#8E24AA',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
