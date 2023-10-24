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
import { BasePage } from 'src/components/layouts';

interface IUser {
  categoryID: string;
  name: string;
  quality: number;
}

const UserManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IUser[]>(MOCK_CATEGORY_MEDICINE);

  const dataRef = useRef<IUser[]>([]);

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: IUser) =>
        item.name.toLowerCase().includes(valueSearch.toLowerCase()),
      );

      setDataSearch(dataFilter);
    }
  };

  useEffectUnsafe(() => {
    handleSearch();
  }, [valueSearch]);

  const navigate = useNavigate();

  const getCategory = async () => {
    try {
      dataRef.current = MOCK_CATEGORY_MEDICINE;
      setDataSearch(MOCK_CATEGORY_MEDICINE);
      return {
        docs: dataSearch,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="category--header-cell-body category--id">ID</Box>
        <Box className="category--header-cell-body category--name">Tên</Box>
        <Box className="category--header-cell-body category--quality">
          số lượng(thuốc)
        </Box>
        <Box className="category--header-cell-body category--action">
          Action
        </Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IUser[]) => {
    return (
      <Box>
        {dataSearch.map((data: IUser, id: number) => {
          return (
            <RowAddressTransactionTable data={data} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: IUser;
  }> = ({ data }) => {
    return (
      <Flex className="category--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="category--cell-body category--id">
            <Box cursor={'pointer'}>{data.categoryID}</Box>
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
          <Flex
            flexDirection="row"
            className="category--cell-body category--quality"
          >
            {data?.quality ? data?.quality : '--'}
          </Flex>
          <Box
            className="category--cell-body category--action"
            cursor={'pointer'}
          >
            <AppButton size={'sm'}>Edit</AppButton>
            <AppButton ml={'3px'} size={'sm'}>
              Del
            </AppButton>
            <AppButton
              ml={'3px'}
              size={'sm'}
              onClick={() => navigate(`/medical/${data.categoryID}`)}
            >
              View
            </AppButton>
          </Box>
        </Flex>
      </Flex>
    );
  };

  return (
    <BasePage>
      <Box className="category" w="full">
        <Flex
          fontSize="24px"
          as="b"
          mr={'30px'}
          alignItems={'center'}
          gap={3}
          color={'#2167df'}
        >
          Quản lý người dùng
        </Flex>
        <Box className={'category__search'}>
          <Flex alignItems={'center'}>
            <Box className={'category__search-title'}>Người dùng:</Box>
            <Box className="category__search-input">
              <InputGroup>
                <AppInput
                  color={'black'}
                  placeholder="Nhập để tìm kiếm..."
                  size="sm"
                  value={valueSearch}
                  onChange={(e: any) => setValueSearch(e.target.value)}
                />
                <InputRightElement paddingBottom={2}>
                  <SearchExplorer />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Flex>
        </Box>

        <Box mt={10} className="category-container">
          table
          {/* <AppDataTable
          fetchData={getCategory}
          renderBody={_renderContentTable}
          renderHeader={_renderHeaderTable}
          size={10}
        /> */}
        </Box>
      </Box>
    </BasePage>
  );
};

export default UserManagementPage;
