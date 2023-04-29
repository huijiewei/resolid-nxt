import { type FloatingContext } from '@floating-ui/react';
import { type Dict } from '@resolid/nxt-utils';
import { type HTMLProps } from 'react';

export type FloatingFloatingContext = {
  x: number | null;
  y: number | null;

  context: FloatingContext;
  setFloating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;
};
