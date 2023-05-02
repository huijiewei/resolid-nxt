import { useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStatus } from '@floating-ui/react';
import { __DEV__ } from '@resolid/nxt-utils';
import { useEffect, useId, useMemo, type PropsWithChildren } from 'react';
import { usePrevious } from '../../hooks';
import { FloatingAriaProvider } from '../floating/FloatingAriaContext';
import { FloatingDispatchProvider } from '../floating/FloatingDispatchContext';
import { Portal } from '../portal/Portal';
import { ModalProvider, type ModalBaseProps, type ModalContext } from './ModalContext';

export type ModalProps = ModalBaseProps & {
  /**
   * onClose callback
   */
  onClose: () => void;
  /**
   * Fires when all exiting nodes have completed animating out
   */
  onCloseComplete?: () => void;

  /**
   * Close when the Esc key is pressed
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Close when you click outside the modal
   * @default true
   */
  closeOnBlur?: boolean;

  /**
   * Animation Duration
   * @default '250'
   */
  duration?: number;
};

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const {
    children,
    closeOnEsc = true,
    closeOnBlur = true,
    opened,
    duration = 250,
    onClose,
    onCloseComplete,
    lockScroll = true,
    initialFocus,
    finalFocus,
    scrollBehavior = 'inside',
  } = props;

  const { refs, context } = useFloating<HTMLElement>({
    open: opened,
    onOpenChange: (opened) => {
      if (!opened) {
        onClose();
      }
    },
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const ariaContext = useMemo(
    () => ({
      labelId,
      descriptionId,
    }),
    [descriptionId, labelId]
  );

  const { getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, { escapeKey: closeOnEsc, outsidePress: closeOnBlur }),
  ]);

  const { isMounted, status } = useTransitionStatus(context, {
    duration: duration,
  });

  const modalContext = useMemo<ModalContext>(
    () => ({
      opened,
      status,
      duration,
      context,
      setFloating: refs.setFloating,
      getFloatingProps,
      initialFocus,
      finalFocus,
      scrollBehavior,
      lockScroll,
    }),
    [
      opened,
      status,
      duration,
      context,
      refs.setFloating,
      getFloatingProps,
      initialFocus,
      finalFocus,
      scrollBehavior,
      lockScroll,
    ]
  );

  const prevStatus = usePrevious(status);

  useEffect(() => {
    if (prevStatus == 'close' && status == 'unmounted') {
      onCloseComplete && onCloseComplete();
    }
  }, [onCloseComplete, prevStatus, status]);

  return (
    <ModalProvider value={modalContext}>
      <FloatingAriaProvider value={ariaContext}>
        <FloatingDispatchProvider value={{ close: onClose }}>
          {isMounted && <Portal>{children}</Portal>}
        </FloatingDispatchProvider>
      </FloatingAriaProvider>
    </ModalProvider>
  );
};

if (__DEV__) {
  Modal.displayName = 'Modal';
}
