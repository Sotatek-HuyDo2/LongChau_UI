import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import { FC } from 'react';
import BaseModal from '../BaseModal';
import AppButton from 'src/components/AppButton';

interface IModalRejectOrderProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text?: string;
}

const ModalRejectOrder: FC<IModalRejectOrderProps> = (props) => {
  const { open, onClose, onConfirm, text } = props;
  return (
    <BaseModal
      size="xl"
      title={'Hủy đơn hàng ' + (text ? text : '')}
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
              Không
            </AppButton>
            <AppButton flex={1} onClick={onConfirm}>
              Có
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalRejectOrder;
