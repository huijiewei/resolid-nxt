import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { RunContext, type RunContextValue } from '../components/RunContext';
import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';

export { useRunContext, type RunContextValue } from '../components/RunContext';

export type RunServerProps = {
  context: RunContextValue;
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
      <RunContext.Provider value={props.context}>
        <HelmetProvider context={props.context.helmetContext}>
          <StaticRouterProvider router={router} context={context} />
        </HelmetProvider>
      </RunContext.Provider>
    </StrictMode>
  );
};
