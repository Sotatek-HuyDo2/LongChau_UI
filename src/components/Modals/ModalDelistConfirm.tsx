import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from './BaseModal';
import AppButton from '../AppButton';
import { useEffect, useState } from 'react';
import ModalDelistSucces from './ModalDelistSucces';

interface IModalDelistConfirmProps {
  open: boolean;
  onClose: () => void;
}

const ModalDelistConfirm: React.FC<IModalDelistConfirmProps> = (props) => {
  const { open, onClose } = props;

  const [openModalDelistSucces, setOpenModalDelistSucces] =
    useState<boolean>(false);

  const onToggleOpenModalDelistSucces = () => {
    setOpenModalDelistSucces((prevState) => !prevState);
  };

  return (
    <BaseModal
      size="xl"
      title="Delist confirmation"
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
              className="delist-confirm--para-hightlight"
            >
              delisted
            </Text>{' '}
            on{' '}
            <Text as="span" className="delist-confirm--para-bold">
              Lagom exchange
            </Text>{' '}
            .{' '}
            <Text as="span" className="delist-confirm--para-hightlight">
              Additionally, all user orders for this pair will be canceled.
            </Text>{' '}
            Please review carefully before selecting{' '}
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

export default ModalDelistConfirm;
