import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AppButton } from 'src/components';
import AppMenu from 'src/components/AppMenu';
import BaseHomePage from 'src/components/layouts/HomePage/BaseHomePage';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import rf from 'src/services/RequestFactory';

interface IProfile {
  branchId: null;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
}

const ProfilePart = () => {
  const [profile, setProfile] = useState<IProfile>();
  const getProfile = async () => {
    try {
      const res = await rf.getRequest('UserRequest').getProfile();
      setProfile(res);
    } catch (e: any) {}
  };

  useEffectUnsafe(() => {
    getProfile();
  }, []);

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
              >
                <Box>Họ và tên</Box>
                <Box>{profile?.firstName + ' ' + profile?.lastName}</Box>
              </Flex>
              <Flex
                w={'full'}
                justifyContent={'space-between'}
                pb={'10px'}
                borderBottom={'1px solid #a4a7b7'}
              >
                <Box>Số điện thoại</Box>
                <Box>{profile?.phone}</Box>
              </Flex>
              <Flex
                w={'full'}
                justifyContent={'space-between'}
                pb={'10px'}
                borderBottom={'1px solid #a4a7b7'}
              >
                <Box>Giới tính</Box>
                {/* <Box>{profile?.sex === 'male' ? 'Nam' : 'Nữ'}</Box> */}
              </Flex>
              <Flex
                w={'full'}
                justifyContent={'space-between'}
                pb={'10px'}
                borderBottom={'1px solid #a4a7b7'}
              >
                <Box>Ngày sinh</Box>
                {/* <Box>{profile?.DOB}</Box> */}
              </Flex>
            </Flex>
            <AppButton borderRadius={'50px'} size="lg">
              Chỉnh sửa thông tin
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </BaseHomePage>
  );
};

export default ProfilePart;
