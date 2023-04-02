import type { PropsWithChildren } from 'react';
import { TableOfContents } from './TableOfContents';

export const TocLayout = (props: PropsWithChildren<{ module: string; path: string }>) => {
  return (
    <div className={'flex justify-between'}>
      <article className={'prose prose-sm desktop:w-[calc(100%-14rem)] w-full max-w-none'}>{props.children}</article>
      <nav className={'desktop:block hidden w-52'}>
        <TableOfContents module={props.module} path={props.path} />
      </nav>
    </div>
  );
};
