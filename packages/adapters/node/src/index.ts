import { type NxtRunAdapter } from '@resolid/nxt-run/vite';
import common from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { rollup } from 'rollup';
import { fileURLToPath } from 'url';

export default function (): NxtRunAdapter {
  return {
    name: 'node',
    async build(root, outPath, ssrExternal, commonjsOptions) {
      const __dirname = dirname(fileURLToPath(import.meta.url));

      writeFileSync(
        join(root, '.resolid', 'server', 'server.js'),
        readFileSync(join(__dirname, 'entry.js')).toString()
      );

      const bundle = await rollup({
        input: join(root, '.resolid', 'server', 'server.js'),
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
