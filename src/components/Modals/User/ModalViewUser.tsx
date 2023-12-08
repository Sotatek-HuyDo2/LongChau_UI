import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC } from 'react';
import AppInput from '../../AppInput';
import { IUser } from 'src/pages/Admin/UserManagementPage/CustomerManagementPage';

interface IModalEditUserProps {
  open: boolean;
  onClose: () => void;
  data: IUser;
}

const ModalEditUser: FC<IModalEditUserProps> = (props) => {
  const { open, onClose, data } = props;
  return (
    <BaseModal
      size="xl"
      title="Xem thông tin người dùng"
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
          <Flex gap={3}>
            <AppInput label="Tên" defaultValue={data.firstName} />
            <AppInput label="Họ" defaultValue={data.lastName} />
          </Flex>
          <AppInput label="Số điện thoại" defaultValue={data.phone} />
          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={3}>
            <AppButton
              className="btn-outline-hover"
              flex={1}
              variant="primary"
              onClick={onClose}
              w={'100%'}
            >
              Thoát
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalEditUser;
