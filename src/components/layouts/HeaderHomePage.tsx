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
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CartIcon, SearchExplorer } from 'src/assets/icons';
import { useDispatch } from 'react-redux';
import { clearUser } from 'src/store/user';
import { useNavigate } from 'react-router-dom';
import Storage from 'src/utils/storage';
import AppInput from '../AppInput';
import AppButton from '../AppButton';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';

const HeaderHomePage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const accessToken = Storage.getAccessToken();
  const email = Storage.getEmail();

  // useEffectUnsafe(() => {
  //   alert('hello');
  // }, [valueSearch]);

  return (
    <Flex
      className="header-homepage"
      h={'140px'}
      flexDirection={'column'}
      backgroundColor={'#458fec'}
    >
      <Flex className="sub-header-homepage">
        <Flex
          pt={'10px'}
          className="header-hotline"
          justifyContent={'space-between'}
          alignItems={'start'}
          w={'full'}
          h={'0px'}
          fontSize={14}
        >
          <Box>
            <Text as={'a'} href="https://www.hust.edu.vn/">
              Hanoi University of Science & Technology
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
          <Flex
            flexDirection={'row'}
            gap={'10px'}
            alignItems={'end'}
            onClick={() => navigate('/')}
            cursor={'pointer'}
          >
            <Box>
              <Image
                w={'56px'}
                h={'56px'}
                borderRadius={'50%'}
                src={
                  'https://upload.wikimedia.org/wikipedia/vi/archive/f/ff/20230627133531%21Logo_Tr%C6%B0%E1%BB%9Dng_C%C3%B4ng_ngh%E1%BB%87_Th%C3%B4ng_tin_v%C3%A0_Truy%E1%BB%81n_th%C3%B4ng%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_khoa_H%C3%A0_N%E1%BB%99i.png'
                }
              />
            </Box>
            <Flex flexDirection={'column'}>
              <Text fontSize={22}>HUST</Text>
              <Text fontSize={14}>PHARMACY</Text>
            </Flex>
          </Flex>
          <Box className={''}>
            <Flex alignItems={'center'}>
              <Box w={900}>
                <InputGroup borderRadius="20px">
                  <AppInput
                    h={'50px'}
                    backgroundColor={'#f4f6f9'}
                    color={'black'}
                    placeholder="Nhập thực để tìm kiếm..."
                    size="lg"
                    value={valueSearch}
                    onChange={(e: any) => setValueSearch(e.target.value)}
                  />
                  <InputRightElement
                    top="5px"
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
          <AppButton
            onClick={() => navigate('/login')}
            borderRadius={'20px'}
            background={'none'}
          >
            Đăng Nhập
          </AppButton>
          <AppButton
            gap={2}
            padding={'10px'}
            backgroundColor="#1250dc"
            borderRadius="20px"
            alignItems={'center'}
          >
            <CartIcon />
            Giỏ Hàng
          </AppButton>
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

export default HeaderHomePage;
