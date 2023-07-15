import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { useFloatingAria } from '../floating/FloatingAriaContext';
import { useModal } from './ModalContext';

export const ModalBody = primitiveComponent<'div', Record<never, never>, 'id'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { scrollBehavior } = useModal();
  const { descriptionId } = useFloatingAria();

  return (
    <div
      id={descriptionId}
      ref={ref}
      className={cx(
        scrollBehavior == 'inside' && 'overflow-y-auto overscroll-contain scrollbar scrollbar-thin',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

if (__DEV__) {
  ModalBody.displayName = 'ModalBody';
}
