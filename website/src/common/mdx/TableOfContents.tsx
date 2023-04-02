import { cx } from '@resolid/nxt-utils';

type TocItem = {
  depth: number;
  text: string;
  slug: string;
};

export const TableOfContents = (props: { module: string; path: string }) => {
  const toc: TocItem[] = [];

  return (
    <ul className={'sticky top-20 space-y-1 border-l border-gray-200'}>
      {toc.map((item) => (
        <li key={item.slug}>
          <a
            className={cx(
              '-ml-px block border-l py-1',
              item.depth == 2 ? 'pl-4' : 'pl-8',
              item.slug == '11'
                ? 'border-l-blue-300 text-blue-500'
                : 'border-l-transparent text-gray-500 hover:border-l-gray-300 hover:text-gray-700'
            )}
            href={'#' + item.slug}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
};
