import { Box, Flex } from '@chakra-ui/react';
// import '../styles/pages/CategoryMedicinePage.scss';
import BaseHomePage from 'src/components/layouts/BaseHomePage';
import AppCategories from 'src/components/AppCategories';

const MOCK_FeatureCategories = [
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
];

const CategoryMedicinePage = () => {
  return (
    <BaseHomePage>
      <Flex backgroundColor={'#f4f6f9'}>
        <AppCategories
          data={MOCK_FeatureCategories}
          title={'Thực phẩm chức năng'}
          numInline={4}
        />
      </Flex>
    </BaseHomePage>
  );
};

export default CategoryMedicinePage;
