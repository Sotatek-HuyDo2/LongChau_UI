import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IAppMenu {
  icon?: string;
  name: string;
  path: string;
}

const AppMenu: React.FC<{ menuList: IAppMenu[] }> = ({ menuList }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex
      mt={'20px'}
      flexDir={'column'}
      bg={'white'}
      borderRadius={'8px'}
      color={'black'}
    >
      {menuList.map((menu) => {
        return (
          <Flex
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
            onClick={() => navigate(menu?.path)}
          >
            <Box>{menu.name}</Box>
            <ChevronRightIcon />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default AppMenu;
