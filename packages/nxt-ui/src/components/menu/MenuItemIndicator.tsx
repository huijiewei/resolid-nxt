import { __DEV__, cx } from '@resolid/nxt-utils';
import { type PrimitiveProps } from '../../primitives';
import { useMenuItemIndicator } from './MenuItemIndicatorContext';

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
