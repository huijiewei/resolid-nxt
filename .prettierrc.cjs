module.exports = {
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  tailwindConfig: './website/tailwind.config.cjs',
  plugins: [require('prettier-plugin-organize-imports'), require('prettier-plugin-tailwindcss')],
  pluginSearchDirs: false,
};
