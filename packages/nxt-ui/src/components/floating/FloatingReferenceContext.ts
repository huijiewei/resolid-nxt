import { type Dict } from '@resolid/nxt-utils';
import { type HTMLProps } from 'react';
import { createContext } from '../../primitives';

type FloatingReferenceContext = {
  opened: boolean;
  setReference: (node: HTMLElement) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Dict<unknown>;
};

const [FloatingReferenceProvider, useFloatingReference] = createContext<FloatingReferenceContext>({
  strict: true,
  name: 'FloatingReferenceContext',
});

export { FloatingReferenceProvider, useFloatingReference };