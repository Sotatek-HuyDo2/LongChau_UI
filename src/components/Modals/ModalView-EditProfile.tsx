import { Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from './BaseModal';
import AppButton from '../AppButton';
import { FC, useState } from 'react';
import AppInput from '../AppInput';
import { IUser } from 'src/pages/Admin/UserManagementPage/CustomerManagementPage';
import rf from 'src/api/RequestFactory';
import { toastSuccess } from 'src/utils/notify';

interface IModalViewEditProfileProps {
  open: boolean;
  onClose: () => void;
  data?: IUser;
}

const ModalViewEditProfile: FC<IModalViewEditProfileProps> = (props) => {
  const { open, onClose, data } = props;
  const [dataBody, setDataBody] = useState<any>(data);
  const [editStatus, setEditStatus] = useState<boolean>(true);

  const handleChangeOption = async () => {
    setEditStatus(!editStatus);
    if (editStatus === false) {
      try {
        await rf.getRequest('UserRequest').updateProfile(dataBody);
        window.location.reload();
        toastSuccess('Update Profile Successful');
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };
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
            <AppInput
              label="Tên"
              defaultValue={data?.firstName}
              onChange={(e) => {
                setDataBody({ ...dataBody, firstName: e.target.value });
              }}
              disabled={editStatus}
            />
            <AppInput
              label="Họ"
              defaultValue={data?.lastName}
              onChange={(e) => {
                setDataBody({ ...dataBody, lastName: e.target.value });
              }}
              disabled={editStatus}
            />
          </Flex>
          <AppInput
            label="Số điện thoại"
            defaultValue={data?.phone}
            onChange={(e) => {
              setDataBody({ ...dataBody, phone: e.target.value });
            }}
            disabled={editStatus}
          />
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
            <AppButton
              className="btn-outline-hover"
              flex={1}
              onClick={handleChangeOption}
              w={'100%'}
            >
              {editStatus ? 'Chỉnh sửa' : 'Lưu'}
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalViewEditProfile;
