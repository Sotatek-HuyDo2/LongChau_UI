import { Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import rf from 'src/api/RequestFactory';
import { useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { useNavigate } from 'react-router-dom';

const MenuFilter = () => {
  const [cateList, setCateList] = useState<any>([]);
  const [visibleItems, setVisibleItems] = useState(6);
  const navigate = useNavigate();

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
  };

  const handleResetVisibleItems = () => {
    setVisibleItems(6);
  };

  const getAllDrugsTypeByCateID = async (id: number | string) => {
    try {
      const resType = await rf
        .getRequest('CategoryRequest')
        .getAllDrugsTypeByCateID(id);
      let newTypeList = resType.map((item: any) => ({
        typeSlug: item.slug,
        id: item.id,
        name: item.name,
      }));
      newTypeList = [{ typeSlug: '', id: 0, name: 'Tất cả' }, ...newTypeList];
      return newTypeList;
    } catch (e: any) {
      console.log('Error in getAllDrugsTypeByCateID:', e.message);
    }
  };

  const getAllCate = async () => {
    try {
      const res = await rf.getRequest('CategoryRequest').getAllCate();
      if (res) {
        const newCategory = res.map(async (item: any) => ({
          cateSlug: item.slug,
          id: item.id,
          name: item.name,
          data: await getAllDrugsTypeByCateID(item.id),
          icon: true,
        }));
        const resolvedCategories = await Promise.all(newCategory);
        setCateList([
          ...resolvedCategories,
          {
            name: 'Tìm kiếm địa chỉ',
            link: '/pharmacy-system',
            icon: false,
          },
          {
            name: 'Thông tin nhà thuốc',
            link: 'https://pharmacy-documentation.vercel.app/docs/intro',
            icon: false,
          },
        ]);
      }
    } catch (e: any) {
      console.log('Error in getAllCate:', e.message);
    }
  };

  useEffectUnsafe(() => {
    getAllCate();
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
                      cursor="pointer"
                      onClick={() => {
                        menu.link && menu.link.startsWith('http')
                          ? window.open(menu.link, '_blank')
                          : navigate(menu.link);
                      }}
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
                        {menu.data
                          .slice(0, visibleItems)
                          .map((item: any, index: any) => (
                            <MenuItem
                              key={index}
                              onClick={() => {
                                navigate(
                                  `/phan-loai/${menu.cateSlug}${
                                    item.typeSlug ? `/${item.typeSlug}` : ''
                                  }`,
                                );
                              }}
                            >
                              <Flex alignItems={'center'}>{item?.name}</Flex>
                            </MenuItem>
                          ))}
                        <Flex gap={1} justifyContent={'space-around'}>
                          {menu.data.length > visibleItems && (
                            <button onClick={handleShowMore}>Xem thêm</button>
                          )}
                          {visibleItems > 6 && (
                            <button onClick={handleResetVisibleItems}>
                              Ẩn
                            </button>
                          )}
                        </Flex>
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
