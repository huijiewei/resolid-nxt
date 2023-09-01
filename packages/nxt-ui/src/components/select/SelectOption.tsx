import { ariaAttr, dataAttr, type Merge } from '@resolid/nxt-utils';
import type { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { useMergedRefs } from '../../hooks';
import { cx } from '../../utils/cva';
import {
  useSelect,
  type OptionBase,
  type OptionDefault,
  type OptionFieldNames,
  type OptionRender,
} from './SelectContext';

export type SelectOptionProps<Option extends OptionBase> = {
  option: Omit<Option, keyof OptionFieldNames['options']>;
  onSelect: (option: Omit<Option, keyof OptionFieldNames['options']>) => void;
  render: OptionRender<Omit<Option, keyof OptionFieldNames['options']>>;
  index: number;
};

const SelectOptionInner = <Option extends OptionBase = OptionDefault>(
  props: Merge<Omit<ComponentPropsWithoutRef<'li'>, 'children'>, SelectOptionProps<Option>>,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const { option, onSelect, render, index, className, ...rest } = props;

  const { activeIndex, selectedIndex, getItemProps, elementsRef } = useSelect();

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

          onSelect(option);
        },
      })}
      {...rest}
    >
      {render(option)}
    </li>
  );
};

export const SelectOption = forwardRef(SelectOptionInner) as <Option extends OptionBase>(
  props: Merge<Omit<ComponentPropsWithoutRef<'li'>, 'children'>, SelectOptionProps<Option>> & {
    ref?: ForwardedRef<HTMLLIElement>;
  },
) => ReturnType<typeof SelectOptionInner>;
