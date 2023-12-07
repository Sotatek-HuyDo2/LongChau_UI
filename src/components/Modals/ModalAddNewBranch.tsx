import { Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from './BaseModal';
import AppButton from '../AppButton';
import { FC, useState } from 'react';
import AppInput from '../AppInput';
import rf from 'src/services/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';

interface IModalAddNewBranchProps {
  open: boolean;
  onClose: () => void;
}

interface IDataForm {
  name: string;
  address: string;
}

const ModalAddNewBranch: FC<IModalAddNewBranchProps> = (props) => {
  const initData = {
    name: '',
    address: '',
  };

  const { open, onClose } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(initData);

  const createNewBranchs = async () => {
    try {
      await rf.getRequest('BranchRequest').branchAdminRegister(dataForm);
      onClose();
      toastSuccess('Tạo mới Branch thành công');
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
          <Flex>
            <AppInput
              label="Tên cở sở"
              onChange={(e) =>
                setDataForm({ ...dataForm, name: e.target.value })
              }
            />
          </Flex>
          <Flex>
            <AppInput
              label="Địa chỉ"
              onChange={(e) =>
                setDataForm({ ...dataForm, address: e.target.value })
              }
            />
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
            <AppButton flex={1} onClick={createNewBranchs}>
              Thêm mới
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalAddNewBranch;
