/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'word-highlight': {
          '0%, 8%': { color: 'rgb(249, 115, 22)' },  // orange-500
          '9%, 100%': { color: 'rgb(74, 222, 128)' }  // green-400
        }
      }
    }
  },
  plugins: [],
};