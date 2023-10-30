import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from './BaseModal';
import AppButton from '../AppButton';

interface IModalListingSuccesProps {
  open: boolean;
  onClose: () => void;
}

const ModalListingSuccess: React.FC<IModalListingSuccesProps> = (props) => {
  const { open, onClose } = props;

  return (
    <BaseModal
      size="xl"
      title="Listing successful!"
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
            The token pair has been successfully listed. Please double-check on{' '}
            <Text as="span" className="delist-confirm--para-bold">
              Pharmacy
            </Text>{' '}
            for updates.
          </Box>
          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={5}>
            <AppButton width={'50%'} onClick={onClose}>
              OK
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalListingSuccess;
