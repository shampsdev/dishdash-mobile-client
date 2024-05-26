/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        muted: {
          DEFAULT: '#CBCBCB',
        },
        secondary: {
          DEFAULT: '#F5F5F5',
        },
        primary: {
          DEFAULT: '#000000',
        },
      },
    },
  },
  plugins: [],
};
