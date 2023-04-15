import { ColorModeScript, NxtProvider } from '@resolid/nxt-ui';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { LazyLoader } from '~/common/components/LazyLoader';

export default function Root() {
  return (
    <>
      <ColorModeScript />
      <Helmet prioritizeSeoTags defaultTitle={'Resolid Nxt'} titleTemplate={'%s - Resolid Nxt'}>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Get your app up and running with React" />
        <meta name="keywords" content="react, react-router, tailwindcss, vite, typescript, framework" />
        <meta name="theme-color" content="#4586be" />
      </Helmet>
      <NxtProvider>
        <Suspense fallback={<LazyLoader />}>
          <Outlet />
        </Suspense>
      </NxtProvider>
      <ScrollRestoration />
    </>
  );
}
