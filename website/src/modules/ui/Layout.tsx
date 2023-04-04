import { menus } from './menus';
import { MDXProvider } from '@mdx-js/react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { TocLayout } from '~/common/mdx/TocLayout';
import { mdxComponents } from './mdxComponents';
import { Helmet } from 'react-helmet-async';
import { Aside } from '~/common/components/Aside';
import { AsideLayout } from '~/common/components/AsideLayout';

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>UI</title>
      </Helmet>
      <AsideLayout>
        <Aside menus={menus} />
        <div className={'tablet:ps-60'}>
          <main className={'tablet:pt-4 mx-auto h-full p-4 pt-16'}>
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
          </main>
        </div>
      </AsideLayout>
    </>
  );
}
