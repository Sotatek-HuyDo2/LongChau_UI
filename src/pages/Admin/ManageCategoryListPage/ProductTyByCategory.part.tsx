import React, { useEffect, useRef, useState } from 'react';
import { AppInput } from 'src/components';
import { SearchExplorer } from 'src/assets/icons';
import {
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CATEGORY_MEDICINE } from 'src/utils/constants';
import { AppDataTable, AppButton } from 'src/components';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import rf from 'src/services/RequestFactory';
import { AddIcon } from '@chakra-ui/icons';

interface ICategory {
  categoryID: string;
  name: string;
  quality: number;
}

interface Props {
  id?: any;
}

const ProductTyByCategory = (props: Props) => {
  const { id } = props;
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<ICategory[]>(
    MOCK_CATEGORY_MEDICINE,
  );
  const dataRef = useRef<ICategory[]>([]);

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: ICategory) =>
        item.name.toLowerCase().includes(valueSearch.toLowerCase()),
      );
      setDataSearch(dataFilter);
    }
    setDataSearch(dataFilter);
  };

  useEffectUnsafe(() => {
    handleSearch();
  }, [valueSearch]);

  const navigate = useNavigate();

  const getCategory = async () => {
    try {
      const res = await rf
        .getRequest('CategoryRequest')
        .getDrugsTypeByCateID(id);
      dataRef.current = res;
      setDataSearch(res);
      return {
        docs: res,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  useEffectUnsafe(() => {
    getCategory();
  }, []);

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="category--header-cell-body category--id">STT</Box>
        <Box className="category--header-cell-body category--name">Tên </Box>
        <Box className="category--header-cell-body category--action">
          Action
        </Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: ICategory[]) => {
    return (
      <Box>
        {dataSearch.map((data: ICategory, index: number) => {
          return (
            <RowAddressTransactionTable
              data={data}
              key={`${index}-coin-table`}
              id={index + 1}
            />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: ICategory;
    id: number;
  }> = ({ data, id }) => {
    return (
      <Flex className="category--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="category--cell-body category--id">
            <Box cursor={'pointer'}>{id}</Box>
          </Flex>
          <Box className="category--cell-body category--name">
            <Tooltip
              hasArrow
              className="tooltip-app"
              label={data.name ? data.name : ''}
              placement="top"
            >
              <Box
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxW="550px"
                cursor="pointer"
              >
                {data.name ? data.name : '--'}
              </Box>
            </Tooltip>
          </Box>

          <Box
            className="category--cell-body category--action"
            cursor={'pointer'}
          >
            <AppButton
              size={'sm'}
              onClick={() => navigate(`/medical/${data.categoryID}`)}
            >
              Xem
            </AppButton>
            <AppButton size={'sm'} bg={'yellow.100'} ml={'3px'}>
              Sửa
            </AppButton>
            <AppButton ml={'3px'} size={'sm'} bg={'red.100'}>
              Xóa
            </AppButton>
          </Box>
        </Flex>
      </Flex>
    );
  };

  return (
    // <BaseAdminPage>
    <Box className="category" w="full">
      <Box className={'category__search'}>
        <Flex alignItems={'center'} justifyContent={'end'} gap={2}>
          {/* <Box className={'category__search-title'}>Thực phẩm chức năng:</Box> */}
          <Box className="category__search-input">
            <InputGroup>
              <AppInput
                color={'black'}
                placeholder="Nhập để tìm kiếm..."
                size="md"
                value={valueSearch}
                onChange={(e: any) => setValueSearch(e.target.value)}
              />
              <InputRightElement top="4px">
                <SearchExplorer />
              </InputRightElement>
            </InputGroup>
          </Box>
          <AppButton size={'md'} onClick={() => navigate(`/medical/`)}>
            <Flex justify={'center'} align={'start'} gap={1}>
              <AddIcon />
              Thêm Thuốc
            </Flex>
          </AppButton>
        </Flex>
      </Box>

      <Box mt={10} className="category-container">
        <AppDataTable
          fetchData={getCategory}
          renderBody={_renderContentTable}
          renderHeader={_renderHeaderTable}
          size={10}
        />
      </Box>
    </Box>
    // </BaseAdminPage>
  );
};

export default ProductTyByCategory;
