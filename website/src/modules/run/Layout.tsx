import { MDXProvider } from '@mdx-js/react';
import { useIsomorphicLayoutEffect } from '@resolid/nxt-ui';
import { Suspense, useState, type PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { AsideLayout, AsideLayoutMain } from '~/common/components/AsideLayout';
import { AsideLayoutSide } from '~/common/components/AsideLayoutSide';
import { TocContextProvider } from '~/common/mdx/TocContext';
import { TocLayout } from '~/common/mdx/TocLayout';
import { type TocItem } from '~/common/mdx/TocSection';
import { headings } from '~/modules/run/mdxDocuments';
import { mdxComponents } from './mdxComponents';
import { menus } from './menus';

const TocProvider = (props: PropsWithChildren) => {
  const { pathname } = useLocation();

  const [toc, setToc] = useState<TocItem[]>([]);

  useIsomorphicLayoutEffect(() => {
    const path = pathname.replace('/run/', '');
    const docPath = path.includes('/') ? `./content/${path}.mdx` : `/content/getting-started/${path}.mdx`;

    (async () => {
      setToc((await headings[docPath]?.()) ?? []);
    })();

    return () => {
      setToc([]);
    };
  }, [pathname]);

  return <TocContextProvider value={toc}>{props.children}</TocContextProvider>;
};

export default function Layout() {
  return (
    <>
      <Helmet>
        <title>UI</title>
      </Helmet>
      <AsideLayout>
        <AsideLayoutSide menus={menus} />
        <AsideLayoutMain>
          <MDXProvider components={mdxComponents}>
            <TocProvider>
              <TocLayout>
                <Suspense>
                  <Outlet />
                </Suspense>
              </TocLayout>
            </TocProvider>
          </MDXProvider>
        </AsideLayoutMain>
      </AsideLayout>
    </>
  );
}
