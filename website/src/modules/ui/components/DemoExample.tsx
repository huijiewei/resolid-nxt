import type { ReactNode } from 'react';
import { CodeHighlight } from '~/common/components/CodeHighlight';

type DemoExampleProps = {
  preview: () => ReactNode;
  snippet: string;
};

export const DemoExample = ({ preview, snippet }: DemoExampleProps) => {
  return (
    <div className={'my-4 border rounded'}>
      <div className={'overflow-x-auto scrollbar scrollbar-thin p-3'}>{preview()}</div>
      <CodeHighlight
        className={'rounded p-3 border-t overflow-x-auto scrollbar scrollbar-thin'}
        language={'jsx'}
        code={snippet}
      />
    </div>
  );
};
