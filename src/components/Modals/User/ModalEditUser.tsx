import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC } from 'react';
import AppInput from '../../AppInput';
import { IUser } from 'src/pages/Admin/UserManagementPage';

interface IModalEditUserProps {
  open: boolean;
  onClose: () => void;
  // onConfirm: () => void;
  data: IUser;
}

const ModalEditUser: FC<IModalEditUserProps> = (props) => {
  const { open, onClose, data } = props;
  return (
    <BaseModal
      size="xl"
      title="Sửa thông tin người dùng"
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
          {/* <Box className="delist-confirm--para" m={'auto'} fontSize={18}>
            Edit User {data.firstName + ' ' + data.lastName}
          </Box> */}
          <Flex>
            <AppInput label="Email" defaultValue={data.email} disabled />
          </Flex>
          <Flex gap={3}>
            <AppInput label="Tên" defaultValue={data.lastName} />
            <AppInput label="Họ" defaultValue={data.firstName} />
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
              Hủy
            </AppButton>
            <AppButton flex={1}>Xác nhận</AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalEditUser;
