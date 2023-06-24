import { useListItem } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { useMergedRefs } from '../../hooks';
import { polymorphicComponent } from '../../primitives';
import { useMenuSelect } from './MenuContext';

type DropdownMenuItemProps = {
  onClick?: () => void;
};

export const MenuItem = polymorphicComponent<'button', DropdownMenuItemProps, 'type'>((props, ref) => {
  const { as: Component = 'button', className, children, onClick, disabled = false, ...rest } = props;

  const { tree, getItemProps, activeIndex } = useMenuSelect();
  const { ref: itemRef, index } = useListItem();

  const refs = useMergedRefs(ref, itemRef);

  const isActive = index === activeIndex && index !== null;

  return (
    <Component
      ref={refs}
      role={'menuitem'}
      type={Component == 'button' ? 'button' : undefined}
      disabled={disabled}
      className={cx(
        'flex w-full cursor-default items-center rounded py-1 px-2 outline-none transition-colors',
        'focus:bg-bg-subtle disabled:text-fg-muted',
        className
      )}
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        onClick: () => {
          tree?.events.emit('click');
          onClick && onClick();
        },
      })}
      {...rest}
    >
      {children}
    </Component>
  );
});

if (__DEV__) {
  MenuItem.displayName = 'MenuItem';
}
