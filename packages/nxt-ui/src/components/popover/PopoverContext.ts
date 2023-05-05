import type { MutableRefObject } from 'react';
import { createContext } from '../../primitives';
import type { FloatingFloatingContext } from '../floating/FloatingFloatingContext';

export { PopoverFloatingProvider, usePopoverFloating };

export type PopoverFloatingContext = FloatingFloatingContext & {
  modal: boolean;
  duration: number;
  initialFocus?: number | MutableRefObject<HTMLElement | null>;
};

const [PopoverFloatingProvider, usePopoverFloating] = createContext<PopoverFloatingContext>({
  strict: true,
  name: 'PopoverFloatingContext',
});
