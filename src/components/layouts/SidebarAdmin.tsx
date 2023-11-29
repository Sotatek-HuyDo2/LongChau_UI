import React, { useState } from 'react';
import 'src/styles/components/Navbar.scss';
import { Box, Flex } from '@chakra-ui/layout';
import { useNavigate } from 'react-router';
import { Overview } from 'src/assets/icons';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface MenuDropProps {
  dropTitle: string;
  dropItem?: Array<{ name: string; path: string }> | undefined;
}

const LIST_ITEM = [
  {
    name: 'Thực phẩm chức năng',
    path: '/admin/category-management/category-functional-foods',
  },
  { name: 'Thuốc', path: '/admin/category-management/category-medicine' },
  {
    name: 'Chăm sóc cá nhân',
    path: '/admin/category-management/category-personal-care',
  },
  {
    name: 'Thiết bị y tế',
    path: '/admin/category-management/category-medical-equipment',
  },
];

const MenuDrop = ({ dropTitle, dropItem = LIST_ITEM }: MenuDropProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate2 = useNavigate();
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Flex className="sidebar-drop" flexDirection="column">
      <Flex
        className="sidebar-drop__title"
        onClick={handleOpen}
        align="center"
        gap="20px"
      >
        <Overview />
        {dropTitle}
        <ChevronRightIcon
          className={`sidebar-drop__icon ${open ? 'active' : ''}`}
        />
      </Flex>
      <Flex
        pt={'3px'}
        flexDirection="column"
        justifyContent={'end'}
        zIndex={'1111'}
        ml="45px"
      >
        {dropItem.map((item, index) => (
          <Box
            pt={'3px'}
            key={index}
            className={`sidebar-drop__item ${open ? 'active' : ''}`}
            onClick={() => {
              navigate2(item?.path);
            }}
          >
            <Flex
              alignItems="center"
              height={'100%'}
              className={`sidebar-drop__item-title ${
                location.pathname.includes(item.path) ? 'active' : ''
              }`}
            >
              {item.name}
            </Flex>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

const MENUS = [
  {
    name: 'Quản lý nhà cung cấp',
    path: '/admin',
    icon: <Overview />,
  },
  {
    name: 'Quản lý thuốc',
    path: '/admin/medication-management',
    icon: <Overview />,
  },
  {
    component: (
      <MenuDrop dropTitle="Quản lý danh mục thuốc" dropItem={LIST_ITEM} />
    ),
    path: '/admin/category-management',
    icon: <Overview />,
  },
  {
    name: 'Quản lý chi nhánh',
    path: '/admin/general-warehouse-management',
    icon: <Overview />,
    pathChild: [
      '/admin/create-notification',
      '/admin/create-push-notification',
    ],
  },
  {
    name: 'Quản lý người dùng',
    path: '/admin/user-management',
    icon: <Overview />,
    pathChild: [
      '/admin/create-notification',
      '/admin/create-push-notification',
    ],
  },
  {
    name: 'Thống kê',
    path: '/admin/statistical',
    icon: <Overview />,
    component: <MenuDrop dropTitle="Thống kê" dropItem={LIST_ITEM} />,
  },
];

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className="nav-bar">
      <Box className="nav-bar__menu">
        {MENUS.map((menu, index) => {
          return (
            <Flex
              userSelect="none"
              key={index}
              className={
                !menu.component
                  ? `nav-bar__menu-item ${
                      location.pathname === menu.path ||
                      menu?.pathChild?.some((item) =>
                        location.pathname.includes(item),
                      )
                        ? 'active'
                        : ''
                    }`
                  : 'nav-bar__menu-drop'
              }
              onClick={() => {
                menu.component ? '' : navigate(menu.path || '/admin');
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

export default SidebarAdmin;
