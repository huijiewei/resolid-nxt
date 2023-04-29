import type { MutableRefObject } from 'react';
import { createContext } from '../../primitives';
import type { FloatingFloatingContext } from '../floating/FloatingFloatingContext';

type PopoverAriaContext = {
  labelId: string;
  descriptionId: string;
};

const [PopoverAriaProvider, usePopoverAria] = createContext<PopoverAriaContext>({
  strict: true,
  name: 'PopoverAriaContext',
});

export { PopoverAriaProvider, usePopoverAria };
export { PopoverFloatingProvider, usePopoverFloating };

type PopoverFloatingContext = FloatingFloatingContext & {
  modal: boolean;
  initialFocus?: number | MutableRefObject<HTMLElement | null>;
};

const [PopoverFloatingProvider, usePopoverFloating] = createContext<PopoverFloatingContext>({
  strict: true,
  name: 'PopoverFloatingContext',
});
