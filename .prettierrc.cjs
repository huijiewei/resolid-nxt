module.exports = {
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  tailwindConfig: './website/tailwind.config.cjs',
  plugins: [require('prettier-plugin-tailwindcss'), require('prettier-plugin-organize-imports')],
  pluginSearchDirs: false,
};
