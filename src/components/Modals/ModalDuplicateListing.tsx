import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from './BaseModal';
import AppButton from '../AppButton';
import { useState } from 'react';
import ModalDelistSucces from './ModalDelistSucces';

interface IModalDuplicateListingProps {
  open: boolean;
  onClose: () => void;
}

const ModalDuplicateListing: React.FC<IModalDuplicateListingProps> = (
  props,
) => {
  const { open, onClose } = props;

  const [openModalDelistSucces, setOpenModalDelistSucces] =
    useState<boolean>(false);

  const onToggleOpenModalDelistSucces = () => {
    setOpenModalDelistSucces((prevState) => !prevState);
  };

  return (
    <BaseModal
      size="xl"
      title="Duplicate listing!"
      isOpen={open}
      onClose={onClose}
      className="modal-languages"
    >
      <Flex alignItems="center">
        <Flex className="delist-confirm" flexDirection={'column'} gap={'15px'}>
          <Box className="delist-confirm--list">
            <ul>
              <li> Pair token: BNB/BTC</li>
              <li>Base token: BNB</li>
              <li>Quote token: BTC</li>
              <li>Network: Ethereum</li>
            </ul>
          </Box>
          <Box className="delist-confirm--para">
            This token pair{' '}
            <Text as="span" className="delist-confirm--para-hightlight">
              already exists
            </Text>{' '}
            on the{' '}
            <Text as="span" className="delist-confirm--para-bold">
              Lagom exchange{' '}
            </Text>
            . Please double-check and select a different token pair or network
            for the listing process.
          </Box>
          <Flex justifyContent={'space-around'} gap={'10px'} pb={6}>
            <AppButton
              className="btn-outline-hover"
              flex={1}
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </AppButton>
            <AppButton flex={1} onClick={onToggleOpenModalDelistSucces}>
              Confirm
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
      {openModalDelistSucces && (
        <ModalDelistSucces
          open={openModalDelistSucces}
          onClose={onToggleOpenModalDelistSucces}
        />
      )}
    </BaseModal>
  );
};

export default ModalDuplicateListing;
