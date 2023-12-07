import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from '../BaseModal';
import AppButton from '../../AppButton';
import { FC, useState } from 'react';
import AppInput from '../../AppInput';
import { IMedical } from 'src/pages/Admin/MedicalManagementPage';
import { formatTimestamp } from 'src/utils/format';
import moment from 'moment';
import { AppDatePicker } from '../../AppDatePicker';

interface IModalAddNewMedicalProps {
  open: boolean;
  onClose: () => void;
}

interface IDataForm {
  name: string;
  typeId: number;
  supplierId: number;
  soldAsDose: boolean;
  sensitiveIngredients?: Array<string>;
  description: string;
  // unit: EDrugsUnit;
  barcode: number;
  price: number;
  size: number;
}

const ModalAddNewMedical: FC<IModalAddNewMedicalProps> = (props) => {
  const initData = {
    name: '',
    typeId: NaN,
    supplierId: NaN,
    soldAsDose: false,
    description: '',
    barcode: NaN,
    price: NaN,
    size: NaN,
  };

  const { open, onClose } = props;
  const [dataForm, setDataForm] = useState<IDataForm>(initData);

  // const handleToChange = (date: any) => {
  //   setDataForm({
  //     ...dataForm,
  //     toTimestamp: date,
  //   });

  // if (
  //   dataForm.fromTimestamp &&
  //   moment(date).valueOf() < moment(dataForm.fromTimestamp).valueOf()
  // ) {
  //   setFromError('The end time must be greater than the start time');
  // } else if (date < moment().add(1, 'minute').valueOf()) {
  //   setFromError('The end time must be greater than the current time');
  // } else setFromError('');
  // };

  return (
    <BaseModal
      size="xl"
      title="Edit Medical Information"
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
          <Flex>
            <AppInput label="Tên thuốc" />
          </Flex>
          {/* <Flex
            w={'100%'}
            pos={'relative'}
            pt={5}
            _disabled={{
              pointerEvents: 'none',
              opacity: 0.4,
            }}
          >
            <AppDatePicker
              placeholderText={'mm/dd/yyyy HH:mm:ss'}
              type="isoDate"
              onChange={handleToChange}
              dateFormat={'h:mm aa'}
            />
            <Text color={'border.200'} pos={'absolute'} top={'-8px'}>
              Ngày nhập
            </Text>
          </Flex> */}
          <Flex gap={3}>
            <AppInput label="Không gian" />
            <AppInput label="Giá(VND)" />
          </Flex>

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
            <AppButton flex={1}>Thêm mới</AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalAddNewMedical;
