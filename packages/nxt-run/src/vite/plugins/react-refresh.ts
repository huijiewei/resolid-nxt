import { type Plugin } from 'vite';
import { join, dirname } from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const reactRefresh = () => {
  const runtimePublicPath = '/@react-refresh';

  return {
    name: 'vite-plugin-nxt-run-refresh',
    resolveId: (id) => (id === runtimePublicPath ? id : undefined),
    load(id) {
      if (id !== runtimePublicPath) {
        return;
      }

      const filePath = join(__dirname, 'react-refresh-runtime.js');
      return {
        code: readFileSync(filePath, 'utf-8'),
      };
    },
  } as Plugin;
};
