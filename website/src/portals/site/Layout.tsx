import {
  Avatar,
  Button,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuDivider,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  cx,
  noScrollbarsClassName,
} from '@resolid/nxt-ui';
import { Suspense, useState, type MouseEventHandler } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet, useFetcher, useLocation, useRouteLoaderData } from 'react-router-dom';
import { Banner } from '~/common/components/Banner';
import { LazyLoader } from '~/common/components/LazyLoader';
import { LocaleSwitcher } from '~/common/components/LocaleSwitcher';
import { ThemeSwitcher } from '~/common/components/ThemeSwitcher';
import { Close } from '~/common/icons/Close';
import { Dashboard } from '~/common/icons/Dashboard';
import { Github } from '~/common/icons/Github';
import { Logout } from '~/common/icons/Logout';
import { Menu } from '~/common/icons/Menu';
import { Settings } from '~/common/icons/Settings';
import { UserCircle } from '~/common/icons/UserCircle';
import { userIsAdmin } from '~/engine/modules/user/userUtils';
import { getLoginTo, useAuthUserDispatch, useAuthUserState } from '~/extensions/auth/AuthUserContext';
import { LocalizedLink, LocalizedNavLink } from '~/extensions/localized-link/LocalizedLink';
import { getLocaleUrl } from '~/extensions/localized-link/localizedLinkUtils';
import { LOCALES, type LocaleKey } from '~/i18n';

const NavMenu = ({ onClick }: { onClick: MouseEventHandler<HTMLAnchorElement> }) => {
  const { t } = useTranslation('site');

  return (
    <ul className="mx-auto flex max-w-xs flex-col p-4 font-medium tracking-wide tablet:max-w-none tablet:flex-row tablet:p-0">
      {[
        { name: 'menu.home', href: '', end: true },
        { name: 'menu.run', href: 'run' },
        { name: 'menu.ui', href: 'ui' },
        { name: 'menu.forum', href: 'forum' },
        { name: 'menu.blog', href: 'blog' },
        { name: 'menu.about', href: 'about' },
      ].map((link) => (
        <li key={link.name}>
          <LocalizedNavLink
            end={link.end}
            to={link.href}
            onClick={onClick}
            className={({ isActive }) => {
              return cx('block p-2 hover:text-link-pressed tablet:px-4', isActive && 'text-link');
            }}
          >
            <span>{t(link.name)}</span>
          </LocalizedNavLink>
        </li>
      ))}
    </ul>
  );
};

const NavUser = () => {
  const { t } = useTranslation('common');
  const user = useAuthUserState();
  const { resetUser } = useAuthUserDispatch();
  const location = useLocation();
  const fetcher = useFetcher();

  if (user) {
    return (
      <DropdownMenu placement={'bottom'}>
        <DropdownMenuTrigger>
          <Button className={'aspect-square !px-0'} variant={'subtle'} color={'neutral'}>
            <Avatar size={26} src={user.avatar} name={user.nickname} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'z-50'}>
          <DropdownMenuArrow />
          <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
          <DropdownMenuItem as={LocalizedLink} to={`user/${user.username}`}>
            <UserCircle className={'me-1.5'} />
            {t('profile')}
          </DropdownMenuItem>
          <DropdownMenuItem as={LocalizedLink} to={'settings'}>
            <Settings className={'me-1.5'} />
            {t('settings')}
          </DropdownMenuItem>
          {userIsAdmin(user) && (
            <DropdownMenuItem as={LocalizedLink} to={'/admin'} target={'_blank'}>
              <Dashboard className={'me-1.5'} />
              {t('administration')}
            </DropdownMenuItem>
          )}
          <DropdownMenuDivider />
          <DropdownMenuItem
            onClick={() => {
              fetcher.submit(null, {
                method: 'post',
                action: '/api/auth/logout',
              });

              resetUser();
            }}
          >
            <Logout className={'me-1.5'} />
            {t('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const to = getLoginTo('login', location);

  return (
    <Tooltip placement={'bottom'} content={t('loginOrSignup')}>
      <Button
        aria-label={t('loginOrSignup')}
        className={'aspect-square !px-0'}
        color={'neutral'}
        variant={'subtle'}
        as={LocalizedLink}
        to={to}
      >
        <UserCircle size={'sm'} />
      </Button>
    </Tooltip>
  );
};

const Header = () => {
  const { t } = useTranslation('site');

  const [opened, setOpened] = useState(false);

  return (
    <header
      className={cx('fixed inset-x-0 z-20 w-full border-b bg-bg-default/75 backdrop-blur', noScrollbarsClassName)}
    >
      <nav className={'mx-auto flex h-16 items-center justify-between px-4 desktop:max-w-7xl'}>
        <div className={'flex items-center gap-4'}>
          <button title={'Menu'} className={'p-2 tablet:hidden'} onClick={() => setOpened((prev) => !prev)}>
            {opened ? <Close size={'sm'} /> : <Menu size={'sm'} />}
          </button>
          <LocalizedLink to={''}>
            <Banner />
          </LocalizedLink>
        </div>
        <div className={'flex items-center gap-4'}>
          <div
            className={cx(
              'absolute inset-x-0 top-[calc(4rem+1px)] z-20 h-screen bg-bg-default p-0 tablet:relative tablet:top-0 tablet:block tablet:h-auto tablet:bg-inherit',
              opened ? 'block' : 'hidden',
            )}
          >
            <NavMenu onClick={() => setOpened(false)} />
          </div>
          <div className={'flex flex-row items-center gap-1'}>
            <NavUser />
            <LocaleSwitcher />
            <ThemeSwitcher />
            <Tooltip placement={'bottom'} content={t('link.github')}>
              <Button
                as={'a'}
                color={'neutral'}
                variant={'subtle'}
                aria-label={t('link.github')}
                className={'aspect-square !px-0'}
                rel="noreferrer"
                target="_blank"
                href="https://github.com/huijiewei/resolid-nxt"
              >
                <Github size={'sm'} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </nav>
    </header>
  );
};

export const LocaleHelmet = () => {
  const { url } = useRouteLoaderData('root') as { url: string };

  return (
    <Helmet>
      <link rel="alternate" hrefLang="x-default" href={getLocaleUrl(url)} />
      {Object.keys(LOCALES).map((key) => {
        return (
          <link key={key} rel="alternate" hrefLang={LOCALES[key as LocaleKey].hrefLang} href={getLocaleUrl(url, key)} />
        );
      })}
    </Helmet>
  );
};

export default function SiteLayout() {
  return (
    <>
      <LocaleHelmet />
      <Header />
      <div className={'pt-16'}>
        <Suspense fallback={<LazyLoader height={'calc(100vh - 5em)'} />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
