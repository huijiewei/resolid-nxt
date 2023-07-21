import { type NxtRunAdapter } from '@resolid/nxt-run/vite';
import common from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rollup } from 'rollup';
import type { PackageJson } from 'type-fest';

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

      const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as PackageJson;

      const distPkg = {
        name: pkg.name,
        type: pkg.type,
        scripts: {
          postinstall: pkg.scripts?.postinstall ?? '',
        },
        dependencies: {
          ...Object.keys(pkg.dependencies ?? {})
            .filter((key) => ssrExternal?.includes(key))
            .reduce((obj: Record<string, string>, key) => {
              obj[key] = pkg.dependencies?.[key] ?? '';

              return obj;
            }, {}),
          ...Object.keys(pkg.devDependencies ?? {})
            .filter((key) => ssrExternal?.includes(key))
            .reduce((obj: Record<string, string>, key) => {
              obj[key] = pkg.devDependencies?.[key] ?? '';

              return obj;
            }, {}),
        },
      };

      writeFileSync(join(outPath, 'package.json'), JSON.stringify(distPkg, null, 2), 'utf8');

      await bundle.close();
    },
  };
}
