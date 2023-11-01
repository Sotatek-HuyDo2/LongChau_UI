import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { MOCK_MEDICAL_PRODUCT_LIST } from 'src/utils/constants';
import '../../styles/components/FavoriteBrand.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MOCK_BRAND_DEMO = [
  {
    id: 1,
    branchName: 'Labwell',
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Lab_Well_1_51c1e18f18.png',
  },
  {
    id: 1,
    branchName: 'Labwell',
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Lab_Well_1_51c1e18f18.png',
  },
  {
    id: 1,
    branchName: 'Labwell',
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Lab_Well_1_51c1e18f18.png',
  },
  {
    id: 1,
    branchName: 'Labwell',
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Lab_Well_1_51c1e18f18.png',
  },
  {
    id: 1,
    branchName: 'Labwell',
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Lab_Well_1_51c1e18f18.png',
  },
  {
    id: 1,
    branchName: 'Labwell',
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Lab_Well_1_51c1e18f18.png',
  },
  {
    id: 1,
    branchName: 'Labwell',
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Lab_Well_1_51c1e18f18.png',
  },
  {
    id: 1,
    branchName: 'Labwell',
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/425x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/Lab_Well_1_51c1e18f18.png',
  },
];

const FavoriteBrand = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // const [products, setProducts] = useState<IMedicalProduct[]>([]);

  // const getAllProduct = async () => {
  //   try {
  //     setProducts(MOCK_MEDICAL_PRODUCT_LIST);
  //     //   return {
  //     //     docs: dataSearch,
  //     //   };
  //   } catch (error) {
  //     return { docs: [] };
  //   }
  // };

  // useEffectUnsafe(() => {
  //   getAllProduct();
  // }, []);

  return (
    <Box backgroundColor={'#fcf2ea'} py={'20px'}>
      <Box w={'1340px'} margin={'auto'} flexDirection={'row'}>
        <Slider {...settings}>
          {MOCK_BRAND_DEMO.map((item) => {
            return (
              <Flex paddingLeft={'10px'}>
                <Box
                  className=""
                  border={'1px solid #a4a7b7'}
                  borderRadius={'10px'}
                  padding={'10px'}
                >
                  <Image src={item.img} alt="brand" />
                </Box>
                <Box>{item?.branchName ? item.branchName : '--'} </Box>
              </Flex>
            );
          })}
        </Slider>
      </Box>
    </Box>
    // <Flex className="product-container">
    //   <Image
    //     className="product-image"
    //     src="https://nhathuoclongchau.com.vn/static/images/san-pham-ban-chay.svg"
    //   />
    //   <Box className="product-title">Sản phẩm bán chạy</Box>
    //   <Flex
    //     w={'1440px'}
    //     margin={'auto'}
    //     flexWrap={'wrap'}
    //     gap={'20px'}
    //     justifyContent={'center'}
    //   >
    //     {products.map((product) => {
    //       return (
    //         <Flex
    //           className="product--card"
    //           flexDirection={'column'}
    //           gap={'10px'}
    //         >
    //           <Box className="product--card-image" w={128} height={128}>
    //             <Image src={product.img} alt="hello" />
    //           </Box>
    //           <Box className="product--card-name">
    //             {product?.name ? product.name : '--'}
    //           </Box>
    //           <Box className="product--card-price">
    //             {product?.price ? product.price : '--'} /{' '}
    //             {product?.detail?.unit ? product?.detail?.unit : '--'}
    //           </Box>
    //           <Box className="product--card-unit">
    //             <Box
    //               backgroundColor={'blackAlpha.200'}
    //               display={'inline'}
    //               padding={'5px'}
    //               color={'black'}
    //               borderRadius={'45%'}
    //             >
    //               {product?.detail?.unit ? product?.detail?.unit : '--'}
    //             </Box>
    //           </Box>
    //         </Flex>
    //       );
    //     })}
    //   </Flex>
    // </Flex>
  );
};

export default FavoriteBrand;
