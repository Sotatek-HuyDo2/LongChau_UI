import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const MOCK_MENU_TEST = [
  {
    cateID: 1,
    cateName: 'Thực phẩm chức năng',
    icon: true,
    productType: [
      {
        productTypeID: 1,
        productTypeName: 'test1',
        link: '/',
      },
      {
        productTypeID: 2,
        productTypeName: 'test2',
        link: '/admin',
      },
      {
        productTypeID: 3,
        productTypeName: 'Tắt cả',
        link: '/category-functional-foods',
      },
    ],
  },
  {
    cateID: 2,
    cateName: 'Thiết bị y tế',
    icon: true,
    productType: [
      {
        productTypeID: 1,
        productTypeName: 'test1',
        link: '/',
      },
      {
        productTypeID: 2,
        productTypeName: 'test2',
        link: '/',
      },
      {
        productTypeID: 3,
        productTypeName: 'Tất cả',
        link: '/',
      },
    ],
  },
  {
    cateID: 3,
    cateName: 'Chăm sóc cá nhân',
    icon: true,
    productType: [
      {
        productTypeID: 1,
        productTypeName: 'test1',
        link: '/',
      },
      {
        productTypeID: 2,
        productTypeName: 'test2',
        link: '/',
      },
      {
        productTypeID: 3,
        productTypeName: 'Tất cả',
        link: '/',
      },
    ],
  },
  {
    cateID: 4,
    cateName: 'Thuốc',
    icon: true,
    productType: [
      {
        productTypeID: 1,
        productTypeName: 'test1',
        link: '/',
      },
      {
        productTypeID: 2,
        productTypeName: 'test2',
        link: '/',
      },
      {
        productTypeID: 3,
        productTypeName: 'Tất cả',
        link: '/category-medicine',
      },
    ],
  },
];

const MOCK_MENU = [
  {
    titleLabel: 'Thực phẩm chức năng',
    icon: true,
    dataDrop: [
      {
        title: 'test1',
        link: '/',
      },
      {
        title: 'test2',
        link: '/admin',
      },
      {
        title: 'Tắt cả',
        link: '/category-functional-foods',
      },
    ],
  },
  {
    titleLabel: 'Thiết bị y tế',
    icon: true,
    dataDrop: [
      {
        title: 'test1',
        link: '/',
      },
      {
        title: 'test2',
        link: '/',
      },
      {
        title: 'Tất cả',
        link: '/',
      },
    ],
  },
  {
    titleLabel: 'Chăm sóc cá nhân',
    icon: true,
    dataDrop: [
      {
        title: 'test1',
        link: '/',
      },
      {
        title: 'test2',
        link: '/',
      },
      {
        title: 'Tất cả',
        link: '/',
      },
    ],
  },
  {
    titleLabel: 'Thuốc',
    icon: true,
    dataDrop: [
      {
        title: 'test1',
        link: '/',
      },
      {
        title: 'test2',
        link: '/',
      },
      {
        title: 'Tất cả',
        link: '/category-medicine',
      },
    ],
  },
  {
    titleLabel: 'Tìm kiếm địa chỉ',
    link: '/pharmacy-system',
    icon: false,
  },
  {
    titleLabel: 'Thông tin nhà thuốc',
    icon: false,
    link: 'https://pharmacy-documentation.vercel.app/docs/intro',
  },
];

const MenuFilter = () => {
  const navigate = useNavigate();
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex backgroundColor={'white'} color={'black'} h={'50px'}>
      <Flex
        w={'1440px'}
        margin={'auto'}
        gap={'30px'}
        justifyContent={'space-between'}
      >
        {MOCK_MENU.map((menu, index) => {
          return (
            <Flex key={index}>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      userSelect={'none'}
                      as={Flex}
                      alignItems={'center'}
                      fontSize={'16px'}
                      pb="5px"
                      _hover={{
                        borderBottom: '1px solid #1250dc',
                        transition: 'border-bottom 0.3s ease', // Thêm hiệu ứng transition
                      }}
                      // onMouseEnter={onOpen}
                      // onMouseLeave={onClose}
                      onClick={() => {
                        // Kiểm tra xem menu.link có tồn tại và có phải là đường dẫn ngoài trang web hay không
                        if (menu.link && menu.link.startsWith('http')) {
                          // Nếu đúng, mở liên kết trong một tab hoặc cửa sổ mới
                          window.open(menu.link, '_blank');
                        } else if (menu.link) {
                          // Nếu không phải là đường dẫn ngoài trang web, thực hiện điều hướng bằng React Router hoặc cách bạn sử dụng để điều hướng trong ứng dụng của bạn.
                          navigate(menu.link);
                        }
                      }}
                      cursor="pointer"
                    >
                      <Flex alignItems={'center'} gap={'3px'}>
                        {menu.titleLabel}{' '}
                        {menu.icon &&
                          (isOpen ? (
                            <ChevronUpIcon boxSize={6} />
                          ) : (
                            <ChevronDownIcon boxSize={6} />
                          ))}
                      </Flex>
                    </MenuButton>
                    {menu?.dataDrop ? (
                      <MenuList
                        background={'white'}
                        outline={'none'}
                        border={'none'}
                        // onMouseEnter={onOpen}
                        // onMouseLeave={onClose}
                      >
                        {menu?.dataDrop.map((item) => {
                          return (
                            <MenuItem onClick={() => navigate(`${item?.link}`)}>
                              <Flex alignItems={'center'}>{item?.title}</Flex>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </Menu>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default MenuFilter;
