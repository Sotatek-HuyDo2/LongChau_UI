import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from './BaseModal';
import AppButton from '../AppButton';

interface IModalDelistSuccessProps {
  open: boolean;
  onClose: () => void;
}

const ModalDelistSuccess: React.FC<IModalDelistSuccessProps> = (props) => {
  const { open, onClose } = props;

  return (
    <BaseModal
      size="xl"
      title="Delist successful!"
      isOpen={open}
      onClose={onClose}
      className="modal-languages"
    >
      <Flex alignItems="center">
        <Flex className="delist-confirm" flexDirection={'column'} gap={'15px'}>
          <Box className="delist-confirm--list">
            <ul>
              <li>Pair token: BNB/BTC</li>
            </ul>
          </Box>
          <Box className="delist-confirm--para">
            The token pair has been successfully delisted. Please double-check
            on{' '}
            <Text as="span" className="delist-confirm--para-bold">
              Lagom
            </Text>{' '}
            for updates.
          </Box>
          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={5}>
            <AppButton onClick={onClose} width="50%">
              OK
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalDelistSuccess;
