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
    // component: (
    //   <MenuDrop dropTitle="Quản lý danh mục thuốc" dropItem={LIST_ITEM} />
    // ),
    name: 'Quản lý danh mục thuốc',
    path: '/admin/category-management',
    icon: <Overview />,
  },
  {
    name: 'Quản lý chi nhánh',
    path: '/admin/branch-management',
    icon: <Overview />,
  },
  {
    name: 'Quản lý nhân lực',
    path: '/admin/user-management',
    icon: <Overview />,
    pathChild: [
      {
        name: 'Người dùng',
        path: '/staff/general-warehouse-management',
      },
      {
        name: 'Nhân sự',
        path: '/admin/create-push-notification',
      },
    ],
  },
  {
    name: 'Thống kê',
    path: '/admin/statistical',
    icon: <Overview />,
  },
];

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index: any) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavigate = (path: string, index: any) => {
    console.log('index', index);

    navigate(path);
    setOpenDropdown(index);
  };

  return (
    <Box className="nav-bar">
      <Box className="nav-bar__menu">
        {MENUS.map((menu, index) => {
          const isActive =
            location.pathname === menu.path ||
            (menu.pathChild &&
              menu.pathChild.some((item) =>
                location.pathname.includes(item.path),
              ));

          return (
            <>
              <Flex
                userSelect="none"
                key={index}
                className={`nav-bar__menu-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (menu.pathChild) {
                    toggleDropdown(index);
                  } else {
                    navigate(menu.path || '/admin');
                    setOpenDropdown(null); // Đóng dropdown khi click vào mục không có pathChild
                  }
                }}
              >
                <Flex flexDir={'column'}>
                  <Flex alignItems={'center'}>
                    <Box>{menu.icon}</Box>
                    <Box>
                      {menu.name}{' '}
                      {menu.pathChild && (
                        <ChevronRightIcon
                          className={`sidebar-drop__icon ${
                            index ? 'active' : ''
                          }`}
                        />
                      )}
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
              {menu.pathChild && openDropdown === index && (
                <Flex className="dropdown-menu" flexDir={'column'}>
                  {menu.pathChild.map((childItem, childIndex) => (
                    <Flex
                      key={childIndex}
                      className={`nav-bar__menu-path-child-item ${
                        location.pathname === childItem.path ? 'active' : ''
                      }`}
                      onClick={() => handleNavigate(childItem?.path, index)}
                    >
                      <Box>{/* Icon for child item */}</Box>
                      <Box>{childItem.name}</Box>
                    </Flex>
                  ))}
                </Flex>
              )}
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default SidebarAdmin;
