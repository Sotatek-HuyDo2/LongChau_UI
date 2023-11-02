import { Box, Flex, Image } from '@chakra-ui/react';
import '../../styles/components/FavoriteBrand.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRef } from 'react';

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
  const sliderRef = useRef<any>(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
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
      <Box
        position={'relative'}
        w={'1440px'}
        margin={'auto'}
        flexDirection={'row'}
      >
        <Slider ref={sliderRef} {...settings}>
          {MOCK_BRAND_DEMO.map((item) => {
            return (
              <Flex className="slider-item">
                <Flex className="slider-item--image" flexDirection={'column'}>
                  <Image
                    w={'200px'}
                    margin={'auto'}
                    src={item.img}
                    alt="brand"
                  />
                  <Box className="slider-item--name">
                    {item?.branchName ? item.branchName : '--'}{' '}
                  </Box>
                </Flex>
              </Flex>
            );
          })}
        </Slider>
        <Box>
          <Flex
            backgroundColor={'white'}
            borderRadius={'50%'}
            w={'35px'}
            h={'35px'}
            justifyContent={'center'}
            alignItems={'center'}
            onClick={previous}
            position={'absolute'}
            top={'30px'}
            left={'-8px'}
            zIndex={100000}
            cursor={'pointer'}
            border={'1px solid #dadfec'}
            _hover={{
              background: '#a4a7b7',
            }}
            style={{
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            <ChevronLeftIcon w={'20px'} h={'30px'} color={'#1250dc'} />
          </Flex>
          <Flex
            backgroundColor={'white'}
            borderRadius={'50%'}
            w={'35px'}
            h={'35px'}
            justifyContent={'center'}
            alignItems={'center'}
            onClick={next}
            position={'absolute'}
            top={'30px'}
            right={'-18px'}
            zIndex={100000}
            cursor={'pointer'}
            border={'1px solid #dadfec'}
            _hover={{
              background: '#a4a7b7',
            }}
            style={{
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            <ChevronRightIcon w={'20px'} h={'30px'} color={'#1250dc'} />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default FavoriteBrand;
