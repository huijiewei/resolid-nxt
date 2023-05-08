import type { Alignment } from '@floating-ui/react';
import type { MaybeFunction } from '@resolid/nxt-utils';
import type { ReactElement, ReactNode } from 'react';
import { createContext } from '../../primitives';
import type { Color } from '../../utils/types';

export type ToastId = string | number;

export type ToastPlacement = 'top' | 'bottom' | `top-${Alignment}` | `bottom-${Alignment}`;

export type ToastBaseProps = {
  /**
   * Id
   */

  id?: ToastId;

  /**
   * Icon
   */
  icon?: ReactElement;

  /**
   * Title
   */
  title?: ReactNode;

  /**
   * Description
   */
  description?: ReactNode;

  /**
   * Variant
   * @default 'light'
   */
  variant?: 'solid' | 'light' | 'outline';

  /**
   * Color
   * @default 'primary'
   */
  color?: Color;

  /**
   * Show close button
   * @default true
   */
  closeable?: boolean;

  /**
   * onClose callback
   */
  onClose?: () => void;

  className?: string;
};

export type ToastOptions = ToastBaseProps & {
  /**
   * Auto close duration, set `null` not auto close.
   * @default 5000
   */
  duration: number | null;

  /**
   * Placement
   * @default 'bottom'
   */
  placement?: ToastPlacement;

  remove: boolean;

  onRemove?: () => void;
};

type ToastCreateOptions = Partial<ToastOptions>;
type ToastUpdateOptions = Omit<ToastCreateOptions, 'id' | 'position' | 'remove' | 'onRemove'>;

export type ToastDispatchContext = {
  create: (options: ToastCreateOptions) => ToastId;
  update: (id: ToastId, options: ToastUpdateOptions) => void;
  promise: <T = unknown, E extends Error = Error>(
    promise: MaybeFunction<Promise<T>>,
    options: {
      pending: ToastCreateOptions;
      success: MaybeFunction<ToastUpdateOptions, [T]>;
      error: MaybeFunction<ToastUpdateOptions, [E]>;
    }
  ) => void;
  close: (id: ToastId) => void;
  clean: (options?: { placements?: ToastPlacement[] }) => void;
};

const [ToastDispatchProvider, useToastDispatch] = createContext<ToastDispatchContext>({
  strict: true,
  name: 'ToastDispatchContext',
});

export { ToastDispatchProvider, useToastDispatch };
