import { createContext } from '@resolid/nxt-ui';
import { omit } from '@resolid/nxt-utils';
import { useState, type PropsWithChildren } from 'react';
import { createPath, createSearchParams, type Location, type To } from 'react-router-dom';
import type { SessionUser } from '~/foundation/session';

type AuthUserDispatchContext = {
  setUser: (user: SessionUser) => void;
  resetUser: () => void;
};

const [AuthUserStateProvider, useAuthUserState] = createContext<SessionUser | null>({
  name: 'AuthUserStateContext',
  strict: true,
});

const [AuthUserDispatchProvider, useAuthUserDispatch] = createContext<AuthUserDispatchContext>({
  name: 'AuthUserDispatchContext',
  strict: true,
});

export { useAuthUserDispatch, useAuthUserState };

export const AuthUserProvider = ({ children, user }: PropsWithChildren<{ user: SessionUser | null }>) => {
  const [authUserState, setAuthUserState] = useState<SessionUser | null>(user);

  return (
    <AuthUserDispatchProvider
      value={{ setUser: (user) => setAuthUserState(user), resetUser: () => setAuthUserState(null) }}
    >
      <AuthUserStateProvider value={authUserState}>{children}</AuthUserStateProvider>
    </AuthUserDispatchProvider>
  );
};

export const getLoginTo = (pathname: string, location: Location) => {
  const to: To = {
    pathname: pathname,
    search: location.search,
  };

  if (!location.pathname.endsWith('login') && !location.pathname.endsWith('signup')) {
    to.search = createSearchParams({ redirect: createPath(omit(location, ['hash'])) }).toString();
  }

  return to;
};
