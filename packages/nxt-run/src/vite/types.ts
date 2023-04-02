import type { ManualChunksFunction } from './plugins/split-chunk';
import type { RollupCommonJSOptions } from 'vite';

type ReactViteOptions = {
  jsxImportSource?: string;
  tsDecorators?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins?: [string, Record<string, any>][];
};

export type NxtRunAdapter = {
  name: string;
  build: (
    root: string,
    outPath: string,
    ssrExternal: string[] | undefined,
    commonjsOptions: RollupCommonJSOptions | undefined
  ) => Promise<void>;
};

export type NxtRunVitePluginOptions = {
  adapter: NxtRunAdapter;
  rootEntry?: string;
  clientEntry?: string;
  serverEntry?: string;
  routesEntry?: string;

  inspect?: boolean;

  manualChunks?: ManualChunksFunction;
};

export type NxtRunViteOptions = NxtRunVitePluginOptions & ReactViteOptions;
