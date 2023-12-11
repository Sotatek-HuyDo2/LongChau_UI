import { Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC } from 'react';
import AppInput from '../../AppInput';
import { IAdmin } from 'src/pages/Admin/UserManagementPage/BranchAdminManagementPage.part';

interface IModalViewBranchAdminProps {
  open: boolean;
  onClose: () => void;
  data: IAdmin;
}

const ModalViewBranchAdmin: FC<IModalViewBranchAdminProps> = (props) => {
  const { open, onClose, data } = props;

  return (
    <BaseModal
      size="xl"
      title="Tạo mới người dùng"
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
            <AppInput label="Tên" value={data.firstName} disabled />
            <AppInput label="Họ" value={data.lastName} disabled />
          </Flex>
          <AppInput label="Chi nhánh" value={data.branchName} disabled />

          <AppInput label="Số điện thoại" value={data.phone} disabled />

          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={3}>
            <AppButton
              className="btn-outline-hover"
              flex={1}
              variant="primary"
              onClick={onClose}
              w={'100%'}
            >
              Xác Nhận
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalViewBranchAdmin;
