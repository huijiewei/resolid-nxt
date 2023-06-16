import { Modal, ModalBody, ModalContent, ModalOverlay } from '@resolid/nxt-ui';
import { AuthLoginForm } from '~/common/components/AuthLoginForm';
import { useAuthDispatch } from '~/common/components/AuthProvider';

export const AuthModal = ({ opened }: { opened: boolean }) => {
  const { resetAction } = useAuthDispatch();

  return (
    <Modal opened={opened} closeOnBlur={false} onClose={resetAction}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody className={'p-5'}>
          <AuthLoginForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
