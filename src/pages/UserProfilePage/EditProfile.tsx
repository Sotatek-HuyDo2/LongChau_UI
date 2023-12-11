import { Box, Flex, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppButton } from 'src/components';
import AppMenu from 'src/components/AppMenu';
import BaseHomePage from 'src/components/layouts/HomePage/BaseHomePage';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import rf from 'src/api/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';

interface IProfile {
  branchId?: null;
  email?: string;
  firstName: string;
  lastName: string;
  phone: string;
  status?: string;
}

// interface CustomInputFieldProps {
//   label: string;
//   defaultValue: string | undefined;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

const ProfileEditPart = () => {
  const [profile, setProfile] = useState<IProfile>();
  const initData = {
    // email: '',
    // password: '',
    firstName: '',
    lastName: '',
    phone: '',
  };
  const navigate = useNavigate();

  const [dataBody, setDataBody] = useState<IProfile>(initData);

  const updateProfile = async () => {
    try {
      const res = await rf.getRequest('UserRequest').updateProfile(dataBody);
      if (res) {
        navigate('/profile');
        toastSuccess('Update Profile Successful');
      }
    } catch (e: any) {
      toastError(e.message);
    }
  };

  const getProfile = async () => {
    try {
      const res = await rf.getRequest('UserRequest').getProfile();
      setProfile(res);
      setDataBody(res);
    } catch (e: any) {}
  };

  useEffectUnsafe(() => {
    getProfile();
  }, []);

  // const CustomInputField: React.FC<CustomInputFieldProps> = ({
  //   label,
  //   defaultValue,
  //   onChange,
  // }) => {
  //   return (
  //     <Flex
  //       w={'full'}
  //       justifyContent={'space-between'}
  //       pb={'10px'}
  //       borderBottom={'1px solid #a4a7b7'}
  //       alignItems={'center'}
  //     >
  //       <Box>{label}</Box>
  //       <Input
  //         defaultValue={defaultValue}
  //         fontWeight={500}
  //         border={'none'}
  //         outline={'none'}
  //         p={0}
  //         textAlign={'right'}
  //         focusBorderColor="none"
  //         onChange={onChange}
  //       />
  //     </Flex>
  //   );
  // };

  return (
    <BaseHomePage>
      <Flex
        className="homepage-container"
        pt={'20px'}
        pb={'20px'}
        flexDir={'row'}
        gap={'20px'}
      >
        <Flex
          w={'1440px'}
          m={'auto'}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
        >
          <AppMenu profile={profile} />
          <Flex
            w={'67%'}
            color={'black'}
            bg={'white'}
            p={'20px 10px'}
            borderRadius={'8px'}
            flexDir={'column'}
            alignItems={'center'}
            gap={'20px'}
          >
            <Box borderBottom={'1px solid #a4a7b7'} w={'full'} pb={'10px'}>
              Thông tin cá nhân
            </Box>
            <Flex
              flexDir={'column'}
              w={'400px'}
              alignItems={'center'}
              gap={'10px'}
            >
              <Image
                w={'30%'}
                src="https://nhathuoclongchau.com.vn/estore-images/profile/v2/avatar-profile-large.svg"
              />
              <Flex
                w={'full'}
                justifyContent={'space-between'}
                pb={'10px'}
                borderBottom={'1px solid #a4a7b7'}
                alignItems={'center'}
              >
                <Box>Họ</Box>
                <Input
                  defaultValue={dataBody?.lastName}
                  fontWeight={500}
                  border={'none'}
                  outline={'none'}
                  p={0}
                  textAlign={'right'}
                  focusBorderColor="none"
                  onChange={(e: any) => {
                    setDataBody({
                      ...dataBody,
                      lastName: e.target.value.trim(),
                    });
                  }}
                />
              </Flex>
              <Flex
                w={'full'}
                justifyContent={'space-between'}
                pb={'10px'}
                borderBottom={'1px solid #a4a7b7'}
                alignItems={'center'}
              >
                <Box>Tên</Box>
                <Input
                  defaultValue={dataBody?.firstName}
                  fontWeight={500}
                  border={'none'}
                  outline={'none'}
                  p={0}
                  textAlign={'right'}
                  focusBorderColor="none"
                  onChange={(e: any) => {
                    setDataBody({
                      ...dataBody,
                      firstName: e.target.value.trim(),
                    });
                  }}
                />
              </Flex>
              <Flex
                w={'full'}
                justifyContent={'space-between'}
                pb={'10px'}
                borderBottom={'1px solid #a4a7b7'}
                alignItems={'center'}
              >
                <Box>Số điện thoại</Box>
                <Input
                  defaultValue={dataBody?.phone}
                  w={'50%'}
                  fontWeight={500}
                  border={'none'}
                  outline={'none'}
                  p={0}
                  textAlign={'right'}
                  focusBorderColor="none"
                  onChange={(e: any) => {
                    setDataBody({
                      ...dataBody,
                      phone: e.target.value.trim(),
                    });
                  }}
                />
              </Flex>
              <Flex
                w={'full'}
                justifyContent={'space-between'}
                pb={'10px'}
                borderBottom={'1px solid #a4a7b7'}
                alignItems={'center'}
              >
                <Box>Email</Box>
                <Input
                  value={dataBody?.email}
                  w={'50%'}
                  fontWeight={500}
                  border={'none'}
                  outline={'none'}
                  p={0}
                  textAlign={'right'}
                  focusBorderColor="none"
                  onChange={(e: any) => {
                    setDataBody({
                      ...dataBody,
                      email: e.target.value.trim(),
                    });
                  }}
                />
              </Flex>
            </Flex>
            <AppButton borderRadius={'50px'} size="lg" onClick={updateProfile}>
              Cập Nhật
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseHomePage>
  );
};

export default ProfileEditPart;
