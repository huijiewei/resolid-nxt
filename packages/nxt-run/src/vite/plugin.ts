import react from '@vitejs/plugin-react';
import { readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { build, loadEnv, mergeConfig, type Plugin, type ResolvedConfig, type UserConfig } from 'vite';
import viteInspect from 'vite-plugin-inspect';
import transformServer from './babel/transformServer';
import { removeEmptyImportPlugin } from './plugins/removeEmptyImport';
import { chunkSplitPlugin } from './plugins/splitChunk';
import { dev } from './serve/dev';
import type { NxtRunViteOptions } from './types';
import { findAny } from './utils/file';
import { prepareManifest } from './utils/manifest';
import { transformRouteComponent } from './utils/transform';

let secondaryBuildStarted = false;

export const nxtRunVitePlugin = (options: NxtRunViteOptions): Plugin[] => {
  const {
    adapter,
    rootEntry: _rootEntry,
    clientEntry: _clientEntry,
    serverEntry: _serverEntry,
    routesEntry: _routesEntry,
    inspect = true,
    manualChunks,
    reactOptions,
  } = options;

  let root: string, rootEntry: string, clientEntry: string, serverEntry: string, routesEntry: string;
  let outPath: string, clientOutPath: string, serverOutPath: string;
  let isBuild: boolean;
  let viteConfig: ResolvedConfig;
  let finalise: () => Promise<void>;

  const routeComponents = new Set<string>();

  const viteReactPlugin = react({
    ...reactOptions,
    babel(_, { ssr }) {
      return {
        plugins: [
          [
            transformServer,
            {
              ssr,
              root,
              minify: isBuild,
            },
          ],
        ],
      };
    },
  });

  return [
    {
      name: 'nxt-run-config',
      enforce: 'pre',
      async config(userConfig, { command }) {
        root = userConfig.root || process.cwd();
        isBuild = command == 'build';

        rootEntry = _rootEntry ?? (findAny(join(root, 'src'), 'root') as string);
        clientEntry = _clientEntry ?? (findAny(join(root, 'src'), 'entry-client') as string);
        serverEntry = _serverEntry ?? (findAny(join(root, 'src'), 'entry-server') as string);
        routesEntry = _routesEntry ?? (findAny(join(root, 'src'), 'routes') as string);

        outPath = join(root, userConfig.build?.outDir || 'dist');
        clientOutPath = join(outPath, 'public');
        serverOutPath = join(root, '.resolid', 'server');

        const config: UserConfig = {
          root,
          define: {
            'import.meta.env.ENTRY_CLIENT': JSON.stringify(clientEntry),
            'import.meta.env.ENTRY_SERVER': JSON.stringify(serverEntry),
          },
          optimizeDeps: {
            exclude: ['@resolid/nxt-run'],
          },
          resolve: {
            alias: {
              '~nxt-run/root': rootEntry,
              '~nxt-run/entry-client': clientEntry,
              '~nxt-run/entry-server': serverEntry,
              '~nxt-run/routes': routesEntry,
            },
          },
          ssr: {
            noExternal: ['@resolid/nxt-run'],
          },
          legacy: {
            proxySsrExternalModules: true,
          },
        };

        if (isBuild) {
          if (!config.build) {
            config.build = {};
          }

          config.build.ssr = !secondaryBuildStarted;
        }

        const adapterConfig = await adapter?.config?.(userConfig);

        if (adapterConfig) {
          return mergeConfig(config, adapterConfig);
        }

        return config;
      },
      configResolved(config) {
        viteConfig = config;
      },
    } as Plugin,
    {
      name: 'nxt-run-route-component',
      enforce: 'pre',
      apply: 'build',
      transform(code, id, transformOptions) {
        return transformRouteComponent(
          code,
          id,
          transformOptions?.ssr ?? false,
          root,
          rootEntry,
          serverEntry,
          (componentId) => routeComponents.add(componentId),
        );
      },
    } as Plugin,
    inspect && viteInspect({ outputDir: join('.resolid', 'inspect') }),
    viteReactPlugin,
    {
      name: 'nxt-run-server',
      apply: 'serve',
      config() {
        const env = loadEnv('', process.cwd(), 'NXT_');

        return {
          appType: 'custom',
          define: Object.fromEntries(
            new Map(Object.keys(env).map((key) => [`process.env.${key}`, JSON.stringify(env[key])])),
          ),
        };
      },
      configureServer(viteServer) {
        return dev(viteServer);
      },
    } as Plugin,
    {
      name: 'nxt-run-build',
      config(userConfig) {
        if (isBuild) {
          const ssr = userConfig.build?.ssr;

          if (ssr) {
            return {
              build: {
                outDir: serverOutPath,
                ssr: true,
                minify: false,
                rollupOptions: {
                  input: serverEntry,
                  output: {
                    inlineDynamicImports: true,
                  },
                },
                target: 'node18',
                ssrEmitAssets: true,
              },
              publicDir: false,
            };
          } else {
            return {
              build: {
                outDir: clientOutPath,
                manifest: true,
                ssrManifest: true,
                rollupOptions: {
                  // input: clientEntry,
                  output: {
                    manualChunks: undefined,
                  },
                },
              },
            };
          }
        }
      },
      writeBundle: {
        sequential: true,
        async handler() {
          if (secondaryBuildStarted) {
            return;
          }

          secondaryBuildStarted = true;

          await build({
            configFile: viteConfig.configFile,
            mode: viteConfig.mode,
            optimizeDeps: {
              force: viteConfig.optimizeDeps.force,
            },
          });

          const manifest = JSON.parse(readFileSync(join(clientOutPath, '.vite', 'manifest.json'), 'utf-8').toString());
          const ssrManifest = JSON.parse(
            readFileSync(join(clientOutPath, '.vite', 'ssr-manifest.json'), 'utf-8').toString(),
          );

          writeFileSync(
            join(clientOutPath, 'route-manifest.json'),
            JSON.stringify(prepareManifest(manifest, ssrManifest, routeComponents, viteConfig.base), null, 2),
            'utf-8',
          );

          writeFileSync(
            join(serverOutPath, 'route-manifest.json'),
            readFileSync(join(clientOutPath, 'route-manifest.json'), 'utf-8'),
            'utf-8',
          );

          const indexHtml = join(clientOutPath, 'index.html');

          writeFileSync(join(clientOutPath, 'template.html'), readFileSync(indexHtml, 'utf-8'), 'utf-8');

          unlinkSync(indexHtml);

          finalise = async () => {
            await adapter.buildEnd(viteConfig.root, outPath, viteConfig.ssr.external, viteConfig.build.commonjsOptions);
          };
        },
      },
      closeBundle: {
        sequential: true,
        async handler() {
          if (!viteConfig.build.ssr) {
            return;
          }

          await finalise?.();
        },
      },
    } as Plugin,
    removeEmptyImportPlugin(),
    manualChunks && chunkSplitPlugin({ manualChunks }),
  ].filter(Boolean) as Plugin[];
};
