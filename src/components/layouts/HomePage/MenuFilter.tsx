import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import rf from 'src/api/RequestFactory';
import { useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import ProductTyByCategory from 'src/pages/Admin/ManageCategoryListPage/ProductTyByCategory.part';

const MenuFilter = () => {
  const [cateList, setCateList] = useState<any>([]);

  const getAllDrugsTypeByCateID = async (id: number | string) => {
    try {
      const resType = await rf
        .getRequest('CategoryRequest')
        .getAllDrugsTypeByCateID(id);
      const newTypeList = resType.map((item: any) => ({
        id: item.id,
        name: item.name,
        content: <ProductTyByCategory categoriesID={1} />,
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

  console.log(cateList);

  // const tabs = cateList.map((item: any) => ({
  //   id: item.id,
  //   name: item.name,
  //   // content: <CategoryFunctionalFoods categoriesID={item.id} />,
  // }));

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
              {/* <Menu>
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
              </Menu> */}
              {/* <Tabs
                h={'full'}
                display="flex"
                flexDirection={'column'}
                variant={'unstyled'}
                colorScheme="transparent"
                // defaultIndex={defaultTab}
                className="app-tab"
                isLazy
                // overflow={overflow}
              >
                <TabList className="tab-list">
                  <Flex
                    justifyContent={'space-between'}
                    alignItems="center"
                    w="100%"
                  >
                    <Flex>
                      {tabs.map((tab: ITabs) => {
                        return (
                          <Tab
                            id={tab.id}
                            key={tab.id}
                            className="app-tab__name-tab"
                            onClick={() => onChange && onChange(tab.id)}
                          >
                            {tab.name}
                          </Tab>
                        );
                      })}
                    </Flex>

                    <Box>{rightElement ? rightElement() : ''}</Box>
                  </Flex>
                </TabList>

                <TabPanels flex={1}>
                  {tabs.map((tab: any) => {
                    return (
                      <TabPanel
                        key={tab.id}
                        h={'full'}
                        className="app-tab__content-tab"
                      >
                        {tab.content}
                      </TabPanel>
                    );
                  })}
                </TabPanels>
              </Tabs> */}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default MenuFilter;
