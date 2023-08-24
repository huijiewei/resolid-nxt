import {
  Button,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cx,
} from '@resolid/nxt-ui';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Locale } from '~/common/icons/Locale';
import { DEFAULT_LOCALE, LOCALES, LOCALE_PARAMS, type LocaleKey } from '~/i18n';

export const LocaleSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  return (
    <DropdownMenu placement={'bottom'}>
      <DropdownMenuTrigger>
        <Button
          aria-label={t('changeLanguage') || 'Change Language'}
          color={'neutral'}
          variant={'subtle'}
          className={'aspect-square !px-0'}
        >
          <Locale size={'sm'} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'z-50'}>
        <DropdownMenuArrow />
        {Object.keys(LOCALES).map((key) => {
          return (
            <DropdownMenuItem
              key={key}
              className={cx('my-1', i18n.language == key && 'text-link')}
              onClick={async () => {
                await i18n.changeLanguage(key);

                setSearchParams((prev) => {
                  if (key == DEFAULT_LOCALE) {
                    prev.delete(LOCALE_PARAMS);
                  } else {
                    prev.set(LOCALE_PARAMS, key);
                  }

                  return prev;
                });

                document.documentElement.setAttribute('lang', key);
                document.documentElement.setAttribute('dir', i18n.dir(key));
              }}
            >
              <div className={'flex items-center gap-1'}>{LOCALES[key as LocaleKey].name}</div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
