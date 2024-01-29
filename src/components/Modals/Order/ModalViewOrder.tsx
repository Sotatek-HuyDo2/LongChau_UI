import { Box, Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/api/RequestFactory';
import AppSelect from 'src/components/AppSelect';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';

interface IModalViewOrderProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
  orderId: number;
}

interface IDataForm {
  rackId: number;
  drugId: number;
  quantity: number;
}

const ModalViewOrder: FC<IModalViewOrderProps> = (props) => {
  const initData = {
    rackId: NaN,
    drugId: NaN,
    quantity: 10,
  };

  const { open, onClose, orderId } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(initData);
  const [drugs, setDrugs] = useState<any>([]);

  const getAllDrugsOrder = async () => {
    try {
      const res = await rf.getRequest('OrderRequest').getOrderById(orderId);
      const dataSelect2 = res.drugsWithQuantity;
      setDrugs(dataSelect2);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  console.log(drugs);

  useEffectUnsafe(() => {
    getAllDrugsOrder();
  }, []);

  return (
    <BaseModal
      size="xl"
      title="Xem đơn hàng"
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
          {drugs.map((drug: any, index: number) => (
            <Flex gap={3}>
              <AppInput
                size="md"
                label="Tên thuốc"
                value={drug.drugName ? drug.drugName : `drugTest ${index + 1}`}
              />
              <AppInput
                size="md"
                label="Số lượng"
                type="number"
                value={drug.quantity}
              />
            </Flex>
          ))}
          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={3}>
            <AppButton flex={1} onClick={onClose}>
              Xác nhận
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalViewOrder;
