import type { FloatingContext, FloatingTreeType, ReferenceElement } from '@floating-ui/react';
import type { Dict } from '@resolid/nxt-utils';
import { type HTMLProps, type MutableRefObject } from 'react';
import { createContext } from '../../primitives';

type MenuReferenceContext = {
  opened: boolean;
  setReference: (node: HTMLElement) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Dict<unknown>;
};

const [MenuReferenceProvider, useMenuReference] = createContext<MenuReferenceContext>({
  strict: true,
  name: 'MenuReferenceContext',
});

export { MenuReferenceProvider, useMenuReference };
export { MenuFloatingProvider, useMenuFloating };
export { MenuDispatchProvider, useMenuDispatch };
export { MenuSelectProvider, useMenuSelect };

type MenuFloatingContext = MenuSelectContext & {
  nested: boolean;

  x: number | null;
  y: number | null;

  context: FloatingContext;
  setFloating: (node: HTMLElement) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;
  elementsRef: MutableRefObject<(HTMLElement | null)[]>;
};

const [MenuFloatingProvider, useMenuFloating] = createContext<MenuFloatingContext>({
  strict: true,
  name: 'MenuFloatingContext',
});

type MenuSelectContext = {
  tree: FloatingTreeType<ReferenceElement> | null;
  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;
  activeIndex: number | null;
};

const [MenuSelectProvider, useMenuSelect] = createContext<MenuSelectContext>({
  strict: true,
  name: 'MenuSelectContext',
});

type MenuDispatchContext = {
  close: () => void;
};

const [MenuDispatchProvider, useMenuDispatch] = createContext<MenuDispatchContext>({
  strict: true,
  name: 'MenuDispatchContext',
});
