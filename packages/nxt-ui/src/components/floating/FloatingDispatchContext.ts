import { createContext } from '../../primitives';

type FloatingDispatchContext = {
  close: () => void;
};

const [FloatingDispatchProvider, useFloatingDispatch] = createContext<FloatingDispatchContext>({
  strict: true,
  name: 'FloatingDispatchContext',
});

export { FloatingDispatchProvider, useFloatingDispatch };
