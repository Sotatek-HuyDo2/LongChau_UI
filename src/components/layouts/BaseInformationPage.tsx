import { Box, Flex } from '@chakra-ui/layout';
import React, { FC, ReactNode } from 'react';
import {
  FooterHomePage,
  HeaderHomePage,
  SidebarInformation,
} from 'src/components/layouts';

interface IBaseHomePage {
  className?: string;
  children: ReactNode;
}

const BaseInformationPage: FC<IBaseHomePage> = ({ className, children }) => {
  return (
    <Flex className="container-page" flexDirection={'column'}>
      <HeaderHomePage />
      <SidebarInformation />
      <FooterHomePage />
    </Flex>
  );
};

export default BaseInformationPage;
