import { __DEV__, cx } from '@resolid/nxt-utils';
import type { PrimitiveProps } from '../../primitives';

export const ModalFooter = (props: PrimitiveProps<'footer'>) => {
  const { children, className, ...rest } = props;

  return (
    <footer className={cx('p-3', className)} {...rest}>
      {children}
    </footer>
  );
};

if (__DEV__) {
  ModalFooter.displayName = 'ModalFooter';
}
