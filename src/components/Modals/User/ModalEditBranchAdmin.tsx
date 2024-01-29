import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/api/RequestFactory';
import { IAdmin } from 'src/pages/Admin/UserManagementPage/BranchAdminManagementPage.part';
import { toastError, toastSuccess } from 'src/utils/notify';

interface IModalEditBranchAdminProps {
  open: boolean;
  onClose: () => void;
  data: IAdmin;
}

interface IDataBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  branchId: number;
}

const ModalEditBranchAdmin: FC<IModalEditBranchAdminProps> = (props) => {
  const initDataUser = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    branchId: 1,
  };
  const { open, onClose, data } = props;
  const [dataUser, setDataUser] = useState<IDataBody>(initDataUser);
  const [isEmailValid, setEmailValid] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value.trim();
    setDataUser({ ...dataUser, email: emailValue });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(emailValue));
  };

  const handleConfirm = async () => {
    console.log(dataUser);
    try {
      await rf
        .getRequest('UserRequest')
        .updateBranchAdminByID(data.userId, dataUser);
      toastSuccess('Thay quản lý chi nhánh thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  return (
    <BaseModal
      size="xl"
      title="Thay quản lý chi nhánh"
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
          <Box color={'black'}>Từ quản lý</Box>
          <Flex gap={3}>
            <AppInput label="Tên" value={data.firstName} />
            <AppInput label="Họ" value={data.lastName} />
          </Flex>
          <AppInput label="Chi nhánh" value={data.branchName} />

          <Box color={'black'}>Sang quản lý</Box>

          <Flex gap={3}>
            <AppInput
              label="Tên"
              onChange={(e: any) =>
                setDataUser({ ...dataUser, firstName: e.target.value })
              }
            />
            <AppInput
              label="Họ"
              onChange={(e: any) =>
                setDataUser({ ...dataUser, lastName: e.target.value })
              }
            />
          </Flex>
          <AppInput
            label="Số điện thoại"
            onChange={(e: any) =>
              setDataUser({ ...dataUser, phone: e.target.value.trim() })
            }
          />
          <AppInput
            type="email"
            label="Email"
            onChange={handleEmailChange}
            isInvalid={!isEmailValid}
          />
          <Text color={'red.500'}>{!isEmailValid && 'Email không hợp lệ'}</Text>

          <Flex gap={3}>
            <AppInput
              type="password"
              label="Mật khẩu"
              onChange={(e: any) =>
                setDataUser({ ...dataUser, password: e.target.value })
              }
            />
            <AppInput
              type="password"
              label="Xác nhận mật khẩu"
              onChange={(e: any) => setPasswordConfirm(e.target.value)}
              disabled={!dataUser.password}
            />
          </Flex>
          {passwordConfirm && passwordConfirm !== dataUser.password && (
            <Text color={'red.500'}>Mật khẩu không khớp</Text>
          )}

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
              onClick={handleConfirm}
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
