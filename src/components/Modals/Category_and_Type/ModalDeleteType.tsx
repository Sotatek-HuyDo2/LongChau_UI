import { Box, Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC } from 'react';

interface IModalDeleteTypeProductProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalDeleteTypeProduct: FC<IModalDeleteTypeProductProps> = (props) => {
  const { open, onClose, onConfirm } = props;

  return (
    <BaseModal
      size="xl"
      title="Xóa Phân loại thuốc"
      isOpen={open}
      onClose={onClose}
      className="modal-languages"
    >
      <Box className="delist-confirm--para" m={'auto'} fontSize={18}>
        Do you want to delete?
      </Box>
      <Flex alignItems="center">
        <Flex
          className="delist-confirm"
          flexDirection={'column'}
          gap={'15px'}
          w={'full'}
        >
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
              Xác nhận
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalDeleteTypeProduct;
