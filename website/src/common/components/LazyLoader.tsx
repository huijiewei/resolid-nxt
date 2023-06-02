import { Spinner } from '@resolid/nxt-ui';
import { cx, isNumber } from '@resolid/nxt-utils';
import type { CSSProperties, HTMLProps } from 'react';
import { useTranslation } from 'react-i18next';

export const LazyLoader = (props: HTMLProps<HTMLDivElement>) => {
  const { t } = useTranslation('common');

  const { className, height, style, ...rest } = props;

  return (
    <div
      style={
        {
          ...style,
          '--height-var': isNumber(height) ? `${height}px` : height,
        } as CSSProperties
      }
      className={cx(
        'flex w-full rounded items-center justify-center text-lg text-fg-muted bg-bg-subtle/30 transition-opacity',
        height ? 'h-[--height-var]' : 'h-32',
        className
      )}
      {...rest}
    >
      <Spinner color={'primary'} className={'mr-2'} />
      {t('loading')}
    </div>
  );
};
