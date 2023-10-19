import { Box } from '@chakra-ui/react';
import React from 'react';
import CumulativeVolumeChart from './CumulativeVolumeChart';
import WeeklyVolumeChart from './WeeklyVolumeChart';
import PairVolumeChart from './PairVolumeChart';

const PartTradingVolume = () => {
  return (
    <Box>
      <CumulativeVolumeChart />
      <Box border={'1px solid #282a38'} my={5}></Box>
      <WeeklyVolumeChart />
      <Box border={'1px solid #282a38'} my={5}></Box>
      <PairVolumeChart />
    </Box>
  );
};

export default PartTradingVolume;
