import { Box, Flex } from '@chakra-ui/react';
// import '../styles/pages/CategoryFunctionalFoodsPage.scss';
import BaseHomePage from 'src/components/layouts/HomePage/BaseHomePage';
import AppCategories from 'src/components/AppCategories';
import AppListProduct from 'src/components/AppListProduct';
import { AppFilter } from 'src/components';
import { useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import * as _ from 'lodash';
import { useParams } from 'react-router-dom';
import rf from 'src/api/RequestFactory';

const CategoryFunctionalFoodsPage = () => {
  const { categorySlug, typeSlug } = useParams();
  const [filterType, setFilterType] = useState<string>('');
  const [cateId, setCateId] = useState<number>();
  const [typeId, setTypeId] = useState<number>();
  const [typeList, setTypeList] = useState<any>([]);
  const [productList, setProductList] = useState<any>([]);
  const [supplierList, setSupplierList] = useState<any>([]);
  const [cateName, setCateName] = useState<string>('');
  const [typeName, setTypeName] = useState<string>('');

  //format text "Thuc pham chuc nang" to "Thuc Pham Chuc Nang"
  const formatText = (text: string) => {
    return text
      .split(' ')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(' ');
  };

  console.log('typeSlug', typeSlug);

  // const getListSupplier = async () => {
  //   try {
  //     const res = await rf.getRequest('SupplierRequest').getSupplier();
  //     const listSupplierId = _.uniqBy(productList, 'supplierId').map(
  //       (item: any) => {
  //         return item.supplierId;
  //       },
  //     );
  //     const listSupplier = res.filter((item: any) =>
  //       listSupplierId.includes(item.id),
  //     );
  //     setSupplierList(listSupplier);
  //   } catch (err: any) {
  //     console.log(err.message);
  //   }
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

  const getAllDrugType = async () => {
    try {
      if (typeSlug) {
        const res = await rf
          .getRequest('ProductRequest')
          .getAllDrugsByTypeID(typeId);
        console.log(res);
        // if (res) {
        //   res.map((item: any) => {
        //     if (item.slug === typeSlug) {
        //       setTypeId(item.id);
        //     }
        //   });
        // }
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getAllCateId = async () => {
    try {
      if (categorySlug) {
        const res = await rf.getRequest('CategoryRequest').getAllCate();
        if (res) {
          res.map((item: any) => {
            if (item.slug === categorySlug) {
              setCateId(item.id);
              setCateName(item.name);
            }
          });
        }
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getAllTypeId = async () => {
    try {
      if (typeSlug) {
        const res = await rf
          .getRequest('CategoryRequest')
          .getAllDrugsTypeByCateID(cateId);
        if (res) {
          res.map((item: any) => {
            if (item.slug === typeSlug) {
              setTypeId(item.id);
              setTypeName(item.name);
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
    filterByPrice();
  }, [filterType]);

  useEffectUnsafe(() => {
    getAllDrugsTypeByCateId();
    getAllDrugsByCateId();
  }, [cateId]);

  useEffectUnsafe(() => {
    getAllTypeId();
  }, [typeSlug]);

  useEffectUnsafe(() => {
    getAllDrugType();
  }, [typeId]);

  useEffectUnsafe(() => {
    getAllCateId();
    // getListSupplier();
  }, [categorySlug, typeSlug]);

  return (
    <BaseHomePage>
      <Flex backgroundColor={'#f4f6f9'} flexDir={'column'} w={'full'}>
        <AppCategories
          data={typeList}
          title={formatText(cateName)}
          typeName={typeName}
          numInline={4}
        />
        <Flex w={'1440px'} m={'auto'} justifyContent={'space-between'}>
          <Box w={'25%'}>
            <AppFilter data={supplierList} filterByPrice={getFilterType} />
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
