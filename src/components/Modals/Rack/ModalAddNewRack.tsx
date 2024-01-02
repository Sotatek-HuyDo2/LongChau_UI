import { Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/api/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';
import AppSelect from 'src/components/AppSelect';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';

interface IModalAddNewRackProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
}

const ModalAddNewRack: FC<IModalAddNewRackProps> = (props) => {
  const { open, onClose, onReload } = props;
  const [capacity, setCapacity] = useState<any>();

  const createNewRack = async () => {
    try {
      await rf
        .getRequest('RackRequest')
        .createRackForMyBranch({ capacity: capacity });
      window.location.reload();
      onClose();
      onReload();
      toastSuccess('Thêm mới ô chứa thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  const getAllDrugs = async () => {
    try {
      const res = await rf.getRequest('ProductRequest').createBranchWareHouse();
      const formatData = res.map((r: any) => ({
        value: r.id,
        label: r.name,
      }));
      // setDrugs(formatData);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffectUnsafe(() => {
    getAllDrugs();
  }, []);

  return (
    <BaseModal
      size="xl"
      title="Thêm ô chứa"
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
            label="Kích cỡ"
            type="number"
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
            <AppButton flex={1} onClick={createNewRack}>
              Thêm mới
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalAddNewRack;
