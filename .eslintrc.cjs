module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react-refresh'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'react/prop-types': 'off',
        'react-hooks/exhaustive-deps': [
          'warn',
          {
            additionalHooks: '(useIsomorphicEffect)',
          },
        ],
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: true,
            allowExportNames: ['loader', 'headers', 'NotFound'],
          },
        ],
      },
      settings: {
        react: {
          version: '18',
        },
      },
    },
  ],
};
