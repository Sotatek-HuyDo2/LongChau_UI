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
    name: 'Quản lý khách hàng',
    path: '/staff',
    icon: <Overview />,
  },
  {
    name: 'Quản lý đơn hàng',
    icon: <Overview />,
    pathChild: [
      {
        name: 'Đơn hàng đã chia',
        path: '/staff/splited-ordered-management',
      },
      {
        name: 'Đơn hàng đã được tạo',
        path: '/staff/created-ordered-management',
      },
      {
        name: 'Đơn hàng được xác nhận',
        path: '/staff/approved-ordered-management',
      },
      {
        name: 'Đơn hàng đang vận chuyển',
        path: '/staff/delivered-ordered-management',
      },
      {
        name: 'Đơn hàng đã hoàn thành',
        path: '/staff/done-ordered-management',
      },
      {
        name: 'Đơn hàng bị từ chối/hủy',
        path: '/staff/rejected-ordered-management',
      },
    ],
  },
];

const SidebarStaff = () => {
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
                    navigate(menu.path || '/staff');
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

export default SidebarStaff;
