import { createContext } from '../../primitives';

type FloatingAriaContext = {
  labelId: string;
  descriptionId: string;
};

const [FloatingAriaProvider, useFloatingAria] = createContext<FloatingAriaContext>({
  strict: true,
  name: 'FloatingAriaContext',
});

export { FloatingAriaProvider, useFloatingAria };
