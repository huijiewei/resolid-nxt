import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { usePopoverAria } from './PopoverContext';

export const PopoverHeader = primitiveComponent<'header'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { labelId } = usePopoverAria();

  return (
    <header id={labelId} ref={ref} className={cx('border-b border-b-bg-subtle px-3 py-2', className)} {...rest}>
      {children}
    </header>
  );
});

if (__DEV__) {
  PopoverHeader.displayName = 'PopoverHeader';
}
