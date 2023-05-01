import { __DEV__, cx } from '@resolid/nxt-utils';
import { polymorphicComponent } from '../../primitives';
import type { Color } from '../../utils/types';
import type { PaginationItemProps } from './usePagination';

const paginationItemSelectedColorStyles = {
  neutral: {
    default: 'bg-bg-neutral-emphasis',
    hovered: 'hover:bg-bg-neutral-emphasis-hovered',
  },
  primary: {
    default: 'bg-bg-primary-emphasis',
    hovered: 'hover:bg-bg-primary-emphasis-hovered',
  },
  success: {
    default: 'bg-bg-success-emphasis',
    hovered: 'hover:bg-bg-success-emphasis-hovered',
  },
  warning: {
    default: 'bg-bg-warning-emphasis',
    hovered: 'hover:bg-bg-warning-emphasis-hovered',
  },
  danger: {
    default: 'bg-bg-danger-emphasis',
    hovered: 'hover:bg-bg-danger-emphasis-hovered',
  },
};

export const PaginationItem = polymorphicComponent<'button', PaginationItemProps & { color: Color }>((props, ref) => {
  const { as: Component = 'button', className, color, page, type, disabled, selected, ...rest } = props;

  const title = type == 'previous' ? 'Prev' : type == 'next' ? 'Next' : `Page of ${page}`;

  const selectedStyle = paginationItemSelectedColorStyles[color];

  return (
    <Component
      ref={ref}
      title={title}
      disabled={disabled}
      aria-current={selected ? 'page' : undefined}
      className={cx(
        'disabled:cursor-not-allowed disabled:opacity-50 flex h-7 min-w-[1.75rem] select-none appearance-none items-center justify-center rounded px-2 transition-colors',
        selected ? `${selectedStyle.default} text-fg-emphasized` : 'bg-bg-subtle',
        !disabled && (selected ? selectedStyle.hovered : 'hover:bg-bg-muted'),
        className
      )}
      {...rest}
    >
      {type == 'previous' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={'1em'}
          width={'1em'}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      ) : type == 'next' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={'1em'}
          width={'1em'}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      ) : type == 'end-ellipsis' || type == 'start-ellipsis' ? (
        '...'
      ) : (
        page
      )}
    </Component>
  );
});

if (__DEV__) {
  PaginationItem.displayName = 'PaginationItem';
}
