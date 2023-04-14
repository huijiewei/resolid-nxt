import type { Language } from '@resolid/nxt-prism';
import type { ComponentProps } from 'react';
import { CodeHighlight } from '~/common/components/CodeHighlight';

export const MdxCode = (props: ComponentProps<'code'>) => {
  const { className, children } = props;

  return className ? (
    <div className={'rounded mt-6 border overflow-x-auto scrollbar scrollbar-thin'}>
      <CodeHighlight
        className={'p-3'}
        language={(className.replace('language-', '') as Language) || 'jsx'}
        code={children as string}
      />
    </div>
  ) : (
    <code className={'m-0 px-[0.4em] py-[0.2em] bg-bg-subtle rounded text-sm'}>{children}</code>
  );
};
