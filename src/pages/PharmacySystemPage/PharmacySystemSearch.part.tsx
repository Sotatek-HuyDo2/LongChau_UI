// import '../../styles/components/PharmacySystemPage.scss';

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchExplorer } from 'src/assets/icons';
import { AppInput } from 'src/components';

const MOCK_SERVICE = [
  {
    serviceName: 'Nhà thuốc chính hãng',
    serviceIntro:
      'Sở hữu danh mục thuốc chính hãng vừa đa dạng, phong phú lại vừa chuyên sâu.',
    icon: 'https://nhathuoclongchau.com.vn/estore-images/hethongnhathuoc/nhathuoc.svg',
  },
  {
    serviceName: 'Chuyên thuốc theo toa',
    serviceIntro:
      'Long Châu có đầy đủ các loại thuốc để có thể đáp đứng đầy đủ nhu cầu của người dùng.',
    icon: 'https://nhathuoclongchau.com.vn/estore-images/hethongnhathuoc/thuoc.svg',
  },
  {
    serviceName: 'Dược sĩ tư vấn tại chỗ',
    serviceIntro:
      'Với kinh nghiệm và chuyên môn cao với 4 tiêu chí: đúng thuốc, đúng liều, đúng cách và đúng giá.',
    icon: 'https://nhathuoclongchau.com.vn/estore-images/hethongnhathuoc/duocsi.svg',
  },
  {
    serviceName: 'Mua lẻ với giá sỉ',
    serviceIntro:
      'Sản phẩm đúng chất lượng với giá thấp hơn so với thị trường chung, tương đương với giá bán sỉ.',
    icon: 'https://nhathuoclongchau.com.vn/estore-images/hethongnhathuoc/muale.svg',
  },
  {
    serviceName: 'Giao hàng tận nơi',
    serviceIntro:
      'Giao hàng cực nhanh trong khu vực Tp.HCM và chuyển hàng đến tận nhà tại các tỉnh thành khác.',
    icon: 'https://nhathuoclongchau.com.vn/estore-images/hethongnhathuoc/giaohang.svg',
  },
  {
    serviceName: 'Đổi trả nguyên giá',
    serviceIntro:
      'Chỉ cần đọc SĐT hoặc giữ lại hóa đơn, bạn sẽ được đổi trả / hoàn tiền đã mua trong vòng 30 ngày.',
    icon: 'https://nhathuoclongchau.com.vn/estore-images/hethongnhathuoc/trahang.svg',
  },
];

const MOCK_LINK_IMAGE = [
  {
    link: 'https://cdn.nhathuoclongchau.com.vn/unsafe/1534x896/https://cms-prod.s3-sgn09.fptcloud.com/65214_911_84_to_dan_pho_7_p_nam_thanh_tp_dien_bien_phu_tinh_dien_bien_f68b9eb2aa.jpg',
  },
  {
    link: 'https://cdn.nhathuoclongchau.com.vn/unsafe/1534x896/https://cms-prod.s3-sgn09.fptcloud.com/16417_864_1066_1068_vo_nguyen_giap_p_muong_thanh_tp_dien_bien_phu_tinh_dien_bien_02fde08b83.jpg',
  },
  {
    link: 'https://cdn.nhathuoclongchau.com.vn/unsafe/1534x896/https://cms-prod.s3-sgn09.fptcloud.com/48422_864_1066_1068_vo_nguyen_giap_p_muong_thanh_tp_dien_bien_phu_tinh_dien_bien_4454286f55.jpg',
  },
  {
    link: 'https://cdn.nhathuoclongchau.com.vn/unsafe/1534x896/https://cms-prod.s3-sgn09.fptcloud.com/56509_864_1066_1068_vo_nguyen_giap_p_muong_thanh_tp_dien_bien_phu_tinh_dien_bien_2bc8611606.jpg',
  },
];

const MOCK_ADDRESS = [
  {
    name: '84 Tổ Dân Phố 7, P. Nam Thanh, TP. Điện Biên Phủ, Tỉnh Điện Biên',
  },
  {
    name: '1066-1068 Võ Nguyên Giáp, P. Mường Thanh, TP. Điện Biên Phủ, Tỉnh Điện Biên',
  },
  {
    name: '354 Trường Chinh, P. Mường Thanh, TP. Điện Biên Phủ, Tỉnh Điện Biên',
  },
];

