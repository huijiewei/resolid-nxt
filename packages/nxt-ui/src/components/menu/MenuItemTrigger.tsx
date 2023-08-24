import { useListItem } from '@floating-ui/react';
import { __DEV__, ariaAttr, dataAttr } from '@resolid/nxt-utils';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import { useFloatingDispatch } from '../floating/FloatingDispatchContext';
import { useFloatingReference } from '../floating/FloatingReferenceContext';
import { useMenuSelect } from './MenuContext';

export const MenuItemTrigger = primitiveComponent<'button'>((props, ref) => {
  const { children, className, disabled, ...rest } = props;

  const { setReference, getReferenceProps, opened } = useFloatingReference();
  const { close } = useFloatingDispatch();

  const { getItemProps, activeIndex } = useMenuSelect();
  const { ref: itemRef, index } = useListItem();

  const isActive = index === activeIndex && index !== null;

  const refs = useMergedRefs(ref, itemRef, setReference);

  return (
    <button
      ref={refs}
      role={'menuitem'}
      disabled={disabled}
      data-disabled={dataAttr(disabled)}
      aria-disabled={ariaAttr(disabled)}
      data-opened={dataAttr(opened)}
      tabIndex={isActive ? 0 : -1}
      className={cx(
        'flex w-full cursor-default items-center justify-between rounded px-2 py-1 pe-0 outline-none transition-colors',
        'focus:bg-bg-subtle disabled:text-fg-muted opened:[&:not(:focus)]:bg-bg-subtlest',
        className,
      )}
      {...getReferenceProps({
        ...rest,
        onKeyDown: (event) => {
          if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            close();
          }
        },
      })}
      {...getItemProps({
        onClick: (event) => {
          event.stopPropagation();
        },
      })}
    >
      {children}
      <span className={cx('ml-3', disabled ? 'text-fg-subtle' : 'text-fg-muted')}>
        <svg
          className={'h-4 w-4'}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </button>
  );
});

if (__DEV__) {
  MenuItemTrigger.displayName = 'MenuItemTrigger';
}
