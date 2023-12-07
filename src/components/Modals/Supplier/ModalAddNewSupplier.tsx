import { Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/services/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';

interface IModalAddNewSupplierProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
}

interface IDataForm {
  name: string;
  email: string;
  phone: string;
}

const ModalAddNewSupplier: FC<IModalAddNewSupplierProps> = (props) => {
  const initData = {
    name: '',
    email: '',
    phone: '',
  };

  const { open, onClose, onReload } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(initData);

  const createNewBranch = async () => {
    try {
      await rf.getRequest('SupplierRequest').createSupplier(dataForm);
      onClose();
      onReload();
      toastSuccess('Tạo mới nhà cung cấp thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  return (
    <BaseModal
      size="xl"
      title="Tạo nhà cung cấp mới"
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
          <AppInput
            label="Tên nhà cung cấp"
            onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
          />
          <AppInput
            label="Email"
            onChange={(e) =>
              setDataForm({ ...dataForm, email: e.target.value })
            }
          />
          <AppInput
            label="Số điện thoại"
            onChange={(e) =>
              setDataForm({ ...dataForm, phone: e.target.value })
            }
          />
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

export default ModalAddNewSupplier;
