import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  type Placement,
} from '@floating-ui/react';
import { __DEV__, runIfFn } from '@resolid/nxt-utils';
import type { ReactNode, RefObject } from 'react';
import { useId, useMemo, useRef } from 'react';
import { useDisclosure } from '../../hooks';
import { FloatingArrowProvider } from '../floating/FloatingArrowContext';
import { FloatingDispatchProvider } from '../floating/FloatingDispatchContext';
import { FloatingReferenceProvider } from '../floating/FloatingReferenceContext';
import { PopoverAriaProvider, PopoverFloatingProvider } from './PopoverContext';

export type PopoverProps = {
  /**
   * Opened
   */
  opened?: boolean;

  /**
   * onClose callback
   */
  onClose?: () => void;

  /**
   * Initial Focus
   */
  initialFocus?: number | RefObject<HTMLElement>;

  /**
   * Is Modal
   * @default true
   */
  modal?: boolean;

  /**
   * Close when press esc key
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Close when you click outside the popover
   * @default true
   */
  closeOnBlur?: boolean;

  /**
   * Placement
   * @default 'auto'
   */
  placement?: 'auto' | Placement;

  /**
   * @ignore
   */
  children?: ReactNode | ((props: { opened: boolean; close: () => void }) => ReactNode);
};

export const Popover = (props: PopoverProps) => {
  const {
    children,
    placement = 'auto',
    closeOnEsc = true,
    closeOnBlur = true,
    modal = true,
    opened,
    onClose,
    initialFocus,
  } = props;

  const arrowRef = useRef<SVGSVGElement>(null);

  const { opened: openedState, open, close } = useDisclosure({ opened, onClose });

  const { x, y, refs, context } = useFloating({
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

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, { escapeKey: closeOnEsc, outsidePress: closeOnBlur }),
  ]);

  const ariaContext = useMemo(
    () => ({
      labelId,
      descriptionId,
    }),
    [descriptionId, labelId]
  );

  const referenceContext = useMemo(
    () => ({
      opened: openedState,
      setReference: refs.setReference,
      getReferenceProps,
    }),
    [getReferenceProps, openedState, refs.setReference]
  );

  const floatingContext = useMemo(
    () => ({
      x,
      y,
      opened: openedState,
      context,
      setFloating: refs.setFloating,
      getFloatingProps,
      modal,
      initialFocus,
    }),
    [x, y, openedState, context, refs.setFloating, getFloatingProps, modal, initialFocus]
  );

  const arrowContext = useMemo(
    () => ({
      context,
      setArrow: arrowRef,
      fillClassName: 'fill-bg-default',
      strokeClassName: 'stroke-bg-muted',
    }),
    [context]
  );

  return (
    <PopoverAriaProvider value={ariaContext}>
      <FloatingArrowProvider value={arrowContext}>
        <FloatingDispatchProvider value={{ close }}>
          <FloatingReferenceProvider value={referenceContext}>
            <PopoverFloatingProvider value={floatingContext}>
              {runIfFn(children, { opened: openedState, close })}
            </PopoverFloatingProvider>
          </FloatingReferenceProvider>
        </FloatingDispatchProvider>
      </FloatingArrowProvider>
    </PopoverAriaProvider>
  );
};

if (__DEV__) {
  Popover.displayName = 'Popover';
}
