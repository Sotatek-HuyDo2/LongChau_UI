import { Box, Flex, Image } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import rf from 'src/api/RequestFactory';

interface IBrand {
  email: string;
  id: number;
  img: string;
  name: string;
  phone: string;
}

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

  const [brands, setBrands] = useState<IBrand[]>([]);
  const getAllProduct = async () => {
    try {
      const res = await rf.getRequest('SupplierRequest').getSupplier();

      setBrands(res);
    } catch (error) {
      return { docs: [] };
    }
  };

  useEffectUnsafe(() => {
    getAllProduct();
  }, []);

  return (
    <Flex className="favorite-brand-container">
      <Flex className="favorite-brand--title">
        <Image src="https://cdn.nhathuoclongchau.com.vn/unsafe/28x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/thuong_hieu_yeu_thich_e0c23dded6.png" />
        Thương hiệu yêu thích
      </Flex>
      <Slider ref={sliderRef} {...settings}>
        {brands?.map((item, index) => {
          return (
            <Flex className="slider-item" key={index} m={'auto'}>
              <Flex className="slider-item--image" flexDirection={'column'}>
                <Image
                  boxSize="200px" // Đặt kích thước cố định cho ảnh
                  margin={'auto'}
                  src={item.img}
                  alt="brand"
                />
                <Flex
                  maxW={'250px'}
                  className="slider-item--name"
                  flexDirection="column"
                  justifyContent="center" // Canh giữa chiều dọc
                  minHeight="70px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {item?.name ? item.name : '--'}
                </Flex>
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
