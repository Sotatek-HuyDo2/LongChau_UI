import React from 'react';
import BaseHomePage from 'src/components/layouts/BaseHomePage';
import ProductList from './ProductList.part';
import FavoriteBrand from './FavoriteBrand.part';
import MenuFilter from '../../components/layouts/MenuFilter';
import FeatureCategoriesPage from './FeaturedCategories.part';

const HomePage = () => {
  return (
    <>
      <BaseHomePage>
        <ProductList />
        <FavoriteBrand />
        <FeatureCategoriesPage />
      </BaseHomePage>
    </>
  );
};

export default HomePage;
