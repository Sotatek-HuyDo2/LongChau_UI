import { Box, Flex, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { BaseAdminPage } from 'src/components/layouts';
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
    id: 'FunctionalFoods',
    name: 'Thực phẩm chức năng',
    content: <CategoryFunctionalFoods />,
  },
  {
    id: 'Medicine',
    name: 'Thuốc',
    content: <CategoryMedicine />,
  },
  {
    id: 'PersonalCare',
    name: 'Chăm sóc khách hàng',
    content: <CategoryPersonalCare />,
  },
  {
    id: 'MedicalEquipment',
    name: 'Thiết bị y tế',
    content: <CategoryMedicalEquipment />,
  },
];

const ManageCategoryList = () => {
  return (
    <BaseAdminPage>
      <Box>
        <Box>
          <Text fontSize="24px" as="b" mr={'30px'} color={'#2167df'}>
            Quản lý Danh Mục
          </Text>
        </Box>
        <Box mt={10}>
          <AppTabs tabs={tabs} />
        </Box>
      </Box>
    </BaseAdminPage>
    // <BaseAdminPage>
    //   <Box>
    //     <Box>
    //       <Text fontSize="24px" as="b" mr={'30px'} color={'#2167df'}>
    //         Quản lý Danh Mục
    //       </Text>
    //     </Box>
    //     <Box mt={10}>
    //       {tabs.map((item, index) => {
    //         return <Flex>{item.content}</Flex>;
    //       })}
    //     </Box>
    //   </Box>
    // </BaseAdminPage>
  );
};

export default ManageCategoryList;
