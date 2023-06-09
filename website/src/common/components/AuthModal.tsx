import { createContext, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@resolid/nxt-ui';
import { useState } from 'react';
import { AuthForgotPasswordForm } from '~/common/components/AuthForgotPasswordForm';
import { AuthLoginForm } from '~/common/components/AuthLoginForm';
import { useAuthDispatch } from '~/common/components/AuthProvider';
import { AuthSignupForm } from '~/common/components/AuthSignupForm';

export enum AuthModalAction {
  LOGIN,
  SIGNUP,
  FORGOT_PASSWORD,
}

type AuthModalDispatchContext = (action: AuthModalAction) => void;

const [AuthModalDispatchProvider, useAuthModalDispatch] = createContext<AuthModalDispatchContext | undefined>({
  name: 'AuthModalDispatchContext',
  strict: false,
});

export { useAuthModalDispatch };

export const AuthModal = ({ opened }: { opened: boolean }) => {
  const { resetAction } = useAuthDispatch();
  const [authActionState, setAuthActionState] = useState<AuthModalAction>(AuthModalAction.LOGIN);

  return (
    <Modal opened={opened} closeOnBlur={false} onClose={resetAction}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody className={'p-5 w-[30em]'}>
          <AuthModalDispatchProvider value={(action) => setAuthActionState(action)}>
            {authActionState == AuthModalAction.LOGIN && <AuthLoginForm />}
            {authActionState == AuthModalAction.SIGNUP && <AuthSignupForm />}
            {authActionState == AuthModalAction.FORGOT_PASSWORD && <AuthForgotPasswordForm />}
          </AuthModalDispatchProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
