/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#8fd14f',
        'accent-dark': '#6fb437',
        bg: '#fbfbf8',
        ink: '#1a1a1a',
        loss: '#d9773f',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
}
