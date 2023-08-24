import { __DEV__ } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import { CloseButton } from '../close-button/CloseButton';
import { useFloatingDispatch } from '../floating/FloatingDispatchContext';

export const ModalCloseButton = primitiveComponent<'button'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { close } = useFloatingDispatch();

  return (
    <CloseButton
      onClick={() => close()}
      ref={ref}
      className={cx('absolute right-2 top-2 rounded p-1 text-lg', className)}
      {...rest}
    >
      {children}
    </CloseButton>
  );
});

if (__DEV__) {
  ModalCloseButton.displayName = 'ModalCloseButton';
}
