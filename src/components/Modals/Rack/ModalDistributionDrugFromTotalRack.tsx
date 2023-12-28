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

interface IModalDistributionDrugFromTotalRackProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
  rackId2: number;
}

interface IDataForm {
  rackId: number;
  drugId: number;
  quantity: number;
}

const ModalDistributionDrugFromTotalRack: FC<
  IModalDistributionDrugFromTotalRackProps
> = (props) => {
  const { open, onClose, onReload, rackId2 } = props;

  const initData = {
    rackId: 1,
    drugId: 1,
    quantity: NaN,
  };
  const [dataForm, setDataForm] = useState<IDataForm>(initData);
  const [drugs, setDrugs] = useState<any>([]);

  const addDrugsToRack = async () => {
    try {
      await rf.getRequest('RackRequest').deleteDrugsFromRack(dataForm);
      await rf
        .getRequest('RackRequest')
        .addDrugsToRack({ ...dataForm, rackId: rackId2 });
      onClose();
      onReload();
      toastSuccess('Phân phối thuốc thành công');
    } catch (e: any) {
      toastError(e.message);
      if (e.message === 'Out of capacity.') {
        await rf
          .getRequest('RackRequest')
          .addDrugsToRack({ ...dataForm, rackId: 1 });
      }
    }
  };

  const getAllDrugs = async () => {
    try {
      const res = await rf.getRequest('RackRequest').getTotalRack();
      const formatData = res.drugs.map((r: any) => ({
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
      title="Phân phối thuốc"
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
            value={dataForm.drugId}
            onChange={(value: string) => {
              setDataForm({
                ...dataForm,
                drugId: +value,
              });
            }}
            size="medium"
            showFullName
          />
          {/* <AppInput
            label="Số lượng ở tổng kho"
            type="number"
            onChange={(e) =>
              setDataForm({ ...dataForm, quantity: +e.target.value })
            }
          /> */}
          <AppInput
            label="Số lượng phân phối"
            type="number"
            onChange={(e) =>
              setDataForm({ ...dataForm, quantity: +e.target.value })
            }
          />{' '}
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

export default ModalDistributionDrugFromTotalRack;
