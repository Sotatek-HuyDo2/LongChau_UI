import { Box, Flex } from '@chakra-ui/react';
// import '../styles/pages/CategoryMedicinePage.scss';
import BaseHomePage from 'src/components/layouts/BaseHomePage';
import AppCategories from 'src/components/AppCategories';
import AppListProduct from 'src/components/AppListProduct';
import {
  MOCK_FeatureCategories,
  MOCK_MEDICAL_PRODUCT_LIST,
} from 'src/utils/constants';
import { AppFilter } from 'src/components';
import { useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import * as _ from 'lodash';

const CategoryMedicinePage = () => {
  const [product, setProduct] = useState(MOCK_MEDICAL_PRODUCT_LIST);

  const getListBrand = () => {
    const listBrand = _.uniqBy(product, 'brand').map((item) => {
      return item.brand;
    });
    return listBrand;
  };

  useEffectUnsafe(() => {
    getListBrand();
  }, [product]);

  return (
    <BaseHomePage>
      <Flex backgroundColor={'#f4f6f9'} flexDir={'column'} w={'full'}>
        <AppCategories
          data={MOCK_FeatureCategories}
          title={'Thực phẩm chức năng'}
          numInline={4}
        />
        <Flex w={'1440px'} m={'auto'} justifyContent={'space-between'}>
          <Box w={'25%'}>
            <AppFilter data={getListBrand()} />
          </Box>
          <Box w={'70%'}>
            <AppListProduct data={product} />
          </Box>
        </Flex>
      </Flex>
    </BaseHomePage>
  );
};

export default CategoryMedicinePage;
