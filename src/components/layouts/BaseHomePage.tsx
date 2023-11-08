import { Box, Flex } from '@chakra-ui/layout';
import React, { FC, ReactNode } from 'react';
import {
  FooterHomePage,
  HeaderHomePage,
  MenuFilter,
} from 'src/components/layouts';
interface IBaseHomePage {
  className?: string;
  children: ReactNode;
}

const BaseHomePage: FC<IBaseHomePage> = ({ className, children }) => {
  return (
    <Flex className="container-page" flexDirection={'column'}>
      <HeaderHomePage />
      <MenuFilter />
      <Box>{children}</Box>
      <FooterHomePage />
    </Flex>
  );
};

export default BaseHomePage;
