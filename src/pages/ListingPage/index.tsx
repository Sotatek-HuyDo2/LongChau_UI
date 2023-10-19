import React from 'react';
import { BasePage } from 'src/components/layouts';
import 'src/styles/pages/DelistPage.scss';
import PartListing from './PartListing';
import { Box, Flex } from '@chakra-ui/react';
import PartAddPair from './PartAddPair';

const ListingPage = () => {
  return (
    <BasePage>
      <Box className="delist">
        <Flex fontSize="24px" as="b" mr={'30px'} alignItems={'center'} gap={3}>
          Listing
        </Flex>
        <PartAddPair />
        <PartListing />
      </Box>
    </BasePage>
  );
};

export default ListingPage;
