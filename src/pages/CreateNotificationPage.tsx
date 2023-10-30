import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BaseAdminPage } from 'src/components/layouts';
import { AppInput, AppButton, AppDatePicker } from 'src/components';
import { createValidator } from 'src/utils/validator';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'src/styles/pages/MarketingPage.scss';

interface IDataForm {
  content: string;
  time: Date | null;
  title: string;
}

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, false] }],
  [{ font: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean'],
];

const modules = {
  toolbar: toolbarOptions,
};

const CreateNotificationPage = () => {
  const initData = {
    content: '',
    title: '',
    time: null,
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
          Create a new notification
        </Box>

        <Box className="marketing__field">
          <Box className="marketing__field-title">Title</Box>
          <Box>
            <AppInput
              w={'70%'}
              size="md"
              value={dataForm.title}
              onChange={(e: any) =>
                setDataForm({
                  ...dataForm,
                  title: e.target.value,
                })
              }
              validate={{
                name: `title`,
                validator: validator.current,
                rule: ['required'],
              }}
            />
          </Box>
        </Box>

        <Box className="marketing__field">
          <Box className="marketing__field-title">Content</Box>
          <Box>
            <ReactQuill
              theme={'snow'}
              value={dataForm.content}
              modules={modules}
              placeholder="Create a new notification content..."
              onChange={(e: any) => {
                setDataForm({
                  ...dataForm,
                  content: e,
                });
              }}
            />
          </Box>
        </Box>

        <Flex className="marketing__field" alignItems={'center'}>
          <Box className="marketing__field-title">Time schedule:</Box>
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
          <Box fontSize={'14px'} color="#a4a7b7" mx={5}>
            or
          </Box>
          <Box>
            <AppButton w={'100px'} size="sm">
              Push Now
            </AppButton>
          </Box>
        </Flex>

        <Flex justifyContent={'flex-end'} mt={10}>
          <AppButton w={'150px'} variant="outline">
            Cancel
          </AppButton>

          <AppButton ml={5} w={'150px'} isDisabled={isDisableSubmit}>
            Create
          </AppButton>
        </Flex>
      </Box>
    </BaseAdminPage>
  );
};

export default CreateNotificationPage;
