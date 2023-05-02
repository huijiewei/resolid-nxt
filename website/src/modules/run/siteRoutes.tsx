import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { getPathname } from '~/common/utils/path';
import { documents } from '~/modules/run/mdxDocuments';

const NotFound = lazy(() => import('~/portals/site/NotFound'));

const getBasename = (path: string) => {
  const paths = getPathname(path).split('/');
  const basename = paths.pop()?.split('.')[0];

  if (path.includes('/getting-started/')) {
    return basename;
  }

  return paths.pop() + '/' + basename;
};

const routes: RouteObject[] = [
  { index: true, loader: () => redirect('introduction') },
  ...Object.keys(documents).map((key) => {
    return { path: getBasename(key), Component: lazy(documents[key]) };
  }),
  { path: '*', element: <NotFound className={'desktop:ps-56'} /> },
];

export default routes;
