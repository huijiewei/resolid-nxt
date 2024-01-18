import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@resolid/nxt-ui';
import { useState } from 'react';
import { useAuthDispatch } from '~/extensions/auth/AuthContext';
import { AuthForgotPasswordForm } from '~/extensions/auth/AuthForgotPasswordForm';
import { AuthLoginForm } from '~/extensions/auth/AuthLoginForm';
import { AuthModalAction, AuthModalDispatchProvider } from '~/extensions/auth/AuthModalContext';
import { AuthSignupForm } from '~/extensions/auth/AuthSignupForm';

export const AuthModal = ({ opened }: { opened: boolean }) => {
  const { resetAction } = useAuthDispatch();
  const [authActionState, setAuthActionState] = useState<AuthModalAction>(AuthModalAction.LOGIN);

  return (
    <Modal opened={opened} closeOnBlur={false} onClose={resetAction}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody className={'w-[30em] p-5'}>
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
