import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { MOCK_Statistical_BOX } from 'src/utils/constants';
import 'src/styles/pages/UserManagement.scss';

const UserStatistic = () => {
  return (
    <Flex py={'30px'} gap={5} flexWrap={'wrap'}>
      {MOCK_Statistical_BOX.map((item) => {
        return (
          <Box className="user-management__info-box">
            <Text className="user-management__info-box-label">
              {item.title}
            </Text>
            <Text fontSize="20px" as="b">
              {item.value}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};

export default UserStatistic;
