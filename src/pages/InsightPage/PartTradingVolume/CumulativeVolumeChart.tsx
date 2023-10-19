import { Box, Flex } from '@chakra-ui/react';
import { AppDateRangePicker } from 'src/components';
import React, { useState } from 'react';

interface IParams {
  endTime?: number | null;
  startTime?: number | null;
}

const CumulativeVolumeChart = () => {
  const [params, setParams] = useState<IParams>({});

  return (
    <Box>
      <Flex justifyContent={'flex-end'}>
        <AppDateRangePicker params={params} setParams={setParams} />
      </Flex>
      <Box height={'300px'}>

      </Box>
      <Flex justifyContent={'center'}>Cumulative Volume</Flex>
    </Box>
  );
};

export default CumulativeVolumeChart;
