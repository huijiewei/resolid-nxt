import { __DEV__ } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import type { Color } from '../../utils/types';
import { PaginationItem } from './PaginationItem';
import { PaginationJumper } from './PaginationJumper';
import type { PaginationItemProps, UsePaginationOptions } from './usePagination';
import { usePagination } from './usePagination';

export type PaginationProps = UsePaginationOptions & {
  /**
   * Color
   * @default 'primary'
   */
  color?: Color;

  /**
   * Show total number
   * @default true
   */
  showTotal?: boolean;

  /**
   * Show jumper input
   * @default false
   */
  showJumper?: boolean;

  /**
   * Custom page item render
   */
  itemRender?: (props: PaginationItemProps) => JSX.Element;
};

export const Pagination = primitiveComponent<'div', PaginationProps>((props, ref) => {
  const {
    className,
    color = 'primary',
    disabled = false,
    page,
    defaultPage,
    pageSize,
    total,
    siblings,
    boundaries,
    onChange,
    showTotal = true,
    showJumper = false,
    itemRender = (props) => <PaginationItem color={color} {...props} />,
    ...rest
  } = props;

  const {
    pages,
    totalPage,
    page: currentPage,
    setPage,
  } = usePagination({
    page,
    defaultPage,
    total,
    pageSize,
    siblings,
    boundaries,
    disabled,
    onChange,
  });

  return (
    <div role={'navigation'} ref={ref} className={cx('flex flex-wrap gap-3', className)} {...rest}>
      {showTotal && (
        <div className={'flex flex-wrap items-center justify-center rounded bg-bg-subtle px-2'}>Total {total}</div>
      )}
      <ul className={'flex flex-wrap gap-2'}>
        {pages.map((page) => (
          <li key={`${page.type}-${page.page}`}>{itemRender({ ...page })}</li>
        ))}
      </ul>
      {showJumper && <PaginationJumper page={currentPage} totalPage={totalPage} setPage={setPage} />}
    </div>
  );
});

if (__DEV__) {
  Pagination.displayName = 'Pagination';
}
