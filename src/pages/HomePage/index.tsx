import React from 'react';
import BaseHomePage from 'src/components/layouts/BaseHomePage';
import ProductList from './ProductList';

const HomePage = () => {
  return (
    <>
      <BaseHomePage>
        <ProductList />
      </BaseHomePage>
    </>
  );
};

export default HomePage;
