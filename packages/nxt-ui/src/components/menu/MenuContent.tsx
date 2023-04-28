import { FloatingFocusManager, FloatingList, useTransitionStatus } from '@floating-ui/react';
import { __DEV__, cx } from '@resolid/nxt-utils';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { Portal } from '../portal/Portal';
import { MenuSelectProvider, useMenuFloating } from './MenuContext';

export const MenuContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const { nested, tree, x, y, context, setFloating, getFloatingProps, elementsRef, getItemProps, activeIndex } =
    useMenuFloating();

  const refs = useMergedRefs(setFloating, ref);

  const { isMounted, status } = useTransitionStatus(context, {
    duration: 300,
  });

  return (
    <>
      {isMounted && (
        <Portal>
          <FloatingFocusManager modal={false} initialFocus={nested ? -1 : 0} returnFocus={!nested} context={context}>
            <div
              className={cx(
                'absolute outline-none',
                'rounded border border-bg-muted bg-bg-default p-1.5 shadow',
                'transition-opacity duration-300',
                status == 'open' ? 'opacity-1' : 'opacity-0',
                className
              )}
              ref={refs}
              {...getFloatingProps({
                ...rest,
                style: {
                  top: y ? `${y}px` : '',
                  left: x ? `${x}px` : '',
                },
              })}
            >
              <MenuSelectProvider value={{ getItemProps, activeIndex, tree }}>
                <FloatingList elementsRef={elementsRef}>{children}</FloatingList>
              </MenuSelectProvider>
            </div>
          </FloatingFocusManager>
        </Portal>
      )}
    </>
  );
});

if (__DEV__) {
  MenuContent.displayName = 'MenuContent';
}
