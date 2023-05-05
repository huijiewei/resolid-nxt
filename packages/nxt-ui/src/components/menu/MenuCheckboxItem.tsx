import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { MenuItem } from './MenuItem';
import { MenuItemIndicatorProvider, type CheckedState } from './MenuItemIndicatorContext';

export type MenuCheckboxItemProps = {
  checked?: CheckedState;
  onChange?: (checked: CheckedState) => void;
};

export const MenuCheckboxItem = primitiveComponent<typeof MenuItem, MenuCheckboxItemProps>((props, ref) => {
  const { checked = false, className, onChange, onClick, children, ...rest } = props;

  return (
    <MenuItemIndicatorProvider value={{ checked }}>
      <MenuItem
        role="menuitemcheckbox"
        onClick={() => {
          onChange?.(checked == 'indeterminate' ? true : !checked);
          onClick && onClick();
        }}
        aria-checked={checked == 'indeterminate' ? 'mixed' : checked}
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
  MenuCheckboxItem.displayName = 'MenuCheckboxItem';
}
