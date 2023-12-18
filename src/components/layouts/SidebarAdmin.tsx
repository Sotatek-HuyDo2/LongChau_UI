import { useState } from 'react';
import 'src/styles/components/Navbar.scss';
import { Box, Flex } from '@chakra-ui/layout';
import { useNavigate } from 'react-router';
import { Overview } from 'src/assets/icons';
import { useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';

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
    name: 'Quản lý người dùng',
    icon: <Overview />,
    pathChild: [
      {
        name: 'Quản lý nhân sự',
        path: '/admin/user-management',
      },
      {
        name: 'Quản lý khách hàng',
        path: '/admin/customer-management',
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
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffectUnsafe(() => {
    const hasChildPaths = MENUS.some((menu) =>
      menu.pathChild?.some((item) => location.pathname === item.path),
    );

    setOpenDropdown(hasChildPaths);
  }, [location.pathname]);

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
                    setOpenDropdown(!openDropdown);
                  } else {
                    navigate(menu.path || '/admin');
                    setOpenDropdown(false);
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
                            openDropdown ? 'active' : ''
                          }`}
                        />
                      )}
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
              {menu.pathChild && openDropdown && (
                <Flex className="dropdown-menu" flexDir={'column'}>
                  {menu.pathChild.map((childItem: any, childIndex) => (
                    <Flex
                      key={childIndex}
                      pl={'90px'}
                      className={`nav-bar__menu-item ${
                        location.pathname === childItem.path ? 'active' : ''
                      }`}
                      onClick={() => navigate(childItem?.path)}
                    >
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
