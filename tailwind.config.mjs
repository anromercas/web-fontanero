/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        petroleo: {
          DEFAULT: '#0F3B5C',
          dark: '#0A2A42',
          light: '#1B5580',
        },
        ambar: {
          DEFAULT: '#E8892B',
          dark: '#C96F1A',
          light: '#F0A55C',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
