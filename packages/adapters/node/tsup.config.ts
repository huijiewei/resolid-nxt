import { defineConfig, type Options } from 'tsup';
import { dependencies, devDependencies, peerDependencies } from './package.json';

const baseConfig: Options = {
  format: ['esm', 'cjs'],
  noExternal: Object.keys(dependencies),
  platform: 'node',
  target: 'node18',
  dts: true,
  treeshake: true,
  clean: true,
};

// noinspection JSUnusedGlobalSymbols
export default defineConfig([
  {
    ...baseConfig,
    entry: ['src/index.ts'],
    external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies)],
  },
  {
    ...baseConfig,
    entry: ['src/entry.ts'],
    external: [
      ...Object.keys(peerDependencies),
      ...Object.keys(devDependencies),
      './route-manifest.json',
      './entry-server.js',
    ],
    dts: false,
  },
]);
