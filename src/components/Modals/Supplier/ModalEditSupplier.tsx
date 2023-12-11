import { Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/api/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';

interface IModalEditSupplierProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
  data: any;
  supId: number;
}

interface IDataForm {
  name: string;
  email: string;
  phone: string;
}

const ModalEditSupplier: FC<IModalEditSupplierProps> = (props) => {
  const { open, onClose, onReload, data, supId } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(data);

  const updateSupplier = async () => {
    try {
      await rf.getRequest('SupplierRequest').updateSupplier(supId, dataForm);
      onClose();
      onReload();
      toastSuccess('Sửa nhà cung cấp thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  return (
    <BaseModal
      size="xl"
      title="Sửa nhà cung cấp mới"
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
            defaultValue={data.name}
            onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
          />
          <AppInput
            label="Email"
            defaultValue={data.email}
            onChange={(e) =>
              setDataForm({ ...dataForm, email: e.target.value })
            }
          />
          <AppInput
            label="Số điện thoại"
            defaultValue={data.phone}
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
            <AppButton flex={1} onClick={updateSupplier}>
              Sửa
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalEditSupplier;
