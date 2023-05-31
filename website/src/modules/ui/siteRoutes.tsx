import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import type { RouteObject } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { LazyLoader } from '~/common/components/LazyLoader';
import { dynamicLoader } from '~/common/dynamic/dynamicLoader';
import { getPathname } from '~/common/utils/path';
import { components, documents } from '~/modules/ui/mdxDocuments';

const NotFound = lazy(() => import('~/portals/site/NotFound'));

const getBasename = (path: string) => {
  return getPathname(path).split('/').pop()?.split('.')[0];
};

const MdxView = ({ doc, type }: { doc: string; type: 'document' | 'component' }) => {
  const { i18n } = useTranslation();

  const docPath = doc.replace('.mdx', `.${i18n.language}.mdx`);

  const Mdx = dynamicLoader({
    loader: type == 'document' ? documents[docPath] ?? documents[doc] : components[docPath] ?? components[doc],
    fallback: <LazyLoader height={'100vh'} />,
  });

  return <Mdx />;
};

const routes: RouteObject[] = [
  { index: true, loader: () => redirect('introduction') },
  ...Object.keys(documents).map((key) => {
    return { path: getBasename(key), element: <MdxView type={'document'} doc={key} /> };
  }),
  ...Object.keys(components).map((key) => {
    return { path: 'components/' + getBasename(key), element: <MdxView type={'component'} doc={key} /> };
  }),
  { path: '*', element: <NotFound className={'desktop:ps-56'} /> },
];

export default routes;
