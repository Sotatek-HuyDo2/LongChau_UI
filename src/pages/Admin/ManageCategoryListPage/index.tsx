import { Box, Flex, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { BasePage } from 'src/components/layouts';
import { AppTabs } from 'src/components';
// import 'src/styles/pages/UserManagement.scss';
import 'src/styles/pages/ManageCategoryListPage.scss';
import CategoryPersonalCare from './CategoryPersonalCare.part';
import CategoryFunctionalFoods from './CategoryFunctionalFoods.part';
import CategoryMedicine from './CategoryMedicine.part';
import CategoryMedicalEquipment from './CategoryMedicalEquipment.part';

interface ITabs {
  id: string;
  name: string;
  content: ReactNode;
}

const tabs: ITabs[] = [
  {
    id: 'TVL',
    name: 'TVL',
    content: <CategoryFunctionalFoods />,
  },
  {
    id: 'Trading volume',
    name: 'Trading volume',
    content: <CategoryMedicine />,
  },
  {
    id: 'Trading fee',
    name: 'Trading fee',
    content: <CategoryPersonalCare />,
  },
  {
    id: 'User',
    name: 'User',
    content: <CategoryMedicalEquipment />,
  },
];

const ManageCategoryList = () => {
  return (
    <BasePage>
      <Box>
        <Box>
          <Text fontSize="24px" as="b" mr={'30px'} color={'#2167df'}>
            Quản lý Danh Mục
          </Text>
        </Box>
        <Box mt={10}>
          {/* <AppTabs tabs={tabs} /> */}
          {tabs.map((item, index) => {
            return <Flex>{item.content}</Flex>;
          })}
        </Box>
      </Box>
    </BasePage>
  );
};

export default ManageCategoryList;
