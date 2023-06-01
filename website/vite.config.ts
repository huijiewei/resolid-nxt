import nxtRunNode from '@resolid/nxt-run-node';
import nxtRun from '@resolid/nxt-run/vite';
import { fileURLToPath, URL } from 'url';
import { type UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { viteCopy } from './scripts/vite-plugin-copy';
import { viteTypedoc } from './scripts/vite-plugin-typedoc';

export default defineConfig(({ command }) => {
  const isBuild = command == 'build';

  const config: UserConfig = {
    plugins: [
      viteTypedoc({
        sourcePath: '../packages/nxt-ui/src/components',
        outputPath: 'docs/ui/props',
      }),
      !isBuild && tsconfigPaths(),
      isBuild &&
        viteCopy({
          targets: [
            {
              src: 'docs',
              dest: 'dist/docs',
            },
          ],
        }),
      nxtRun({
        adapter: nxtRunNode(),
        reactOptions: {
          include: /\.(js|jsx|ts|tsx)$/,
        },
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
    build: {
      minify: true,
    },
    optimizeDeps: {
      include: ['fast-blurhash'],
    },
    test: {
      environment: 'jsdom',
      setupFiles: '../packages/tests/src/setup.ts',
    },
  };

  if (isBuild) {
    config.resolve = {
      alias: [{ find: '~', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    };
  }

  return config;
});
