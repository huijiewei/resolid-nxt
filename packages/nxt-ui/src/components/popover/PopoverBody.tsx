import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { usePopoverAria } from './PopoverContext';

export const PopoverBody = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { descriptionId } = usePopoverAria();

  return (
    <div id={descriptionId} ref={ref} className={cx('px-3 py-2', className)} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  PopoverBody.displayName = 'PopoverBody';
}
