import { Box, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BaseAdminPage } from 'src/components/layouts';
import { AppTabs } from 'src/components';
import 'src/styles/pages/ManageCategoryListPage.scss';
import CategoryFunctionalFoods from '../ManageCategoryListPage/ProductTyByCategory.part';
interface IStatistical {
  id: string;
  name: string;
  content: ReactNode;
}

const tabs: IStatistical[] = [
  {
    id: 'FunctionalFoods',
    name: 'Thực phẩm chức năng',
    content: <CategoryFunctionalFoods />,
  },
];

const Statistical = () => {
  return (
    <BaseAdminPage>
      <Box>
        <Box>
          <Text fontSize="24px" as="b" mr={'30px'} color={'#2167df'}>
            Thống kê
          </Text>
        </Box>
        <Box mt={10}>
          <AppTabs tabs={tabs} />
          {/* {tabs.map((item, index) => {
            return <Flex>{item.content}</Flex>;
          })} */}
        </Box>
      </Box>
    </BaseAdminPage>
  );
};

export default Statistical;
