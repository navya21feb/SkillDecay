/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode toggle
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Tailwind will scan all files in src/
  ],
  theme: {
    extend: {
      // You can customize colors, fonts, etc. here if needed
    },
  },
  plugins: [],
};
