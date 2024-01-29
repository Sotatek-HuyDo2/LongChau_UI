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

interface IModalSplitedOrderProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
  orderId: number;
  userId: number;
}

interface IDrug {
  drugId: number | null;
  quantity: number;
}
interface IDataForm {
  branchId: number | null;
  userId: number | null;
  drugs: IDrug[];
}

const ModalSplitedOrder: FC<IModalSplitedOrderProps> = (props) => {
  const { open, onClose, onReload, orderId, userId } = props;

  const initData: IDataForm = {
    branchId: null,
    userId: userId,
    drugs: [{ drugId: null, quantity: 0 }],
  };

  const [dataForm, setDataForm] = useState<IDataForm[]>([initData]);
  const [selectData, setSelectData] = useState<any>([]);
  const [drugs, setDrugs] = useState<any>([]);

  const [_, setToggleLoading] = useState<boolean>(false);

  const splitOrder = async () => {
    try {
      const filterFirst = dataForm.filter(
        (field) => field.branchId && field.userId,
      );
      const payload = filterFirst.map((filed) => {
        const filterDrugs = filed.drugs.filter(
          (item) => item.drugId && item.quantity,
        );
        return { ...filed, drugs: filterDrugs };
      });

      await rf.getRequest('OrderRequest').createOrderSplit(orderId, payload);

      toastSuccess('Chia đơn thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  const getAllBranch = async () => {
    try {
      const res = await rf.getRequest('BranchRequest').getBranchList();
      const selectData = res.map((r: any) => ({
        value: r.id,
        label: r.name,
      }));
      setSelectData(selectData);
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
    getAllBranch();
    getAllDrugsOrder();
  }, []);

  return (
    <BaseModal
      size="xl"
      title="Chia Đơn thuốc"
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
              label="Chi nhánh"
              width={'full'}
              options={selectData}
              value={item?.branchId || ''}
              onChange={(value: string) => {
                const newData = dataForm;
                newData[index].branchId = +value;
                setDataForm(() => newData);
                setToggleLoading((isLoad) => !isLoad);
              }}
              size="medium"
              showFullName
            />
          </Box>
          {item.drugs.map((drug, index2) => (
            <Flex
              key={index + '-' + index2}
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
                  value={drug?.drugId || ''}
                  onChange={(value: string) => {
                    const newData = dataForm;
                    newData[index].drugs[index2].drugId = +value;
                    setDataForm(newData);
                    setToggleLoading((isLoad) => !isLoad);
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
                    newData[index].drugs[index2].quantity = +e.target.value;
                    setDataForm(newData);
                  }}
                />
              </Box>
              <AppButton
                variant="primary"
                onClick={() => {
                  const newData = dataForm;
                  newData[index].drugs.push({ drugId: null, quantity: 0 });
                  setDataForm(newData);
                  setToggleLoading((isLoad) => !isLoad);
                }}
              >
                <AddIcon paddingRight={1} /> Thêm Thuốc
              </AppButton>
            </Flex>
          ))}
        </Flex>
      ))}

      <Flex mt={6}>
        <AppButton
          variant="primary"
          w={'full'}
          onClick={() => setDataForm((prevData) => [...prevData, initData])}
        >
          <AddIcon paddingRight={1} /> Thêm đơn chia
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
        <AppButton flex={1} onClick={splitOrder}>
          Chia đơn
        </AppButton>
      </Flex>
    </BaseModal>
  );
};

export default ModalSplitedOrder;
