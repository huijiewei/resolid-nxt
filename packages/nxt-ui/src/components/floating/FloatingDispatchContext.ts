import { createContext } from '../../primitives';

type FloatingDispatchContext = {
  open: () => void;
  close: () => void;
};

const [FloatingDispatchProvider, useFloatingDispatch] = createContext<FloatingDispatchContext>({
  strict: true,
  name: 'FloatingDispatchContext',
});

export { FloatingDispatchProvider, useFloatingDispatch };
