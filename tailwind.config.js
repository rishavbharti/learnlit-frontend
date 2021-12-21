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
      labelText: '#7C7C7D',
    },
    extend: {},
  },
  plugins: [],
};
