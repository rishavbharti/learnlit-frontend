const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#382D8B',
      secondary: '#8E24AA',
      border: '#e7e9ed',
      formBg: '#f8f9fa',
      tertiaryBg: '#f1f1fc',
      labelText: '#7C7C7D',
      hoverBg: 'rgba(77, 79, 83, 0.4)',
      black: '#000',
      white: '#fff',
    },
    extend: {},
  },
  plugins: [],
};
