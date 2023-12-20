import { Box, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import '../styles/components/AppListProduct.scss';
import { useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { ArrowLeftIcon, CheckIcon } from '@chakra-ui/icons';
import { formatNumber } from 'src/utils/format';

interface IProduct {
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

interface IAppListProductProps {
  data: Array<IProduct>;
  title?: string;
}

const listFilterTypes = ['Tất cả', 'Bán chạy', 'Giá thấp', 'Giá cao'];

const AppListProduct = (props: IAppListProductProps) => {
  const { data } = props;
  const [filterType, setFilterType] = useState<string>('Tất cả');
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [visibleProducts, setVisibleProducts] = useState(8);

  const navigate = useNavigate();

  const sortProducts = (products: IProduct[], sortType: string) => {
    if (sortType === 'Bán chạy') {
      // Thực hiện logic filter theo sản phẩm bán chạy
    } else if (sortType === 'Giá thấp') {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortType === 'Giá cao') {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  useEffectUnsafe(() => {
    setFilteredProducts(sortProducts(data, filterType));
  }, [filterType, data]);

  const handleShowMore = () => {
    setVisibleProducts(visibleProducts + 8);
  };

  const handleShowLess = () => {
    setVisibleProducts(8);
  };

  const drugsType: { [key: string]: string } = {
    tube: 'ống',
    box: 'hộp',
  };

  return (
    <Flex className="product-container">
      <Box className="product-filter">
        <Box className="product-filter__title">Danh sách sản phẩm</Box>
        <Flex pr={'20px'} gap={'10px'} alignItems={'center'}>
          <Box className="product-filter__text">Sắp xếp theo</Box>
          {listFilterTypes.map((filter: string) => (
            <Box
              key={filter}
              className={`product-filter__button ${
                filterType === filter ? 'active' : ''
              }`}
              onClick={() => setFilterType(filter)}
              position={'relative'}
            >
              {filter}
              {filterType === filter && (
                <CheckIcon boxSize={3} position={'absolute'} right={'5px'} />
              )}
            </Box>
          ))}
        </Flex>
      </Box>
      <Box className="product">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts
            .slice(0, visibleProducts)
            .map((product, index: any) => {
              return (
                <Box
                  key={index}
                  className="product__card"
                  onClick={() => navigate(`/medical/${product?.id}`)}
                >
                  <Box className="product__card-image">
                    {/* <Image src={product?.img ? product?.img : ''} alt="hello" /> */}
                  </Box>
                  <Box className="product__card-name">
                    {product?.name ? product?.name : '--'}
                  </Box>
                  <Box className="product__card-price">
                    {product?.price
                      ? `${formatNumber(product?.price)}vnđ`
                      : '--'}{' '}
                    / {product?.unit ? drugsType[product?.unit] : '--'}
                  </Box>
                  <Box className="product__card-unit">
                    <Box
                      backgroundColor={'blackAlpha.200'}
                      display={'inline'}
                      padding={'3px 5px'}
                      color={'black'}
                      borderRadius={'20px'}
                    >
                      {/* {product?.detail?.specifications
                        ? product?.detail?.specifications
                        : product?.detail?.unit} */}
                    </Box>
                  </Box>
                </Box>
              );
            })
        ) : (
          <Flex
            alignItems={'center'}
            h={'40vh'}
            color={'black'}
            fontSize={'2xl'}
          >
            Không có sản phẩm nào
          </Flex>
        )}
      </Box>
      <Flex justifyContent={'center'} gap={20} pt={'10px'}>
        {visibleProducts < filteredProducts.length && (
          <Box className="product__button" onClick={handleShowMore}>
            <Box transform="rotate(270deg)">
              <ArrowLeftIcon />
            </Box>
            Hiển thị thêm
          </Box>
        )}
        {visibleProducts > 8 && (
          <Box className="product__button" onClick={handleShowLess}>
            <Box transform="rotate(90deg)">
              <ArrowLeftIcon />
            </Box>
            Ẩn
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default AppListProduct;
