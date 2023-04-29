import type { FloatingTreeType, ReferenceElement } from '@floating-ui/react';
import type { Dict } from '@resolid/nxt-utils';
import { type HTMLProps, type MutableRefObject } from 'react';
import { createContext } from '../../primitives';
import type { FloatingFloatingContext } from '../floating/FloatingFloatingContext';

export { MenuFloatingProvider, useMenuFloating };
export { MenuSelectProvider, useMenuSelect };

type MenuFloatingContext = MenuSelectContext &
  FloatingFloatingContext & {
    nested: boolean;
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
