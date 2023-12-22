import { Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/api/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';
import AppSelect from 'src/components/AppSelect';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { IBranch } from 'src/pages/Admin/BranchManagementPage';

interface IModalAddNewStaffProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
}

interface IDataBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const ModalAddNewStaff: FC<IModalAddNewStaffProps> = (props) => {
  const initDataUser = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  };
  const { open, onClose, onReload } = props;
  const [dataUser, setDataUser] = useState<IDataBody>(initDataUser);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value.trim();
    setDataUser({ ...dataUser, email: emailValue });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(emailValue));
  };

  const createNewStaff = async () => {
    try {
      await rf.getRequest('UserRequest').createStaffAccount(dataUser);
      onClose();
      onReload();
      toastSuccess('Thêm mới Staff thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  return (
    <BaseModal
      size="xl"
      title="Thêm mới Staff"
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
              onChange={(e: any) =>
                setDataUser({ ...dataUser, firstName: e.target.value.trim() })
              }
            />
            <AppInput
              label="Họ"
              onChange={(e: any) =>
                setDataUser({ ...dataUser, lastName: e.target.value.trim() })
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
            <AppButton flex={1} onClick={createNewStaff}>
              Thêm mới
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalAddNewStaff;
