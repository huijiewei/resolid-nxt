import {
  Button,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@resolid/nxt-ui';
import { cx } from '@resolid/nxt-utils';
import { useTranslation } from 'react-i18next';
import { Locale } from '~/common/icons/Locale';
import { LOCALES } from '~/i18n';

export const LocaleSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu placement={'bottom'}>
      <DropdownMenuTrigger>
        <Button color={'neutral'} variant={'subtle'} className={'aspect-square !px-0'}>
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

                document.documentElement.setAttribute('lang', key);
              }}
            >
              <div className={'flex items-center gap-1'}>{LOCALES[key as keyof typeof LOCALES]}</div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
