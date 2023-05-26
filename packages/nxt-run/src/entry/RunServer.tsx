import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import type { EntryContext } from '../server/context';

export { type EntryContext } from '../server/context';

export type RunServerProps = {
  context: EntryContext;
};

// noinspection JSUnusedGlobalSymbols
export const RunServer = ({ context }: RunServerProps) => {
  const router = createStaticRouter(context.routes, context.staticHandlerContext);

  return (
    <StrictMode>
      <HelmetProvider context={context.helmetContext}>
        <StaticRouterProvider router={router} context={context.staticHandlerContext} />
      </HelmetProvider>
    </StrictMode>
  );
};
