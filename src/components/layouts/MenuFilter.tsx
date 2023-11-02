import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

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
        title: 'test3',
        link: '/',
      },
    ],
  },
  {
    titleLabel: 'Dược mỹ phẩm',
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
        title: 'test3',
        link: '/',
      },
    ],
  },
  {
    titleLabel: 'Dược mỹ phẩm',
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
        title: 'test3',
        link: '/',
      },
    ],
  },
  {
    titleLabel: 'Dược mỹ phẩm',
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
        title: 'test3',
        link: '/',
      },
    ],
  },
  {
    titleLabel: 'Dược mỹ phẩm',
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
        title: 'test3',
        link: '/',
      },
    ],
  },
  {
    titleLabel: 'Dược mỹ phẩm',
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
        title: 'test3',
        link: '/',
      },
    ],
  },
  {
    titleLabel: 'Dược mỹ phẩm',
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
        title: 'test3',
        link: '/',
      },
    ],
  },
  {
    titleLabel: 'Dược mỹ phẩm',
    icon: false,
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
        title: 'test3',
        link: '/',
      },
    ],
  },
];

const MenuFilter = () => {
  const navigate = useNavigate();

  return (
    <Flex backgroundColor={'#f4f6f9'} color={'black'} h={'70px'}>
      <Flex
        w={'1440px'}
        margin={'auto'}
        gap={'30px'}
        justifyContent={'space-between'}
      >
        {MOCK_MENU.map((menu) => {
          return (
            <Flex>
              <Menu>
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
                >
                  <Flex alignItems={'center'} gap={'3px'}>
                    {menu.titleLabel}{' '}
                    {menu.icon ? <ChevronDownIcon boxSize={6} /> : null}
                  </Flex>
                </MenuButton>
                <MenuList
                  background={'#f4f6f9'}
                  outline={'none'}
                  border={'none'}
                >
                  {menu.dataDrop.map((item) => {
                    return (
                      <MenuItem onClick={() => navigate(`${item?.link}`)}>
                        <Flex alignItems={'center'}>{item?.title}</Flex>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default MenuFilter;
