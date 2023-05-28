import { MDXProvider } from '@mdx-js/react';
import { useIsomorphicEffect } from '@resolid/nxt-ui';
import { Suspense, useState, type PropsWithChildren } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AsideLayout } from '~/common/components/AsideLayout';
import { AsideLayoutMain } from '~/common/components/AsideLayoutMain';
import { AsideLayoutSide } from '~/common/components/AsideLayoutSide';
import { BaseLayout } from '~/common/components/BaseLayout';
import { LazyLoader } from '~/common/components/LazyLoader';
import { TocContextProvider, filterTocSection } from '~/common/mdx/TocContext';
import { TocLayout } from '~/common/mdx/TocLayout';
import { type TocItem } from '~/common/mdx/TocSection';
import { headings } from '~/modules/run/mdxDocuments';
import { mdxComponents } from './mdxComponents';
import { menus } from './menus';

const TocProvider = (props: PropsWithChildren) => {
  const { pathname } = useLocation();

  const [toc, setToc] = useState<TocItem[]>([]);

  useIsomorphicEffect(() => {
    const path = pathname.replace('/run/', '');
    const docPath = path.includes('/') ? `./content/${path}.mdx` : `/content/getting-started/${path}.mdx`;

    headings[docPath]?.().then((toc) => setToc(filterTocSection(toc)));

    return () => {
      setToc([]);
    };
  }, [pathname]);

  return <TocContextProvider value={toc}>{props.children}</TocContextProvider>;
};

export default function Layout() {
  return (
    <BaseLayout>
      <AsideLayout>
        <AsideLayoutSide menus={menus} />
        <AsideLayoutMain>
          <MDXProvider components={mdxComponents}>
            <TocProvider>
              <TocLayout>
                <Suspense fallback={<LazyLoader />}>
                  <Outlet />
                </Suspense>
              </TocLayout>
            </TocProvider>
          </MDXProvider>
        </AsideLayoutMain>
      </AsideLayout>
    </BaseLayout>
  );
}
