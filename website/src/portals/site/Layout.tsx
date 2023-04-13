import { cx } from '@resolid/nxt-utils';
import { Suspense, useState, type MouseEventHandler } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import ResolidBanner from '~/assets/images/resolid-banner.svg';
import { Close } from '~/common/icons/Close';
import { Github } from '~/common/icons/Github';
import { Menu } from '~/common/icons/Menu';
import { System } from '~/common/icons/System';

const NavMenu = ({ onClick }: { onClick: MouseEventHandler<HTMLAnchorElement> }) => {
  return (
    <ul className="tablet:flex-row tablet:max-w-none tablet:p-0 mx-auto flex max-w-xs flex-col p-4 font-medium">
      {[
        { name: 'Home', href: '', end: true },
        { name: 'Run', href: 'run' },
        { name: 'UI', href: 'ui' },
        { name: 'Forum', href: 'forum' },
        { name: 'Blog', href: 'blog' },
        { name: 'About', href: 'about' },
      ].map((link) => (
        <li key={link.name}>
          <NavLink
            end={link.end}
            to={link.href}
            onClick={onClick}
            className={({ isActive }) => {
              return cx('tablet:px-4 block p-2 hover:text-blue-500', isActive ? 'text-blue-600' : 'text-gray-600');
            }}
          >
            <span>{link.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const Header = () => {
  const [opened, setOpened] = useState(false);

  return (
    <header className={'fixed inset-x-0 z-20 w-full border-b bg-white/75 backdrop-blur'}>
      <nav className={'desktop:max-w-7xl mx-auto flex h-16 items-center justify-between px-4'}>
        <div className={'tablet:hidden flex flex-1'}>
          <button title={'Menu'} className={'p-2'} onClick={() => setOpened((prev) => !prev)}>
            {opened ? <Close size={'sm'} /> : <Menu size={'sm'} />}
          </button>
        </div>
        <div className={'tablet:justify-between flex flex-1 items-center justify-center'}>
          <Link to={'/'}>
            <img height={32} width={129} alt={'Resolid Nxt'} src={ResolidBanner} />
          </Link>
        </div>
        <div className={'flex flex-1 items-center justify-end gap-4'}>
          <div
            className={cx(
              'tablet:block tablet:relative tablet:top-0 tablet:h-auto absolute inset-x-0 top-[calc(4rem+1px)] z-20 h-screen bg-white p-0',
              opened ? 'block' : 'hidden'
            )}
          >
            <NavMenu onClick={() => setOpened(false)} />
          </div>
          <div className={'flex flex-row items-center gap-1'}>
            <button title={'Change Theme'} className={'p-2 text-gray-600 hover:text-blue-500'}>
              <System size={'sm'} />
            </button>
            <a
              className={'p-2 text-gray-600 hover:text-blue-500'}
              rel="noreferrer"
              target="_blank"
              href="https://github.com/resolid/nxt"
              title={'Go to Resolid Nxt on Github'}
            >
              <Github size={'sm'} />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Layout = () => {
  return (
    <>
      <Header />
      <div className={'desktop:max-w-7xl mx-auto pt-16'}>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
