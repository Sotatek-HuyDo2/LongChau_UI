import { Flex, Box, Text, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpIcon } from '@chakra-ui/icons';
import AppButton from '../AppButton';
import subFooter from '../../assets/icons/sub-footer.png';
import { MapIcon } from 'src/assets/icons';

const Mock_FOOTER1 = [
  {
    title: 'Về chúng tôi',
    content: [
      {
        title: 'Giới thiệu',
        link: '#',
      },
      {
        title: 'Hệ thống cửa hàng',
        link: '#',
      },
      {
        title: 'Giấy phép kinh doanh',
        link: '#',
      },
      {
        title: 'Quy chế hoạt động',
        link: '#',
      },
    ],
  },
  {
    title: 'Danh Mục',
    content: [
      {
        title: 'Thực phẩm chức năng',
        link: '#',
      },
      {
        title: 'Dược mỹ phẩm',
        link: '#',
      },
      {
        title: 'Chăm sóc cá nhân',
        link: '#',
      },
      {
        title: 'Thuốc',
        link: '#',
      },
    ],
  },
  {
    title: 'Tìm hiểu thêm',
    content: [
      {
        title: 'Góc sức khỏe',
        link: '#',
      },
      {
        title: 'Tra cứu thuốc',
        link: '#',
      },
      {
        title: 'Tra cứu dược chất',
        link: '#',
      },
      {
        title: 'Tra cứu dược liệu',
        link: '#',
      },
    ],
  },
  {
    title: 'Tổng đài',
    content: [
      {
        title: 'Tư vấn mua hàng',
        link: '#',
      },
      {
        title: 'Tư vấn vaccine',
        link: '#',
      },
      {
        title: 'Góp ý, khiếu nại',
        link: '#',
      },
    ],
  },
];
const FooterHomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: '/') => {
    navigate(path);
  };

  return (
    <>
      <Box w={'full'} backgroundColor={'#eaeffb'} pb={'30px'}>
        <Image margin={'auto'} src={subFooter} />
      </Box>
      <Flex
        style={{
          background: 'linear-gradient(to bottom, #2976fc, #0250be)',
        }}
      >
        <Flex
          h={'90px'}
          w={'1440px'}
          margin={'auto'}
          fontSize={22}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Flex
            gap={'10px'}
            cursor={'pointer'}
            onClick={() => handleNavigate('/')}
          >
            <MapIcon />
            Xem hệ thống {1413} nhà thuốc trên toàn quốc
          </Flex>
          <AppButton
            size="lg"
            borderRadius={'30px'}
            backgroundColor={'white'}
            color={'#2976fc'}
            _hover={{
              color: 'white',
              backgroundColor: '#2976fc',
            }}
          >
            Xem danh sách nhà thuốc
          </AppButton>
        </Flex>
      </Flex>
      <Flex backgroundColor={'#f4f6f9'}>
        <Flex w={'1440px'} margin={'auto'} flexDirection={'column'}>
          <Flex p={'20px 0 30px 0'}>
            {Mock_FOOTER1.map((item) => (
              <Flex
                flexDirection={'column'}
                pt={'10px'}
                w={'full'}
                h={'full'}
                fontSize={14}
                gap={'10px'}
              >
                <Text fontSize={16} fontWeight={'bold'} color={'#657384'}>
                  {item.title}
                </Text>
                {item.content.map((subItem) => (
                  <Flex>
                    <Text
                      as={'a'}
                      href={subItem.link}
                      color={'#1e72ff'}
                      transition={'color 0.3s ease, padding-left 0.3s ease'} // Thêm transition cho color và padding-left
                      _hover={{
                        color: '#0250be',
                        paddingLeft: '10px',
                      }}
                    >
                      {subItem.title}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            ))}
          </Flex>
          <Flex
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            p={'15px 0 30px 0'}
            borderTop={'1px solid #dadfec'}
            color={'#4a4f63'}
          >
            <Box>
              © 2007 - 2022 Công ty Cổ Phần Dược Phẩm FPT Long Châu Số ĐKKD
              0315275368 cấp ngày 17/09/2018 tại Sở Kế hoạch Đầu tư TPHCM
            </Box>
            <Flex gap={'10px'}>
              <li>
                Địa chỉ: 379-381 Hai Bà Trưng, P. Võ Thị Sáu, Q.3, TP. HCM
              </li>
              <li>
                Số điện thoại:{' '}
                <a href="#" style={{ color: '#1250dc' }}>
                  (028)73023456
                </a>
              </li>
              <li>
                Email:{' '}
                <a href="#" style={{ color: '#1250dc' }}>
                  sale@nhathuoclongchau.com.vn
                </a>
              </li>
              <li>Người quản lý nội dung: Nguyễn Bạch Điệp</li>
            </Flex>
          </Flex>
          <Flex
            zIndex={1000}
            backgroundColor={'#1e72ff'}
            position={'absolute'}
            bottom={50}
            right={5}
            w={'40px'}
            h={'40px'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'50%'}
            cursor={'pointer'}
            transition="background-color 0.3s"
            _hover={{
              backgroundColor: '#0250be',
              color: '#f4f6f9',
            }}
          >
            <ArrowUpIcon style={{ width: '20px' }} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default FooterHomePage;
