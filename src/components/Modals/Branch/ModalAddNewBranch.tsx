import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/api/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';

interface IModalAddNewBranchProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
}

interface IDataForm {
  name: string;
  address: string;
}

interface IDataBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  branchId: number;
}

const ModalAddNewBranch: FC<IModalAddNewBranchProps> = (props) => {
  const initData = {
    name: '',
    address: '',
  };

  const initDataUser = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    branchId: 1,
  };

  const { open, onClose, onReload } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(initData);
  const [capacity, setCapacity] = useState<number>();
  const [dataUser, setDataUser] = useState<IDataBody>(initDataUser);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isEmailValid, setEmailValid] = useState(true);

  const createNewBranch = async () => {
    try {
      await rf.getRequest('BranchRequest').createBranchAdmin(dataForm);
      const branchs = await rf.getRequest('BranchRequest').getBranchList();
      const lastBranch = branchs.at(-1);
      if (lastBranch && lastBranch.id) {
        await rf
          .getRequest('RackRequest')
          .createBranchWareHouse(+lastBranch.id, { capacity: capacity });
        await rf
          .getRequest('UserRequest')
          .createBranchAdminAccount({ ...dataUser, branchId: lastBranch.id });
        onClose();
        onReload();
        toastSuccess('Thêm mới chi nhánh thành công');
      }
    } catch (e: any) {
      toastError(e.message);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value.trim();
    setDataUser({ ...dataUser, email: emailValue });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(emailValue));
  };
  return (
    <BaseModal
      size="xl"
      title="Thêm mới chi nhánh"
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
          <Box color={'black'}>Chi Nhánh</Box>
          <AppInput
            label="Tên chi nhánh"
            onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
          />
          <AppInput
            label="Địa chỉ"
            onChange={(e) =>
              setDataForm({ ...dataForm, address: e.target.value })
            }
          />
          <Box color={'black'}>Kho Chi Nhánh</Box>

          <AppInput
            label="Kích cỡ kho"
            onChange={(e) => setCapacity(+e.target.value)}
          />

          <Box color={'black'}>Quản lý Chi Nhánh</Box>

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

          <Flex gap={3}>
            <AppInput
              label="Số điện thoại"
              onChange={(e: any) =>
                setDataUser({ ...dataUser, phone: e.target.value.trim() })
              }
            />

            <Flex flexDir={'column'} w={'full'}>
              <AppInput
                type="email"
                label="Email"
                onChange={handleEmailChange}
                isInvalid={!isEmailValid}
              />
              <Text color={'red.500'}>
                {!isEmailValid && 'Email không hợp lệ'}
              </Text>
            </Flex>
          </Flex>
          <Flex gap={3}>
            <AppInput
              type="password"
              label="Mật khẩu"
              onChange={(e: any) =>
                setDataUser({ ...dataUser, password: e.target.value })
              }
            />

            <Flex w={'full'} flexDir={'column'}>
              <AppInput
                type="password"
                label="Xác nhận mật khẩu"
                onChange={(e: any) => setPasswordConfirm(e.target.value)}
                disabled={!dataUser.password}
              />
              <Text color={'red.500'}>
                {passwordConfirm &&
                  passwordConfirm !== dataUser.password &&
                  'Mật khẩu không khớp'}
              </Text>
            </Flex>
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
            <AppButton flex={1} onClick={createNewBranch}>
              Thêm mới
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalAddNewBranch;
