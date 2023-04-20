import { defineConfig, type Options } from 'tsup';
import { dependencies, devDependencies, peerDependencies } from './package.json';

const baseConfig: Options = {
  format: ['cjs', 'esm'],
  external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies), '~nxt-run/root', '~nxt-run/routes'],
  noExternal: Object.keys(dependencies),
  dts: true,
  minify: false,
  treeshake: true,
};

export default defineConfig([
  {
    ...baseConfig,
    entry: {
      index: 'src/index.ts',
    },
  },
  {
    ...baseConfig,
    entry: {
      node: 'src/node/index.ts',
    },
    platform: 'node',
    target: 'node18',
  },
  {
    ...baseConfig,
    entry: {
      browser: 'src/browser/index.ts',
    },
    target: 'esnext',
  },
  {
    ...baseConfig,
    entry: {
      server: 'src/server/index.ts',
    },
    platform: 'node',
    target: 'node18',
  },
  {
    ...baseConfig,
    entry: {
      vite: 'src/vite/index.ts',
    },
    publicDir: './src/vite/public',
    platform: 'node',
    target: 'node18',
  },
]);
