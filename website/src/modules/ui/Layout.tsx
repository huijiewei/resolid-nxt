import { MDXProvider } from '@mdx-js/react';
import { useIsomorphicEffect } from '@resolid/nxt-ui';
import { Suspense, useState, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { AsideLayout } from '~/common/components/AsideLayout';
import { AsideLayoutMain } from '~/common/components/AsideLayoutMain';
import { AsideLayoutSide } from '~/common/components/AsideLayoutSide';
import { BaseLayout } from '~/common/components/BaseLayout';
import { LazyLoader } from '~/common/components/LazyLoader';
import { TocContextProvider, filterTocSection } from '~/common/mdx/TocContext';
import { TocLayout } from '~/common/mdx/TocLayout';
import type { TocItem } from '~/common/mdx/TocSection';
import { headings } from '~/modules/ui/mdxDocuments';
import { mdxComponents } from './mdxComponents';
import { menus } from './menus';

const TocProvider = (props: PropsWithChildren) => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  const [toc, setToc] = useState<TocItem[]>([]);

  useIsomorphicEffect(() => {
    const path = pathname.replace(`/${i18n.language}/ui/`, '');

    const docPath = path.includes('components/')
      ? `./content/${path}.${i18n.language}.mdx`
      : `./content/documents/${path}.${i18n.language}.mdx`;

    if (headings[docPath]) {
      headings[docPath]().then((toc) => setToc(filterTocSection(toc)));
    } else {
      const docFallbackPath = path.includes('components/')
        ? `./content/${path}.mdx`
        : `./content/documents/${path}.mdx`;

      headings[docFallbackPath]?.().then((toc) => setToc(filterTocSection(toc)));
    }

    return () => {
      setToc([]);
    };
  }, [i18n.language, pathname]);

  return <TocContextProvider value={toc}>{props.children}</TocContextProvider>;
};

export default function Layout() {
  return (
    <BaseLayout>
      <AsideLayout>
        <AsideLayoutSide menus={menus} namespace={'ui'} />
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
