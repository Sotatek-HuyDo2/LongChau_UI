import { Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/api/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import AppSelect from 'src/components/AppSelect';
import { ICategory } from 'src/pages/Admin/ManageCategoryListPage/ProductTyByCategory.part';

interface IModalEditTypeProductProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
  categoriesID: any;
  data: ICategory;
  typeId?: any;
}

const ModalEditTypeProduct: FC<IModalEditTypeProductProps> = (props) => {
  const { open, onClose, onReload, categoriesID, data, typeId } = props;
  const [typeName, setTypeName] = useState<string>(data.name);
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [categories, setCategories] = useState<any>(categoriesID);

  const createNewBranch = async () => {
    try {
      await rf
        .getRequest('CategoryRequest')
        .updateProductTypeByCate(categoriesID, typeId, {
          categoryId: categories,
          name: typeName,
        });
      onClose();
      onReload();
      toastSuccess('Sửa phân loại thuốc thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  const getAllCate = async () => {
    try {
      const res = await rf.getRequest('CategoryRequest').getAllCate();
      const listCate = res.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setCategoriesList(listCate);
    } catch (e: any) {
      toastError(e.message);
    }
  };

  useEffectUnsafe(() => {
    getAllCate();
  }, []);

  return (
    <BaseModal
      size="xl"
      title="Sửa phân loại thuốc"
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
            label="Danh mục"
            width={'full'}
            options={categoriesList}
            value={categories}
            onChange={(value: string) => setCategories(value)}
            size="medium"
            showFullName
          />
          <AppInput
            label="Tên phân loại thuốc"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
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
              Sửa
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalEditTypeProduct;
