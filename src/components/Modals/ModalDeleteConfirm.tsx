import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from './BaseModal';
import AppButton from '../AppButton';
import { FC } from 'react';

interface IModalDeleteConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text?: string;
}

const ModalDeleteConfirm: FC<IModalDeleteConfirmProps> = (props) => {
  const { open, onClose, onConfirm, text } = props;
  return (
    <BaseModal
      size="xl"
      title={'Xóa dữ liệu ' + (text ? text : '')}
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
            Bạn có chắc chắn về hành động của mình?
          </Box>
          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={3}>
            <AppButton
              className="btn-outline-hover"
              flex={1}
              variant="primary"
              onClick={onClose}
              w={'100%'}
            >
              Hủy
            </AppButton>
            <AppButton flex={1} onClick={onConfirm}>
              Xóa
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalDeleteConfirm;
