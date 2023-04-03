import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import nxtRun from '@resolid/nxt-run/vite';
import nxtRunNode from '@resolid/nxt-run-node';
import { fileURLToPath, URL } from 'url';
import { type UserConfig } from 'vite';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import mdx from '@mdx-js/rollup';
import rehypeHeadings from './scripts/rehype-headings';

export default defineConfig(({ command }) => {
  const isBuild = command == 'build';

  const config: UserConfig = {
    plugins: [
      !isBuild && tsconfigPaths(),
      mdx({
        providerImportSource: '@mdx-js/react',
        rehypePlugins: [rehypeSlug, rehypeHeadings],
        remarkPlugins: [remarkGfm],
      }),
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
    build: {
      minify: true,
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
