import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { getLoginTo, useAuthUserState } from '~/common/components/AuthUserProvider';
import { LazyLoader } from '~/common/components/LazyLoader';
import { LocalizedLink, LocalizedNavigate } from '~/common/components/LocalizedLink';

export const Component = () => {
  const { t } = useTranslation('common');
  const location = useLocation();
  const user = useAuthUserState();

  if (user == null) {
    const to = getLoginTo('../login', location);
    return <LocalizedNavigate to={to} />;
  }

  return (
    <>
      <Helmet>
        <title>{t('administration')}</title>
      </Helmet>
      <h3>Admin Layout</h3>
      <ul>
        <li>
          <LocalizedLink to={'/admin'}>Admin Home</LocalizedLink>
        </li>
        <li>
          <LocalizedLink to={'/admin/about'}>Admin About</LocalizedLink>
        </li>
      </ul>
      <Suspense fallback={<LazyLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
