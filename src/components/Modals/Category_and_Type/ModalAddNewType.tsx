import { Flex } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import rf from 'src/services/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';

interface IModalAddNewTypeProductProps {
  open: boolean;
  onClose: () => void;
  onReload: () => void;
  categoriesID: any;
}

const ModalAddNewTypeProduct: FC<IModalAddNewTypeProductProps> = (props) => {
  const { open, onClose, onReload, categoriesID } = props;
  const [typeName, setTypeName] = useState<string>('');

  const createNewBranch = async () => {
    try {
      await rf
        .getRequest('CategoryRequest')
        .createProductTypeByCate({ categoryId: categoriesID, name: typeName });
      onClose();
      onReload();
      toastSuccess('Tạo mới Branch thành công');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  return (
    <BaseModal
      size="xl"
      title="Tạo loại thuốc mới"
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
            label="Tên loại thuốc"
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
              Thêm mới
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalAddNewTypeProduct;
