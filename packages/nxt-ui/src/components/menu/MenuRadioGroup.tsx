import { __DEV__ } from '@resolid/nxt-utils';
import { useCallbackRef } from '../../hooks';
import { createContext, type PrimitiveProps } from '../../primitives';
import { MenuGroup } from './MenuGroup';

type MenuRadioGroupProps = {
  value?: string | number;
  onChange?: (value: string | number) => void;
};

const [MenuRadioGroupProvider, useMenuRadioGroup] = createContext<MenuRadioGroupProps>({
  strict: true,
  name: 'MenuRadioGroupContext',
});

export { useMenuRadioGroup };

export const MenuRadioGroup = (props: PrimitiveProps<'div', MenuRadioGroupProps>) => {
  const { value, onChange, ...rest } = props;

  const handleChange = useCallbackRef(onChange);

  return (
    <MenuRadioGroupProvider
      value={{
        value,
        onChange: handleChange,
      }}
    >
      <MenuGroup {...rest}></MenuGroup>
    </MenuRadioGroupProvider>
  );
};

if (__DEV__) {
  MenuRadioGroup.displayName = 'MenuRadioGroup';
}
