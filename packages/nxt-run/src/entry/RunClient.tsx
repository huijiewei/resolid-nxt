import { type AgnosticRouteMatch, type ShouldRevalidateFunction } from '@remix-run/router';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createBrowserRouter, type RouteObject } from 'react-router-dom';

// @ts-expect-error Cannot find module
import * as Root from '~nxt-run/root';

// @ts-expect-error Cannot find module
import routes from '~nxt-run/routes';

const createRoutes = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route) => {
    const dataRoute = {
      ...route,
      shouldRevalidate: (arg: ShouldRevalidateFunction['arguments']) => {
        if (route.shouldRevalidate) {
          return route.shouldRevalidate(arg);
        }

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

// noinspection JSUnusedGlobalSymbols
export const RunClient = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        id: 'root',
        loader: Root.loader,
        handle: Root.handle,
        shouldRevalidate: () => false,
        element: <Root.default />,
        children: createRoutes(routes),
      },
    ],
    {
      basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
      future: {
        v7_normalizeFormMethod: true,
      },
    }
  );

  return (
    <HelmetProvider>
      <RouterProvider future={{ v7_startTransition: true }} router={router} fallbackElement={null} />
    </HelmetProvider>
  );
};

// noinspection JSUnusedGlobalSymbols
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
      })
    );
  }
};
