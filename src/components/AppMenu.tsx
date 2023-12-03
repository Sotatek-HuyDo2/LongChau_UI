import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IAppMenu {
  icon?: string;
  name: string;
  path: string;
}

const MOCK_MENU_PROFILE = [
  {
    name: 'Thông tin cá nhân',
    path: '/profile',
  },
  {
    name: 'Đơn hàng của tôi',
    path: '/order-list',
  },
  { name: 'Đăng xuất', path: '/logout' },
];

const AppMenu: React.FC<{ profile?: any }> = ({ profile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
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
          <Box>{profile?.firstName + ' ' + profile?.lastName}</Box>
          <Box>{profile?.phone}</Box>
        </Flex>
      </Flex>
      <Flex
        mt={'20px'}
        flexDir={'column'}
        bg={'white'}
        borderRadius={'8px'}
        color={'black'}
      >
        {MOCK_MENU_PROFILE.map((menu: IAppMenu, index) => {
          return (
            <Flex
              key={index}
              alignItems={'center'}
              padding={'15px 30px'}
              fontSize={20}
              justifyContent={'space-between'}
              cursor={'pointer'}
              _hover={{
                backgroundColor: '#f5f6fa',
                color: '#2167df',
              }}
              bg={location.pathname.includes(menu?.path) ? '#f5f6fa' : ''}
              color={location.pathname.includes(menu?.path) ? '#2167df' : ''}
              onClick={() => navigate(menu?.path || '/profile')}
            >
              <Box>{menu.name}</Box>
              <ChevronRightIcon />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default AppMenu;
