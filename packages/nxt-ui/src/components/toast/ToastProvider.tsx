import { __DEV__, runIfFn } from '@resolid/nxt-utils';
import { useMemo, useState, type CSSProperties, type PropsWithChildren } from 'react';
import { cx } from '../../utils/cva';
import { Portal } from '../portal/Portal';
import { ToastContent } from './ToastContent';
import type { ToastDispatchContext, ToastId, ToastOptions, ToastPlacement } from './ToastContext';
import { ToastDispatchProvider } from './ToastContext';

export type ToastProviderProps = {
  spacing?: string;
};

type ToastState = {
  [K in ToastPlacement]: ToastOptions[];
};

export const ToastProvider = ({ children, spacing = '0.75rem' }: PropsWithChildren<ToastProviderProps>) => {
  const [state, setState] = useState<ToastState>({
    'top-start': [],
    top: [],
    'top-end': [],
    'bottom-start': [],
    bottom: [],
    'bottom-end': [],
  });

  const context = useMemo(() => {
    const create: ToastDispatchContext['create'] = (options) => {
      const toastId = options.id || (`toast-${Math.random().toString(36).slice(2, 9)}` as ToastId);
      const placement = options.placement ?? 'bottom';

      const toast = options;
      toast.id = toastId;

      toast.onRemove = () => {
        setState((prev) => ({
          ...prev,
          [placement]: prev[placement].filter((toast) => toast.id != toastId),
        }));
      };

      setState((prev) => {
        const toasts = placement.includes('top')
          ? [toast, ...(prev[placement] || [])]
          : [...(prev[placement] || []), toast];

        return {
          ...prev,
          [placement]: toasts,
        };
      });

      return toastId;
    };

    const update: ToastDispatchContext['update'] = (id, options) => {
      if (!id) return;

      setState((prev) => {
        const next = { ...prev };
        const { placement, index } = findToast(next, id);

        if (placement && index !== -1) {
          next[placement][index] = {
            ...next[placement][index],
            ...options,
          };
        }

        return next;
      });
    };

    const promise: ToastDispatchContext['promise'] = (promise, options) => {
      const toastId = create({ ...options.pending, duration: null, closeable: false });

      runIfFn(promise)
        .then((data) => {
          update(toastId, { duration: 5000, closeable: true, ...runIfFn(options.success, data) });
        })
        .catch((error) => {
          update(toastId, { duration: 5000, closeable: true, ...runIfFn(options.error, error) });
        });
    };

    const close: ToastDispatchContext['close'] = (id) => {
      setState((prev) => {
        const placement = getToastPlacement(prev, id);

        if (!placement) {
          return prev;
        }

        return {
          ...prev,
          [placement]: prev[placement].map((toast) => {
            if (toast.id == id) {
              return {
                ...toast,
                remove: true,
              };
            }

            return toast;
          }),
        };
      });
    };

    const clean: ToastDispatchContext['clean'] = (options?) => {
      setState((prev) => {
        const placements = options?.placements || [
          'bottom',
          'bottom-start',
          'bottom-end',
          'top',
          'top-start',
          'top-end',
        ];

        return placements.reduce(
          (acc, placement) => {
            acc[placement] = prev[placement].map((toast) => ({
              ...toast,
              remove: true,
            }));

            return acc;
          },
          { ...prev } as ToastState,
        );
      });
    };

    return { create, update, promise, close, clean };
  }, []);

  return (
    <ToastDispatchProvider value={context}>
      {children}
      <Portal>
        {Object.keys(state).map((placement) => {
          const toasts = state[placement as ToastPlacement];

          if (toasts.length == 0) {
            return null;
          }

          return (
            <div
              role="region"
              aria-live="polite"
              style={{ '--spacing-var': spacing } as CSSProperties}
              className={cx(
                'pointer-events-none fixed z-50 m-[--spacing-var] flex flex-col gap-[--spacing-var]',
                getToastListStyles(placement as ToastPlacement),
              )}
              key={placement}
              id={`toast-${placement}`}
            >
              {toasts.map((toast) => (
                <ToastContent key={toast.id} {...toast} />
              ))}
            </div>
          );
        })}
      </Portal>
    </ToastDispatchProvider>
  );
};

if (__DEV__) {
  ToastProvider.displayName = 'ToastProvider';
}

const getToastListStyles = (placement: ToastPlacement) => {
  const styles = [];

  if (placement.includes('top')) {
    styles.push('top-0');
  }

  if (placement.includes('bottom')) {
    styles.push('bottom-0');
  }

  if (!placement.includes('start')) {
    styles.push('right-0');
  }

  if (!placement.includes('end')) {
    styles.push('left-0');
  }

  return styles.join(' ');
};

const findToast = (toasts: ToastState, id: ToastId) => {
  const placement = getToastPlacement(toasts, id);

  const index = placement ? toasts[placement].findIndex((toast) => toast.id === id) : -1;

  return {
    placement,
    index,
  };
};

const getToastPlacement = (toasts: ToastState, id: ToastId) => {
  return Object.keys(toasts).find((key) => {
    return (
      toasts[key as ToastPlacement].findIndex((toast) => {
        return toast.id == id;
      }) > -1
    );
  }) as ToastPlacement;
};
