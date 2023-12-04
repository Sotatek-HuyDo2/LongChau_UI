import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { BaseAdminPage } from 'src/components/layouts';
import 'src/styles/pages/MarketingPage.scss';
import {
  AppTextArea,
  AppInput,
  AppButton,
  AppDatePicker,
} from 'src/components';
import 'react-datepicker/dist/react-datepicker.css';
import { createValidator } from 'src/utils/validator';

interface IDataForm {
  content: string;
  time: Date | null;
  repeat: string;
  timeRepeat: string;
}

const CreatePushNotificationPage = () => {
  const initData = {
    content: '',
    time: null,
    repeat: '',
    timeRepeat: '',
  };

  const [dataForm, setDataForm] = useState<IDataForm>(initData);
  const [isDisableSubmit, setIsDisableSubmit] = useState<boolean>(true);

  // @ts-ignore
  const validator = useRef(
    createValidator({
      element: (message: string) => (
        <Text className="text-error">{message}</Text>
      ),
    }),
  );

  useEffect(() => {
    const isDisabled = !validator.current.allValid();
    setIsDisableSubmit(isDisabled);
  }, [dataForm]);

  return (
    <BaseAdminPage>
      <Box className="marketing">
        <Box pb="30px">
          <Text fontSize="24px" as="b" mr={'30px'}>
            Marketing
          </Text>
        </Box>

        <Box className="marketing__action-title" mr={20}>
          Create a new push notification
        </Box>

        <Box className="marketing__field">
          <Box className="marketing__field-title">Content</Box>
          <Box>
            <AppTextArea
              value={dataForm.content}
              onChange={(e: any) =>
                setDataForm({
                  ...dataForm,
                  content: e.target.value,
                })
              }
              validate={{
                name: `content`,
                validator: validator.current,
                rule: ['required'],
              }}
            />
          </Box>
        </Box>

        <Flex className="marketing__field">
          <Box className="marketing__field-title">Time schedule: </Box>
          <Box>
            <AppDatePicker
              placeholderText={'mm/dd/yyyy HH:mm:ss'}
              selected={dataForm.time}
              type="isoDate"
              onChange={(date) =>
                setDataForm({
                  ...dataForm,
                  time: date,
                })
              }
              dateFormat={'h:mm aa'}
            />
          </Box>
        </Flex>
        <Flex className="marketing__field" alignItems={'center'}>
          <Box className="marketing__field-title">Repeat: </Box>
          <Box>
            <AppInput
              type="number"
              w={'175px'}
              size="sm"
              value={dataForm.repeat}
              onChange={(e: any) =>
                setDataForm({
                  ...dataForm,
                  repeat: e.target.value,
                })
              }
            />
          </Box>
          <Box className="marketing__field-title" ml={5}>
            times
          </Box>
        </Flex>
        <Flex className="marketing__field" alignItems={'center'}>
          <Box className="marketing__field-title">Time to repeat: </Box>
          <Box>
            <AppInput
              type="number"
              w={'175px'}
              size="sm"
              value={dataForm.timeRepeat}
              onChange={(e: any) =>
                setDataForm({
                  ...dataForm,
                  timeRepeat: e.target.value,
                })
              }
            />
          </Box>
          <Box className="marketing__field-title" ml={5}>
            seconds
          </Box>
        </Flex>

        <Flex justifyContent={'flex-end'} mt={10}>
          <AppButton w={'150px'} variant="outline">
            Hủy
          </AppButton>

          <AppButton ml={5} w={'150px'} isDisabled={isDisableSubmit}>
            Create
          </AppButton>
        </Flex>
      </Box>
    </BaseAdminPage>
  );
};

export default CreatePushNotificationPage;
