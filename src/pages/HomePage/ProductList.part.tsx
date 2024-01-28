import { Box, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { MOCK_MEDICAL_PRODUCT_LIST, drugsType } from 'src/utils/constants';
import { useNavigate } from 'react-router';
import rf from 'src/api/RequestFactory';
import _ from 'lodash';
import { formatNumber } from 'src/utils/format';

interface IMedicalProduct {
  img: string;
  barcode: number;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  price: number;
  sensitiveIngredients?: null;
  size: number;
  soldAsDose: boolean;
  supplierId: number;
  typeId: number;
  unit: string;
}

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IMedicalProduct[] | null>([]);

  const getAllProduct = async () => {
    try {
      const res = await rf.getRequest('ProductRequest').getProduct();
      // const randomProducts = _.sampleSize(res, 18);
      setProducts(res.slice(0, 18));
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
      <Box className="product">
        {products?.map((product, index) => {
          return (
            <Box
              key={index}
              className="product__card"
              w={`calc(100% / 6 - 20px)`}
              onClick={() => navigate(`/medical/${product?.id}`)}
            >
              <Box className="product__card-image">
                <Image src={product?.img ? product?.img : ''} alt="hello" />
              </Box>
              <Box className="product__card-name">
                {product?.name ? product?.name : '--'}
              </Box>
              <Box className="product__card-price">
                {product?.price ? `${formatNumber(product?.price)}đ` : '--'} /{' '}
                {product?.unit ? drugsType[product?.unit] : '--'}
              </Box>
              {product.unit != '' ? (
                <Box className="product__card-unit">
                  <Box
                    backgroundColor={'blackAlpha.200'}
                    display={'inline'}
                    padding={'3px 5px'}
                    color={'black'}
                    borderRadius={'20px'}
                  >
                    {drugsType[product?.unit]}
                  </Box>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          );
        })}
      </Box>
    </Flex>
  );
};

export default ProductList;