const PharmacySystemSearch = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const navigate = useNavigate();

  return (
    <Box backgroundColor={'#f4f6f9'} color={'black'} py="20px">
      <Flex
        flexDirection={'column'}
        fontSize={'18px'}
        w={'1440px'}
        margin={'auto'}
      >
        <Flex flexDirection={'column'}>
          <Box fontWeight={'bold'}>Hệ thống nhà thuốc trên toàn quốc</Box>
          <Box>
            Thời gian hoạt động: 6:00 - 23:00 hằng ngày (Thay đổi tùy theo từng
            nhà thuốc)
          </Box>
        </Flex>
        <Flex gap={'20px'} py={'20px'}>
          <Flex
            w={'30%'}
            p={'15px'}
            borderRadius={'10px'}
            flexDirection={'column'}
            backgroundColor={'white'}
          >
            <Box
              fontSize={'20'}
              fontWeight={'bold'}
              pb="3px"
              borderBottom={'2px solid #1250dc'}
            >
              Tìm kiếm theo nhà thuốc
            </Box>
            <InputGroup borderRadius="50px" pt={'20px'}>
              <AppInput
                h={'50px'}
                pl={'30px'}
                backgroundColor={'white'}
                color={'black'}
                placeholder="Nhập để tìm kiếm..."
                _placeholder={{
                  color: '#1250dc',
                  fontSize: '18px',
                }}
                fontSize="18px"
                size="lg"
                value={valueSearch}
                onChange={(e: any) => setValueSearch(e.target.value)}
              />
              <InputLeftElement top={5}>
                <SearchExplorer />
              </InputLeftElement>
            </InputGroup>
            <Flex justifyContent={'center'} py={'10px'}>
              --------------------Hoặc---------------------
            </Flex>
            <FormControl>
              <FormLabel htmlFor="country">Country</FormLabel>
              <Select id="country" placeholder="Select country" h={'50px'}>
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
              <Select
                id="country"
                placeholder="Select country"
                h={'50px'}
                py={'10px'}
              >
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
            </FormControl>
            <Flex
              flexDirection={'column'}
              p={'15px'}
              borderRadius={'10px'}
              border={'1px solid rgb(226, 232, 240)'}
              gap={'20px'}
            >
              <Box>Nhà thuốc gợi ý</Box>
              {MOCK_ADDRESS.map((address) => (
                <Flex
                  fontWeight={'400'}
                  w={'100%'}
                  h={'50px'}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  cursor={'pointer'}
                  onClick={() => navigate('/pharmacy-system')}
                  borderBottom={'1px solid rgb(226, 232, 240)'}
                  pb={'10px'}
                >
                  {address.name}
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex
            w={'65%'}
            p={'15px'}
            borderRadius={'10px'}
            flexDirection={'column'}
            gap={'20px'}
            backgroundColor={'white'}
          >
            <Box whiteSpace={'pre-wrap'}>
              Long Châu là hệ thống nhà thuốc bán lẻ & phân phối trải khắp 63
              tỉnh thành luôn luôn mở rộng để phục vụ Khách hàng trên toàn quốc,
              cung cấp dịch vụ bán hàng và phục vụ hàng đầu:
            </Box>
            <Flex flexWrap={'wrap'} gap={'20px'} justifyContent={'center'}>
              {MOCK_SERVICE.map((item) => (
                <Flex flexDirection={'column'} w={'45%'} p={'10px 0'}>
                  <Flex fontWeight={'bold'} gap={'10px'}>
                    <Image src={item.icon} />
                    {item.serviceName}
                  </Flex>
                  <Box whiteSpace={'pre-wrap'} pl={'40px'}>
                    {item.serviceIntro}
                  </Box>
                </Flex>
              ))}
            </Flex>
            <Box>
              Hình ảnh nhận dạng hệ thống nhà thuốc Long Châu:
              <Flex flexDirection={'row'} gap={'10px'}>
                {MOCK_LINK_IMAGE.map((item) => (
                  <Image
                    src={item.link}
                    w={'200px'}
                    h={'full'}
                    borderRadius={'10px'}
                    margin={'10px 0'}
                  />
                ))}
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PharmacySystemSearch;
