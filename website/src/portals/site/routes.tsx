import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { DefaultLayout } from '~/common/components/DefaultLayout';
import { i18n } from '~/i18n';

import runSiteRoutes from '~/modules/run/siteRoutes';
import uiSiteRoutes from '~/modules/ui/siteRoutes';

const NotFound = lazy(() => import('~/portals/site/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    loader: () => redirect(i18n.fallbackLng as string),
  },
  {
    path: '/:lang',
    handle: { i18n: 'site' },
    loader: ({ params, request }) => {
      if (Array.isArray(i18n.supportedLngs) && !i18n.supportedLngs.includes(params.lang)) {
        const basename = import.meta.env.BASE_URL;
        const pathname = new URL(request.url).pathname.slice(basename.length);
        return redirect(`${basename.replace(/\/$/, '')}/${i18n.fallbackLng}/${pathname}`);
      }

      return null;
    },
    Component: lazy(() => import('./Layout')),
    children: [
      {
        index: true,
        Component: lazy(() => import('~/modules/home/Index')),
      },
      { path: 'about', Component: lazy(() => import('~/modules/home/About')) },
      { path: 'login', Component: lazy(() => import('~/modules/home/Login')) },
      { path: 'signup', Component: lazy(() => import('~/modules/home/Signup')) },
      { path: 'forgot-password', Component: lazy(() => import('~/modules/home/ForgotPassword')) },
      { path: 'terms', Component: lazy(() => import('~/modules/home/Terms')) },
      { path: 'privacy', Component: lazy(() => import('~/modules/home/Privacy')) },
      {
        path: 'run',
        handle: { i18n: 'run' },
        Component: lazy(() => import('~/modules/run/Layout')),
        children: runSiteRoutes,
      },
      {
        path: 'ui',
        handle: { i18n: 'ui' },
        Component: lazy(() => import('~/modules/ui/Layout')),
        children: uiSiteRoutes,
      },
      {
        path: '*',
        element: <NotFound layout={DefaultLayout} />,
      },
    ],
  },
];

export default routes;
