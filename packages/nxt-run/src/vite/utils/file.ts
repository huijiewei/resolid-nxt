import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const findAny = (path: string, name: string, extensions = ['.ts', '.tsx']) => {
  for (const extension of extensions) {
    const file = join(path, name + extension);

    if (existsSync(file)) {
      return file;
    }
  }

  return null;
};
