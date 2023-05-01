import { useState } from 'react';

export type PaginationJumperProps = {
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
};

export const PaginationJumper = (props: PaginationJumperProps) => {
  const { page, totalPage, setPage } = props;

  const [inputValue, setInputValue] = useState<number>();

  const handleChange = (value: string | number) => {
    const parsed = parseInt(value.toString(), 10);

    setInputValue(Number.isNaN(parsed) ? undefined : parsed);
  };

  const handleJump = () => {
    if (inputValue == undefined) {
      return;
    }

    setInputValue(undefined);

    if (inputValue == page) {
      return;
    }

    const jump = inputValue < 1 ? 1 : inputValue > totalPage ? totalPage : inputValue;

    setPage(jump);
  };

  return (
    <div className={'flex items-center gap-2'}>
      <span className={'text-gray-500'}>Go to</span>
      <input
        className={'w-10 rounded border border-bg-muted hover:bg-bg-subtlest px-2 py-0.5'}
        value={inputValue == undefined ? '' : inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleJump}
      />
    </div>
  );
};
