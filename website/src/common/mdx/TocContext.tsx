import { createContext } from '@resolid/nxt-ui';
import type { TocItem } from '~/common/mdx/TocSection';

export const filterTocSection = (toc: TocItem[]) => {
  return toc.filter((item) => item.depth > 1 && item.depth <= 3);
};

const [TocContextProvider, useTocContext] = createContext<TocItem[]>({
  strict: true,
  name: 'TocContext',
});

export { TocContextProvider, useTocContext };
