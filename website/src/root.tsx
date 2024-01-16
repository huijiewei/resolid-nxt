// noinspection JSUnusedGlobalSymbols

import { server$ } from '@resolid/nxt-run/server';
import { ColorModeScript, NxtProvider } from '@resolid/nxt-ui';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet, ScrollRestoration, useLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';
import { AuthProvider } from '~/common/components/AuthProvider';
import { AuthUserProvider } from '~/common/components/AuthUserProvider';
import { LazyLoader } from '~/common/components/LazyLoader';
import { RouteProgressBar } from '~/common/components/RouteProgressBar';
import { getSessionUser, type SessionUser } from '~/foundation/session';

export const loader = server$(async ({ request }) => {
  return { user: await getSessionUser(request), url: request.url };
});

export default function Root() {
  const { t } = useTranslation();
  const { user } = useLoaderData() as { user: SessionUser | null };

  z.setErrorMap(makeZodI18nMap({ t, handlePath: { ns: ['zod'] } }));

  return (
    <>
      <ColorModeScript />
      <Helmet prioritizeSeoTags defaultTitle={'Resolid Nxt'} titleTemplate={'%s - Resolid Nxt'}>
        <meta name="description" content="Get your app up and running with React" />
      </Helmet>
      <NxtProvider>
        <AuthUserProvider user={user}>
          <AuthProvider>
            <RouteProgressBar />
            <Suspense fallback={<LazyLoader />}>
              <Outlet />
            </Suspense>
          </AuthProvider>
        </AuthUserProvider>
      </NxtProvider>
      <ScrollRestoration />
    </>
  );
}
