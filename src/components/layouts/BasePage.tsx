import { Box, Flex } from '@chakra-ui/layout';
import React, { FC, ReactNode } from 'react';
import { GuestPage, NavBarAdmin } from 'src/components/layouts';

interface IBasePage {
  className?: string;
  children: ReactNode;
}

const BasePage: FC<IBasePage> = ({ className, children }) => {
  return (
    <GuestPage>
      <Flex className="container-page">
        <Box w="300px">
          <NavBarAdmin />
        </Box>
        <Box className="container-page__content">{children}</Box>
      </Flex>
    </GuestPage>
  );
};

export default BasePage;
