import React from 'react';
import BaseHomePage from 'src/components/layouts/BaseHomePage';
import ProductList from './ProductList';
import FavoriteBrand from './FavoriteBrand';

const HomePage = () => {
  return (
    <>
      <BaseHomePage>
        <ProductList />
        <FavoriteBrand />
      </BaseHomePage>
    </>
  );
};

export default HomePage;
