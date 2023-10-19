import React from 'react';
import { BasePage } from 'src/components/layouts';
import { Box } from '@chakra-ui/react';

const DashboardPage = () => {
  return (
    <BasePage>
      <Box fontSize="24px" as="b" mr={'30px'}>
        Dashboard
      </Box>
    </BasePage>
  );
};

export default DashboardPage;
