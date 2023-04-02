import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Suspense } from 'react';

import './root.css';

export default function Root() {
  return (
    <>
      <Helmet prioritizeSeoTags defaultTitle={'Resolid Nxt'} titleTemplate={'%s - Resolid Nxt'}>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Get your app up and running with React" />
        <meta name="keywords" content="react, react-router, tailwindcss, vite, typescript, framework" />
        <meta name="theme-color" content="#4586be" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Helmet>
      <Suspense>
        <Outlet />
      </Suspense>
      <ScrollRestoration />
    </>
  );
}
