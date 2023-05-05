import { createContext } from '../../primitives';
import type { Size } from '../../utils/types';

export type InputGroupContext = {
  /**
   * Size
   * @default 'md'
   */
  size: Size;
};

const [InputGroupProvider, useInputGroup] = createContext<InputGroupContext | undefined>({
  strict: false,
  name: 'InputGroupContext',
});

export { InputGroupProvider, useInputGroup };
