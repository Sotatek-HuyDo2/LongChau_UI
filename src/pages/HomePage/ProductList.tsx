import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { MOCK_MEDICAL_PRODUCT_LIST } from 'src/utils/constants';
import '../../styles/components/ProductList.scss';

interface IMedicalProduct {
  img: string;
  medicineID: string;
  name: string;
  brand?: string;
  quality?: number;
  price: number;
  detail: {
    unit: string;
    category: string;
    dosageForms?: string;
    specifications?: string;
    Producer?: string;
    manufacturingCountry?: string;
    ingredient?: string;
    shortDescription?: string;
  };
}

const ProductList = () => {
  const [products, setProducts] = useState<IMedicalProduct[]>([]);

  const getAllProduct = async () => {
    try {
      setProducts(MOCK_MEDICAL_PRODUCT_LIST);
      //   return {
      //     docs: dataSearch,
      //   };
    } catch (error) {
      return { docs: [] };
    }
  };

  useEffectUnsafe(() => {
    getAllProduct();
  }, []);

  return (
    <Flex className="product-container">
      <Image
        className="product-image"
        src="https://nhathuoclongchau.com.vn/static/images/san-pham-ban-chay.svg"
      />
      <Box className="product-title">Sản phẩm bán chạy</Box>
      <Flex
        w={'1440px'}
        margin={'auto'}
        flexWrap={'wrap'}
        gap={'20px'}
        justifyContent={'center'}
      >
        {products.map((product) => {
          return (
            <Flex
              className="product--card"
              flexDirection={'column'}
              gap={'10px'}
            >
              <Box className="product--card-image" w={128} height={128}>
                <Image src={product.img} alt="hello" />
              </Box>
              <Box className="product--card-name">
                {product?.name ? product.name : '--'}
              </Box>
              <Box className="product--card-price">
                {product?.price ? product.price : '--'} /{' '}
                {product?.detail?.unit ? product?.detail?.unit : '--'}
              </Box>
              <Box className="product--card-unit">
                <Box
                  backgroundColor={'blackAlpha.200'}
                  display={'inline'}
                  padding={'5px'}
                  color={'black'}
                  borderRadius={'45%'}
                >
                  {product?.detail?.unit ? product?.detail?.unit : '--'}
                </Box>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ProductList;
