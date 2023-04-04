import { defineConfig } from 'tsup';
import { dependencies, devDependencies, peerDependencies } from './package.json';

export default defineConfig({
  entry: { index: 'src/index.ts', tailwind: 'src/tailwind/index.ts' },
  format: ['cjs', 'esm'],
  external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies)],
  noExternal: Object.keys(dependencies),
  dts: true,
  minify: true,
  treeshake: true,
  clean: true,
});
