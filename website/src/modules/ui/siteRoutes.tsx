import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { redirect } from 'react-router-dom';

const NotFound = lazy(() => import('~/portals/site/NotFound'));

const routes: RouteObject[] = [
  { index: true, loader: () => redirect('introduction') },
  {
    path: 'components/:component',
    lazy: () => import('./MdxView'),
    errorElement: <NotFound />,
  },
  {
    path: ':document',
    lazy: () => import('./MdxView'),
    errorElement: <NotFound />,
  },
];

export default routes;
