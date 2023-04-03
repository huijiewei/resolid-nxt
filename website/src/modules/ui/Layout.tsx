import { AsideMenu } from '~/common/components/AsideMenu';
import { menus } from './menus';
import { MDXProvider } from '@mdx-js/react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { TocLayout } from '~/common/mdx/TocLayout';
import { mdxComponents } from './mdxComponents';
import { Helmet } from 'react-helmet-async';

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>UI</title>
      </Helmet>
      <aside
        className={
          'scrollbar scrollbar-thin fixed bottom-0 top-16 w-60 overflow-y-auto overflow-x-hidden overscroll-contain'
        }
      >
        <nav role={'navigation'}>
          <AsideMenu menus={menus} />
        </nav>
      </aside>
      <div className={'ps-60'}>
        <main className={'mx-auto h-full p-4'}>
          <MDXProvider components={mdxComponents}>
            <TocLayout module={'ui'} path={'/'}>
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
