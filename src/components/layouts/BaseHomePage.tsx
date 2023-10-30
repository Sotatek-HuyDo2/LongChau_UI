import { Box, Flex } from '@chakra-ui/layout';
import React, { FC, ReactNode } from 'react';
import { FooterHomePage, HeaderHomePage } from 'src/components/layouts';

interface IBaseHomePage {
  className?: string;
  children: ReactNode;
}

const BaseHomePage: FC<IBaseHomePage> = ({ className, children }) => {
  return (
    <Flex className="container-page">
      <HeaderHomePage />
      <Box className="container-page__content">{children}</Box>
      <FooterHomePage />
    </Flex>
  );
};

export default BaseHomePage;
