import { Box, Divider, Flex, Image, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CopyIcon } from 'src/assets/icons';
import { BaseAdminPage } from 'src/components/layouts';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { formatNumber, formatTimestamp } from 'src/utils/format';
import { copyToClipboard } from 'src/utils/helpers';
// import '../styles/pages/CategoryPersonalCarePage.scss';
import BaseHomePage from 'src/components/layouts/BaseHomePage';
import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
} from '@chakra-ui/icons';
import { AppButton } from 'src/components';

const CategoryPersonalCarePage = () => {
  return (
    <BaseHomePage>
      <Box backgroundColor={'#f4f6f9'}>
        <Box className="container-explorer" w={'1440px'} margin={'auto'}>
          <Flex fontSize="24px" flexDirection="row" alignItems="center">
            {/* <Flex
                  pb={'20px'}
                  fontSize="24px"
                  as="b"
                  mr={'30px'}
                  alignItems={'center'}
                  gap={3}
                  color={'#2167df'}
                >
                  <Text
                    cursor={'pointer'}
                    _hover={{ color: '#4490ec' }}
                    onClick={handleNavigateToUserManagement}
                  >
                    Quản lý thuốc
                  </Text>
                  <Box transform="rotate(180deg)">
                    <ArrowLeftIcon />
                  </Box>
                  <Text fontSize="20px">Chi Tiết Thuốc</Text>
                </Flex> */}
          </Flex>
        </Box>
      </Box>
    </BaseHomePage>
  );
};

export default CategoryPersonalCarePage;
