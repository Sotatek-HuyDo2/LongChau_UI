import {
  Flex,
  Box,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React from 'react';
import {
  ArrowLogout,
  CartIcon,
  DoorLogout,
  SearchExplorer,
} from 'src/assets/icons';
import { useDispatch } from 'react-redux';
import { clearUser } from 'src/store/user';
import { useNavigate } from 'react-router-dom';
import Storage from 'src/utils/storage';
import AppInput from '../AppInput';
import { SearchIcon } from '@chakra-ui/icons';

const FooterHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const accessToken = Storage.getAccessToken();
  const email = Storage.getEmail();

  return (
    <Flex className="header" h={'120px'} flexDirection={'column'}>
      <Flex className="sub-header">
        <Flex
          className="header-hotline"
          justifyContent={'space-between'}
          alignItems={'start'}
          w={'full'}
          h={'0px'}
          fontSize={14}
        >
          <Box>
            Trung tâm tiêm chủng Long Châu{' '}
            <Text as={'a'} href="#" textDecoration={'underline'}>
              Xem chi tiết
            </Text>
          </Box>
          <Box>Tư vấn ngay: 1800 6928</Box>
        </Flex>
        <Flex
          borderTop={'1px solid #dadfec'}
          pt={'10px'}
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'full'}
          h={'full'}
          fontSize={14}
        >
          <Flex flexDirection={'column'}>
            <Text>Nhà Thuốc</Text> <Text fontSize={20}>Long Châu</Text>
          </Flex>
          <Box className={''}>
            <Flex alignItems={'center'}>
              <Box w={900}>
                <InputGroup borderRadius="20px">
                  <AppInput
                    backgroundColor={'#f4f6f9'}
                    color={'black'}
                    placeholder="Nhập thực để tìm kiếm..."
                    size="lg"
                    // value={valueSearch}
                    // onChange={(e: any) => setValueSearch(e.target.value)}
                  />
                  <InputRightElement
                    top="4px"
                    right="7px"
                    backgroundColor={'#c1d0f6'}
                    borderRadius={'20px'}
                    color="#1250dc"
                    cursor={'pointer'}
                    _hover={{
                      backgroundColor: '#1250dc',
                      color: '#f4f6f9',
                    }}
                  >
                    <SearchExplorer />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Flex>
          </Box>
          <Box>Đăng Nhập</Box>
          <Flex
            gap={2}
            padding={'10px'}
            backgroundColor="#1250dc"
            borderRadius="20px"
            alignItems={'center'}
          >
            <CartIcon />
            Giỏ Hàng
          </Flex>
        </Flex>
      </Flex>

      {/* <Box>LongChau Dashboard</Box>
  
        {accessToken && (
          <Box>
            <Menu>
              <MenuButton>
                <Avatar name={email} size="sm" />
              </MenuButton>
              <MenuList className="menu-header">
                <MenuItem className="user-info">{email}</MenuItem>
  
                <MenuItem className="user-info logout" onClick={onLogout}>
                  <span className="door-logout">
                    <DoorLogout />
                  </span>
                  <span className="arrow-logout">
                    <ArrowLogout />
                  </span>{' '}
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )} */}
    </Flex>
  );
};

export default FooterHomePage;
