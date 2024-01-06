// noinspection JSUnusedGlobalSymbols

import cjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';

export default [
  {
    input: './src/index.tsx',
    output: {
      dir: './dist',
      format: 'es',
    },
    external: ['react', '@mdx-js/react', 'react/jsx-runtime'],
    plugins: [
      ts({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist',
        exclude: ['./__tests__/**/*'],
      }),
      resolve(),
      {
        name: 'ensure-idle-callback-polyfill',
        transform(code, id) {
          if (id.includes('idle-callback-polyfill.js')) {
            return { code, moduleSideEffects: true };
          }
        },
      },
    ],
  },
  {
    input: './src/serialize.ts',
    output: {
      dir: './dist',
      format: 'es',
    },
    external: ['@mdx-js/mdx', 'vfile', 'vfile-matter'],
    plugins: [
      ts({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist',
        exclude: ['./__tests__/**/*'],
      }),
      json(),
      resolve(),
      cjs(),
    ],
  },
];
