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
import { useCallback, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { useAllowHover } from '../../hooks';
import { FloatingArrowProvider, type FloatingArrowContext } from '../floating/FloatingArrowContext';
import { MenuDispatchProvider, MenuFloatingProvider, MenuReferenceProvider } from './MenuContext';

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

export const MenuComponent = (props: PropsWithChildren<MenuProps>) => {
  const {
    children,
    closeOnEsc = true,
    closeOnBlur = true,
    closeOnSelect = true,
    opened = false,
    placement = 'bottom-start',
    onClose,
  } = props;

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const nested = parentId != null;

  const allowHover = useAllowHover();

  const [openedState, setOpenedState] = useState(opened);

  const arrowRef = useRef<SVGSVGElement>(null);

  const { x, y, refs, context } = useFloating({
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
      setOpenedState(opened);

      if (!opened) {
        onClose && onClose();
      }
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
      getReferenceProps,
    }),
    [getReferenceProps, openedState, refs.setReference]
  );

  const floatingContext = useMemo(
    () => ({
      nested,
      tree,
      x,
      y,
      context,
      setFloating: refs.setFloating,
      getFloatingProps,
      elementsRef,
      getItemProps,
      activeIndex,
    }),
    [nested, tree, x, y, context, refs.setFloating, getFloatingProps, getItemProps, activeIndex]
  );

  const arrowContext = useMemo<FloatingArrowContext>(
    () => ({
      context,
      setArrow: arrowRef,
      fillClassName: 'fill-bg-default',
      strokeClassName: 'stroke-bg-muted',
    }),
    [context]
  );

  const handleClose = useCallback(() => {
    setOpenedState(false);

    onClose && onClose();
  }, [onClose]);

  useEffect(() => {
    const handleClick = () => {
      if (closeOnSelect) {
        handleClose();
      }
    };

    tree?.events.on('click', handleClick);

    return () => {
      tree?.events.off('click', handleClick);
    };
  }, [tree, handleClose, closeOnSelect]);

  return (
    <FloatingArrowProvider value={arrowContext}>
      <MenuReferenceProvider value={referenceContext}>
        <MenuFloatingProvider value={floatingContext}>
          <MenuDispatchProvider value={{ close: handleClose }}>
            <FloatingNode id={nodeId}>{children}</FloatingNode>
          </MenuDispatchProvider>
        </MenuFloatingProvider>
      </MenuReferenceProvider>
    </FloatingArrowProvider>
  );
};
