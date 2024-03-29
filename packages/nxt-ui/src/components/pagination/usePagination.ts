import { isNumber } from '@resolid/nxt-utils';
import { useControllableState } from '../../hooks';

type PageType = 'page' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis';

export type UsePaginationOptions = {
  /**
   * Current page
   */
  page?: number;

  /**
   * Default page
   * @default 1
   */
  defaultPage?: number;

  /**
   * Total number
   * @default 10
   */
  total: number;

  /**
   * Page size
   * @default 20
   */
  pageSize?: number;

  /**
   * Siblings
   * @default 2
   */
  siblings?: number;

  /**
   * Boundaries
   * @default 2
   */
  boundaries?: number;

  /**
   * Disabled
   */
  disabled?: boolean;

  /**
   * onChange callback
   */
  onChange?: (page: number) => void;
};

export type PaginationItemProps = {
  onClick: () => void;
  disabled: boolean;
  page: number;
  type: PageType;
  selected: boolean;
};

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const usePagination = (
  options: UsePaginationOptions,
): { pages: PaginationItemProps[]; totalPage: number; page: number; setPage: (page: number) => void } => {
  const {
    page,
    defaultPage = 1,
    onChange,
    total,
    pageSize = 20,
    siblings = 2,
    boundaries = 2,
    disabled = false,
  } = options;

  const totalPage = Math.max(1, Math.ceil(total / pageSize));

  const [pageState, setPageState] = useControllableState<number>({
    value: page,
    defaultValue: defaultPage,
    onChange,
  });

  const startPages = range(1, Math.min(boundaries, totalPage));
  const endPages = range(Math.max(totalPage - boundaries + 1, boundaries + 1), totalPage);

  const siblingsStart = Math.max(
    Math.min(pageState - siblings, totalPage - boundaries - siblings * 2 - 1),
    boundaries + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(pageState + siblings, boundaries + siblings * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : totalPage - 1,
  );

  // ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next']
  const items = [
    ...['previous'],
    ...startPages,
    ...(siblingsStart > boundaries + 2
      ? ['start-ellipsis']
      : boundaries + 1 < totalPage - boundaries
        ? [boundaries + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < totalPage - boundaries - 1
      ? ['end-ellipsis']
      : totalPage - boundaries > boundaries
        ? [totalPage - boundaries]
        : []),
    ...endPages,
    ...['next'],
  ];

  const buttonPage = (type: string): number => {
    switch (type) {
      case 'previous':
        return pageState - 1;
      case 'next':
        return pageState + 1;
      case 'start-ellipsis':
        return Math.max(1, pageState - 5);
      case 'end-ellipsis':
        return Math.min(totalPage, pageState + 5);
      default:
        return 0;
    }
  };

  const pages = items.map((item) => {
    return isNumber(item)
      ? {
          onClick: () => {
            setPageState(item);
          },
          type: 'page' as PageType,
          page: item,
          selected: item == pageState,
          disabled,
        }
      : {
          onClick: () => {
            setPageState(buttonPage(item));
          },
          type: item as PageType,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (item.indexOf('ellipsis') == -1 &&
              (item === 'next' || item == 'last' ? pageState >= totalPage : pageState <= 1)),
        };
  });

  return { pages, totalPage, page: pageState, setPage: setPageState };
};
