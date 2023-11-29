import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from './BaseModal';
import AppButton from '../AppButton';
import { FC } from 'react';

interface IModalChangeActiveConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalChangeActiveConfirm: FC<IModalChangeActiveConfirmProps> = (
  props,
) => {
  const { open, onClose, onConfirm } = props;
  return (
    <BaseModal
      size="xl"
      title="Delete confirmation"
      isOpen={open}
      onClose={onClose}
      className="modal-languages"
    >
      <Flex alignItems="center">
        <Flex
          className="delist-confirm"
          flexDirection={'column'}
          gap={'15px'}
          w={'full'}
        >
          <Box className="delist-confirm--para" m={'auto'} fontSize={18}>
            Do you want to change active this User?
          </Box>
          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={3}>
            <AppButton
              className="btn-outline-hover"
              flex={1}
              variant="primary"
              onClick={onClose}
              w={'100%'}
            >
              Cancel
            </AppButton>
            <AppButton flex={1} onClick={onConfirm}>
              Confirm
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalChangeActiveConfirm;
