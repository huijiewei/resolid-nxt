import type { Options } from '@vitejs/plugin-react';
import type { RollupCommonJSOptions, UserConfig } from 'vite';
import type { ManualChunksFunction } from './plugins/splitChunk';

export type NxtRunAdapter = {
  name: string;
  config?: (config: UserConfig) => Promise<UserConfig> | UserConfig | undefined;
  buildEnd: (
    root: string,
    outPath: string,
    ssrExternal: string[] | undefined,
    commonjsOptions: RollupCommonJSOptions | undefined
  ) => Promise<void> | void;
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
