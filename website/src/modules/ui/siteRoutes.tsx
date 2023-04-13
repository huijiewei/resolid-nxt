import type { ComponentType } from 'react';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { getPathname } from '~/common/utils/path';
import NotFound from '~/portals/site/NotFound';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const documents = import.meta.glob<boolean, string, { default: ComponentType<any> }>('./content/documents/*.mdx');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components = import.meta.glob<boolean, string, { default: ComponentType<any> }>('./content/components/*.mdx');

const getBasename = (path: string) => {
  return getPathname(path).split('/').pop()?.split('.')[0];
};

const routes: RouteObject[] = [
  { index: true, element: <Navigate to={'introduction'} /> },
  ...Object.keys(documents).map((key) => {
    return { path: getBasename(key), Component: lazy(documents[key]) };
  }),
  ...Object.keys(components).map((key) => {
    return { path: 'components/' + getBasename(key), Component: lazy(components[key]) };
  }),
  { path: '*', element: <NotFound /> },
];

export default routes;
