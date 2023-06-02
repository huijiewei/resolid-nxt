import { cx } from '@resolid/nxt-utils';
import type { HTMLProps } from 'react';

export const AsideLayoutMain = (props: HTMLProps<HTMLDivElement>) => {
  const { className, children, ...rest } = props;
  return (
    <div className={'tablet:ps-56'}>
      <main className={cx('tablet:pt-4 mx-auto p-4 pt-16 min-h-[calc(100vh-10em)]', className)} {...rest}>
        {children}
      </main>
      <footer className={'border-t mt-6 py-3 px-5 text-fg-muted'}>
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
