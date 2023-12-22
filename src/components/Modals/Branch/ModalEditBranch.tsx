import { Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/api/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';

interface IModalEditBranchProps {
  open: boolean;
  onClose: () => void;
  data: any;
  id: number | string;
  onReload: () => void;
}

interface IDataForm {
  name: string;
  address: string;
}

const ModalEditBranch: FC<IModalEditBranchProps> = (props) => {
  const { open, onClose, data, id, onReload } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(data);

  const editBranch = async () => {
    try {
      await rf.getRequest('BranchRequest').updateBranchAdminInfo(id, dataForm);
      onClose();
      onReload();
      toastSuccess('Sửa chi nhánh thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  return (
    <BaseModal
      size="xl"
      title="Edit Medical Information"
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
            label="Tên chi nhánh"
            defaultValue={dataForm.name}
            onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
          />
          <AppInput
            label="Địa chỉ"
            defaultValue={dataForm.address}
            onChange={(e) =>
              setDataForm({ ...dataForm, address: e.target.value })
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
            <AppButton flex={1} onClick={editBranch}>
              Sửa
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalEditBranch;
