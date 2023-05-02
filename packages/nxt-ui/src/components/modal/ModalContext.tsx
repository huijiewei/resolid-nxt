import type { FloatingContext } from '@floating-ui/react';
import type { Dict } from '@resolid/nxt-utils';
import { type HTMLProps, type RefObject } from 'react';
import { createContext } from '../../primitives';

export type ModalBaseProps = {
  /**
   * Opened state
   */
  opened: boolean;

  /**
   * Lock scroll
   * @default true
   */
  lockScroll?: boolean;

  /**
   * The ref of element to receive focus when the modal opens.
   */
  initialFocus?: number | RefObject<HTMLElement>;

  /**
   * The ref of element to receive focus when the modal closes.
   */
  finalFocus?: RefObject<HTMLElement>;

  /**
   * Where scroll behavior should originate.
   * @default 'inside'
   */
  scrollBehavior?: 'inside' | 'outside';
};

export type ModalContext = ModalBaseProps & {
  status: 'unmounted' | 'initial' | 'open' | 'close';
  duration: number;
  context: FloatingContext<HTMLElement>;
  setFloating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;
};

const [ModalProvider, useModal] = createContext<ModalContext>({
  strict: true,
  name: 'ModalContext',
});

export { ModalProvider, useModal };
