import { type FloatingContext } from '@floating-ui/react';
import { type Dict } from '@resolid/nxt-utils';
import { type CSSProperties, type HTMLProps } from 'react';

export type FloatingFloatingContext = {
  context: FloatingContext;
  floatingStyles: CSSProperties;
  setFloating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;
};
