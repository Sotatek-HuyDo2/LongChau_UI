import React, { useState } from 'react';
import 'src/styles/components/Navbar.scss';
import { Box, Flex } from '@chakra-ui/layout';
import { useNavigate } from 'react-router';
import { Overview } from 'src/assets/icons';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';

const Sidebar_MENUS = [
  {
    name: 'Giới thiệu nhà thuốc',
    path: '/intro',
  },
  {
    name: 'Chính sách giao hàng',
    path: '/branch-management',
  },
  {
    name: 'Chính sách bảo mật',
    path: '/medication-management',
  },
  {
    name: 'Chính sách thanh toán',
    path: '/category-management',
  },
  {
    name: 'Chính sách thu nhập và xử lý dữ liệu cá nhân',
    path: '/general-warehouse-management',

    pathChild: ['/create-notification', '/create-push-notification'],
  },
];

const SidebarInformation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className="nav-bar">
      <Box className="nav-bar__menu">
        {Sidebar_MENUS.map((menu, index) => {
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
              <Box>{menu.name}</Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export default SidebarInformation;
