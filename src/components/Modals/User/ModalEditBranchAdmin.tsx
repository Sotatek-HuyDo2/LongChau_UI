import { Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC } from 'react';
import AppInput from '../../AppInput';
import { IAdmin } from 'src/pages/Admin/UserManagementPage/BranchAdminManagementPage.part';

interface IModalEditBranchAdminProps {
  open: boolean;
  onClose: () => void;
  data: IAdmin;
}

const ModalEditBranchAdmin: FC<IModalEditBranchAdminProps> = (props) => {
  const { open, onClose, data } = props;

  return (
    <BaseModal
      size="xl"
      title="Sang nhượng quyền quản lý chi nhánh"
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
          <Flex gap={1}>
            <AppInput label="Tên" value={data.firstName} />
            <AppInput label="Họ" value={data.lastName} />
          </Flex>
          <AppInput label="Chi nhánh" value={data.branchName} />

          <AppInput label="Số điện thoại" value={data.phone} />

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

export default ModalEditBranchAdmin;
