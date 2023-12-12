import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BaseAdminPage } from 'src/components/layouts';
import { AppTabs } from 'src/components';
import 'src/styles/pages/UserManagement.scss';
import PartTVL from './PartTVL';
import PartTradingVolume from './PartTradingVolume';
import PartTradingFee from './PartTradingFee';
import PartUser from './PartUser';

interface ITabs {
  id: string;
  name: string;
  content: ReactNode;
}

const tabs: ITabs[] = [
  {
    id: 'TVL',
    name: 'TVL',
    content: <PartTVL />,
  },
  {
    id: 'Trading volume',
    name: 'Trading volume',
    content: <PartTradingVolume />,
  },
  {
    id: 'Trading fee',
    name: 'Trading fee',
    content: <PartTradingFee />,
  },
  {
    id: 'User',
    name: 'User',
    content: <PartUser />,
  },
];

const InsightPage = () => {
  return (
    <BaseAdminPage>
      <Box>
        <Box>
          <Text fontSize="24px" as="b" mr={'30px'}>
            Insight
          </Text>
        </Box>
        <Box mt={10}>
          <AppTabs tabs={tabs} />
        </Box>
      </Box>
    </BaseAdminPage>
  );
};

export default InsightPage;
