import { Tooltip, useClipboard } from '@resolid/nxt-ui';
import { __DEV__ } from '@resolid/nxt-utils';
import { Clipboard } from '~/common/icons/Clipboard';
import { ClipboardCheck } from '~/common/icons/ClipboardCheck';

export const CopyButton = ({ content }: { content: string }) => {
  const { copied, onCopy } = useClipboard();

  return (
    <div className={'absolute right-1.5 top-1.5'}>
      <Tooltip color={copied ? 'success' : undefined} content={copied ? 'Copied' : 'Copy Code'}>
        <button type={'button'} className={'relative appearance-none p-1 font-medium'} onClick={() => onCopy(content)}>
          {copied ? (
            <ClipboardCheck className={'text-fg-success'} />
          ) : (
            <Clipboard className={'text-fg-muted hover:text-link-hovered'} />
          )}
        </button>
      </Tooltip>
    </div>
  );
};

if (__DEV__) {
  CopyButton.displayName = 'CopyButton';
}
