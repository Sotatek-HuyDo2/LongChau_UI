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
import rf from 'src/api/RequestFactory';
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
                  'data:image/png;base64,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'
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
