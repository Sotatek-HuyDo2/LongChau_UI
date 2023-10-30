import React from 'react';
import { BaseAdminPage } from 'src/components/layouts';
import { Box } from '@chakra-ui/react';

const DashboardPage = () => {
  return (
    <BaseAdminPage>
      <Box fontSize="24px" as="b" mr={'30px'}>
        Dashboard
      </Box>
    </BaseAdminPage>
  );
};

export default DashboardPage;
