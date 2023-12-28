import { Flex } from '@chakra-ui/react';
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

const ModalAddNewBranch: FC<IModalAddNewBranchProps> = (props) => {
  const initData = {
    name: '',
    address: '',
  };

  const { open, onClose, onReload } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(initData);
  const [capacity, setCapacity] = useState<number>();
  const [branchId, setBranchId] = useState<number | string>();

  const createNewBranch = async () => {
    try {
      await rf.getRequest('BranchRequest').createBranchAdmin(dataForm);
      const branchs = await rf.getRequest('BranchRequest').getBranchList();
      const lastBranch = branchs.at(-1);
      if (lastBranch && lastBranch.id) {
        await rf
          .getRequest('RackRequest')
          .createBranchWareHouse(+lastBranch.id, { capacity: capacity });
      }
      onClose();
      onReload();
      toastSuccess('Thêm mới chi nhánh thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  // const addRackToBranch = async () => {
  //   try {
  //     await rf.getRequest('BranchRequest').createBranchWareHouse(branchId, capacity);
  //     toastSuccess('Thêm mới kho cho chi nhánh thành công');
  //   } catch (e: any) {}
  // };

  // useEffectUnsafe(() => {
  //   addRackToBranch();
  // }, [branchId]);

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
          <AppInput
            label="Kích cỡ kho"
            onChange={(e) => setCapacity(+e.target.value)}
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

export default ModalAddNewBranch;
