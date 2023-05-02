import type { MutableRefObject } from 'react';
import { createContext } from '../../primitives';
import type { FloatingFloatingContext } from '../floating/FloatingFloatingContext';

export { PopoverFloatingProvider, usePopoverFloating };

type PopoverFloatingContext = FloatingFloatingContext & {
  modal: boolean;
  initialFocus?: number | MutableRefObject<HTMLElement | null>;
};

const [PopoverFloatingProvider, usePopoverFloating] = createContext<PopoverFloatingContext>({
  strict: true,
  name: 'PopoverFloatingContext',
});
