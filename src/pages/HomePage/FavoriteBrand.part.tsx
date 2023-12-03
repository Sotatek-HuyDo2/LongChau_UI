import { Box, Flex, Image } from '@chakra-ui/react';
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
    <Flex className="favorite-brand-container">
      <Flex className="favorite-brand--title">
        <Image src="https://cdn.nhathuoclongchau.com.vn/unsafe/28x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/thuong_hieu_yeu_thich_e0c23dded6.png" />
        Danh mục nổi bật
      </Flex>
      <Slider ref={sliderRef} {...settings}>
        {MOCK_BRAND_DEMO.map((item, index) => {
          return (
            <Flex className="slider-item" key={index}>
              <Flex className="slider-item--image" flexDirection={'column'}>
                <Image w={'200px'} margin={'auto'} src={item.img} alt="brand" />
                <Box className="slider-item--name">
                  {item?.branchName ? item.branchName : '--'}{' '}
                </Box>
              </Flex>
            </Flex>
          );
        })}
      </Slider>
      <Box>
        <Flex className="slider-button slider-prev" onClick={previous}>
          <ChevronLeftIcon boxSize={9} color={'#1250dc'} />
        </Flex>
        <Flex className="slider-button slider-next" onClick={next}>
          <ChevronRightIcon boxSize={9} color={'#1250dc'} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default FavoriteBrand;
