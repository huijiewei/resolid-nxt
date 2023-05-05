import { FloatingFocusManager } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { useEffect, type CSSProperties } from 'react';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { useFloatingAria } from '../floating/FloatingAriaContext';
import { useModal } from './ModalContext';

export const ModalContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, style, ...rest } = props;
  const {
    opened,
    centered,
    status,
    duration,
    setFloating,
    context,
    getFloatingProps,
    initialFocus,
    finalFocus,
    scrollBehavior,
  } = useModal();

  const { labelId, descriptionId } = useFloatingAria();

  useEffect(() => {
    if (!opened) {
      finalFocus && finalFocus.current?.focus();
    }
  }, [opened, finalFocus]);

  const refs = useMergedRefs(ref, setFloating);

  return (
    <div
      className={cx(
        'fixed left-0 top-0 z-40 flex w-screen justify-center',
        centered ? 'items-center' : 'items-start',
        scrollBehavior == 'inside' ? 'h-screen' : 'h-full overflow-y-auto'
      )}
    >
      <FloatingFocusManager initialFocus={initialFocus} returnFocus={finalFocus == undefined} context={context}>
        <div
          className={cx(
            'relative flex flex-col rounded border border-bg-muted bg-bg-default shadow',
            centered ? 'my-6' : 'my-16',
            scrollBehavior == 'inside' && (centered ? 'max-h-[calc(100%-2rem)]' : 'max-h-[calc(100%-7rem)]'),
            'transition-opacity duration-[--duration-var]',
            status == 'open' ? 'opacity-1' : 'opacity-0',
            className
          )}
          style={{ ...style, '--duration-var': `${duration}ms` } as CSSProperties}
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
  ModalContent.displayName = 'ModalContent';
}
