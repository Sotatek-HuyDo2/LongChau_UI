import React from 'react';
import 'src/styles/components/Navbar.scss';
import { Box, Flex } from '@chakra-ui/layout';
import { useNavigate } from 'react-router';
import { Overview } from 'src/assets/icons';
import { useLocation } from 'react-router-dom';

const MENUS = [
  {
    name: 'Quản lý nhà cung cấp',
    path: '/',
    icon: <Overview />,
  },
  {
    name: 'Quản lí chi nhánh',
    path: '/branch-management',
    icon: <Overview />,
  },
  {
    name: 'Quản lý branch Admin',
    path: '/branch-admin-management',
    icon: <Overview />,
  },
  {
    name: 'Quản lý thuốc',
    path: '/medication-management',
    icon: <Overview />,
  },
  {
    name: 'Quản lý danh mục thuốc',
    path: '/category-management',
    icon: <Overview />,
    pathChild: ['/user'],
  },
  {
    name: 'Quản lý tổng kho',
    path: '/general-warehouse-management',
    icon: <Overview />,
    pathChild: ['/create-notification', '/create-push-notification'],
  },
  {
    name: 'Quản lý người dùng',
    path: '/user-management',
    icon: <Overview />,
    pathChild: ['/create-notification', '/create-push-notification'],
  },
  {
    name: 'Thống kê',
    path: '/statistical',
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
