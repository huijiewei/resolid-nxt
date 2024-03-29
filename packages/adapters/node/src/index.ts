import { type NxtRunAdapter } from '@resolid/nxt-run/vite';
import common from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rollup } from 'rollup';

export default function (): NxtRunAdapter {
  return {
    name: 'node',
    async buildEnd(root, outPath, ssrExternal, commonjsOptions) {
      const __dirname = dirname(fileURLToPath(import.meta.url));

      const inputEntry = join(root, '.resolid', 'server', 'server.js');

      writeFileSync(inputEntry, readFileSync(join(__dirname, 'entry.js'), 'utf8'), 'utf8');

      const bundle = await rollup({
        input: inputEntry,
        plugins: [
          json(),
          nodeResolve({
            preferBuiltins: true,
            exportConditions: ['node'],
          }),
          common({ strictRequires: true, ...commonjsOptions }),
        ],
        external: [...(ssrExternal ?? [])],
      });

      await bundle.write({
        format: 'esm',
        file: join(outPath, 'server.mjs'),
        inlineDynamicImports: true,
      });

      await bundle.close();
    },
  };
}
