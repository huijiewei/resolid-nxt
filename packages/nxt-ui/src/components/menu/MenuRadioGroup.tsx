import { __DEV__ } from '@resolid/nxt-utils';
import { useCallbackRef } from '../../hooks';
import { type PrimitiveProps } from '../../primitives';
import { MenuGroup } from './MenuGroup';
import { MenuRadioGroupProvider, type MenuRadioGroupContext } from './MenuRadioGroupContext';

export type MenuRadioGroupProps = MenuRadioGroupContext;

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
