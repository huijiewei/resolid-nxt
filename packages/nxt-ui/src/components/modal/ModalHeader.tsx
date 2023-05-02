import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';

export const ModalHeader = primitiveComponent<'header'>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <header ref={ref} className={cx('flex-0 p-3 text-lg font-bold', className)} {...rest}>
      {children}
    </header>
  );
});

if (__DEV__) {
  ModalHeader.displayName = 'ModalHeader';
}
