import { __DEV__, cx } from '@resolid/nxt-utils';
import { createContext, type PrimitiveProps } from '../../primitives';

export type CheckedState = boolean | 'indeterminate';

type MenuItemIndicatorContext = {
  checked: CheckedState;
};

const [MenuItemIndicatorProvider, useMenuItemIndicator] = createContext<MenuItemIndicatorContext>({
  strict: true,
  name: 'MenuItemIndicatorContext',
});

export { MenuItemIndicatorProvider };

export const MenuItemIndicator = (props: PrimitiveProps<'span'>) => {
  const { className, children, ...rest } = props;

  const context = useMenuItemIndicator();

  return context.checked ? (
    <span className={cx('absolute w-6 left-0 inline-flex items-center justify-center', className)} {...rest}>
      {children}
    </span>
  ) : null;
};

if (__DEV__) {
  MenuItemIndicator.displayName = 'MenuItemIndicator';
}
