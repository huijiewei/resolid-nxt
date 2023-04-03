import { Link, NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import ResolidBanner from '~/assets/images/resolid-banner.svg';
import { cx } from '@resolid/nxt-utils';
import { System } from '~/common/icons/System';
import { Github } from '~/common/icons/Github';

const NavMenu = () => {
  return (
    <ul className="flex font-medium">
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
            className={({ isActive }) => {
              return cx('tablet:px-4 block hover:text-blue-500', isActive ? 'text-blue-600' : 'text-gray-600');
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
  return (
    <header className={'fixed inset-x-0 z-10 w-full border-b border-gray-100 bg-white/80 backdrop-blur'}>
      <nav className={'desktop:max-w-7xl mx-auto flex items-center justify-between p-4'}>
        <div className={'flex flex-row items-center'}>
          <Link to={'/'}>
            <img height={32} width={129} alt={'Resolid Nxt'} src={ResolidBanner} />
          </Link>
        </div>
        <div className={'flex flex-row items-center gap-4'}>
          <div className={cx('p-0')}>
            <NavMenu />
          </div>
          <div className={'flex flex-row items-center gap-4'}>
            <button title={'Change Theme'} className={'text-gray-600 hover:text-blue-500'}>
              <System size={'sm'} />
            </button>
            <a
              className={'text-gray-600 hover:text-blue-500'}
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
