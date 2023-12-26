import { cx } from '@resolid/nxt-ui';
import { Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { AsideLayout } from '~/common/components/AsideLayout';
import { AsideLayoutMain } from '~/common/components/AsideLayoutMain';
import { AsideLayoutSide } from '~/common/components/AsideLayoutSide';
import { BaseLayout } from '~/common/components/BaseLayout';
import { LazyLoader } from '~/common/components/LazyLoader';
import { menus } from './menus';

export default function Layout() {
  const navigation = useNavigation();
  const navigating = navigation.location && !navigation.formData;

  return (
    <BaseLayout>
      <AsideLayout>
        <AsideLayoutSide menus={menus} namespace={'ui'} />
        <AsideLayoutMain className={cx(navigating && 'opacity-25 transition-opacity delay-300')}>
          <Suspense fallback={<LazyLoader />}>
            <Outlet />
          </Suspense>
        </AsideLayoutMain>
      </AsideLayout>
    </BaseLayout>
  );
}
