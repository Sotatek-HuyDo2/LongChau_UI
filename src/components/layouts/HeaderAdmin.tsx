import {
  Flex,
  Box,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ArrowLogout, DoorLogout } from 'src/assets/icons';
import { useDispatch } from 'react-redux';
import { clearUser } from 'src/store/user';
import { useNavigate } from 'react-router-dom';
import Storage from 'src/utils/storage';
import jwtDecode from 'jwt-decode';

const Header = () => {
  const [info, setInfo] = useState<any>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const accessToken = Storage.getAccessToken();

  useEffect(() => {
    if (accessToken) setInfo(jwtDecode(accessToken));
  }, []);

  return (
    <Flex className="header" justifyContent={'space-between'}>
      <Box>LongChau Dashboard</Box>

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
                <Avatar name={info?.lastName} size="sm" />
                {info?.lastName}_{info?.role}!!
              </Flex>
            </MenuButton>
            <MenuList className="menu-header">
              <MenuItem
                // onClick={() => navigate('/profile')}
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
      ) : null}
    </Flex>
  );
};

export default Header;
