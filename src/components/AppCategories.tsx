import { Box, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import '../styles/components/AppCategories.scss';
import { useState } from 'react';
import rf from 'src/api/RequestFactory';

interface IAppCategoriesProps {
  data: Array<any>;
  title: string;
  numInline?: number;
  showIcon?: boolean;
}

const AppCategories = (props: IAppCategoriesProps) => {
  const { data, title, numInline = 6, showIcon = false } = props;
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(7);

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  return (
    <Flex className="feature-container">
      <Flex className="feature-category">
        <Flex className="feature-category--title">
          {showIcon && (
            <Image src="https://cdn.nhathuoclongchau.com.vn/unsafe/28x28/https://cms-prod.s3-sgn09.fptcloud.com/smalls/danh_muc_noi_bat_d03496597a.png" />
          )}
          {title}
        </Flex>
        <Flex flexWrap={'wrap'} gap={'20px'}>
          {data.slice(0, visibleItems).map((item: any, index: any) => {
            return (
              <Flex
                key={index}
                className="feature-category--item"
                w={`calc(100% / ${numInline} - 20px);`}
                onClick={() => navigate(`/category-medicine/${item.name}`)}
              >
                <Image
                  src={
                    'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png'
                  }
                />
                <Box className="feature-category--item-name">{item.name}</Box>
                <Box className="feature-category--item-quality">
                  {data.length} sản phẩm
                </Box>
              </Flex>
            );
          })}
          {data.length > visibleItems && (
            <Flex
              className="feature-category--item"
              w={`calc(100% / ${numInline} - 20px);`}
              onClick={handleShowMore}
            >
              <Box className="feature-category--item-name">Xem thêm</Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AppCategories;
