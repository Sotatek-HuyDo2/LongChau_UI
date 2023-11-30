import { Box, Flex, Text } from '@chakra-ui/react';
import 'src/styles/components/BaseModal.scss';
import BaseModal from './BaseModal';
import AppButton from '../AppButton';
import { FC } from 'react';
import AppInput from '../AppInput';
import { IMedical } from 'src/pages/Admin/MedicalManagementPage';
import { formatTimestamp } from 'src/utils/format';
import moment from 'moment';

interface IModalEditMedicalProps {
  open: boolean;
  onClose: () => void;
  // onConfirm: () => void;
  data: IMedical;
}

const ModalEditMedical: FC<IModalEditMedicalProps> = (props) => {
  const { open, onClose, data } = props;
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
          {/* <Box className="delist-confirm--para" m={'auto'} fontSize={18}>
            Edit User {data.firstName + ' ' + data.lastName}
          </Box> */}
          <Flex>
            <AppInput label="Tên thuốc" defaultValue={data?.name} />
          </Flex>
          <AppInput
            label="Thời gian nhập"
            defaultValue={formatTimestamp(
              moment(data?.createdAt).valueOf(),
              'DD-MM-YYYY HH:mm:ss',
            )}
          />
          <Flex gap={3}>
            <AppInput label="Không gian" defaultValue={data.size} />
            <AppInput label="Giá(VND)" defaultValue={data.price} />
          </Flex>

          <Flex justifyContent={'space-around'} gap={'10px'} pb={6} mt={3}>
            <AppButton
              className="btn-outline-hover"
              flex={1}
              variant="primary"
              onClick={onClose}
              w={'100%'}
            >
              Cancel
            </AppButton>
            <AppButton flex={1}>Confirm</AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseModal>
  );
};

export default ModalEditMedical;
