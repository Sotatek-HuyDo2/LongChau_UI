import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import '../styles/components/AppFilter.scss';
import AppCheckbox from './AppCheckbox';
import { ArrowLeftIcon } from '@chakra-ui/icons';

interface IAppFilterProps {
  data: Array<any>;
}

const AppFilter = (props: IAppFilterProps) => {
  const { data } = props;
  const [visibleCheckbox, setVisibleCheckbox] = useState(1);

  const handleShowMore = () => {
    setVisibleCheckbox(visibleCheckbox + 4);
  };

  const handleShowLess = () => {
    setVisibleCheckbox(1);
  };

  return (
    <Box className="app-filter-container">
      <Box className="app-filter">
        <Box className="app-filter__title">
          <Image src="" />
          Bộ lọc nâng cao
        </Box>
        <Box className="app-filter__price">
          <Box className="app-filter__price-title">Giá bán</Box>
          <Box className="app-filter__price-item">Dưới 100.000đ</Box>
          <Box className="app-filter__price-item">100.000đ đến 300.000đ</Box>
          <Box className="app-filter__price-item">300.000đ đến 500.000đ</Box>
          <Box className="app-filter__price-item">Trên 500.000đ</Box>
        </Box>
        <Box className="app-filter__brand">
          <Box className="app-filter__brand-title">Thương hiệu</Box>
          {data.slice(0, visibleCheckbox).map((item, index) => {
            return (
              <Flex>
                <AppCheckbox
                  key={index}
                  label={item}
                  checked={false}
                  size="lg"
                  fontWeight={400}
                  // onChange={() => {}}
                />
              </Flex>
            );
          })}
          {visibleCheckbox < data.length && (
            <Box className="app-filter__button" onClick={handleShowMore}>
              <Box transform="rotate(270deg)">
                <ArrowLeftIcon />
              </Box>
              Xem thêm
            </Box>
          )}
          {visibleCheckbox > data.length && (
            <Box className="app-filter__button" onClick={handleShowLess}>
              <Box transform="rotate(90deg)">
                <ArrowLeftIcon />
              </Box>
              Ẩn
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AppFilter;
