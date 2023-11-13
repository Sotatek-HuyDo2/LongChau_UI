import { Box, Flex } from '@chakra-ui/layout';
import React, { FC, ReactNode } from 'react';
import { GuestAdminPage, SidebarBranchAdmin } from 'src/components/layouts';

interface IBasePage {
  className?: string;
  children: ReactNode;
}

const BaseBranchAdminPage: FC<IBasePage> = ({ className, children }) => {
  return (
    <GuestAdminPage>
      <Flex className="container-page">
        <Box w="300px">
          <SidebarBranchAdmin />
        </Box>
        <Box className="container-page__content">{children}</Box>
      </Flex>
    </GuestAdminPage>
  );
};

export default BaseBranchAdminPage;
