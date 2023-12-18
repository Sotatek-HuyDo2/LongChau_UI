import { Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import rf from 'src/api/RequestFactory';
import { useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import ProductTyByCategory from 'src/pages/Admin/ManageCategoryListPage/ProductTyByCategory.part';

const MOCK_MENU = [
  {
    titleLabel: 'Thực phẩm chức năng',
    icon: true,
    dataDrop: [
      {
        title: 'test1',
        link: <ProductTyByCategory categoriesID={1} />,
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

  const [cateList, setCateList] = useState<any>([]);
  const [typeList, setTypeList] = useState<any>([]);

  const getAllDrugsTypeByCateID = async (id: number | string) => {
    try {
      const resType = await rf
        .getRequest('CategoryRequest')
        .getAllDrugsTypeByCateID(id);
      const newTypeList = resType.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));
      return newTypeList;
    } catch (e: any) {
      console.log('Error in getAllDrugsTypeByCateID:', e.message);
      throw e; // Re-throw the error to propagate it to the caller if needed
    }
  };

  const getAllCate = async () => {
    try {
      const res = await rf.getRequest('CategoryRequest').getAllCate();
      if (res) {
        const newCategory = res.map(async (item: any) => ({
          id: item.id,
          name: item.name,
          data: await getAllDrugsTypeByCateID(item.id),
        }));
        const resolvedCategories = await Promise.all(newCategory);
        setCateList(resolvedCategories);
      }
    } catch (e: any) {
      console.log('Error in getAllCate:', e.message);
    }
  };

  const tabs = cateList.map((item: any) => ({
    id: item.id,
    name: item.name,
    // content: <CategoryFunctionalFoods categoriesID={item.id} />,
  }));

  useEffectUnsafe(() => {
    getAllCate();
    // getAllDrugsTypeByCateID;
  }, []);

  return (
    <Flex backgroundColor={'white'} color={'black'} h={'50px'}>
      <Flex
        w={'1440px'}
        margin={'auto'}
        gap={'30px'}
        justifyContent={'space-between'}
      >
        {cateList.map((menu: any, index: any) => {
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
                        transition: 'border-bottom 0.3s ease',
                      }}
                      // onClick={() => {
                      //   if (menu.link && menu.link.startsWith('http')) {
                      //     window.open(menu.link, '_blank');
                      //   } else if (menu.link) {
                      //     navigate(menu.link);
                      //   }
                      // }}
                      onClick={() => getAllDrugsTypeByCateID(menu.id)}
                      cursor="pointer"
                    >
                      <Flex alignItems={'center'} gap={'3px'}>
                        {menu.name}{' '}
                        {menu.icon &&
                          (isOpen ? (
                            <ChevronUpIcon boxSize={6} />
                          ) : (
                            <ChevronDownIcon boxSize={6} />
                          ))}
                      </Flex>
                    </MenuButton>
                    {menu.data ? (
                      <MenuList
                        background={'white'}
                        outline={'none'}
                        border={'none'}
                      >
                        {menu.data.map((item: any) => {
                          return (
                            <MenuItem>
                              <Flex alignItems={'center'}>{item?.name}</Flex>
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
