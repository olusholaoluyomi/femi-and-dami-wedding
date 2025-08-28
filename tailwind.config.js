/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ivory': '#FEFDFB',
        'beige': '#F5F1EB', 
        'gold': '#D4AF37',
        'mocha': '#8B4513',
        'dark-soft': '#4A4A4A'
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
};