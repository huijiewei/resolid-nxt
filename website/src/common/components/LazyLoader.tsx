import { Spinner } from '@resolid/nxt-ui';
import { cx } from '@resolid/nxt-utils';
import type { HTMLProps } from 'react';

export const LazyLoader = (props: HTMLProps<HTMLDivElement>) => {
  const { className, height, ...rest } = props;

  return (
    <div
      style={{ height: height }}
      className={cx(
        'flex w-full rounded items-center justify-center text-lg text-fg-muted bg-bg-subtle/30 transition-opacity',
        !height && 'h-32',
        className
      )}
      {...rest}
    >
      <Spinner color={'primary'} className={'mr-2'} />
      Loading...
    </div>
  );
};
