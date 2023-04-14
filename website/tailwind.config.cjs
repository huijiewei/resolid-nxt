/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [require('@resolid/nxt-tailwind')()],
  content: [
    './index.html',
    './src/**/*.{js,ts,tsx}',
    './node_modules/@resolid/nxt-ui/dist/**/*.{js,cjs,mjs}',
    './node_modules/@resolid/nxt-ui/src/**/*.{ts,tsx}',
  ],
  theme: {},
  plugins: [],
};
