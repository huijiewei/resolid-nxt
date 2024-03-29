// noinspection JSUnusedGlobalSymbols

import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import type { EntryContext } from '../server/context';

export { type EntryContext } from '../server/context';

export type RunServerProps = {
  context: EntryContext;
};

export const RunServer = ({ context }: RunServerProps) => {
  const router = createStaticRouter(context.routes, context.staticHandlerContext, {
    future: {
      v7_relativeSplatPath: true,
      v7_partialHydration: true,
    },
  });

  return (
    <StrictMode>
      <HelmetProvider context={context.helmetContext}>
        <StaticRouterProvider router={router} context={context.staticHandlerContext} />
      </HelmetProvider>
    </StrictMode>
  );
};
