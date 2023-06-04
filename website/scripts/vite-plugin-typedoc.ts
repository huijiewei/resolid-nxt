import chokidar, { FSWatcher } from 'chokidar';
import fse from 'fs-extra';
import { basename, join } from 'node:path';
import { withCustomConfig, type ComponentDoc, type PropItem } from 'react-docgen-typescript';
import type { Plugin } from 'vite';

type ViteTypedocOptions = {
  sourcePath: string;
  outputPath: string;
};

type ComponentProps = {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  required: boolean;
};

const tsParser = withCustomConfig('tsconfig.json', {
  savePropValueAsString: false,
  skipChildrenPropWithoutDoc: false,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop: PropItem) => {
    if (['as', 'ref', 'style', 'className'].includes(prop.name)) {
      return false;
    }

    if (prop.description.includes('@ignore')) {
      return false;
    }

    if (prop.declarations && prop.declarations.length > 0) {
      return prop.declarations.find((declaration) => !declaration.fileName.includes('node_modules')) != undefined;
    }

    return true;
  },
});

const getComponentProps = (file: string) => {
  const componentDoc = tsParser.parse(file).find((item: ComponentDoc) => {
    return item.displayName == basename(file, '.tsx');
  });

  const typeExports: ComponentProps[] = [];

  if (componentDoc) {
    Object.entries(componentDoc.props).forEach(([key, value]) => {
      let typeText = '';

      if (value.type.name == 'enum') {
        if (!value.type.raw) {
          typeText = value.type.name;
        } else if (
          value.type.raw.includes(' | ') ||
          ['string', 'number', 'boolean', 'ReactNode'].includes(value.type.raw)
        ) {
          typeText = value.type.raw;
        } else {
          typeText = value.type.value.map((item: { value: string }) => item.value).join(' | ');
        }
      }

      if (!value.required) {
        typeText = typeText.replace(' | undefined', '');
      }

      if (typeText.startsWith('NonNullable<')) {
        typeText = typeText.slice(12, -1);
        typeText = typeText.replace(' | null', '');
        typeText = typeText.replace(' | undefined', '');
      }

      typeText = typeText.replace('React.', '').replace(/ReactElement<.*>/g, 'ReactElement');

      const typeExport = {
        name: key,
        type: typeText,
        required: value.required,
        description: value.description,
        defaultValue: value.defaultValue?.value ?? '',
      };

      typeExports.push(typeExport);
    });
  }

  return typeExports;
};

export const viteTypedoc = ({ sourcePath, outputPath }: ViteTypedocOptions): Plugin => {
  if (!sourcePath) {
    throw new Error(`Please set sourcePath.`);
  }

  if (!outputPath) {
    throw new Error(`Please set outputPath.`);
  }

  const cwd = process.cwd();

  outputPath = join(cwd, outputPath);

  let watcher: FSWatcher | null = null;

  return {
    name: 'vite-plugin-typedoc',
    enforce: 'pre',
    buildStart: async () => {
      if (watcher) {
        return;
      }

      watcher = chokidar.watch(`${sourcePath}/**/!(*.test).tsx`, {
        cwd: cwd,
      });

      const generate = (path: string, deleted: boolean) => {
        const outputFile = join(outputPath, `${basename(path, '.tsx')}.json`);

        if (deleted && fse.existsSync(outputFile)) {
          fse.unlinkSync(outputFile);

          return;
        }

        if (fse.existsSync(outputFile) && fse.statSync(outputFile).mtimeMs > fse.statSync(path).mtimeMs) {
          return;
        }

        const json = {
          path: path.replace(sourcePath, ''),
          props: getComponentProps(path),
        };

        fse.writeJsonSync(outputFile, json);
      };

      watcher.on('add', (path) => generate(path, false));
      watcher.on('change', (path) => generate(path, false));
      watcher.on('unlink', (path) => generate(path, true));
    },
    writeBundle: async () => {
      if (watcher) {
        await watcher.close();
      }
    },
  };
};
