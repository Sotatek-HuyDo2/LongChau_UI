import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { BaseAdminPage } from 'src/components/layouts';
import 'src/styles/pages/UserManagement.scss';
import UserList from './UserList';
import UserStatistic from './UserStatistic';

const UserManagementPage = () => {
  return (
    <BaseAdminPage>
      <Box>
        <Box pb="10px" className="user-management-container">
          <Flex
            pb="30px"
            fontSize="20px"
            flexDirection="row"
            alignItems="center"
            borderBottom={'1px solid #282A38'}
          >
            <Text fontSize="24px" as="b" mr={'30px'}>
              User Management
            </Text>
          </Flex>
        </Box>
        <Box className="user-management">
          <UserStatistic />
          <UserList />
        </Box>
      </Box>
    </BaseAdminPage>
  );
};

export default UserManagementPage;
