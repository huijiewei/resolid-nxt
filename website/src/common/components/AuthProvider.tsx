import { createContext } from '@resolid/nxt-ui';
import { useState, type PropsWithChildren } from 'react';
import { AuthModal } from '~/common/components/AuthModal';

export enum AuthAction {
  NONE,
  MODAL,
  DIRECT,
}

type AuthDispatchContext = {
  setAction: (action: AuthAction) => void;
  resetAction: () => void;
};

const [AuthDispatchProvider, useAuthDispatch] = createContext<AuthDispatchContext>({
  name: 'AuthLoginDispatchContext',
  strict: true,
});

export { useAuthDispatch };

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authLoginState, setAuthLoginState] = useState<AuthAction>(AuthAction.NONE);

  const setLoginAction = (action: AuthAction) => {
    setAuthLoginState(action);
  };

  const resetLoginAction = () => {
    setAuthLoginState(AuthAction.NONE);
  };

  return (
    <AuthDispatchProvider value={{ setAction: setLoginAction, resetAction: resetLoginAction }}>
      {children}
      <AuthModal opened={authLoginState == AuthAction.MODAL} />
    </AuthDispatchProvider>
  );
};
