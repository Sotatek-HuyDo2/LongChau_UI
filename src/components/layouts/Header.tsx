import {
  Flex,
  Box,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import React from 'react';
import { ArrowLogout, DoorLogout } from 'src/assets/icons';
import { useDispatch } from 'react-redux';
import { clearUser } from 'src/store/user';
import { useNavigate } from 'react-router-dom';
import Storage from 'src/utils/storage';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const accessToken = Storage.getAccessToken();
  const email = Storage.getEmail();

  return (
    <Flex className="header" justifyContent={'space-between'}>
      <Box>LongChau Dashboard</Box>

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
      )}
    </Flex>
  );
};

export default Header;
