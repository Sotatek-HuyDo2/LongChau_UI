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
import { AddIcon } from '@chakra-ui/icons';

interface IModalServeOrderProps {
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

const ModalServeOrder: FC<IModalServeOrderProps> = (props) => {
  const initData = {
    rackId: NaN,
    drugId: NaN,
    quantity: 0,
  };

  const { open, onClose, onReload, orderId } = props;
  const [dataForm, setDataForm] = useState<IDataForm[]>([initData]);
  const [racks, setRacks] = useState<any>([]);
  const [drugs, setDrugs] = useState<any>([]);

  const serveOrder = async () => {
    try {
      const payload = dataForm.filter((field) =>
        Object.keys(field).every((e) => (field as any)[e]),
      );

      await rf.getRequest('OrderRequest').createOrderServe(orderId, payload);
      toastSuccess('Đáp ứng đơn thuốc thành công');
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

  const getAllDrugsOrder = async () => {
    try {
      const res = await rf.getRequest('OrderRequest').getOrderById(orderId);
      const dataSelect2 = res.drugsWithQuantity.map((r: any) => ({
        value: r.drugId,
        label: r.drugName,
      }));
      setDrugs(dataSelect2);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffectUnsafe(() => {
    getAllRack();
    getAllDrugsOrder();
  }, []);

  const [_, setToggleLoading] = useState<boolean>(false);

  return (
    <BaseModal
      size="xl"
      title="Đáp ứng đơn thuốc"
      isOpen={open}
      onClose={onClose}
      className="modal-languages"
    >
      {dataForm.map((item, index) => (
        <Flex
          key={index}
          className="delist-confirm"
          flexDirection={'column'}
          gap={'15px'}
          w={'full'}
        >
          {index > 0 && (
            <Box
              w={'full'}
              borderBottom={'1px solid rgba(0, 0, 0, .2)'}
              my={4}
            />
          )}
          <Box pos={'relative'}>
            <AppSelect
              label="Ô chứa"
              width={'full'}
              options={racks}
              value={item?.rackId || ''}
              onChange={(value: string) => {
                const newData = dataForm;
                newData[index].rackId = +value;
                setDataForm(() => newData);
                setToggleLoading((loading) => !loading);
              }}
              size="medium"
              showFullName
            />
          </Box>
          <Flex
            alignContent={'end'}
            alignItems={'end'}
            gap={3}
            pos={'relative'}
          >
            <Box w={'60%'}>
              <AppSelect
                label="Thuốc"
                width={'full'}
                options={drugs}
                value={item?.drugId || ''}
                onChange={(value: string) => {
                  const newData = dataForm;
                  newData[index].drugId = +value;
                  setDataForm(newData);
                  setToggleLoading((loading) => !loading);
                }}
                size="medium"
                showFullName
              />
            </Box>
            <Box>
              <AppInput
                size="md"
                label="Số lượng"
                type="number"
                onChange={(e) => {
                  const newData = dataForm;
                  newData[index].quantity = +e.target.value;
                  setDataForm(newData);
                  // setToggleLoading((loading) => !loading);
                }}
              />
            </Box>
          </Flex>
        </Flex>
      ))}

      <Flex justify={'center'} mt={6}>
        <AppButton
          variant="primary"
          onClick={() => setDataForm((prevData) => [...prevData, initData])}
        >
          <AddIcon paddingRight={1} /> Thêm ô chứa
        </AppButton>
      </Flex>

      <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={8}>
        <AppButton
          className="btn-outline-hover"
          flex={1}
          variant="primary"
          onClick={onClose}
          w={'100%'}
        >
          Hủy
        </AppButton>
        <AppButton flex={1} onClick={serveOrder}>
          Đáp ứng
        </AppButton>
      </Flex>
    </BaseModal>
  );
};

export default ModalServeOrder;
