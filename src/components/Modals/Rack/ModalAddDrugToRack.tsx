import { Box, Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/api/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';
import AppSelect from 'src/components/AppSelect';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';

interface IModalAddDrugToRackProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
}

interface IDataForm {
  rackId: number;
  drugId: number;
  quantity: number;
}

const ModalAddDrugToRack: FC<IModalAddDrugToRackProps> = (props) => {
  const initData = {
    rackId: NaN,
    drugId: NaN,
    quantity: 10,
  };

  const { open, onClose, onReload } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(initData);
  const [racks, setRacks] = useState<any>([]);
  const [drugs, setDrugs] = useState<any>([]);
  const addDrugsToRack = async () => {
    try {
      await rf
        .getRequest('RackRequest')
        .addDrugsToRackOfMyBranch({ ...dataForm });
      onClose();
      onReload();
      toastSuccess('Thêm mới thuốc vào kho thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  const getAllRack = async () => {
    try {
      const res = await rf.getRequest('RackRequest').getAllRackOfMyBranch();
      const rackList = res.map((r: any) => ({
        value: r.rackId,
        label: r.rackId,
      }));
      setRacks(rackList);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getAllDrugsMyHouse = async () => {
    try {
      const res = await rf.getRequest('RackRequest').getMyRackBranch();
      const drugsMyHouse = res.drugs.map((r: any) => ({
        value: r.id,
        label: r.name,
      }));
      setDrugs(drugsMyHouse);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffectUnsafe(() => {
    getAllRack();
    getAllDrugsMyHouse();
  }, []);

  return (
    <BaseModal
      size="xl"
      title="Thêm thuốc vào ô chứa"
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
          <Box zIndex={2000}>
            <AppSelect
              label="Thuốc"
              width={'full'}
              options={racks}
              value={dataForm.rackId || ''}
              onChange={(value: string) => {
                setDataForm({
                  ...dataForm,
                  rackId: +value,
                });
              }}
              size="medium"
              showFullName
            />
          </Box>

          <AppSelect
            label="Thuốc"
            width={'full'}
            options={drugs}
            value={dataForm.drugId || ''}
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
              Thêm mới
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalAddDrugToRack;
