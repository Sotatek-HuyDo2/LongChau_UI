import { Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC } from 'react';
import AppInput from '../../AppInput';

interface IModalViewStaffProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

const ModalViewStaff: FC<IModalViewStaffProps> = (props) => {
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
          <AppInput label="Chi Nhánh" value={data.branchName} disabled />
          <Flex gap={3}>
            <AppInput label="Tên" value={data.firstName} disabled />
            <AppInput label="Họ" value={data.lastName} disabled />
          </Flex>
          <AppInput label="Số điện thoại" value={data.phone} disabled />

          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={3}>
            <AppButton
              className="btn-outline-hover"
              flex={1}
              variant="primary"
              onClick={onClose}
              w={'100%'}
            >
              Xác nhận
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalViewStaff;
