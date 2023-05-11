import type { ReferenceType } from '@floating-ui/react';
import { type Dict } from '@resolid/nxt-utils';
import { type HTMLProps } from 'react';
import { createContext } from '../../primitives';

export type FloatingReferenceContext = {
  opened: boolean;
  setReference: (node: ReferenceType | null) => void;
  setPositionReference: (node: ReferenceType | null) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Dict<unknown>;
};

const [FloatingReferenceProvider, useFloatingReference] = createContext<FloatingReferenceContext>({
  strict: true,
  name: 'FloatingReferenceContext',
});

export { FloatingReferenceProvider, useFloatingReference };
