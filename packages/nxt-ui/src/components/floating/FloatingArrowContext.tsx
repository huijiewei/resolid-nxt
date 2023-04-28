import { type FloatingContext } from '@floating-ui/react';
import { type RefObject } from 'react';
import { createContext } from '../../primitives';

export type FloatingArrowContext = {
  context: FloatingContext;
  setArrow: RefObject<SVGSVGElement>;
  fillClassName: string;
  strokeClassName: string;
};

const [FloatingArrowProvider, useFloatingArrow] = createContext<FloatingArrowContext>({
  strict: true,
  name: 'FloatingArrowContext',
});

export { FloatingArrowProvider, useFloatingArrow };
