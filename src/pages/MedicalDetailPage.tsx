import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CopyIcon } from 'src/assets/icons';
import { BaseAdminPage } from 'src/components/layouts';
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

interface CustomLabelBoxProps {
  label: string;
  value: any;
  borderShow?: boolean;
  styles?: object;
}

const CustomLabelBox = ({
  label,
  value,
  borderShow,
  styles,
}: CustomLabelBoxProps) => {
  return (
    <Flex className="infor-name" flexDirection="column">
      <Box className="infor-name__label">{label}</Box>
      <Box className="infor-name__value" style={styles}>
        {value}
      </Box>
      {borderShow && <Divider />}
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
        <Flex>
          <Box pr={5}>
            <Image src={medicalDetail.img} />
          </Box>
          <Flex className="info-list" gap={'10px'} flexDirection={'column'}>
            <Box padding={5}>
              <Box fontSize="24px" color="#1250dc" fontWeight="700">
                Thông tin sản phẩm
              </Box>
              <CustomLabelBox
                label="Thương hiệu"
                value={medicalDetail.brand}
                borderShow
              />
              <CustomLabelBox
                label="Tên sản phẩm"
                value={medicalDetail.name}
                borderShow
              />
              <CustomLabelBox
                label="Giá bán"
                value={`${medicalDetail.price}đ / ${medicalDetail.detail.unit}`}
                borderShow
                styles={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: '#1250dc',
                  marginTop: '4px',
                }}
              />
              <CustomLabelBox
                label="Danh mục"
                value={medicalDetail.detail.category}
                borderShow
              />
              <CustomLabelBox
                label="Dạng bào chế"
                value={medicalDetail.detail.dosageForms}
                borderShow
              />
              <CustomLabelBox
                label="Quy cách"
                value={medicalDetail.detail.specifications}
                borderShow
              />
              <CustomLabelBox
                label="Xuất xứ thương hiệu"
                value={medicalDetail.detail.manufacturingCountry}
                borderShow
              />
              <CustomLabelBox
                label="Nhà sản xuất"
                value={medicalDetail.detail.Producer}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    );
  };
  return (
    <BaseAdminPage>
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
    </BaseAdminPage>
  );
};

export default MedicalDetailPage;
