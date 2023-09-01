import {
  autoUpdate,
  flip,
  size as floatingSize,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react';
import { ariaAttr, dataAttr, type Merge } from '@resolid/nxt-utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Fragment,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
} from 'react';
import {
  useCallbackRef,
  useControllableState,
  useFocus,
  useFormReset,
  useIsomorphicEffect,
  useMergedRefs,
  usePrevious,
} from '../../hooks';
import { cx } from '../../utils/cva';
import type { Size } from '../../utils/types';
import { CloseButton } from '../close-button/CloseButton';
import { Divider } from '../divider/Divider';
import { Portal } from '../portal/Portal';
import { selectSizeStyles } from './Select.style';
import { SelectChevron } from './SelectChevron';
import {
  SelectProvider,
  type OptionBase,
  type OptionDefault,
  type OptionFieldNames,
  type OptionRender,
} from './SelectContext';
import { SelectOption } from './SelectOption';
import { SelectSearch } from './SelectSearch';

export type SelectProps<Option extends OptionBase> = {
  /**
   * Select options used to render items in dropdown
   */
  options: readonly Option[];

  /**
   * Option field names
   */
  fieldNames?: OptionFieldNames;
  /**
   * Size
   * @default 'md'
   */
  size?: Size;

  /**
   * Multiple
   * @default false
   */
  multiple?: boolean;

  /**
   * Clearable
   * @default false
   */
  clearable?: boolean;

  /**
   * Searchable
   * @default false
   */
  searchable?: boolean;

  /**
   * Function based on which items in dropdown are filtered
   */
  filter?: (keyword: string, option: Omit<Option, keyof OptionFieldNames['options']>) => boolean;

  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * Disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Required
   * @default false
   */
  required?: boolean;

  /**
   * Invalid
   * @default false
   */
  invalid?: boolean;

  /**
   * FullWidth
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Opened
   */
  opened?: boolean;

  /**
   * Value
   */
  value?: (string | number)[] | string | number | null;

  /**
   * Default value
   */
  defaultValue?: (string | number)[] | string | number | null;

  /**
   * Close on select
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * onChange callback
   */
  onChange?: (value: (string | number)[] | string | number | null) => void;

  /**
   * onClear callback
   */
  onClear?: () => void;

  /**
   * onSearch callback
   */
  onSearch?: (value: string) => void;

  /**
   * onSelect callback
   */
  onSelect?: (value: string | number | null, option: Omit<Option, keyof OptionFieldNames['options']>) => void;

  /**
   * onDeselect callback
   */
  onDeselect?: (value: string | number | null, option: Omit<Option, keyof OptionFieldNames['options']>) => void;

  /**
   * Label render
   */
  labelRender?: OptionRender<Omit<Option, keyof OptionFieldNames['options']>>;

  /**
   * Option render
   */
  optionRender?: OptionRender<Omit<Option, keyof OptionFieldNames['options']>>;

  /**
   * Animation Duration
   * @default '250'
   */
  duration?: number;
};

