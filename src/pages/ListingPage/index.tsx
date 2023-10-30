import React from 'react';
import { BaseAdminPage } from 'src/components/layouts';
import 'src/styles/pages/DelistPage.scss';
import PartListing from './PartListing';
import { Box, Flex } from '@chakra-ui/react';
import PartAddPair from './PartAddPair';

const ListingPage = () => {
  return (
    <BaseAdminPage>
      <Box className="delist">
        <Flex fontSize="24px" as="b" mr={'30px'} alignItems={'center'} gap={3}>
          Listing
        </Flex>
        <PartAddPair />
        <PartListing />
      </Box>
    </BaseAdminPage>
  );
};

export default ListingPage;
