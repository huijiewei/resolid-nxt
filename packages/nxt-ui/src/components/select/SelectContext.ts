import { type Dict } from '@resolid/nxt-utils';
import { type HTMLProps, type MutableRefObject, type ReactNode } from 'react';
import { createContext } from '../../primitives';

export type OptionBase = {
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type OptionDefault = {
  label: ReactNode;
  value?: string | number | null;
  options?: Omit<OptionDefault, 'options'>[];
} & OptionBase;

export type OptionRender<Option> = (option: Option) => ReactNode;

export type FieldNames = {
  value?: string;
  label?: string;
  options?: string;
};

export type SelectContext<Option extends OptionBase = OptionDefault> = {
  activeIndex: number | null;
  selectedIndex: number[];
  elementsRef: MutableRefObject<(HTMLLIElement | null)[]>;
  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Dict<unknown>;
  handleSelect: (option: Omit<Option, 'options'>) => void;
  optionRender: OptionRender<Omit<Option, 'options'>>;
};

const [SelectProvider, useSelect] = createContext<SelectContext>({
  strict: true,
  name: 'SelectContext',
});

export { SelectProvider, useSelect };
