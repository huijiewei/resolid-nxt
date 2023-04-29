import { __DEV__, cx } from '@resolid/nxt-utils';
import type { PrimitiveProps } from '../../primitives';

export const PopoverFooter = (props: PrimitiveProps<'footer'>) => {
  const { children, className, ...rest } = props;

  return (
    <footer className={cx('border-t border-t-bg-subtle px-3 py-2', className)} {...rest}>
      {children}
    </footer>
  );
};

if (__DEV__) {
  PopoverFooter.displayName = 'PopoverFooter';
}
