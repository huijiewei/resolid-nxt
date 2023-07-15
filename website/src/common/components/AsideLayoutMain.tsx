import { cx } from '@resolid/nxt-utils';
import type { HTMLProps } from 'react';

export const AsideLayoutMain = (props: HTMLProps<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  return (
    <div className={'tablet:ps-56'}>
      <main className={cx('mx-auto min-h-[calc(100vh-10em)] p-4 pt-16 tablet:pt-4', className)} {...rest}>
        {children}
      </main>
      <footer className={'mt-6 border-t px-5 py-3 text-fg-muted'}>
        <div className={'flex justify-between text-[13px] font-medium'}>
          <div>Copyright © 2023</div>
          <div>
            Proudly made in
            <span className={'mx-1'} aria-label="China" role="img">
              🇨🇳
            </span>
            by Resolid Tech
          </div>
        </div>
      </footer>
    </div>
  );
};
