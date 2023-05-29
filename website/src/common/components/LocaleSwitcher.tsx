import {
  Button,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@resolid/nxt-ui';
import { cx } from '@resolid/nxt-utils';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UNSAFE_RouteContext, generatePath, useNavigate, useParams } from 'react-router-dom';
import { Locale } from '~/common/icons/Locale';
import { LOCALES } from '~/i18n';

export const LocaleSwitcher = () => {
  const { i18n, t } = useTranslation();

  const routeContext = useContext(UNSAFE_RouteContext);
  const params = useParams();
  const navigate = useNavigate();

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
              className={cx('my-1', i18n.resolvedLanguage == key && 'text-link')}
              onClick={async () => {
                await i18n.changeLanguage(key);

                let lastRouteContext = routeContext;

                while (lastRouteContext.outlet) {
                  lastRouteContext = lastRouteContext.outlet.props.routeContext;
                }

                const pathPattern = lastRouteContext.matches
                  .map(({ route: { path } }) => path)
                  .filter(Boolean)
                  .join('/')
                  .replaceAll(/\/\*?\//g, '/');

                navigate(
                  {
                    pathname: generatePath(pathPattern, {
                      ...params,
                      lang: key,
                    }),
                  },
                  { replace: true }
                );

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
