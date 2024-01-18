import { createContext } from '@resolid/nxt-ui';
import { omit } from '@resolid/nxt-utils';
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

export { AuthUserDispatchProvider, AuthUserStateProvider, useAuthUserDispatch, useAuthUserState };

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
