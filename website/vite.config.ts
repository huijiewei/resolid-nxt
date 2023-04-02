import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import nxtRun from '@resolid/nxt-run/vite';
import nxtRunNode from '@resolid/nxt-run-node';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    nxtRun({
      adapter: nxtRunNode(),
      manualChunks(id) {
        if (
          id.includes('/node_modules/react/') ||
          id.includes('/node_modules/react-dom/') ||
          id.includes('/node_modules/react-is/') ||
          id.includes('/node_modules/scheduler/') ||
          id.includes('/node_modules/prop-types/')
        ) {
          return 'react';
        }

        if (
          id.includes('/packages/nxt-live/') ||
          id.includes('/node_modules/@resolid/nxt-live/') ||
          id.includes('/node_modules/sucrase/') ||
          id.includes('/node_modules/prismjs/') ||
          id.includes('/node_modules/prism-react-renderer/') ||
          id.includes('/node_modules/ts-interface-checker/') ||
          id.includes('/node_modules/react-simple-code-editor/') ||
          id.includes('/node_modules/lines-and-columns/')
        ) {
          return 'react-live';
        }

        if (id.includes('/node_modules/@resolid/') && !id.includes('/node_modules/@resolid/nxt-run/')) {
          return 'resolid';
        }

        if (id.includes('/node_modules/')) {
          return 'vendor';
        }

        if (id.includes('/packages/') && !id.includes('/packages/nxt-run/')) {
          return 'resolid';
        }
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: '../packages/tests/src/setup.ts',
  },
});