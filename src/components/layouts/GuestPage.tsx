import React, { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import 'src/styles/components/Layout.scss';
import HeaderAdmin from './HeaderAdmin';

interface IGuestPage {
  className?: string;
  children: ReactNode;
}

const GuestPage: FC<IGuestPage> = (props) => {
  return (
    <Box className="guest-page">
      <HeaderAdmin />
      <Box className="guest-page__container">{props.children}</Box>
    </Box>
  );
};

export default GuestPage;
