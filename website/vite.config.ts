import mdx from '@mdx-js/rollup';
import nxtRunNode from '@resolid/nxt-run-node';
import nxtRun from '@resolid/nxt-run/vite';
import { resolve } from 'path';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { fileURLToPath, URL } from 'url';
import { type UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import rehypeHeadings from './scripts/rehype-headings';
import remarkTypedoc from './scripts/remark-typedoc';

export default defineConfig(({ command }) => {
  const isBuild = command == 'build';

  const config: UserConfig = {
    plugins: [
      !isBuild && tsconfigPaths(),
      {
        ...mdx({
          providerImportSource: '@mdx-js/react',
          rehypePlugins: [rehypeSlug, rehypeHeadings],
          remarkPlugins: [remarkGfm, [remarkTypedoc, { sourceRootPath: resolve(__dirname, '../packages/nxt-ui/src') }]],
        }),
        enforce: 'pre',
      },
      nxtRun({
        adapter: nxtRunNode(),
        reactOptions: {
          include: /\.(mdx|js|jsx|ts|tsx)$/,
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
      include: ['@mdx-js/react', 'fast-blurhash'],
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
