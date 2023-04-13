import { MDXProvider } from '@mdx-js/react';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { Aside } from '~/common/components/Aside';
import { AsideLayout, AsideLayoutMain } from '~/common/components/AsideLayout';
import { TocLayout } from '~/common/mdx/TocLayout';
import { mdxComponents } from './mdxComponents';
import { menus } from './menus';

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>UI</title>
      </Helmet>
      <AsideLayout>
        <Aside menus={menus} />
        <AsideLayoutMain>
          <MDXProvider components={mdxComponents}>
            <TocLayout
              getMdxPath={(pathname: string) => {
                const path = pathname.replace('/ui/', '');

                return path.includes('components/') ? `ui/content/${path}` : `ui/content/documents/${path}`;
              }}
            >
              <Suspense>
                <Outlet />
              </Suspense>
            </TocLayout>
          </MDXProvider>
        </AsideLayoutMain>
      </AsideLayout>
    </>
  );
}
