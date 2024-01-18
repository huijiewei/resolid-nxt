import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { localizedRedirect } from '~/extensions/localized-link/localizedLinkUtils';

// eslint-disable-next-line react-refresh/only-export-components
const NotFound = lazy(() => import('~/portals/site/NotFound'));

const routes: RouteObject[] = [
  {
    index: true,
    loader: ({ request }) => localizedRedirect('introduction', request),
  },
  {
    path: ':category?/:document',
    lazy: () => import('./MdxView'),
    errorElement: <NotFound />,
  },
];

export default routes;
