import { createContext } from '@resolid/nxt-ui';
import { useState, type PropsWithChildren } from 'react';
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
