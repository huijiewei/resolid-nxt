import { cx } from '@resolid/nxt-utils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type TocItem = {
  depth: number;
  text: string;
  slug: string;
};

export type GetMdxPath = (pathname: string) => string;

const getHeadingsFromToc = (tableOfContents: TocItem[]) => {
  return tableOfContents.map(({ slug }) => {
    const el = document.getElementById(slug);

    if (!el) {
      return;
    }

    const style = window.getComputedStyle(el);

    const scrollMt = parseFloat(style.scrollMarginTop) + 1;

    const top = window.scrollY + el.getBoundingClientRect().top - scrollMt;

    return { slug, top };
  });
};

const useCurrentSection = (toc: TocItem[]) => {
  const [section, setSection] = useState<string | undefined>(toc[0]?.slug);

  useEffect(() => {
    if (toc.length == 0) {
      return;
    }

    const headings = getHeadingsFromToc(toc);

    const onScroll = () => {
      const top = window.scrollY;

      let current = headings[0]?.slug;

      for (const heading of headings) {
        if (heading == null) {
          continue;
        }

        if (top >= heading.top) {
          current = heading.slug;
        } else {
          break;
        }
      }

      setSection(current);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      // @ts-expect-error No overload matches this call.
      window.removeEventListener('scroll', onScroll, { passive: true });
    };
  }, [toc]);

  return section;
};

const TocSections = ({ toc }: { toc: TocItem[] }) => {
  const currentSection = useCurrentSection(toc);

  return (
    <>
      {toc.map((item) => (
        <li key={item.slug}>
          <a
            className={cx(
              '-ml-px block border-s py-1',
              item.depth == 2 ? 'ps-4' : 'ps-8',
              item.slug == currentSection
                ? 'border-blue-300 text-blue-600'
                : 'text-gray-600 hover:border-gray-300 hover:text-gray-700'
            )}
            href={'#' + item.slug}
          >
            {item.text}
          </a>
        </li>
      ))}
    </>
  );
};

export const TableOfContents = ({ getMdxPath }: { getMdxPath: GetMdxPath }) => {
  const { pathname } = useLocation();

  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const paths = getMdxPath(pathname).split('/');

    (async () => {
      try {
        const { getHeadings } =
          paths.length == 5
            ? await import(`../../modules/${paths[0]}/${paths[1]}/${paths[2]}/${paths[3]}/${paths[4]}.mdx`)
            : paths.length == 4
            ? await import(`../../modules/${paths[0]}/${paths[1]}/${paths[2]}/${paths[3]}.mdx`)
            : paths.length == 3
            ? await import(`../../modules/${paths[0]}/${paths[1]}/${paths[2]}.mdx`)
            : paths.length == 2
            ? await import(`../../modules/${paths[0]}/${paths[1]}.mdx`)
            : await import(`../../modules/${paths[0]}.mdx`);

        const headings = (getHeadings() as TocItem[]).filter((h) => h.depth > 1 && h.depth <= 3);

        setToc(headings);
      } catch (ex) {
        setToc([]);
      }
    })();

    return () => {
      setToc([]);
    };
  }, [pathname, getMdxPath]);

  return (
    <ul className={'sticky top-20 space-y-1 border-s'}>
      <TocSections toc={toc} />
    </ul>
  );
};
