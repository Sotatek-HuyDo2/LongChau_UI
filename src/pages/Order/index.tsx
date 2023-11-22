import React from 'react';
import BaseHomePage from 'src/components/layouts/HomePage/BaseHomePage';
import NoProduct from '../NoProduct';
import { Flex } from '@chakra-ui/react';

const Order = () => {
  return (
    <BaseHomePage>
      <Flex bg={'#f4f6f9'}>
        <NoProduct />
      </Flex>
    </BaseHomePage>
  );
};

export default Order;
