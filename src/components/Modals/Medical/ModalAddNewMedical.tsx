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
import { IBranch } from 'src/pages/Admin/BranchManagementPage';

interface IModalAddNewMedicalProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
}

interface IDataBody {
  name: string;
  typeId: number;
  supplierId: number;
  soldAsDose: boolean;
  sensitiveIngredients?: Array<string>;
  description: string;
  unit: string;
  barcode: number;
  price: number;
  size: number;
}

const ModalAddNewMedical: FC<IModalAddNewMedicalProps> = (props) => {
  const initDataUser = {
    name: '',
    typeId: NaN,
    supplierId: NaN,
    soldAsDose: false,
    description: '',
    unit: 'bottle',
    barcode: NaN,
    price: NaN,
    size: NaN,
  };
  const { open, onClose, onReload } = props;
  const [dataUser, setDataUser] = useState<IDataBody>(initDataUser);
  const [listDrugsType, setListDrugsTypes] = useState<any>([]);
  const [listCate, setListCate] = useState<any>([]);
  const [listSupplier, setListSupplier] = useState<any>([]);
  const [categoriesId, setCategoriesId] = useState<number>(1);

  const createNewBranch = async () => {
    try {
      await rf.getRequest('ProductRequest').createProduct(dataUser);
      onClose();
      onReload();
      toastSuccess('Thêm mới thuốc thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  const getDataSupplier = async () => {
    try {
      const res = await rf.getRequest('SupplierRequest').getSupplier();
      const formatData = res.map((r: any) => ({
        value: r.id,
        label: r.name,
      }));
      setListSupplier(formatData);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const listUnit: { value: string; label: string }[] = [
    {
      value: 'bottle',
      label: 'BOTTLE',
    },
    {
      value: 'box',
      label: 'BOX',
    },
    {
      value: 'tube',
      label: 'TUBE',
    },
    {
      value: 'pellet',
      label: 'PELLET',
    },
    {
      value: 'blister',
      label: 'BLISTER',
    },
  ];

  const asDoseList: { value: string; label: string }[] = [
    {
      value: 'true',
      label: 'Có',
    },
    {
      value: 'false',
      label: 'Không',
    },
  ];

  const getDataCate = async () => {
    try {
      const res = await rf.getRequest('CategoryRequest').getAllCate();
      const formatData = res.map((r: any) => ({
        value: r.id,
        label: r.name,
      }));
      setListCate(formatData);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getDataDrugsType = async () => {
    try {
      const res = await rf
        .getRequest('CategoryRequest')
        .getAllDrugsTypeByCateID(categoriesId);
      const formatData = res.map((r: IBranch) => ({
        value: r.id,
        label: r.name,
      }));
      setListDrugsTypes(formatData);
    } catch (e: any) {
      toastError(e.message);
    }
  };

  useEffectUnsafe(() => {
    getDataCate();
    getDataSupplier();
  }, []);

  useEffectUnsafe(() => {
    getDataDrugsType();
  }, [categoriesId]);

  return (
    <BaseModal
      size="xl"
      title="Thêm mới thuốc"
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
            label="Tên thuốc"
            onChange={(e: any) =>
              setDataUser({ ...dataUser, name: e.target.value.trim() })
            }
          />

          <Box zIndex={2002}>
            <AppSelect
              label="Nhà cung cấp"
              width={'full'}
              options={listSupplier}
              value={dataUser.supplierId}
              onChange={(value: string) =>
                setDataUser({
                  ...dataUser,
                  supplierId: +value,
                })
              }
              size="medium"
              showFullName
            />
          </Box>
          <Flex zIndex={2001} w={'full'} gap={3}>
            <Box width={'full'}>
              <AppSelect
                label="Bán theo đơn"
                width={'full'}
                options={asDoseList}
                value={dataUser.soldAsDose + ''}
                onChange={(value: string) => {
                  if (value === 'true') {
                    setDataUser({
                      ...dataUser,
                      soldAsDose: true,
                    });
                  } else {
                    setDataUser({
                      ...dataUser,
                      soldAsDose: false,
                    });
                  }
                }}
                size="medium"
                showFullName
              />
            </Box>
            <Box width={'full'}>
              <AppSelect
                label="Đơn vị"
                options={listUnit}
                value={dataUser.unit}
                onChange={(value: string) =>
                  setDataUser({
                    ...dataUser,
                    unit: value,
                  })
                }
                size="medium"
                showFullName
              />
            </Box>
          </Flex>
          <Flex zIndex={1999} gap={3}>
            <Box width={'full'}>
              <AppSelect
                label="Loại"
                width={'full'}
                options={listCate}
                value={categoriesId}
                onChange={(value: string) => setCategoriesId(+value)}
                size="medium"
                showFullName
              />
            </Box>
            <Box width={'full'}>
              <AppSelect
                label="Phân Loại"
                width={'full'}
                options={listDrugsType}
                value={dataUser.typeId}
                onChange={(value: string) =>
                  setDataUser({
                    ...dataUser,
                    typeId: +value,
                  })
                }
                size="medium"
                showFullName
              />
            </Box>
          </Flex>
          <AppInput
            label="Bar-code"
            onChange={(e: any) =>
              setDataUser({
                ...dataUser,
                barcode: +e.target.value.trim(),
              })
            }
          />
          <Flex gap={3}>
            <AppInput
              label="Giá (vnd)"
              onChange={(e: any) =>
                setDataUser({ ...dataUser, price: +e.target.value.trim() })
              }
            />
            <AppInput
              label="Kích cỡ"
              onChange={(e: any) =>
                setDataUser({ ...dataUser, size: +e.target.value.trim() })
              }
            />
          </Flex>
          <AppInput
            label="Chi tiết"
            onChange={(e: any) =>
              setDataUser({ ...dataUser, description: e.target.value.trim() })
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
            <AppButton flex={1} onClick={createNewBranch}>
              Thêm mới
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalAddNewMedical;
