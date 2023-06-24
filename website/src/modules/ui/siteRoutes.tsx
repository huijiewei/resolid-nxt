import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { localizedRedirect } from '~/common/components/LocalizedLink';

const NotFound = lazy(() => import('~/portals/site/NotFound'));

const routes: RouteObject[] = [
  { index: true, loader: ({ request }) => localizedRedirect('introduction', request) },
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
