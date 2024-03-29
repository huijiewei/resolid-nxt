import { FloatingFocusManager, FloatingList, useTransitionStatus } from '@floating-ui/react';
import { __DEV__ } from '@resolid/nxt-utils';
import type { CSSProperties } from 'react';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { cx } from '../../utils/cva';
import { Portal } from '../portal/Portal';
import { MenuSelectProvider, useMenuFloating } from './MenuContext';

export const MenuContent = primitiveComponent<'div'>((props, ref) => {
  const { children, className, ...rest } = props;

  const {
    nested,
    tree,
    duration,
    floatingStyles,
    context,
    setFloating,
    getFloatingProps,
    elementsRef,
    getItemProps,
    activeIndex,
  } = useMenuFloating();

  const refs = useMergedRefs(setFloating, ref);

  const { isMounted, status } = useTransitionStatus(context, {
    duration: duration,
  });

  return (
    <>
      {isMounted && (
        <Portal>
          <FloatingFocusManager modal={false} initialFocus={nested ? -1 : 0} returnFocus={!nested} context={context}>
            <div
              className={cx(
                'rounded border border-bg-muted bg-bg-default p-1.5 shadow outline-none',
                'transition-opacity duration-[--duration-var]',
                status == 'open' ? 'opacity-1' : 'opacity-0',
                className,
              )}
              ref={refs}
              style={{ ...floatingStyles, '--duration-var': `${duration}ms` } as CSSProperties}
              {...getFloatingProps({
                ...rest,
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
