import { type RunContextValue } from '../components/RunContext';
import { createStaticHandler } from 'react-router-dom/server';

// @ts-expect-error Cannot find module
import Root from '~nxt-run/root';

// @ts-expect-error Cannot find module
import routes from '~nxt-run/routes';

type RenderOptions = { startHtml: string; endHtml: string };

export type HandleFn = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  runContext: RunContextValue,
  renderOptions: RenderOptions
) => Promise<Response> | Response;

export const createHandler = (handle: HandleFn) => {
  return async (
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    runContext: RunContextValue,
    renderOptions: RenderOptions
  ) => {
    const { query, dataRoutes } = createStaticHandler(
      [
        {
          path: '/',
          element: <Root />,
          children: routes,
        },
      ],
      {
        basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
      }
    );

    const context = {
      ...runContext,
      routes: dataRoutes,
      staticHandlerContext: await query(request),
    };

    return handle(request, responseStatusCode, responseHeaders, context, renderOptions);
  };
};
