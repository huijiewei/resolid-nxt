import { createContext } from '@resolid/nxt-ui';
import { useState, type PropsWithChildren } from 'react';
import { AuthLoginModal } from '~/common/components/AuthLoginModal';

export enum AuthLoginAction {
  NONE,
  MODAL,
  DIRECT,
}

type AuthLoginDispatchContext = {
  setLoginAction: (action: AuthLoginAction) => void;
  resetLoginAction: () => void;
};

const [AuthLoginDispatchProvider, useAuthLoginDispatch] = createContext<AuthLoginDispatchContext>({
  name: 'AuthLoginDispatchContext',
  strict: true,
});

export { useAuthLoginDispatch };

export const AuthLoginProvider = ({ children }: PropsWithChildren) => {
  const [authLoginState, setAuthLoginState] = useState<AuthLoginAction>(AuthLoginAction.NONE);

  const setLoginAction = (action: AuthLoginAction) => {
    setAuthLoginState(action);
  };

  const resetLoginAction = () => {
    setAuthLoginState(AuthLoginAction.NONE);
  };

  return (
    <AuthLoginDispatchProvider value={{ setLoginAction, resetLoginAction }}>
      {children}
      <AuthLoginModal opened={authLoginState == AuthLoginAction.MODAL} />
    </AuthLoginDispatchProvider>
  );
};
