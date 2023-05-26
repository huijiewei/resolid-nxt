import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { type Plugin } from 'vite';

export const reactRefresh = () => {
  const runtimePublicPath = '/@react-refresh';

  const _require = createRequire(import.meta.url);
  const reactRefreshDir = dirname(_require.resolve('react-refresh/package.json'));
  const runtimeFilePath = join(reactRefreshDir, 'cjs/react-refresh-runtime.development.js');

  const runtimeCode = `
const exports = {}
${readFileSync(runtimeFilePath, 'utf-8')}
${readFileSync(_require.resolve('./refreshUtils.cjs'), 'utf-8')}
export default exports
`;

  return {
    name: 'nxt-run-react-refresh',
    apply: 'serve',
    enforce: 'pre',
    resolveId: (id) => {
      if (id == runtimePublicPath) {
        return id;
      }
    },
    load(id) {
      if (id == runtimePublicPath) {
        return runtimeCode;
      }
    },
  } as Plugin;
};
