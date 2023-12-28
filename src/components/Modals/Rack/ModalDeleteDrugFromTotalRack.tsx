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

interface IModalDeleteDrugFromTotalRackProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
  drugId: number;
}

interface IDataForm {
  rackId: number;
  drugId: number;
  quantity: number;
}

const ModalDeleteDrugFromTotalRack: FC<IModalDeleteDrugFromTotalRackProps> = (
  props,
) => {
  const { open, onClose, onReload, drugId } = props;
  const initData = {
    rackId: 1,
    drugId: drugId,
    quantity: NaN,
  };
  const [dataForm, setDataForm] = useState<IDataForm>(initData);
  const [drugs, setDrugs] = useState<any>([]);

  const addDrugsToRack = async () => {
    try {
      await rf.getRequest('RackRequest').deleteDrugsFromRack(dataForm);
      onClose();
      onReload();
      toastSuccess('Thêm mới thuốc vào kho thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  const getAllDrugs = async () => {
    try {
      const res = await rf.getRequest('ProductRequest').getProduct();
      const formatData = res.map((r: any) => ({
        value: r.id,
        label: r.name,
      }));
      setDrugs(formatData);
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
      title="Bỏ bớt thuốc khỏi kho"
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
          <AppSelect
            label="Thuốc"
            width={'full'}
            options={drugs}
            value={drugId || ''}
            onChange={(value: string) => {
              setDataForm({
                ...dataForm,
                drugId: +value,
              });
            }}
            size="medium"
            showFullName
          />

          <AppInput
            label="Số lượng"
            type="number"
            onChange={(e) =>
              setDataForm({ ...dataForm, quantity: +e.target.value })
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
            <AppButton flex={1} onClick={addDrugsToRack}>
              Xác nhận
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalDeleteDrugFromTotalRack;
