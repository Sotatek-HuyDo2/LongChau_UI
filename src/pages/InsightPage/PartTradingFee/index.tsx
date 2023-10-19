import { Box } from '@chakra-ui/react';
import React from 'react';
import CumulativeFeeChart from './CumulativeFeeChart';
import TradingFeeChart from './TradingFeeChart';
import ConvertFeeChart from './ConvertFeeChart';

const PartTradingFee = () => {
  return (
    <Box>
      <CumulativeFeeChart />
      <Box border={'1px solid #282a38'} my={5}></Box>
      <TradingFeeChart />
      <Box border={'1px solid #282a38'} my={5}></Box>
      <ConvertFeeChart />
    </Box>
  );
};

export default PartTradingFee;
