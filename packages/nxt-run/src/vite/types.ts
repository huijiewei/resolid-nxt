import type { Options } from '@vitejs/plugin-react';
import type { RollupCommonJSOptions } from 'vite';
import type { ManualChunksFunction } from './plugins/split-chunk';

export type NxtRunAdapter = {
  name: string;
  build: (
    root: string,
    outPath: string,
    ssrExternal: string[] | undefined,
    commonjsOptions: RollupCommonJSOptions | undefined
  ) => Promise<void>;
};

export type NxtRunViteOptions = {
  adapter: NxtRunAdapter;
  rootEntry?: string;
  clientEntry?: string;
  serverEntry?: string;
  routesEntry?: string;

  inspect?: boolean;

  manualChunks?: ManualChunksFunction;

  reactOptions?: Options;
};
