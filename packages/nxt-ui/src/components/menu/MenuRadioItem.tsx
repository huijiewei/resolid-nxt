import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { MenuItem } from './MenuItem';
import { MenuItemIndicatorProvider } from './MenuItemIndicatorContext';
import { useMenuRadioGroup } from './MenuRadioGroupContext';

export type MenuRadioItemProps = {
  value: string | number;
};

export const MenuRadioItem = primitiveComponent<typeof MenuItem, MenuRadioItemProps>((props, ref) => {
  const { value, onClick, children, className, ...rest } = props;

  const group = useMenuRadioGroup();
  const checked = value == group.value;

  return (
    <MenuItemIndicatorProvider value={{ checked }}>
      <MenuItem
        role="menuitemradio"
        onClick={() => {
          group.onChange?.(value);
          onClick && onClick();
        }}
        aria-checked={checked}
        className={cx('relative pl-6', className)}
        {...rest}
        ref={ref}
      >
        {children}
      </MenuItem>
    </MenuItemIndicatorProvider>
  );
});

if (__DEV__) {
  MenuRadioItem.displayName = 'MenuRadioItem';
}
