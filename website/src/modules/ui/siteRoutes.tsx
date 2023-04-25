import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { getPathname } from '~/common/utils/path';
import { components, documents } from '~/modules/ui/mdxDocuments';

const NotFound = lazy(() => import('~/portals/site/NotFound'));

const getBasename = (path: string) => {
  return getPathname(path).split('/').pop()?.split('.')[0];
};

const routes: RouteObject[] = [
  { index: true, element: <Navigate replace={true} to={'introduction'} /> },
  ...Object.keys(documents).map((key) => {
    return { path: getBasename(key), Component: lazy(documents[key]) };
  }),
  ...Object.keys(components).map((key) => {
    return { path: 'components/' + getBasename(key), Component: lazy(components[key]) };
  }),
  { path: '*', element: <NotFound className={'desktop:ps-56'} /> },
];

export default routes;
