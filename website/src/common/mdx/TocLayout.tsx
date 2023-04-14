import type { PropsWithChildren } from 'react';
import { TocSection } from './TocSection';

export const TocLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={'flex justify-between'}>
      <article className={'desktop:w-[calc(100%-14rem)] w-full max-w-none px-2'}>{children}</article>
      <nav className={'desktop:block hidden w-52'}>
        <TocSection />
      </nav>
    </div>
  );
};
