import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from './BaseModal';
import AppButton from '../AppButton';
import { useState } from 'react';
import ModalListingSuccess from './ModalListingSuccess';

interface IModalListingConfirmProps {
  open: boolean;
  onClose: () => void;
  data: {
    baseToken: string;
    quoteToken: string;
  };
}

const ModalListingConfirm: React.FC<IModalListingConfirmProps> = (props) => {
  const { open, onClose } = props;

  const [openModalListingSuccess, setOpenModalListingSuccess] =
    useState<boolean>(false);

  const onToggleOpenModalListingSuccess = () => {
    setOpenModalListingSuccess((prevState) => !prevState);
  };

  return (
    <BaseModal
      size="xl"
      title="Listing confirmation"
      isOpen={open}
      onClose={onClose}
      className="modal-languages"
    >
      <Flex alignItems="center">
        <Flex className="delist-confirm" flexDirection={'column'} gap={'15px'}>
          <Box className="delist-confirm--list">
            <ul>
              <li>Pair token: BNB/BTC</li>
              <li>Base token: BNB</li>
              <li>Quote token: BTC</li>
            </ul>
          </Box>
          <Box className="delist-confirm--para">
            Upon confirming, this token pair will be{' '}
            <Text
              fontWeight={'bold'}
              as="span"
              className="delist-confirm--para-bold"
            >
              listed
            </Text>{' '}
            on{' '}
            <Text as="span" className="delist-confirm--para-bold">
              Pharmacy exchange
            </Text>{' '}
            . Please review carefully before selecting{' '}
            <Text as="span" className="delist-confirm--para-bold">
              Confirm.
            </Text>
          </Box>
          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={3}>
            <AppButton
              className="btn-outline-hover"
              flex={1}
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </AppButton>
            <AppButton flex={1} onClick={onToggleOpenModalListingSuccess}>
              Confirm
            </AppButton>
          </Flex>
        </Flex>
      </Flex>

      {openModalListingSuccess && (
        <ModalListingSuccess
          open={openModalListingSuccess}
          onClose={onToggleOpenModalListingSuccess}
        />
      )}
    </BaseModal>
  );
};

export default ModalListingConfirm;
