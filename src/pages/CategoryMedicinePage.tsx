import { Box, Flex } from '@chakra-ui/react';
// import '../styles/pages/CategoryMedicinePage.scss';
import BaseHomePage from 'src/components/layouts/BaseHomePage';
import AppCategories from 'src/components/AppCategories';
import AppListProduct from 'src/components/AppListProduct';
import {
  MOCK_FeatureCategories,
  MOCK_MEDICAL_PRODUCT_LIST,
} from 'src/utils/constants';

const CategoryMedicinePage = () => {
  return (
    <BaseHomePage>
      <Flex backgroundColor={'#f4f6f9'} flexDir={'column'} w={'full'}>
        <AppCategories
          data={MOCK_FeatureCategories}
          title={'Thực phẩm chức năng'}
          numInline={4}
        />
        <Flex w={'1440px'} m={'auto'} justify={'end'}>
          <Box w={'65%'}>
            <AppListProduct data={MOCK_MEDICAL_PRODUCT_LIST} />
          </Box>
        </Flex>
      </Flex>
    </BaseHomePage>
  );
};

export default CategoryMedicinePage;
