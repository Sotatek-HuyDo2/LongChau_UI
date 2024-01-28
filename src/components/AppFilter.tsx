import { Box, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';
import '../styles/components/AppFilter.scss';
import AppCheckbox from './AppCheckbox';
import { ArrowLeftIcon, CheckIcon } from '@chakra-ui/icons';

interface IAppFilterProps {
  data: Array<any>;
  filterByPrice: (filterType: string) => void;
}

const priceRanges = [
  'Dưới 100.000đ',
  '100.000đ đến 300.000đ',
  '300.000đ đến 500.000đ',
  'Trên 500.000đ',
];

const AppFilter = (props: IAppFilterProps) => {
  const { data, filterByPrice } = props;
  const [visibleCheckbox, setVisibleCheckbox] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  const handleShowMore = () => {
    setVisibleCheckbox(visibleCheckbox + 4);
  };

  const handleShowLess = () => {
    setVisibleCheckbox(1);
  };

  const handleFilterClick = (price: any) => {
    filterByPrice(price);
    setSelectedPrice(price);
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
          {priceRanges.map((price: any, index: any) => (
            <Box
              pos={'relative'}
              key={index}
              className={`app-filter__price-item ${
                selectedPrice === price ? 'active' : ''
              }`}
              onClick={() => handleFilterClick(price)}
            >
              {price}{' '}
              {selectedPrice === price && (
                <CheckIcon
                  boxSize={4}
                  position={'absolute'}
                  right={'5px'}
                  top={1}
                />
              )}
            </Box>
          ))}
        </Box>
        {/* <Box className="app-filter__brand">
          <Box className="app-filter__brand-title">Thương hiệu</Box>
          <AppCheckbox
            label={'Tất cả'}
            value={'Tất cả'}
            defaultChecked={true}
            size="lg"
            fontWeight={400}
            onChange={(e) => console.log(e.target.value)}
          />
          {data.slice(0, visibleCheckbox).map((item: any, index) => {
            return (
              <Flex>
                <AppCheckbox
                  key={index}
                  label={item?.name}
                  checked={false}
                  size="lg"
                  fontWeight={400}
                  onChange={(e) => console.log(e)}
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
        </Box> */}
      </Box>
    </Box>
  );
};

export default AppFilter;
