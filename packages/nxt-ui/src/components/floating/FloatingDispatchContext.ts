import { createContext } from '../../primitives';

export type FloatingDispatchContext = {
  open?: () => void;
  close: () => void;
};

const [FloatingDispatchProvider, useFloatingDispatch] = createContext<FloatingDispatchContext>({
  strict: true,
  name: 'FloatingDispatchContext',
});

export { FloatingDispatchProvider, useFloatingDispatch };
