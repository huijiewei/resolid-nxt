import { Modal, ModalBody, ModalContent, ModalOverlay } from '@resolid/nxt-ui';
import { AuthLoginForm } from '~/common/components/AuthLoginForm';
import { useAuthLoginDispatch } from '~/common/components/AuthLoginProvider';

export const AuthLoginModal = ({ opened }: { opened: boolean }) => {
  const { resetLoginAction } = useAuthLoginDispatch();

  return (
    <Modal opened={opened} closeOnBlur={false} onClose={resetLoginAction}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody className={'p-5'}>
          <AuthLoginForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
