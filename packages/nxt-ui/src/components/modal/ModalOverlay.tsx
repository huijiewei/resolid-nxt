import { FloatingOverlay } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { primitiveComponent } from '../../primitives';
import { useModal } from './ModalContext';

export const ModalOverlay = primitiveComponent<'div'>((props, ref) => {
  const { className, ...rest } = props;

  const { lockScroll, status } = useModal();

  return (
    <>
      {lockScroll && <RemoveScrollBar />}
      <FloatingOverlay
        ref={ref}
        className={cx(
          'z-30 bg-bg-emphasized/60 transition-opacity duration-300',
          status == 'open' ? 'opacity-1' : 'opacity-0',
          className
        )}
        {...rest}
      />
    </>
  );
});

if (__DEV__) {
  ModalOverlay.displayName = 'ModalOverlay';
}
