import { cx } from '@resolid/nxt-utils';
import { primitiveComponent } from '../../primitives';

type SelectSearchProps = {
  open: boolean;
  setOpen: (opened: boolean) => void;
  setActiveIndex: (index: number) => void;
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
};

export const SelectSearch = primitiveComponent<'input', SelectSearchProps>((props, ref) => {
  const { value, onChange, open, setOpen, setActiveIndex, hidden, setHidden, ...rest } = props;

  return (
    <div
      data-value={value}
      className={
        'flex-auto inline-grid grid-cols-[0px_min-content] row-start-1 row-end-2 col-start-1 col-end-3 after:content-[attr(data-value)_"_"] after:whitespace-pre after:invisible after:min-w-[2px] after:row-start-1 after:row-end-auto after:col-start-2 after:col-end-auto'
      }
    >
      <input
        autoCapitalize={'none'}
        autoComplete={'off'}
        autoCorrect={'off'}
        spellCheck={false}
        tabIndex={0}
        type={'text'}
        ref={ref}
        className={cx(
          'col-start-2 col-end-auto row-start-1 row-end-auto w-full min-w-[2px] appearance-none outline-none',
          hidden && 'opacity-0'
        )}
        style={{
          background: 0,
        }}
        value={value}
        onKeyDown={(event) => {
          if (
            event.key != 'Enter' &&
            event.key != 'ArrowUp' &&
            event.key != 'ArrowDown' &&
            event.key != 'Escape' &&
            event.key != 'Home' &&
            event.key != 'End' &&
            event.key != 'Tab' &&
            (value != '' || event.key != 'Delete') &&
            (value != '' || event.key != 'Backspace') &&
            (value != '' || event.key != 'ArrowLeft') &&
            (value != '' || event.key != 'ArrowRight')
          ) {
            event.stopPropagation();
          }
        }}
        onChange={(event) => {
          onChange && onChange(event);
          !open && setOpen(true);
          setActiveIndex(0);
          setHidden(false);
        }}
        {...rest}
      />
    </div>
  );
});
