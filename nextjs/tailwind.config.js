module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  purge: {
    content: ['./pages/**/*.tsx', './components/**/*.tsx'],
    // These options are passed through directly to PurgeCSS
  },
  theme: {
    extend: {
      colors: {
        primary: '#9ABDBF',
        secondary: '#6E6EE7',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair-Display', 'serif'],
      },
    },
  },
  plugins: [],
};
