import { Box, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BaseBranchAdminPage } from 'src/components/layouts';
import { AppTabs } from 'src/components';
import 'src/styles/pages/ManageCategoryListPage.scss';
import ContainerManagementPage from './ContainerManagementPage.part';
import WarehouseManagementPage from './WarehouseManagementPage.part';

interface ITabs {
  id: string;
  name: string;
  content: ReactNode;
}

const GeneralWarehouseManagerList = () => {
  const tabs: ITabs[] = [
    {
      id: 'ware-house',
      name: 'Quản lý kho chứa',
      content: <WarehouseManagementPage />,
    },
    {
      id: 'container',
      name: 'Quản lý ô chứa',
      content: <ContainerManagementPage />,
    },
  ];

  return (
    <BaseBranchAdminPage>
      <Box>
        <Box>
          <Text fontSize="24px" as="b" mr={'30px'} color={'#2167df'}>
            Quản lý kho chi nhánh
          </Text>
        </Box>
        <Box mt={10}>
          <AppTabs tabs={tabs} />
        </Box>
      </Box>
    </BaseBranchAdminPage>
  );
};

export default GeneralWarehouseManagerList;
