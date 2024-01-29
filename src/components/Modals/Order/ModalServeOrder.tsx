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
    quantity: 10,
  };

  const { open, onClose, onReload, orderId } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(initData);
  const [racks, setRacks] = useState<any>([]);
  const [drugs, setDrugs] = useState<any>([]);

  const serveOrder = async () => {
    try {
      console.log(dataForm);
      //request body la 1 mang cac dataform nay
      const reqBody = [dataForm];
      await rf.getRequest('OrderRequest').createOrderServe(orderId, reqBody);
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

  const [addOrder, setAddOrder] = useState(false);
  const [addDrug, setAddDrug] = useState(false);

  return (
    <BaseModal
      size="xl"
      title="Đáp ứng đơn thuốc"
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
              label="Ô chứa"
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
            <AddIcon paddingRight={1} /> Thêm ô chứa
          </AppButton>
          {addOrder && (
            <>
              <Box zIndex={2000}>
                <AppSelect
                  label="Ô chứa"
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
              <AppButton variant="primary" onClick={() => setAddOrder(true)}>
                <AddIcon paddingRight={1} /> Thêm ô chứa
              </AppButton>
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
            <AppButton flex={1} onClick={serveOrder}>
              Đáp ứng
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalServeOrder;
