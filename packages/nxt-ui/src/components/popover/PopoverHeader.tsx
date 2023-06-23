import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { useFloatingAria } from '../floating/FloatingAriaContext';

export const PopoverHeader = primitiveComponent<'header', Record<string, never>, 'id'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { labelId } = useFloatingAria();

  return (
    <header id={labelId} ref={ref} className={cx('border-b border-b-bg-subtle px-3 py-2', className)} {...rest}>
      {children}
    </header>
  );
});

if (__DEV__) {
  PopoverHeader.displayName = 'PopoverHeader';
}
