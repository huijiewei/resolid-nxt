import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { useFloatingAria } from '../floating/FloatingAriaContext';

export const PopoverBody = primitiveComponent<'div', Record<string, never>, 'id'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { descriptionId } = useFloatingAria();

  return (
    <div id={descriptionId} ref={ref} className={cx('px-3 py-2', className)} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  PopoverBody.displayName = 'PopoverBody';
}
