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
      size="2xl"
      title="Thay đổi trạng thái người dùng"
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
          <Flex
            className="delist-confirm--para"
            m={'auto'}
            fontSize={18}
            textAlign={'center'}
          >
            Bạn có muốn thay đổi trạng thái của người dùng này? (thay đổi này sẽ
            ảnh hưởng tới trải nghiệm của người dùng)
          </Flex>
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

export default ModalChangeActiveConfirm;
