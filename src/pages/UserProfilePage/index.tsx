import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { AppButton } from 'src/components';
import AppMenu from 'src/components/AppMenu';
import BaseHomePage from 'src/components/layouts/HomePage/BaseHomePage';
import ProfilePart from './Profile.part';

const MOCK_PROFILE = {
  name: 'John Doe',
  imageUrl:
    'https://nhathuoclongchau.com.vn/estore-images/profile/v2/avatar-profile-large.svg',
  phone: '0363043454',
  sex: 'female',
  DOB: '11/10/2002',
};

const MOCK_MENU_PROFILE = [
  {
    name: 'Thông tin cá nhân',
    path: '/profile',
  },
  { name: 'Đơn hàng của tôi', path: '/order-list' },
  { name: 'Đăng xuất', path: '/logout' },
];

const UserProfilePage = () => {
  return (
    <BaseHomePage>
      <Flex
        className="homepage-container"
        pt={'20px'}
        pb={'20px'}
        flexDir={'row'}
        gap={'20px'}
      >
        <Flex w={'1440px'} m={'auto'} justifyContent={'space-between'}>
          <Flex w={'30%'} justifyContent={'center'} flexDir={'column'}>
            <Flex w={'full'} flexDir={'column'} alignItems={'center'}>
              <Flex
                bg={'blue.100'}
                w={'full'}
                borderRadius={'8px'}
                flexDir={'column'}
                alignItems={'center'}
                padding={'30px 10px'}
              >
                <Image
                  w={'30%'}
                  src="https://nhathuoclongchau.com.vn/estore-images/profile/v2/avatar-profile-large.svg"
                />
                <Box>{MOCK_PROFILE?.name}</Box>
                <Box>{MOCK_PROFILE?.phone}</Box>
              </Flex>
            </Flex>
            <AppMenu menuList={MOCK_MENU_PROFILE} />
          </Flex>
          <ProfilePart profile={MOCK_PROFILE} />
        </Flex>
      </Flex>
    </BaseHomePage>
  );
};

export default UserProfilePage;
