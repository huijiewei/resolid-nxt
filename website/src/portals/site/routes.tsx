import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { DefaultLayout } from '~/common/components/DefaultLayout';

import runSiteRoutes from '~/modules/run/siteRoutes';
import uiSiteRoutes from '~/modules/ui/siteRoutes';

// eslint-disable-next-line react-refresh/only-export-components
const NotFound = lazy(() => import('~/portals/site/NotFound'));

const routes: RouteObject[] = [
  {
    path: '',
    handle: { i18n: 'site' },
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
