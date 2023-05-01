import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { CloseButton } from '../close-button/CloseButton';
import { useFloatingDispatch } from '../floating/FloatingDispatchContext';

export const PopoverCloseButton = primitiveComponent<'button'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { close } = useFloatingDispatch();

  return (
    <CloseButton
      onClick={close}
      ref={ref}
      className={cx(
        'absolute top-1 right-1 rounded p-0.5 text-lg text-fg-muted hover:bg-bg-subtle active:bg-bg-muted',
        className
      )}
      {...rest}
    >
      {children}
    </CloseButton>
  );
});

if (__DEV__) {
  PopoverCloseButton.displayName = 'PopoverCloseButton';
}