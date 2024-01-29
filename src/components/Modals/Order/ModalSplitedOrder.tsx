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

interface IDataForm {
  branchId: number;
  drugId: number;
  quantity: number;
}

const ModalSplitedOrder: FC<IModalSplitedOrderProps> = (props) => {
  const initData = {
    branchId: NaN,
    drugId: NaN,
    quantity: 10,
  };

  const { open, onClose, onReload, orderId, userId } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(initData);
  const [selectData, setSelectData] = useState<any>([]);
  const [drugs, setDrugs] = useState<any>([]);
  const splitOrder = async () => {
    try {
      //request body la 1 mang cac object nay
      console.log({
        userId,
        branchId: dataForm.branchId,
        drugs: [{ drugId: dataForm.drugId, quantity: dataForm.quantity }],
      });
      const reqBody = [
        {
          userId,
          branchId: dataForm.branchId,
          drugs: [{ drugId: dataForm.drugId, quantity: dataForm.quantity }],
        },
      ];
      await rf.getRequest('OrderRequest').createOrderSplit(orderId, reqBody);
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

  const [addOrder, setAddOrder] = useState(false);
  const [addDrug, setAddDrug] = useState(false);

  return (
    <BaseModal
      size="xl"
      title="Chia Đơn thuốc"
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
              label="Chi nhánh"
              width={'full'}
              options={selectData}
              value={dataForm.branchId || ''}
              onChange={(value: string) => {
                setDataForm({
                  ...dataForm,
                  branchId: +value,
                });
              }}
              size="medium"
              showFullName
            />
          </Box>

          <Flex alignContent={'end'} alignItems={'end'} gap={3}>
            <Box w={'60%'}>
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
            </Box>
            <Box>
              <AppInput
                size="md"
                label="Số lượng"
                type="number"
                onChange={(e) =>
                  setDataForm({ ...dataForm, quantity: +e.target.value })
                }
              />
            </Box>

            <AppButton variant="primary" onClick={() => setAddDrug(true)}>
              <AddIcon paddingRight={1} /> Thêm Thuốc
            </AppButton>
          </Flex>

          {addDrug && (
            <>
              <Flex alignContent={'end'} alignItems={'end'} gap={3}>
                <Box w={'60%'}>
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
                </Box>
                <Box>
                  <AppInput
                    size="md"
                    label="Số lượng"
                    type="number"
                    onChange={(e) =>
                      setDataForm({ ...dataForm, quantity: +e.target.value })
                    }
                  />
                </Box>

                <AppButton variant="primary" onClick={() => setAddDrug(true)}>
                  <AddIcon paddingRight={1} /> Thêm Thuốc
                </AppButton>
              </Flex>
            </>
          )}

          <AppButton variant="primary" onClick={() => setAddOrder(true)}>
            <AddIcon paddingRight={1} /> Thêm đơn chia
          </AppButton>
          {addOrder && (
            <>
              <Box zIndex={2000}>
                <AppSelect
                  label="Chi nhánh"
                  width={'full'}
                  options={selectData}
                  value={dataForm.branchId || ''}
                  onChange={(value: string) => {
                    setDataForm({
                      ...dataForm,
                      branchId: +value,
                    });
                  }}
                  size="medium"
                  showFullName
                />
              </Box>

              <Flex alignContent={'end'} alignItems={'end'} gap={3}>
                <Box w={'60%'}>
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
                </Box>
                <Box>
                  <AppInput
                    size="md"
                    label="Số lượng"
                    type="number"
                    onChange={(e) =>
                      setDataForm({ ...dataForm, quantity: +e.target.value })
                    }
                  />
                </Box>

                <AppButton variant="primary" onClick={() => setAddDrug(true)}>
                  <AddIcon paddingRight={1} /> Thêm Thuốc
                </AppButton>
              </Flex>
            </>
          )}
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
            <AppButton flex={1} onClick={splitOrder}>
              Chia đơn
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalSplitedOrder;
