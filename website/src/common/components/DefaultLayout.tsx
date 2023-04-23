import type { PropsWithChildren } from 'react';
import { BaseLayout } from '~/common/components/BaseLayout';

export const DefaultLayout = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <>
      <BaseLayout className={className}>
        <div className={'p-4 min-h-[calc(100vh-15em)]'}>{children}</div>
      </BaseLayout>
      <footer className={'border-t flex mt-12 flex-col items-center gap-2 py-5 text-center'}>
        <p>Released under the MIT License.</p>
        <p>
          Proudly made in
          <span className={'mx-1'} aria-label="China" role="img">
            🇨🇳
          </span>
          by Resolid Tech, 2023
        </p>
      </footer>
    </>
  );
};
