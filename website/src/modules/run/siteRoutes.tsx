import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import type { RouteObject } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { LazyLoader } from '~/common/components/LazyLoader';
import { dynamicLoader } from '~/common/dynamic/dynamicLoader';
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

const MdxView = ({ doc }: { doc: string }) => {
  const { i18n } = useTranslation();

  const docPath = doc.replace('.mdx', `.${i18n.language}.mdx`);

  const Mdx = dynamicLoader({
    loader: documents[docPath] ?? documents[doc],
    fallback: <LazyLoader height={'100vh'} />,
  });

  return <Mdx />;
};

const routes: RouteObject[] = [
  { index: true, loader: () => redirect('introduction') },
  ...Object.keys(documents)
    .filter((key) => getPathname(key).split('.').length == 2)
    .map((key) => {
      return { path: getBasename(key), element: <MdxView doc={key} /> };
    }),
  { path: '*', element: <NotFound className={'desktop:ps-56'} /> },
];

export default routes;
