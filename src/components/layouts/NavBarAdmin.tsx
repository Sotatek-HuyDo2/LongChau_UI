import React, { useState } from 'react';
import 'src/styles/components/Navbar.scss';
import { Box, Flex } from '@chakra-ui/layout';
import { useNavigate } from 'react-router';
import { Overview } from 'src/assets/icons';
import { useLocation } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface MenuDropProps {
  dropTitle: string;
  dropItem?: IlistItem[];
}

const LIST_ITEM = [
  { name: 'Thực phẩm chức năng', path: '/' },
  { name: 'Thực phẩm chức năng', path: '/' },
];

interface IlistItem {
  name: string;
  path: string;
}

const MenuDrop = ({ dropTitle, dropItem = LIST_ITEM }: MenuDropProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Flex className="sidebar-drop" flexDirection="column">
      <Flex className="sidebar-drop__title" onClick={handleOpen} align="center">
        <Overview />
        {dropTitle}
        <ChevronRightIcon className="sidebar-drop__icon" />
      </Flex>
      <Flex flexDirection="column" justifyContent={'end'} alignItems="end">
        {dropItem.map((item, index) => (
          <Box className={`sidebar-drop__item ${open ? 'active' : ''}`}>
            {item.name}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

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
    name: 'Quản lý thuốc',
    path: '/medication-management',
    icon: <Overview />,
  },
  {
    component: (
      <MenuDrop dropTitle="Quản lý danh mục thuốc" dropItem={LIST_ITEM} />
    ),
    name: 'Quản lý danh mục thuốc',
    path: '/category-management',
    icon: <Overview />,
    // pathChild: ['/user'],
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
              <Box>{menu.component ? null : menu.icon}</Box>
              <Box>{menu.component ? menu.component : menu.name}</Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export default NavBar;
