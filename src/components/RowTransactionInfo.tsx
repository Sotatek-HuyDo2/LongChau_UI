import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { QuestionMarkIcon } from 'src/assets/icons';

const RowTransactionInfo: React.FC<{
  label: string;
  content: string | React.ReactNode;
}> = ({ label, content }) => {
  return (
    <Flex pb={5} alignItems={'flex-start'}>
      <Text
        display={'flex'}
        color={'#a4a7b7'}
        fontSize={'14px'}
        fontWeight={400}
        alignItems={'center'}
        gap={'6px'}
        w={300}
      >
        {/* <QuestionMarkIcon /> */}
        {label}
      </Text>
      <Box color={'white'} fontSize={'14px'} fontWeight={400}>
        {content}
      </Box>
    </Flex>
  );
};

export default RowTransactionInfo;
