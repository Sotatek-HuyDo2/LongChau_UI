import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppButton } from 'src/components';
import BaseHomePage from 'src/components/layouts/HomePage/BaseHomePage';

const NoProduct = () => {
  const navigate = useNavigate();
  return (
    <Flex
      pt={'30px'}
      w={'1440px'}
      m={'auto'}
      justifyContent={'center'}
      flexDir={'column'}
      gap={'20px'}
      pb={'30px'}
    >
      <Image
        w={'300px'}
        h={'200px'}
        m={'auto'}
        src="https://www.nhathuoclongchau.com.vn/estore-images/empty-cart.png"
      />
      <Box color={'#6c7080'} textAlign={'center'}>
        <Text as={'span'} fontSize={'2xl'} fontWeight={'bold'}>
          Chưa có sản phẩm nào trong giỏ hàng
        </Text>
        <br /> Cùng mua sắm hàng ngàn sản phẩm <br />
        tại nhà thuốc Hust Pharmacy nhé!
      </Box>
      <AppButton
        onClick={() => navigate('/')}
        w={'10%'}
        m={'auto'}
        size="lg"
        borderRadius={'30px'}
      >
        Mua hàng
      </AppButton>
    </Flex>
  );
};

export default NoProduct;
