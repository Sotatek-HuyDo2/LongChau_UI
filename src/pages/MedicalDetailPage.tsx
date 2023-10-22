import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CopyIcon } from 'src/assets/icons';
import { BasePage } from 'src/components/layouts';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { formatTimestamp } from 'src/utils/format';
import { copyToClipboard } from 'src/utils/helpers';
import '../styles/pages/MedicalDetailPage.scss';

const MOCK_INFO_Medical = {
  img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
  medicineID: '1223',
  name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
  brand: 'Jpanwell',
  quality: 20,
  price: 120000,
  detail: {
    unit: 'Hộp',
    category: 'Cơ xương khớp',
    dosageForms: 'Viên nang cứng',
    specifications: 'Hộp 120 Viên',
    manufacturingCountry: 'Nhật Bản',
    Producer: 'Have fun Factory Co., Ltd',
    ingredient:
      'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
    shortDescription:
      'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
  },
};

interface IMedicalDetail {
  img: string;
  medicineID: string;
  name: string;
  brand: string;
  quality: number;
  price: number;
  detail: {
    unit: string;
    category: string;
    dosageForms: string;
    specifications: string;
    Producer: string;
    manufacturingCountry: string;
    ingredient: string;
    shortDescription: string;
  };
}

export const InforName = (
  label: string,
  value: any,
  border: boolean,
  styles?: object,
) => {
  return (
    <Flex className="infor-name" flexDirection="column" style={styles}>
      <Box className="infor-name__label">{label}</Box>
      <Box className="infor-name__value" style={styles}>
        {value}
      </Box>
      {border && <Divider />}
    </Flex>
  );
};
const MedicalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [medicalDetail, setMedicalDetail] = useState<IMedicalDetail>(null!);

  const handleNavigateToUserManagement = () => {
    navigate(-1);
  };

  const getMedicalDetail = async () => {
    try {
      setMedicalDetail(MOCK_INFO_Medical);
      setIsLoading(false);
    } catch (error) {
      return { docs: [] };
    }
  };

  useEffectUnsafe(() => {
    getMedicalDetail().then();
  }, [id]);

  const _renderContent = () => {
    if (isLoading) {
      return <Flex className={'box-loading'}>Loading...</Flex>;
    }

    if (!medicalDetail) {
      return <Flex className={'box-loading'}>No data</Flex>;
    }

    return (
      <Flex px={'40px'} mt={10} className="explorer-table">
        <Flex color="red">
          <Box pr={5}>
            <Image src={medicalDetail.img} />
          </Box>
          <Flex className="info-list" gap={'10px'} flexDirection={'column'}>
            <Box padding={5}>
              <Box>Thông tin sản phẩm</Box>
              {InforName('Thương hiệu', medicalDetail.brand, true)}
              {InforName('Tên sản phẩm', medicalDetail.name, true)}
              {InforName(
                'Giá bán',
                `${medicalDetail.price}đ / ${medicalDetail.detail.unit}`,
                true,
                {
                  fontSize: 26,
                  fontWeight: 600,
                  color: '#1250dc',
                  marginTop: '4px',
                },
              )}
              {InforName('Danh mục', medicalDetail.detail.category, true)}
              {InforName(
                'Dạng bào chế',
                medicalDetail.detail.dosageForms,
                true,
              )}
              {InforName('Quy cách', medicalDetail.detail.specifications, true)}
              {InforName(
                'Xuất xứ thương hiệu',
                medicalDetail.detail.manufacturingCountry,
                true,
              )}
              {InforName('Nhà sản xuất', medicalDetail.detail.Producer, true)}

              {/* {InforName(
                'Nước sản xuất',
                medicalDetail.detail.manufacturingCountry,
                true,
              )} */}

              {InforName('Thành phần', medicalDetail.detail.ingredient, false)}

              {/* {InforName('Quy cách', medicalDetail.detail.shortDescription, true)} */}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    );
  };
  return (
    <BasePage>
      <Box>
        <Box className="container-explorer">
          <Flex fontSize="24px" flexDirection="row" alignItems="center">
            <Flex
              pb={'20px'}
              fontSize="24px"
              as="b"
              mr={'30px'}
              alignItems={'center'}
              gap={3}
              color={'#2167df'}
            >
              <Text
                cursor={'pointer'}
                _hover={{ color: '#4490ec' }}
                onClick={handleNavigateToUserManagement}
              >
                Quản lý thuốc
              </Text>
              <Box transform="rotate(180deg)">
                <ArrowLeftIcon />
              </Box>
              <Text fontSize="20px">Chi Tiết Thuốc</Text>
            </Flex>
          </Flex>
          {_renderContent()}
        </Box>
      </Box>
    </BasePage>
  );
};

export default MedicalDetailPage;
