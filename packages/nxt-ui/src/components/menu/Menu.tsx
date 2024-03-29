import type { Placement } from '@floating-ui/react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingNode,
  FloatingTree,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import { __DEV__ } from '@resolid/nxt-utils';
import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { useAllowHover, useDisclosure } from '../../hooks';
import { FloatingArrowProvider, type FloatingArrowContext } from '../floating/FloatingArrowContext';
import { FloatingDispatchProvider } from '../floating/FloatingDispatchContext';
import { FloatingReferenceProvider } from '../floating/FloatingReferenceContext';
import { MenuFloatingProvider, type MenuFloatingContext } from './MenuContext';

export type MenuProps = {
  /**
   * Opened
   */
  opened?: boolean;

  /**
   * onClose callback
   */
  onClose?: () => void;

  /**
   * Close when press esc key
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Close when you click outside the menu list
   * @default true
   */
  closeOnBlur?: boolean;

  /**
   * Close when a menu item is clicked
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Placement
   * @default 'bottom-start'
   */
  placement?: Placement;

  /**
   * Animation Duration
   * @default '250'
   */
  duration?: number;
};

export const Menu = (props: PropsWithChildren<MenuProps>) => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return (
      <FloatingTree>
        <MenuComponent {...props} />
      </FloatingTree>
    );
  }

  return <MenuComponent {...props} />;
};

if (__DEV__) {
  Menu.displayName = 'Menu';
}

const MenuComponent = (props: PropsWithChildren<MenuProps>) => {
  const {
    children,
    closeOnEsc = true,
    closeOnBlur = true,
    closeOnSelect = true,
    opened,
    duration = 250,
    placement = 'bottom-start',
    onClose,
  } = props;

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const nested = parentId != null;

  const allowHover = useAllowHover();

  const { opened: openedState, open, close } = useDisclosure({ opened, onClose });

  const arrowRef = useRef<SVGSVGElement>(null);

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      offset({ mainAxis: 8, alignmentAxis: nested ? -5 : 0 }),
      flip(),
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
    nodeId,
    placement: nested ? 'right-start' : placement,
    whileElementsMounted: autoUpdate,
  });

  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useHover(context, {
      enabled: nested && allowHover,
      handleClose: safePolygon(),
    }),
    useClick(context, { toggle: !nested || !allowHover, event: 'mousedown', ignoreMouse: nested }),
    useRole(context, { role: 'menu' }),
    useDismiss(context, { escapeKey: closeOnEsc, outsidePress: closeOnBlur }),
    useListNavigation(context, {
      listRef: elementsRef,
      nested,
      activeIndex,
      onNavigate: setActiveIndex,
    }),
  ]);

  const referenceContext = useMemo(
    () => ({
      opened: openedState,
      setReference: refs.setReference,
      setPositionReference: refs.setPositionReference,
      getReferenceProps,
    }),
    [getReferenceProps, openedState, refs.setPositionReference, refs.setReference],
  );

  const floatingContext = useMemo<MenuFloatingContext>(
    () => ({
      nested,
      duration,
      tree,
      floatingStyles,
      context,
      setFloating: refs.setFloating,
      getFloatingProps,
      elementsRef,
      getItemProps,
      activeIndex,
    }),
    [nested, duration, tree, floatingStyles, context, refs.setFloating, getFloatingProps, getItemProps, activeIndex],
  );

  const arrowContext = useMemo<FloatingArrowContext>(
    () => ({
      context,
      setArrow: arrowRef,
      className: 'fill-bg-default [&>path:first-of-type]:stroke-bg-muted',
    }),
    [context],
  );

  useEffect(() => {
    const handleClick = () => {
      if (closeOnSelect) {
        close();
      }
    };

    tree?.events.on('click', handleClick);

    return () => {
      tree?.events.off('click', handleClick);
    };
  }, [tree, closeOnSelect, close]);

  return (
    <FloatingArrowProvider value={arrowContext}>
      <FloatingReferenceProvider value={referenceContext}>
        <MenuFloatingProvider value={floatingContext}>
          <FloatingDispatchProvider value={{ close, open }}>
            <FloatingNode id={nodeId}>{children}</FloatingNode>
          </FloatingDispatchProvider>
        </MenuFloatingProvider>
      </FloatingReferenceProvider>
    </FloatingArrowProvider>
  );
};
