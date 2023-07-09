import type { Plugin } from 'vite';

export const removeEmptyImportPlugin = (): Plugin => {
  return {
    name: 'remove-empty-import',

    transform(code) {
      return code
        .replace(/import {} from .*/g, '')
        .replace("import '@resolid/nxt-run/server';", '')
        .replace('import "@resolid/nxt-run/server";', '');
    },
  };
};
