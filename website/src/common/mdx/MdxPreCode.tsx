import type { Language } from '@resolid/nxt-prism';
import type { PrimitiveProps } from '@resolid/nxt-ui';
import { CodeHighlight } from '~/common/components/CodeHighlight';
import { CopyButton } from '~/common/components/CopyButton';

type MdxCodeProps = {
  children: string;
};

export const MdxCode = (props: PrimitiveProps<'code', MdxCodeProps>) => {
  const { className, children } = props;

  return className ? (
    <div className={'relative mt-6 overflow-x-auto rounded border scrollbar scrollbar-thin'}>
      <CodeHighlight
        className={'p-3'}
        language={(className.replace('language-', '') as Language) || 'jsx'}
        code={children}
      />
      <CopyButton content={children} />
    </div>
  ) : (
    <code className={'m-0 rounded bg-bg-subtle px-[0.4em] py-[0.2em] text-sm'}>{children}</code>
  );
};
