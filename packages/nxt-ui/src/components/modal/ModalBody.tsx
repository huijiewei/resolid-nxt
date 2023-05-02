import { __DEV__, cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';
import { useModal } from './ModalContext';

export const ModalBody = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { scrollBehavior } = useModal();

  return (
    <div
      ref={ref}
      className={cx(
        'flex-1 px-3 py-2',
        scrollBehavior == 'inside' && 'overflow-y-auto overscroll-contain scrollbar scrollbar-thin',
        className
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
