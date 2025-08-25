/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'vedic-bg': "url('/src/assets/background.png')",
        'sutra-bg':"url('/src/assets/sutra-bg.jpg')",
        'parchament':"url('/src/assets/parchament.png')",
        'background2':"url('/src/assets/background2.jpg')",
      },
    },
  },
  plugins: [],
}