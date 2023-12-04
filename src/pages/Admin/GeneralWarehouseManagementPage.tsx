import React, { useRef, useState } from 'react';
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
import { AppDataTable, AppButton } from 'src/components';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { BaseAdminPage } from 'src/components/layouts';
import rf from 'src/services/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';
import ModalDeleteConfirm from 'src/components/Modals/ModalDeleteConfirm';

interface IBranch {
  id: string;
  name: string;
  address: string;
}

const GeneralWarehouseManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IBranch[]>([]);
  const dataRef = useRef<IBranch[]>([]);
  const navigate = useNavigate();
  const [id, setId] = useState<number | string>(NaN);
  const [openModalDeleteConfirm, setOpenModalDeleteConfirm] =
    useState<boolean>(false);

  const handleDelete = (id: number | string) => {
    setId(id);
    setOpenModalDeleteConfirm(true);
  };

  const deleteMedical = async () => {
    try {
      await rf.getRequest('UserRequest').deleteUser(id);
      toastSuccess('Delete successfully!');
      // setParams({ ...params });
      setOpenModalDeleteConfirm(false);
    } catch (e: any) {
      toastError(e.message || 'Something was wrong!!');
    }
  };

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: IBranch) =>
        item.name.toLowerCase().includes(valueSearch.toLowerCase()),
      );
      setDataSearch(dataFilter);
    }
    setDataSearch(dataFilter);
  };

  useEffectUnsafe(() => {
    handleSearch();
  }, [valueSearch]);

  const getDataTable = async () => {
    try {
      const res = await rf.getRequest('BranchRequest').getBranchList();
      dataRef.current = res;
      setDataSearch(res);
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
          Địa chỉ
        </Box>
        <Box className="category--header-cell-body category--action">
          Action
        </Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IBranch[]) => {
    return (
      <Box>
        {dataSearch.map((data: IBranch, id: number) => {
          return (
            <RowAddressTransactionTable data={data} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: IBranch;
  }> = ({ data }) => {
    return (
      <Flex className="category--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="category--cell-body category--id">
            <Box cursor={'pointer'}>{data.id}</Box>
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
            {data?.address ? data?.address : '--'}
          </Flex>
          <Box
            className="category--cell-body category--action"
            cursor={'pointer'}
          >
            <AppButton
              size={'sm'}
              onClick={() => navigate(`/medical/${data.id}`)}
            >
              Xem
            </AppButton>
            <AppButton size={'sm'} bg={'yellow.100'} ml={'3px'}>
              Sửa
            </AppButton>
            <AppButton
              onClick={() => handleDelete(data.id)}
              ml={'3px'}
              size={'sm'}
              bg={'red.100'}
            >
              Xóa
            </AppButton>
          </Box>
        </Flex>
        {openModalDeleteConfirm && (
          <ModalDeleteConfirm
            open={openModalDeleteConfirm}
            onClose={() => setOpenModalDeleteConfirm(false)}
            onConfirm={deleteMedical}
          />
        )}
      </Flex>
    );
  };

  return (
    <BaseAdminPage>
      <Box className="category" w="full">
        <Flex
          fontSize="24px"
          as="b"
          mr={'30px'}
          alignItems={'center'}
          gap={3}
          color={'#2167df'}
        >
          Quản lý chi nhánh
        </Flex>
        <Box className={'category__search'}>
          <Flex alignItems={'center'}>
            <Box className={'category__search-title'}>Chi nhánh:</Box>
            <Box className="category__search-input">
              <InputGroup>
                <AppInput
                  color={'black'}
                  placeholder="Nhập để tìm kiếm..."
                  size="md"
                  value={valueSearch}
                  onChange={(e: any) => setValueSearch(e.target.value)}
                />
                <InputRightElement>
                  <SearchExplorer />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Flex>
        </Box>

        <Box mt={10} className="category-container">
          table
          <AppDataTable
            fetchData={getDataTable}
            renderBody={_renderContentTable}
            renderHeader={_renderHeaderTable}
            size={10}
          />
        </Box>
      </Box>
    </BaseAdminPage>
  );
};

export default GeneralWarehouseManagementPage;
