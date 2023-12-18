import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BaseAdminPage } from 'src/components/layouts';
import { AppTabs } from 'src/components';
import 'src/styles/pages/ManageCategoryListPage.scss';
import ProductTyByCategory from './ProductTyByCategory.part';
import rf from 'src/api/RequestFactory';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { ITabs } from 'src/components/AppTabs';

const ManageCategoryList = () => {
  const [cateList, setCateList] = useState<any>([]);

  const getAllCate = async () => {
    try {
      const res = await rf.getRequest('CategoryRequest').getAllCate();
      if (res) {
        setCateList(res);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const getCateByID = async () => {
    try {
      await rf.getRequest('CategoryRequest').getDrugsTypeByCateID(1);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffectUnsafe(() => {
    getAllCate();
    getCateByID();
  }, []);

  const tabs: ITabs[] = cateList.map((item: any) => ({
    id: item.id,
    name: item.name,
    content: <ProductTyByCategory categoriesID={item.id} />,
  }));

  return (
    <BaseAdminPage>
      <Box>
        <Box>
          <Text fontSize="24px" as="b" mr={'30px'} color={'#2167df'}>
            Quản lý Danh Mục
          </Text>
        </Box>
        <Box mt={10}>
          <AppTabs tabs={tabs} />
        </Box>
      </Box>
    </BaseAdminPage>
  );
};

export default ManageCategoryList;
