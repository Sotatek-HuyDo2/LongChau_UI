import React from 'react';
import BaseHomePage from 'src/components/layouts/BaseHomePage';
import ProductList from './ProductList';
import FavoriteBrand from './FavoriteBrand';

const HomePage = () => {
  return (
    <>
      <BaseHomePage>
        <FavoriteBrand />
        <ProductList />
      </BaseHomePage>
    </>
  );
};

export default HomePage;
