import { createContext } from '@resolid/nxt-ui';
import type { TocItem } from '~/common/mdx/TocSection';

const [TocContextProvider, useTocContext] = createContext<TocItem[]>({
  strict: true,
  name: 'TocContext',
});

export { TocContextProvider, useTocContext };
