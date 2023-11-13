import React from 'react';
import BaseHomePage from 'src/components/layouts/HomePage/BaseHomePage';
import ProductList from './ProductList.part';
import FavoriteBrand from './FavoriteBrand.part';
import FeatureCategories from './FeaturedCategories.part';
import { Box } from '@chakra-ui/react';
import '../../styles/pages/HomePage.scss';

const HomePage = () => {
  return (
    <>
      <BaseHomePage>
        <Box className="homepage-container">
          <ProductList />
          <FavoriteBrand />
          <FeatureCategories />
        </Box>
      </BaseHomePage>
    </>
  );
};

export default HomePage;
