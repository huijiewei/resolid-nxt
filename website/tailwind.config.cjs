/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [require('@resolid/nxt-ui/tailwind')],
  content: ['./src/**/*.{js,ts,tsx}'],
  theme: {},
  plugins: [require('@tailwindcss/typography')],
};
