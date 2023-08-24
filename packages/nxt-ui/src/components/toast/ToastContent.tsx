import { useFloating, useTransitionStatus } from '@floating-ui/react';
import { __DEV__ } from '@resolid/nxt-utils';
import { useCallback, useEffect, useState } from 'react';
import { usePrevious, useTimeout } from '../../hooks';
import { cx } from '../../utils/cva';
import { Toast } from './Toast';
import type { ToastOptions } from './ToastContext';

type ToastContentProps = ToastOptions;

const placementTransformStyles = {
  top: {
    init: '',
    open: '',
    close: '-translate-y-2',
  },
  bottom: {
    init: '',
    open: '',
    close: 'translate-y-2',
  },
};

export const ToastContent = (props: ToastContentProps) => {
  const { id, duration = 5000, placement = 'bottom', remove, onRemove, onClose, className, ...rest } = props;

  const [open, setOpen] = useState(true);
  const [delay, setDelay] = useState(duration);

  const { context, refs } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const { isMounted, status } = useTransitionStatus(context, {
    duration: 250,
  });

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose && onClose();
  }, [onClose]);

  useEffect(() => {
    if (remove) {
      handleClose();
    }
  }, [handleClose, remove]);

  const prevStatus = usePrevious(status);

  useEffect(() => {
    if (prevStatus == 'close' && status == 'unmounted') {
      onRemove && onRemove();
    }
  }, [onRemove, prevStatus, status]);

  useTimeout(handleClose, delay);

  const transformStyle = placementTransformStyles[placement?.split('-')[0] as keyof typeof placementTransformStyles];

  return isMounted ? (
    <div
      className={cx(
        'flex flex-col items-center',
        'transition-[opacity,transform] duration-[250ms]',
        status == 'open' && `opacity-1 ${transformStyle.open}`,
        status == 'close' && `opacity-0 ${transformStyle.close}`,
        status == 'initial' && `opacity-0 ${transformStyle.init}`,
      )}
      ref={refs.setFloating}
      role="status"
      aria-atomic="true"
      onFocus={() => setDelay(null)}
      onBlur={() => setDelay(duration)}
      onMouseOver={() => setDelay(null)}
      onMouseLeave={() => setDelay(duration)}
    >
      <Toast id={id} onClose={() => handleClose()} className={cx('pointer-events-auto', className)} {...rest} />
    </div>
  ) : null;
};

if (__DEV__) {
  ToastContent.displayName = 'ToastContent';
}
