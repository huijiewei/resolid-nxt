import { FloatingFocusManager, useTransitionStatus } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { Portal } from '../portal/Portal';
import { usePopoverAria, usePopoverFloating } from './PopoverContext';

export const PopoverContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { x, y, setFloating, context, getFloatingProps, modal, initialFocus } = usePopoverFloating();

  const { labelId, descriptionId } = usePopoverAria();

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
              className={cx(
                'absolute z-10 outline-none',
                'transition-opacity duration-300',
                status == 'open' ? 'opacity-1' : 'opacity-0'
              )}
              {...getFloatingProps({
                ...rest,
                ref: refs,
                'aria-labelledby': labelId,
                'aria-describedby': descriptionId,
                style: {
                  top: y ? `${y}px` : '',
                  left: x ? `${x}px` : '',
                },
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
