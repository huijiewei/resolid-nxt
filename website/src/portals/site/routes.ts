import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import NotFound from './NotFound';

import runSiteRoutes from '~/modules/run/siteRoutes';
import uiSiteRoutes from '~/modules/ui/siteRoutes';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('./Layout')),
    children: [
      {
        index: true,
        lazy: () => import('~/modules/home/Index'),
      },
      { path: 'run', Component: lazy(() => import('~/modules/run/Layout')), children: runSiteRoutes },
      { path: 'ui', Component: lazy(() => import('~/modules/ui/Layout')), children: uiSiteRoutes },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
];

export default routes;
