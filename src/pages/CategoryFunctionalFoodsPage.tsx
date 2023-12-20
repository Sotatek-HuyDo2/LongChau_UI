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
import { useParams } from 'react-router-dom';
import rf from 'src/api/RequestFactory';

const CategoryFunctionalFoodsPage = () => {
  const { categorySlug, typeSlug } = useParams();
  const [product, setProduct] = useState(MOCK_MEDICAL_PRODUCT_LIST);
  const [filterType, setFilterType] = useState<string>('');
  const [cateId, setCateId] = useState<number>();
  const [typeId, setTypeId] = useState<number>();
  const [typeList, setTypeList] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);

  const getListBrand = () => {
    const listBrand = _.uniqBy(productList, 'supplierId').map((item: any) => {
      return item.supplierId;
    });
    return listBrand;
  };

  const getListSupplier = async () => {
    try {
      const res = await rf.getRequest('SupplierRequest').getSupplier();
      console.log(res);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // const getListDrugsType = () => {
  //   const listDrugsType = _.uniqBy(product, 'detail').map((item) => {
  //     return item.detail.category;
  //   });
  //   return _.unionBy(listDrugsType);
  // };

  const getFilterType = (filterType: string) => {
    setFilterType(filterType);
  };

  const filterByPrice = () => {
    if (filterType === 'Dưới 100.000đ') {
      return productList?.filter((product: any) => product?.price < 100000);
    } else if (filterType === '100.000đ đến 300.000đ') {
      return productList?.filter(
        (product: any) => product?.price <= 300000 && product?.price >= 100000,
      );
    } else if (filterType === '300.000đ đến 500.000đ') {
      return productList?.filter(
        (product: any) => product?.price <= 500000 && product?.price >= 300000,
      );
    } else if (filterType === 'Trên 500.000đ') {
      return productList?.filter((product: any) => product?.price > 500000);
    }

    return productList;
  };

  const dataFilter = filterByPrice();

  useEffectUnsafe(() => {
    getListBrand();
    filterByPrice();
  }, [product, filterType]);

  const getAllCateId = async () => {
    try {
      if (categorySlug) {
        const res = await rf.getRequest('CategoryRequest').getAllCate();
        if (res) {
          res.map((item: any) => {
            if (item.slug === categorySlug) {
              setCateId(item.id);
            }
          });
        }
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getAllDrugsTypeByCateId = async () => {
    if (cateId) {
      const res = await rf
        .getRequest('CategoryRequest')
        .getAllDrugsTypeByCateID(cateId);
      setTypeList(res);
    }
  };

  const getAllDrugsByCateId = async () => {
    if (cateId) {
      const res = await rf
        .getRequest('ProductRequest')
        .getDrugsByCateID(cateId);
      setProductList(res);
    }
  };

  useEffectUnsafe(() => {
    getAllDrugsTypeByCateId();
    getAllDrugsByCateId();
  }, [cateId]);

  useEffectUnsafe(() => {
    getAllCateId();
  }, [categorySlug, typeSlug]);

  return (
    <BaseHomePage>
      <Flex backgroundColor={'#f4f6f9'} flexDir={'column'} w={'full'}>
        <AppCategories
          data={typeList}
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
