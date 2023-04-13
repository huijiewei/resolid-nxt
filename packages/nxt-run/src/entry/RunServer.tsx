import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import type { EntryContext } from '../server/context';

export { type EntryContext } from '../server/context';

export type RunServerProps = {
  context: EntryContext;
};

// noinspection JSUnusedGlobalSymbols
export const RunServer = (props: RunServerProps) => {
  const context = props.context.staticHandlerContext;

  if (context == null) {
    throw new Error('staticHandlerContext is null');
  }

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(props.context.routes, context);

  return (
    <StrictMode>
      <HelmetProvider context={props.context.helmetContext}>
        <StaticRouterProvider router={router} context={context} />
      </HelmetProvider>
    </StrictMode>
  );
};
