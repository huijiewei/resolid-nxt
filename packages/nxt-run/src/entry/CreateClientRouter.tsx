// noinspection JSUnusedGlobalSymbols

import type { AgnosticRouteMatch, ShouldRevalidateFunctionArgs } from '@remix-run/router';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

// @ts-expect-error Cannot find module
import * as Root from '~nxt-run/root';

// @ts-expect-error Cannot find module
import routes from '~nxt-run/routes';

const createRoutes = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route) => {
    const dataRoute = {
      ...route,
      shouldRevalidate: (arg: ShouldRevalidateFunctionArgs) => {
        if (route.shouldRevalidate) {
          return route.shouldRevalidate(arg);
        }

        // noinspection JSUnresolvedReference
        if (arg.actionResult?.revalidate === false) {
          return false;
        }

        return arg.defaultShouldRevalidate;
      },
    } as RouteObject;

    if (route.children) {
      dataRoute.children = createRoutes(route.children);
    }

    return dataRoute;
  });
};

export const createClientRouter = () => {
  return createBrowserRouter(
    [
      {
        path: '',
        id: 'root',
        loader: Root.loader,
        handle: Root.handle,
        shouldRevalidate: () => false,
        element: <Root.default />,
        children: createRoutes(routes),
        errorElement: Root.ErrorBoundary ? <Root.ErrorBoundary /> : null,
      },
    ],
    {
      basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
      future: {
        v7_normalizeFormMethod: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_partialHydration: true,
      },
    },
  );
};

export const lazyMatches = async (matchRoutes: AgnosticRouteMatch<string>[] | null) => {
  const lazyMatches = matchRoutes?.filter((m) => m.route.lazy);

  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        const routeModule = await m.route.lazy?.();
        Object.assign(m.route, {
          ...routeModule,
          lazy: undefined,
        });
      }),
    );
  }
};
