import { FloatingFocusManager } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { useEffect, type CSSProperties } from 'react';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { useFloatingAria } from '../floating/FloatingAriaContext';
import { useModal } from '../modal/ModalContext';
import { useDrawer } from './DrawerContext';

const placementStyles = {
  left: 'left-0 top-0 bottom-0',
  right: 'right-0 top-0 bottom-0',
  top: 'top-0 left-0 right-0',
  bottom: 'bottom-0 left-0 right-0',
};

const placementTransformStyles = {
  left: {
    open: 'translate-x-none',
    close: '-translate-x-full',
  },
  right: {
    open: 'translate-x-none',
    close: 'translate-x-full',
  },
  top: {
    open: 'translate-y-none',
    close: '-translate-y-full',
  },
  bottom: {
    open: 'translate-y-none',
    close: 'translate-y-full',
  },
};

export const DrawerContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;
  const { placement } = useDrawer();
  const { labelId, descriptionId } = useFloatingAria();
  const { opened, status, duration, setFloating, context, getFloatingProps, initialFocus, finalFocus } = useModal();

  useEffect(() => {
    if (!opened) {
      finalFocus && finalFocus.current?.focus();
    }
  }, [opened, finalFocus]);

  const refs = useMergedRefs(ref, setFloating);

  const transformStyle = placementTransformStyles[placement];

  return (
    <div className={cx('fixed left-0 top-0 z-40 flex h-screen w-screen justify-center')}>
      <FloatingFocusManager initialFocus={initialFocus} returnFocus={finalFocus == undefined} context={context}>
        <div
          className={cx(
            'fixed flex flex-col bg-bg-default shadow',
            'transition-[opacity,transform] duration-[--duration-var] ease-in-out',
            status == 'open' ? `opacity-1 ${transformStyle.open}` : `opacity-0 ${transformStyle.close}`,
            placementStyles[placement],
            className,
          )}
          style={{ '--duration-var': `${duration}ms` } as CSSProperties}
          ref={refs}
          {...getFloatingProps({
            ...rest,
            'aria-labelledby': labelId,
            'aria-describedby': descriptionId,
          })}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </div>
  );
});

if (__DEV__) {
  DrawerContent.displayName = 'DrawerContent';
}