const SelectInner = <Option extends OptionBase = OptionDefault>(
  props: Merge<Omit<ComponentPropsWithoutRef<'input'>, 'children'>, SelectProps<Option>>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const {
    id,
    options,
    fieldNames,
    size = 'md',
    placeholder = 'Select...',
    onChange,
    onClear,
    onSelect,
    onDeselect,
    disabled = false,
    required = false,
    invalid = false,
    readOnly = false,
    multiple = false,
    clearable = false,
    searchable = false,
    filter,
    opened = false,
    className,
    fullWidth = false,
    value,
    defaultValue = multiple ? [] : undefined,
    closeOnSelect = true,
    style,
    optionRender,
    labelRender,
    duration = 250,
    ...rest
  } = props;

  const [searchFocusRef, searchFocus] = useFocus();
  const searchRef = useRef<HTMLInputElement>(null);
  const searchRefs = useMergedRefs(searchRef, searchFocusRef);
  const [searchValue, setSearchValue] = useState('');
  const [searchHidden, setSearchHidden] = useState(false);

  const [virtual, setVirtual] = useState(false);

  const mergedFieldNames = useMemo(
    () => ({
      value: fieldNames?.value ?? 'value',
      label: fieldNames?.label ?? 'label',
      options: fieldNames?.options ?? 'options',
    }),
    [fieldNames],
  );

  const filterRef = useCallbackRef(
    filter ||
      ((keyword, option) => {
        return option[mergedFieldNames.value].toString().toLowerCase().indexOf(keyword.toLowerCase()) != -1;
      }),
  );

  const [state, setState] = useControllableState({
    value: value,
    defaultValue: defaultValue,
    onChange,
  });

  const { filterOptions, selectOptions, optionArray } = useMemo(() => {
    const filterOptions: Option[] = [];
    const selectOptions: (Omit<Option, keyof OptionFieldNames['options']> & { index: number })[] = [];
    const optionArray: Omit<Option, keyof OptionFieldNames['options']>[] = [];

    let optionIndex = 0;
    let hasGroupOptions = false;

    const pushOption = (option: Option) => {
      filterOptions.push(option);

      if (option[mergedFieldNames.options]) {
        hasGroupOptions = true;
        option[mergedFieldNames.options].forEach((groupOption: Omit<Option, keyof OptionFieldNames['options']>) => {
          optionArray.push(groupOption);

          if (Array.isArray(state)) {
            if (state.includes(groupOption[mergedFieldNames.value])) {
              selectOptions.push({ ...groupOption, index: optionIndex });
            }
          } else {
            if (state == groupOption[mergedFieldNames.value]) {
              selectOptions.push({ ...groupOption, index: optionIndex });
            }
          }
        });
      } else {
        optionArray.push(option);

        if (Array.isArray(state)) {
          if (state.includes(option[mergedFieldNames.value])) {
            selectOptions.push({ ...option, index: optionIndex });
          }
        } else {
          if (state == option[mergedFieldNames.value]) {
            selectOptions.push({ ...option, index: optionIndex });
          }
        }
      }

      optionIndex++;
    };

    options.forEach((option) => {
      if (searchable && searchValue.length > 0) {
        if (option[mergedFieldNames.options]) {
          const group = option;

          (group as unknown as OptionBase)[mergedFieldNames.options] = option[mergedFieldNames.options].filter(
            (groupOption: Omit<Option, keyof OptionFieldNames['options']>) => {
              return filterRef(searchValue, groupOption);
            },
          );

          if (group[mergedFieldNames.options].length > 0) {
            pushOption(group);
          }
        } else {
          if (filterRef(searchValue, option)) {
            pushOption(option);
          }
        }
      } else {
        pushOption(option);
      }
    });

    setVirtual(!hasGroupOptions && options.length > 30);

    return { filterOptions, selectOptions, optionArray };
  }, [filterRef, mergedFieldNames.options, mergedFieldNames.value, options, searchValue, searchable, state]);

  const [openedState, setOpenedState] = useState(opened);

  const { floatingStyles, context, refs, middlewareData } = useFloating<HTMLElement>({
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      floatingSize({
        apply({ availableWidth, elements, rects }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            minWidth: `${rects.reference.width}px`,
          });
        },
        padding: 8,
      }),
    ],
    open: openedState,
    onOpenChange: (opened) => {
      if (opened) {
        setSearchHidden(false);
      }

      setOpenedState(opened);
    },
    whileElementsMounted: autoUpdate,
  });

  const elementsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const minSelectedIndex = selectOptions[0]?.index ?? null;

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context, { keyboardHandlers: closeOnSelect }),
    useRole(context, { role: 'listbox' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      selectedIndex: minSelectedIndex,
      onNavigate: setActiveIndex,
      loop: true,
      virtual: true,
      disabledIndices: [],
    }),
  ]);

  const [scrollState, setScrollState] = useState(false);

  const { isMounted, status } = useTransitionStatus(context, {
    duration: duration,
  });

  const selectSearch = searchable ? (
    <SelectSearch
      ref={searchRefs}
      open={openedState}
      setOpen={setOpenedState}
      setActiveIndex={setActiveIndex}
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
      hidden={searchHidden}
      setHidden={setSearchHidden}
    />
  ) : undefined;

  const labelRenderRef = useCallbackRef(labelRender ?? ((option) => option[mergedFieldNames.label]));

  const renderSingleValue = (selectOption: Omit<Option, keyof OptionFieldNames['options']> | undefined) => {
    return (
      <div className={'grid flex-1 flex-wrap'}>
        {searchValue == '' &&
          (selectOption !== undefined ? (
            <div className={'col-start-1 col-end-3 row-start-1 row-end-2'}>{labelRenderRef(selectOption)}</div>
          ) : (
            <span className={'col-start-1 col-end-3 row-start-1 row-end-2 text-gray-500'}>{placeholder}</span>
          ))}
        {selectSearch}
      </div>
    );
  };

  const renderMultipleValue = (selectOptions: Omit<Option, keyof OptionFieldNames['options']>[]) => {
    return (
      <div
        className={cx(
          'flex-1 flex-wrap gap-1',
          selectOptions.length > 0 ? 'flex' : 'grid',
          (size == 'xs' || size == 'sm') && 'gap-y-0.5',
        )}
      >
        {selectOptions.length > 0
          ? selectOptions.map((option) => (
              <span
                className={'flex items-center gap-1 rounded-sm bg-bg-subtle p-1 pl-2 leading-none'}
                key={option[mergedFieldNames.value]}
              >
                {labelRenderRef(option)}
                <CloseButton
                  aria-label={`Remove ${option[mergedFieldNames.value]}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSelect(option);
                  }}
                  className={'rounded-full'}
                />
              </span>
            ))
          : searchValue == '' && (
              <span className={'col-start-1 col-end-3 row-start-1 row-end-2 text-gray-500'}>{placeholder}</span>
            )}
        {selectSearch}
      </div>
    );
  };

  const sizeStyle = selectSizeStyles[size];
  const sizeOptionStyle = cx(sizeStyle.base, sizeStyle.option);

  const handleClear = useCallback(() => {
    if (multiple) {
      setState([]);
    } else {
      setState(undefined);
    }

    onClear && onClear();
  }, [multiple, onClear, setState]);

  const handleSelect = useCallback(
    (option: Omit<Option, keyof OptionFieldNames['options']>, close = true) => {
      const multiple = Array.isArray(state);
      const value = option[mergedFieldNames.value] as string | number;

      let nextValue;

      if (multiple) {
        if (state.includes(value)) {
          onDeselect && onDeselect(value, option);
          nextValue = state.filter((p) => p != value);
        } else {
          onSelect && onSelect(value, option);
          nextValue = [...state, value];
        }
      } else {
        nextValue = value;
        onSelect && onSelect(value, option);
      }

      setState(nextValue);

      if (closeOnSelect && close) {
        setOpenedState(false);

        if (!multiple) {
          setSearchHidden(true);
        }

        setActiveIndex(null);
      }

      searchable && setSearchValue('');

      requestAnimationFrame(() => {
        refs.domReference.current?.focus();
      });
    },
    [closeOnSelect, mergedFieldNames.value, onDeselect, onSelect, refs.domReference, searchable, setState, state],
  );

  const render = optionRender ?? ((option) => option[mergedFieldNames.label]);

  const selectContext = useMemo(() => {
    return {
      activeIndex,
      selectedIndex: selectOptions.map((option) => option.index),
      getItemProps,
      elementsRef,
      fieldNames: mergedFieldNames,
    };
  }, [activeIndex, getItemProps, mergedFieldNames, selectOptions]);

  const rowVirtual = useVirtualizer({
    count: optionArray.length,
    getScrollElement: () => refs.floating.current,
    estimateSize: () => sizeStyle.height,
    overscan: 3,
    paddingStart: 6,
    paddingEnd: 6,
    scrollPaddingStart: 6,
    scrollPaddingEnd: 6,
  });

  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  useIsomorphicEffect(() => {
    if (!openedState) {
      return;
    }

    if (!scrollState) {
      return;
    }

    if (virtual) {
      const scrollIndex = activeIndex != null ? activeIndex : minSelectedIndex != null ? minSelectedIndex - 1 : -1;

      if (scrollIndex > -1 && prevActiveIndex != null) {
        rowVirtual.scrollToIndex(scrollIndex > prevActiveIndex ? scrollIndex + 1 : scrollIndex - 1, {
          align: 'auto',
        });
      }
    } else {
      const floating = refs.floating.current;

      if (floating) {
        const item =
          activeIndex != null
            ? elementsRef.current[activeIndex]
            : minSelectedIndex != null
            ? elementsRef.current[minSelectedIndex]
            : null;

        if (item && prevActiveIndex != null) {
          const itemHeight = elementsRef.current[prevActiveIndex]?.offsetHeight || 0;

          const floatingHeight = floating.offsetHeight;
          const top = item.offsetTop - itemHeight;
          const bottom = top + itemHeight * 3;

          if (top < floating.scrollTop) {
            floating.scrollTop -= floating.scrollTop - top + 6;
          } else if (bottom > floatingHeight + floating.scrollTop) {
            floating.scrollTop += bottom - floatingHeight - floating.scrollTop + 6;
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedState, scrollState, prevActiveIndex, activeIndex, minSelectedIndex, refs.floating, virtual]);

  useIsomorphicEffect(() => {
    if (!openedState || !closeOnSelect) {
      return;
    }

    requestAnimationFrame(() => {
      if (virtual) {
        if (minSelectedIndex > -1) {
          rowVirtual.scrollToIndex(minSelectedIndex + 1, { align: 'center' });
        }
      } else {
        const floating = refs.floating.current;

        if (floating && floating.offsetHeight < floating.scrollHeight) {
          const item = elementsRef.current[minSelectedIndex];

          if (item) {
            floating.scrollTop = item.offsetTop - floating.offsetHeight / 2 + item.offsetHeight / 2 + 9;
          }
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedState, minSelectedIndex, middlewareData, refs.floating, virtual]);

  const [focusRef, focus] = useFocus();

  const referenceRefs = useMergedRefs(refs.setReference, focusRef);

  const inputRef = useRef<HTMLInputElement>(null);

  const selectRefs = useMergedRefs(inputRef, ref);

  useFormReset({
    ref: inputRef,
    handler: () => {
      setState(defaultValue);
    },
  });

  let optionIndex = 0;

  return (
    <>
      <div
        id={id}
        aria-haspopup={'listbox'}
        aria-expanded={openedState}
        tabIndex={disabled ? -1 : 0}
        data-active={dataAttr(openedState || focus || searchFocus)}
        aria-invalid={ariaAttr(invalid)}
        aria-disabled={ariaAttr(disabled)}
        aria-required={ariaAttr(required)}
        aria-readonly={ariaAttr(readOnly)}
        ref={referenceRefs}
        className={cx(
          'relative inline-flex h-fit items-center rounded border outline-none transition-colors',
          invalid && 'border-red-500',
          disabled
            ? 'pointer-events-none cursor-not-allowed opacity-50'
            : 'active:z-[1] active:border-bg-primary-emphasis active:ring-1 active:ring-bg-primary-emphasis',
          !invalid && !disabled && 'hover:z-[2] hover:border-border-hovered',
          fullWidth && 'w-full',
          sizeStyle.base,
          sizeStyle.select,
          className,
        )}
        {...getReferenceProps({
          role: 'combobox',
          style: style,
          onFocus: () => {
            searchable && searchRef.current && searchRef.current.focus();
          },
          onPointerMove() {
            setScrollState(false);
          },
          onKeyDown(event) {
            setScrollState(true);

            if (activeIndex != null) {
              if (event.key == 'Enter') {
                event.preventDefault();
                handleSelect(optionArray[activeIndex]);
              }
            }

            if (!searchValue && event.key == ' ') {
              event.preventDefault();
            }

            if (event.key == 'Tab') {
              setOpenedState(false);
            }

            if (event.key == 'Delete' || event.key == 'Backspace') {
              if (Array.isArray(state)) {
                const lastSelectOption = selectOptions.at(-1);

                if (lastSelectOption != undefined) {
                  handleSelect(lastSelectOption, false);
                }
              } else {
                if (state != undefined) {
                  handleClear();
                }
              }
            }
          },
          onKeyUp(event) {
            setScrollState(true);

            if (activeIndex != null) {
              if (!searchValue && event.key == ' ') {
                event.preventDefault();
                handleSelect(optionArray[activeIndex]);
              }
            }
          },
        })}
      >
        <div className={'flex-1 select-none'}>
          {Array.isArray(state) ? renderMultipleValue(selectOptions) : renderSingleValue(selectOptions[0])}
        </div>
        <div className={'flex items-center gap-1'}>
          {clearable && selectOptions.length > 0 && (
            <CloseButton
              aria-hidden={true}
              onClick={(event) => {
                event.stopPropagation();
                handleClear();
              }}
              className={'rounded-full p-0.5 text-gray-500 hover:bg-gray-100'}
            />
          )}
          <SelectChevron />
        </div>
        {Array.isArray(state) ? (
          state?.map((value) => <input key={value} type={'hidden'} ref={selectRefs} value={value} {...rest} />)
        ) : (
          <input type={'hidden'} ref={selectRefs} value={state || ''} {...rest} />
        )}
      </div>
      {isMounted && (
        <Portal>
          <div
            ref={refs.setFloating}
            className={cx(
              'z-50 max-h-80 overflow-y-auto overscroll-contain rounded border border-bg-muted bg-bg-default shadow outline-none scrollbar scrollbar-thin',
              virtual ? 'px-1.5' : 'p-1.5',
              'transition-opacity duration-[--duration-var]',
              status == 'open' ? 'opacity-1' : 'opacity-0',
            )}
            style={
              {
                ...floatingStyles,
                '--duration-var': `${duration}ms`,
              } as CSSProperties
            }
          >
            <ul
              className={'outline-none'}
              style={
                virtual ? { height: `${rowVirtual.getTotalSize()}px`, width: '100%', position: 'relative' } : undefined
              }
              {...getFloatingProps({})}
            >
              <SelectProvider value={selectContext}>
                {virtual ? (
                  rowVirtual.getVirtualItems().map((row) => {
                    const option = filterOptions[row.index];

                    return (
                      <SelectOption<Option>
                        index={row.index}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: `${row.size}px`,
                          transform: `translateY(${row.start}px)`,
                        }}
                        className={sizeOptionStyle}
                        key={`item-${option[mergedFieldNames.value]}`}
                        option={option}
                        render={render}
                        onSelect={handleSelect}
                      />
                    );
                  })
                ) : filterOptions.length > 0 ? (
                  filterOptions.map((option, index) => {
                    if (option[mergedFieldNames.options]) {
                      return (
                        <Fragment key={`group-${index}`}>
                          <Divider position={'left'} className={'mb-1 text-fg-subtle [&:not(:first-child)]:mt-1'}>
                            {option[mergedFieldNames.label]}
                          </Divider>
                          {option[mergedFieldNames.options].map(
                            (groupOption: Omit<Option, keyof OptionFieldNames['options']>) => {
                              const selectOption = (
                                <SelectOption<Option>
                                  index={optionIndex}
                                  className={sizeOptionStyle}
                                  key={`item-${groupOption[mergedFieldNames.value]}`}
                                  option={groupOption}
                                  render={render}
                                  onSelect={handleSelect}
                                />
                              );

                              optionIndex++;

                              return selectOption;
                            },
                          )}
                        </Fragment>
                      );
                    } else {
                      const selectOption = (
                        <SelectOption<Option>
                          index={optionIndex}
                          className={sizeOptionStyle}
                          key={`item-${option[mergedFieldNames.value]}`}
                          option={option}
                          render={render}
                          onSelect={handleSelect}
                        />
                      );

                      optionIndex++;

                      return selectOption;
                    }
                  })
                ) : (
                  <li className={'text-center'}>No Data</li>
                )}
              </SelectProvider>
            </ul>
          </div>
        </Portal>
      )}
    </>
  );
};

export const Select = forwardRef(SelectInner) as <Option extends OptionBase>(
  props: Merge<Omit<ComponentPropsWithoutRef<'input'>, 'children'>, SelectProps<Option>> & {
    ref?: ForwardedRef<HTMLInputElement>;
  },
) => ReturnType<typeof SelectInner>;
