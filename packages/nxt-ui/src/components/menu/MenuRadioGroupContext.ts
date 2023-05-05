import { createContext } from '../../primitives';

export type MenuRadioGroupContext = {
  value?: string | number;
  onChange?: (value: string | number) => void;
};

const [MenuRadioGroupProvider, useMenuRadioGroup] = createContext<MenuRadioGroupContext>({
  strict: true,
  name: 'MenuRadioGroupContext',
});

export { MenuRadioGroupProvider, useMenuRadioGroup };
