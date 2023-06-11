import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@resolid/nxt-ui';
import { AuthLoginForm } from '~/common/components/AuthLoginForm';
import { useAuthLoginDispatch } from '~/common/components/AuthLoginProvider';

export const AuthLoginModal = ({ opened }: { opened: boolean }) => {
  const { resetLoginAction } = useAuthLoginDispatch();

  return (
    <Modal opened={opened} closeOnBlur={false} onClose={resetLoginAction}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <AuthLoginForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
