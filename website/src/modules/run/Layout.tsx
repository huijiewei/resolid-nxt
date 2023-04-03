import { menus } from './menus';
import { MDXProvider } from '@mdx-js/react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { TocLayout } from '~/common/mdx/TocLayout';
import { mdxComponents } from './mdxComponents';
import { Helmet } from 'react-helmet-async';
import { Aside } from '~/common/components/Aside';

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>UI</title>
      </Helmet>
      <Aside menus={menus} />
      <div className={'ps-60'}>
        <main className={'mx-auto h-full p-4'}>
          <MDXProvider components={mdxComponents}>
            <TocLayout
              getMdxPath={(pathname: string) => {
                const path = pathname.replace('/run/', '');

                return `run/content/${path}`;
              }}
            >
              <Suspense>
                <Outlet />
              </Suspense>
            </TocLayout>
          </MDXProvider>
        </main>
      </div>
    </>
  );
}
