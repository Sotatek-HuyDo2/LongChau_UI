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
import { AddIcon } from '@chakra-ui/icons';
import ModalAddNewSupplier from 'src/components/Modals/Supplier/ModalAddNewSupplier';
import ModalEditSupplier from 'src/components/Modals/Supplier/ModalEditSupplier';

interface ISupplier {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const SupplierManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<ISupplier[]>([]);
  const dataRef = useRef<ISupplier[]>([]);
  const [openModalAddNewSupplier, setOpenModalAddNewSupplier] =
    useState<boolean>(false);
  const [openModalEditSupplier, setOpenModalEditSupplier] =
    useState<boolean>(false);
  const [params, setParams] = useState({});
  const [dataModal, setDataModal] = useState<any>({});

  const onReload = () => {
    setParams({ ...params });
  };

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: ISupplier) =>
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
      const res = await rf.getRequest('SupplierRequest').getSupplier();

      setDataSearch(res);
      return {
        docs: res,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  const updateSupplier = async (id: number | string) => {
    try {
      const res = await rf.getRequest('SupplierRequest').getSupplierDetail(id);
      setDataModal(res);
      setOpenModalEditSupplier(true);
    } catch (e) {
      console.log(e);
    }
  };

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="category--header-cell-body category--id">ID</Box>
        <Box className="category--header-cell-body category--name">
          Tên nhà cung cấp
        </Box>
        <Box className="category--header-cell-body category--quality">
          Email
        </Box>
        <Box className="category--header-cell-body category--phone">
          Số điện thoại
        </Box>
        <Box className="category--header-cell-body category--action">
          Action
        </Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: ISupplier[]) => {
    if (!dataSearch?.length) {
      return (
        <Flex
          justifyContent={'center'}
          fontSize={'14px'}
          mt={10}
          color={'black'}
          h={'270px'}
          alignItems={'center'}
        >
          No data...
        </Flex>
      );
    }

    return (
      <Box>
        {dataSearch?.map((data: ISupplier, id: number) => {
          return (
            <RowAddressTransactionTable data={data} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: ISupplier;
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
            <Tooltip
              hasArrow
              className="tooltip-app"
              label={data.email ? data.email : ''}
              placement="top"
            >
              <Box
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxW="550px"
                cursor="pointer"
              >
                {data?.email ? data?.email : '--'}
              </Box>
            </Tooltip>
          </Flex>
          <Box className="category--cell-body category--phone">
            {data.phone ? data.phone : '--'}
          </Box>
          <Box
            className="category--cell-body category--action"
            cursor={'pointer'}
          >
            <AppButton
              size={'sm'}
              // onClick={() => navigate(`/medical/${data.categoryID}`)}
            >
              Xem
            </AppButton>
            <AppButton
              size={'sm'}
              bg={'yellow.100'}
              ml={'3px'}
              onClick={() => updateSupplier(data.id)}
            >
              Sửa
            </AppButton>
            {/* <AppButton
              // onClick={() => handleDelete(data.supplierID)}
              ml={'3px'}
              size={'sm'}
              bg={'red.100'}
            >
              Xóa
            </AppButton> */}
          </Box>
        </Flex>
        {openModalEditSupplier && (
          <ModalEditSupplier
            open={openModalEditSupplier}
            onClose={() => setOpenModalEditSupplier(false)}
            onReload={onReload}
            data={dataModal}
            supId={data.id}
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
          Quản lý nhà cung cấp
        </Flex>
        <Box className={'category__search'}>
          <Flex justifyContent={'space-between'}>
            <Flex alignItems={'center'}>
              <Box className={'category__search-title'}>Nhà cung cấp:</Box>
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
            <AppButton
              size={'md'}
              onClick={() => setOpenModalAddNewSupplier(true)}
            >
              <Flex justify={'center'} align={'start'} gap={1}>
                <AddIcon />
                Thêm nhà cung cấp
              </Flex>
            </AppButton>
          </Flex>
        </Box>

        <Box mt={10} className="category-container">
          <AppDataTable
            fetchData={getDataTable}
            renderBody={_renderContentTable}
            renderHeader={_renderHeaderTable}
            size={10}
          />
        </Box>
        {openModalAddNewSupplier && (
          <ModalAddNewSupplier
            open={openModalAddNewSupplier}
            onClose={() => setOpenModalAddNewSupplier(false)}
            onReload={onReload}
          />
        )}
      </Box>
    </BaseAdminPage>
  );
};

export default SupplierManagementPage;
