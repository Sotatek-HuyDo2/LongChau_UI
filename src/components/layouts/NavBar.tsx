import React from 'react';
import 'src/styles/components/Navbar.scss';
import { Box, Flex } from '@chakra-ui/layout';
import { useNavigate } from 'react-router';
import { Overview } from 'src/assets/icons';
import { useLocation } from 'react-router-dom';

const MENUS = [
  {
    name: 'Quản lí',
    path: '/',
    icon: <Overview />,
  },
  {
    name: 'Quản lí thuốc1',
    path: '/insight',
    icon: <Overview />,
  },
  {
    name: 'Listing',
    path: '/listing',
    icon: <Overview />,
  },
  {
    name: 'Quản lí thuốc',
    path: '/delist',
    icon: <Overview />,
  },
  {
    name: 'User Management',
    path: '/user',
    icon: <Overview />,
    pathChild: ['/user'],
  },
  {
    name: 'Marketing',
    path: '/marketing',
    icon: <Overview />,
    pathChild: ['/create-notification', '/create-push-notification'],
  },
];

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className="nav-bar">
      <Box className="nav-bar__menu">
        {MENUS.map((menu, index) => {
          return (
            <Flex
              key={index}
              className={`nav-bar__menu-item ${
                location.pathname === menu.path ||
                menu?.pathChild?.some((item) =>
                  location.pathname.includes(item),
                )
                  ? 'active'
                  : ''
              }`}
              onClick={() => {
                navigate(menu.path || '/');
              }}
            >
              <Box>{menu.icon}</Box>
              <Box>{menu.name}</Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export default NavBar;
