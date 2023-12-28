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

interface IModalUpdateSizeTotalRackProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
}

const ModalUpdateSizeTotalRack: FC<IModalUpdateSizeTotalRackProps> = (
  props,
) => {
  const { open, onClose, onReload } = props;
  const [capacity, setCapacity] = useState<number | string>();

  const addDrugsToRack = async () => {
    try {
      await rf.getRequest('RackRequest').updateSizeTotalRack(capacity);
      onClose();
      onReload();
      toastSuccess('Thêm mới thuốc vào kho thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  return (
    <BaseModal
      size="xl"
      title="Sửa kích thước kho"
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
            label="Kích thước"
            type="number"
            onChange={(e: any) => {
              setCapacity(e.target.value);
            }}
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
            <AppButton flex={1} onClick={addDrugsToRack}>
              Thêm mới
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalUpdateSizeTotalRack;
