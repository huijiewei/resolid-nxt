import fg from 'fast-glob';
import { copy } from 'fs-extra';
import { isAbsolute, join } from 'node:path';
import type { Plugin } from 'vite';

export type ViteCopyOptions = {
  targets: { src: string; dest: string }[];
};

export const viteCopy = (options: ViteCopyOptions): Plugin => {
  const cwd = process.cwd();

  let copied = false;

  return {
    name: 'vite-plugin-copy',
    apply: 'build',
    async writeBundle() {
      if (copied) {
        return;
      }

      for (const target of options.targets) {
        const dest = !isAbsolute(target.dest) ? join(cwd, target.dest) : target.dest;

        const matchedPaths = await fg(target.src, {
          onlyFiles: false,
          dot: true,
          cwd: cwd,
        });

        for (const matchedPath of matchedPaths) {
          copy(matchedPath, dest);
        }
      }

      copied = true;
    },
  };
};
