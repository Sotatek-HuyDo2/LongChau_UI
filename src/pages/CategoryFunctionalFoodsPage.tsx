import { Box, Flex } from '@chakra-ui/react';
// import '../styles/pages/CategoryFunctionalFoodsPage.scss';
import BaseHomePage from 'src/components/layouts/HomePage/BaseHomePage';
import AppCategories from 'src/components/AppCategories';
import AppListProduct from 'src/components/AppListProduct';
import { MOCK_MEDICAL_PRODUCT_LIST } from 'src/utils/constants';
import { AppFilter } from 'src/components';
import { useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import * as _ from 'lodash';

const CategoryFunctionalFoodsPage = () => {
  const [product, setProduct] = useState(MOCK_MEDICAL_PRODUCT_LIST);
  const [filterType, setFilterType] = useState<string>('');

  const getListBrand = () => {
    const listBrand = _.uniqBy(product, 'brand').map((item) => {
      return item.brand;
    });
    return listBrand;
  };

  const getListProductType = () => {
    const listProductType = _.uniqBy(product, 'detail').map((item) => {
      return item.detail.category;
    });
    return _.unionBy(listProductType);
  };

  const listProductType = getListProductType();

  const getFilterType = (filterType: string) => {
    setFilterType(filterType);
  };

  const filterByPrice = () => {
    if (filterType === 'Dưới 100.000đ') {
      return product?.filter((product) => product?.price < 100000);
    } else if (filterType === '100.000đ đến 300.000đ') {
      return product?.filter(
        (product) => product?.price <= 300000 && product?.price >= 100000,
      );
    } else if (filterType === '300.000đ đến 500.000đ') {
      return product?.filter(
        (product) => product?.price <= 500000 && product?.price >= 300000,
      );
    } else if (filterType === 'Trên 500.000đ') {
      return product?.filter((product) => product?.price > 500000);
    }

    return product;
  };

  const dataFilter = filterByPrice();

  useEffectUnsafe(() => {
    getListBrand();
    filterByPrice();
    getListProductType();
  }, [product, filterType]);

  return (
    <BaseHomePage>
      <Flex backgroundColor={'#f4f6f9'} flexDir={'column'} w={'full'}>
        <AppCategories
          data={listProductType}
          title={'Thực Phẩm Chức Năng'}
          numInline={4}
        />
        <Flex w={'1440px'} m={'auto'} justifyContent={'space-between'}>
          <Box w={'25%'}>
            <AppFilter data={getListBrand()} filterByPrice={getFilterType} />
          </Box>
          <Box w={'70%'}>
            <AppListProduct data={dataFilter} />
          </Box>
        </Flex>
      </Flex>
    </BaseHomePage>
  );
};

export default CategoryFunctionalFoodsPage;
