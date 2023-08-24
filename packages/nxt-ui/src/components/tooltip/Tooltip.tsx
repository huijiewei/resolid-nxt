import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStatus,
  type Placement,
} from '@floating-ui/react';
import { __DEV__ } from '@resolid/nxt-utils';
import { cloneElement, useMemo, useRef, type CSSProperties, type ReactNode } from 'react';
import { useDisclosure, useMergedRefs } from '../../hooks';
import type { PrimitiveProps } from '../../primitives';
import { cx } from '../../utils/cva';
import type { Color } from '../../utils/types';
import { FloatingArrow } from '../floating/FloatingArrow';
import { FloatingArrowProvider, type FloatingArrowContext } from '../floating/FloatingArrowContext';
import { Portal } from '../portal/Portal';

export type TooltipProps = {
  /**
   * Content
   */
  content: ReactNode;

  /**
   * Color
   * @default 'neutral'
   */
  color?: Color;

  /**
   * Placement
   * @default 'auto'
   */
  placement?: 'auto' | Placement;

  /**
   * Opened
   */
  opened?: boolean;

  /**
   * Animation Duration
   * @default '250'
   */
  duration?: number;

  /**
   * @ignore
   */
  children: JSX.Element;
};

const tooltipColorStyles = {
  primary: {
    content: 'border-bg-primary-emphasis-hovered bg-bg-primary-emphasis-hovered',
    arrow: 'fill-bg-primary-emphasis-hovered [&>path:first-of-type]:stroke-bg-primary-emphasis-hovered',
  },
  neutral: {
    content: 'border-bg-neutral-emphasis-hovered bg-bg-neutral-emphasis-hovered',
    arrow: 'fill-bg-neutral-emphasis-hovered [&>path:first-of-type]:stroke-bg-neutral-emphasis-hovered',
  },
  success: {
    content: 'border-bg-success-emphasis-hovered bg-bg-success-emphasis-hovered',
    arrow: 'fill-bg-success-emphasis-hovered [&>path:first-of-type]:stroke-bg-success-emphasis-hovered',
  },
  warning: {
    content: 'border-bg-warning-emphasis-hovered bg-bg-warning-emphasis-hovered',
    arrow: 'fill-bg-warning-emphasis-hovered [&>path:first-of-type]:stroke-bg-warning-emphasis-hovered',
  },
  danger: {
    content: 'border-bg-danger-emphasis-hovered bg-bg-danger-emphasis-hovered',
    arrow: 'fill-bg-danger-emphasis-hovered [&>path:first-of-type]:stroke-bg-danger-emphasis-hovered',
  },
};

export const Tooltip = (props: PrimitiveProps<'div', TooltipProps>) => {
  const {
    className,
    children,
    content,
    opened,
    duration = 250,
    placement = 'auto',
    color = 'neutral',
    ...rest
  } = props;

  const { opened: openedState, open, close } = useDisclosure({ opened });

  const arrowRef = useRef<SVGSVGElement>(null);

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      offset(8),
      placement == 'auto' ? autoPlacement() : flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowRef,
        padding: 4,
      }),
    ],
    open: openedState,
    onOpenChange: (opened) => {
      opened ? open() : close();
    },
    placement: placement == 'auto' ? undefined : placement,
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, status } = useTransitionStatus(context, {
    duration: duration,
  });

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useHover(context, { move: false }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  const colorStyle = tooltipColorStyles[color];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const referenceRefs = useMergedRefs((children as any).ref, refs.setReference);

  const arrowContext = useMemo<FloatingArrowContext>(
    () => ({
      context,
      setArrow: arrowRef,
      className: colorStyle.arrow,
    }),
    [colorStyle.arrow, context],
  );

  return (
    <FloatingArrowProvider value={arrowContext}>
      {cloneElement(children, getReferenceProps({ ref: referenceRefs, ...children.props }))}

      {isMounted && (
        <Portal>
          <div
            className={cx(
              'z-50 inline-block rounded border px-2 py-1 text-sm text-fg-emphasized shadow',
              colorStyle.content,
              'transition-opacity duration-[--duration-var]',
              status == 'open' ? 'opacity-1' : 'opacity-0',
              className,
            )}
            ref={refs.setFloating}
            style={
              {
                ...floatingStyles,
                '--duration-var': `${duration}ms`,
              } as CSSProperties
            }
            {...getFloatingProps({
              ...rest,
            })}
          >
            {content}
            <FloatingArrow width={10} height={5} />
          </div>
        </Portal>
      )}
    </FloatingArrowProvider>
  );
};

if (__DEV__) {
  Tooltip.displayName = 'Tooltip';
}
