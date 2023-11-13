import { Box, Flex } from '@chakra-ui/layout';
import React, { FC, ReactNode } from 'react';
import { GuestAdminPage, SidebarStaff } from 'src/components/layouts';

interface IBasePage {
  className?: string;
  children: ReactNode;
}

const BaseStaffPage: FC<IBasePage> = ({ className, children }) => {
  return (
    <GuestAdminPage>
      <Flex className="container-page">
        <Box w="300px">
          <SidebarStaff />
        </Box>
        <Box className="container-page__content">{children}</Box>
      </Flex>
    </GuestAdminPage>
  );
};

export default BaseStaffPage;
