import type { ReactNode } from 'react';
import { CodeHighlight } from '~/common/components/CodeHighlight';
import { CopyButton } from '~/common/components/CopyButton';

type DemoExampleProps = {
  preview: () => ReactNode;
  snippet: string;
};

export const DemoExample = ({ preview, snippet }: DemoExampleProps) => {
  return (
    <div className={'my-4 rounded border'}>
      <div className={'overflow-x-auto p-3 scrollbar scrollbar-thin'}>{preview()}</div>
      <div className={'relative rounded'}>
        <CodeHighlight
          className={'overflow-x-auto border-t p-3 scrollbar scrollbar-thin'}
          language={'jsx'}
          code={snippet}
        />
        <CopyButton content={snippet} />
      </div>
    </div>
  );
};
