import type { PropsWithChildren } from 'react';
import { TableOfContents, type GetMdxPath } from './TableOfContents';

export const TocLayout = ({ getMdxPath, children }: PropsWithChildren<{ getMdxPath: GetMdxPath }>) => {
  return (
    <div className={'flex justify-between'}>
      <article className={'prose prose-sm desktop:w-[calc(100%-14rem)] w-full max-w-none px-2'}>{children}</article>
      <nav className={'desktop:block hidden w-52'}>
        <TableOfContents getMdxPath={getMdxPath} />
      </nav>
    </div>
  );
};
