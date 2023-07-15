import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseLayout } from '~/common/components/BaseLayout';

export const DefaultLayout = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  const { t } = useTranslation();

  return (
    <>
      <BaseLayout className={className}>
        <div className={'min-h-[calc(100vh-15em)] p-4'}>{children}</div>
      </BaseLayout>
      <footer className={'mt-12 flex flex-col items-center gap-2 border-t py-5 text-center'}>
        <p>{t('license')}</p>
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
