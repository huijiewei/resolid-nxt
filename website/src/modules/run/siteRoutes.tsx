import { getPathname } from '~/common/utils/path';
import type { ComponentType } from 'react';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import NotFound from '~/portals/site/NotFound';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const documents = import.meta.glob<boolean, string, { default: ComponentType<any> }>('./content/**/*.mdx');

const getBasename = (path: string) => {
  const paths = getPathname(path).split('/');
  const basename = paths.pop()?.split('.')[0];

  if (path.includes('/getting-started/')) {
    return basename;
  }

  return paths.pop() + '/' + basename;
};

const routes: RouteObject[] = [
  { index: true, element: <Navigate to={'introduction'} /> },
  ...Object.keys(documents).map((key) => {
    return { path: getBasename(key), Component: lazy(documents[key]) };
  }),
  { path: '*', element: <NotFound /> },
];

export default routes;
