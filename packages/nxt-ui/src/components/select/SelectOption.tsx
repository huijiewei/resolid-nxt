import { __DEV__, ariaAttr, cx, dataAttr } from '@resolid/nxt-utils';
import { useMergedRefs } from '../../hooks';
import { primitiveComponent } from '../../primitives';
import { useSelect, type OptionBase, type OptionDefault } from './SelectContext';

export type SelectOptionProps<Option extends OptionBase = OptionDefault> = {
  option: Omit<Option, 'options'>;
  index: number;
};

export const SelectOption = primitiveComponent<'li', SelectOptionProps, 'children'>((props, ref) => {
  const { option, index, className, ...rest } = props;

  const { activeIndex, selectedIndex, getItemProps, elementsRef, handleSelect, optionRender } = useSelect();

  const refs = useMergedRefs(ref, (node) => {
    elementsRef.current[index] = node;
  });

  const isActive = index === activeIndex && index !== null;
  const isSelect = selectedIndex.includes(index);

  return (
    <li
      ref={refs}
      role="option"
      data-active={dataAttr(isActive)}
      aria-selected={isSelect}
      aria-disabled={ariaAttr(option.disabled)}
      tabIndex={isActive ? 0 : -1}
      className={cx(
        'w-full select-none rounded outline-none transition-colors',
        option.disabled ? 'opacity-60' : 'active:bg-bg-subtle',
        isSelect && 'text-fg-primary',
        className,
      )}
      {...getItemProps({
        onClick: () => {
          if (option.disabled) {
            return;
          }

          handleSelect(option);
        },
      })}
      {...rest}
    >
      {optionRender(option)}
    </li>
  );
});

if (__DEV__) {
  SelectOption.displayName = 'SelectOption';
}
