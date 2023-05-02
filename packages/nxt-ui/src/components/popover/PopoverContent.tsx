import { FloatingFocusManager, useTransitionStatus } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { useFloatingAria } from '../floating/FloatingAriaContext';
import { Portal } from '../portal/Portal';
import { usePopoverFloating } from './PopoverContext';

export const PopoverContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { floatingStyles, setFloating, context, getFloatingProps, modal, initialFocus } = usePopoverFloating();

  const { labelId, descriptionId } = useFloatingAria();

  const refs = useMergedRefs(setFloating, ref);

  const { isMounted, status } = useTransitionStatus(context, {
    duration: 300,
  });

  return (
    <>
      {isMounted && (
        <Portal>
          <FloatingFocusManager modal={modal} initialFocus={initialFocus} context={context}>
            <div
              className={cx('transition-opacity duration-300', status == 'open' ? 'opacity-1' : 'opacity-0')}
              style={floatingStyles}
              ref={refs}
              {...getFloatingProps({
                ...rest,
                'aria-labelledby': labelId,
                'aria-describedby': descriptionId,
              })}
            >
              <div className={cx('relative rounded border border-bg-muted bg-bg-default shadow', className)}>
                {children}
              </div>
            </div>
          </FloatingFocusManager>
        </Portal>
      )}
    </>
  );
});

if (__DEV__) {
  PopoverContent.displayName = 'PopoverContent';
}
