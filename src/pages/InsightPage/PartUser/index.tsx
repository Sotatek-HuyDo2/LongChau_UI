import { Box } from '@chakra-ui/react';
import React from 'react';
import UserStatistic from '../../UserManagement/UserStatistic';
import TotalUserChart from './TotalUserChart';
import NewUserChart from './NewUserChart';
import ActiveUserChart from './ActiveUserChart';

const PartUser = () => {
  return (
    <Box>
      <UserStatistic />
      <Box border={'1px solid #282a38'} my={5}></Box>
      <TotalUserChart />
      <Box border={'1px solid #282a38'} my={5}></Box>
      <NewUserChart />
      <Box border={'1px solid #282a38'} my={5}></Box>
      <ActiveUserChart />
    </Box>
  );
};

export default PartUser;
