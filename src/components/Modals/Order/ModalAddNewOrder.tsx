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
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

interface IModalAddNewOrderProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
}

interface IDataForm {
  branchId: number;
  userId: number;
  drugs: { drugId: number; quantity: number }[];
}

const ModalAddNewOrder: FC<IModalAddNewOrderProps> = (props) => {
  const { open, onClose, onReload } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(null!);
  // const [selectData, setSelectData] = useState<any>([]);
  const [drugs, setDrugs] = useState<any>([]);
  const [dataCustomer, setDataCustomer] = useState<any>([]);

  const dataUser = useSelector((state: RootState) => state.user.userProfile);

  const addDrugsToRack = async () => {
    try {
      const payload = {
        ...dataForm,
        branchId: dataUser.branchId,
        drugs: dataDrug,
      };
      await rf.getRequest('OrderRequest').createdOrder(payload);
      onClose();
      onReload();
      toastSuccess('Thêm mới thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  // const getAllBranch = async () => {
  //   try {
  //     const res = await rf.getRequest('BranchRequest').getBranchList();
  //     const selectData = res.map((r: any) => ({
  //       value: r.id,
  //       label: r.name,
  //     }));
  //     setSelectData(selectData);
  //   } catch (e: any) {
  //     console.log(e.message);
  //   }
  // };

  const getAllDrugsOrder = async () => {
    try {
      const res = await rf.getRequest('RackRequest').getAllRackOfMyBranch();
      const mergedDrugs = _.flatMap(res, 'drugs');
      const dataSelect2 = mergedDrugs.map((r: any) => ({
        value: r.id,
        label: r.name,
      }));
      setDrugs(dataSelect2);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getAllCustomer = async () => {
    try {
      const res = await rf.getRequest('UserRequest').getCustomer();
      const dataUser = res.map((r: any) => ({
        value: r.userId,
        label: r.lastName + ' ' + r.firstName,
      }));
      setDataCustomer(dataUser);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffectUnsafe(() => {
    // getAllBranch();
    getAllDrugsOrder();
    getAllCustomer();
  }, []);

  const [dataDrug, setDataDrug] = useState<
    { drugId: number | null; quantity: number | null }[]
  >([{ drugId: null, quantity: null }]);

  return (
    <BaseModal
      size="xl"
      title="Thêm đơn hàng"
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
          <Flex gap={3}>
            <Box zIndex={2000} w={'full'}>
              <AppSelect
                label="Người dùng"
                width={'full'}
                options={dataCustomer}
                value={dataForm?.userId || ''}
                onChange={(value: string) => {
                  setDataForm({
                    ...dataForm,
                    userId: +value,
                  });
                }}
                size="medium"
                showFullName
              />
            </Box>
          </Flex>

          {dataDrug.map((item, index) => (
            <Flex key={index} alignContent={'end'} alignItems={'end'} gap={3}>
              <Box w={'60%'}>
                <AppSelect
                  label="Thuốc"
                  width={'full'}
                  options={drugs}
                  value={item?.drugId || ''}
                  onChange={(value: string) => {
                    const newData = dataDrug;
                    newData[index].drugId = +value;
                    setDataDrug(newData);
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
                    const newData = dataDrug;
                    newData[index].quantity = +e.target.value;
                    setDataDrug(newData);
                  }}
                />
              </Box>

              <AppButton
                variant="primary"
                onClick={() => {
                  setDataDrug((prevData) => [
                    ...prevData,
                    { drugId: null, quantity: null },
                  ]);
                }}
              >
                <AddIcon paddingRight={1} /> Thêm Thuốc
              </AppButton>
            </Flex>
          ))}

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

export default ModalAddNewOrder;
