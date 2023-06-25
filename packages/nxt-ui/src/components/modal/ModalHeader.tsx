import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { useFloatingAria } from '../floating/FloatingAriaContext';

export const ModalHeader = primitiveComponent<'header', Record<never, never>, 'id'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { labelId } = useFloatingAria();

  return (
    <header id={labelId} ref={ref} className={cx('flex-0 p-3 text-lg font-bold', className)} {...rest}>
      {children}
    </header>
  );
});

if (__DEV__) {
  ModalHeader.displayName = 'ModalHeader';
}
