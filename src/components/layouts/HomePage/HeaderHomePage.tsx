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
import {
  ArrowLogout,
  CartIcon,
  DoorLogout,
  LoginIcon,
  SearchExplorer,
} from 'src/assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUserProfile } from 'src/store/user';
import { useNavigate } from 'react-router-dom';
import Storage from 'src/utils/storage';
import AppInput from '../../AppInput';
import AppButton from '../../AppButton';
import rf from 'src/services/RequestFactory';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { RootState } from 'src/store';

const HeaderHomePage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const accessToken = Storage.getAccessToken();
  const { userProfile } = useSelector((state: RootState) => state.user);

  const getUserProfile = async () => {
    const dataInfo = await rf.getRequest('UserRequest').getProfile();
    dispatch(setUserProfile(dataInfo));
  };

  useEffectUnsafe(() => {
    getUserProfile();
  }, []);

  return (
    <Flex w={'100%'} className="header-homepage" flexDirection={'column'}>
      <Flex className="sub-header-homepage">
        <Flex
          py={'8px'}
          className="header-hotline"
          justifyContent={'space-between'}
          alignItems={'start'}
          w={'full'}
          h={'0px'}
          fontSize={18}
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
          py={'15px'}
          justifyContent={'space-between'}
          alignItems={'center'}
          w={'full'}
          h={'full'}
          fontSize={18}
        >
          <Flex
            flexDirection={'row'}
            gap={'15px'}
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
              <Text fontSize={24}>HUST</Text>
              <Text fontSize={16}>PHARMACY</Text>
            </Flex>
          </Flex>
          <Box className={''}>
            <Flex alignItems={'center'}>
              <Box w={900}>
                <InputGroup>
                  <AppInput
                    h={'60px'}
                    backgroundColor={'#f4f6f9'}
                    color={'black'}
                    placeholder="Nhập để tìm kiếm..."
                    _placeholder={{
                      color: '#1250dc',
                      fontSize: '18px',
                    }}
                    fontSize="18px"
                    size="lg"
                    value={valueSearch}
                    onChange={(e: any) => setValueSearch(e.target.value)}
                  />
                  <InputRightElement
                    top="5px"
                    right="7px"
                    backgroundColor={'#c1d0f6'}
                    w="50px"
                    height="50px"
                    borderRadius={'50%'}
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
          {accessToken ? (
            <Box>
              <Menu>
                <MenuButton>
                  <Flex
                    alignItems={'center'}
                    gap={1}
                    fontSize={20}
                    fontWeight={700}
                  >
                    <Avatar name={userProfile?.lastName} size="sm" />
                    Hi {userProfile?.lastName}
                  </Flex>
                </MenuButton>
                <MenuList className="menu-header">
                  <MenuItem
                    onClick={() => navigate('/profile')}
                    color={'black'}
                    _hover={{
                      bg: '#2167df',
                      color: 'white',
                    }}
                  >
                    Tài khoản
                  </MenuItem>
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
          ) : (
            <AppButton
              size="lg"
              onClick={() => navigate('/login')}
              borderRadius="50px"
              background={'none'}
            >
              <Flex
                gap={'7px'}
                alignItems={'center'}
                justifyContent={'space-around'}
                fontSize={18}
              >
                <LoginIcon />
                Đăng Nhập
              </Flex>
            </AppButton>
          )}

          <AppButton
            size="lg"
            padding={'20px'}
            borderRadius="50px"
            variant="formTrade"
            color={'white'}
            onClick={() => navigate('/order')}
          >
            <Flex
              gap={'7px'}
              alignItems={'center'}
              justifyContent={'space-around'}
              fontSize={18}
            >
              <CartIcon />
              Giỏ Hàng
            </Flex>
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
