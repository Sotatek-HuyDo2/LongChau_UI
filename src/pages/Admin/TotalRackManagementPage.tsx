import { useRef, useState } from 'react';
import { AppInput } from 'src/components';
import { SearchExplorer } from 'src/assets/icons';
import {
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import { AppDataTable, AppButton } from 'src/components';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { BaseAdminPage } from 'src/components/layouts';
import rf from 'src/api/RequestFactory';
import { AddIcon } from '@chakra-ui/icons';
import ModalEditBranch from 'src/components/Modals/Branch/ModalEditBranch';
import ModalAddDrugToTotalRack from 'src/components/Modals/Rack/ModalAddDrugToTotalRack';
import ModalUpdateSizeTotalRack from 'src/components/Modals/Rack/ModalUpdateSizeTotalRack';

export interface IBranch {
  id: string;
  name: string;
  address: string;
}

const TotalRackManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IBranch[]>([]);
  const [openModalAddDrugToTotalRack, setOpenModalAddDrugToTotalRack] =
    useState<boolean>(false);
  const [openModalEditBranch, setOpenModalEditBranch] =
    useState<boolean>(false);
  const [openModalUpdateSizeTotalRack, setOpenModalUpdateSizeTotalRack] =
    useState<boolean>(false);
  const [dataModal, setDataModal] = useState();
  const [params, setParams] = useState({});

  const dataRef = useRef<IBranch[]>([]);

  const onReload = () => {
    setParams({ ...params });
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

  const handleUpdate = async (id: number | string) => {
    try {
      const res = await rf.getRequest('BranchRequest').getBranchAdminDetail(id);
      setDataModal(res);
      setOpenModalEditBranch(true);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffectUnsafe(() => {
    handleSearch();
  }, [valueSearch]);

  const getDataTable = async () => {
    try {
      const res = await rf.getRequest('RackRequest').getTotalRack();
      dataRef.current = res;
      setDataSearch(res);
      return {
        docs: res,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="category--header-cell-body category--id">ID thuốc</Box>
        <Box className="category--header-cell-body category--name">
          Tên thuốc
        </Box>
        <Box className="category--header-cell-body category--quality">
          Kích thước
        </Box>
        <Box className="category--header-cell-body category--quality">
          Số lượng
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
        {dataSearch.map((data: IBranch, index: number) => {
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
    data: IBranch;
    id: number;
  }> = ({ data, id }) => {
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
              bg={'yellow.100'}
              ml={'3px'}
              onClick={() => handleUpdate(data.id)}
            >
              Bỏ thuốc
            </AppButton>
          </Box>
        </Flex>
        {openModalEditBranch && (
          <ModalEditBranch
            open={openModalEditBranch}
            onClose={() => setOpenModalEditBranch(false)}
            data={dataModal}
            id={data.id}
            onReload={onReload}
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
          Quản lý kho tổng
        </Flex>
        <Box className={'category__search'}>
          <Flex justifyContent={'space-between'}>
            <Flex>
              {/* <Box className={'category__search-title'}>Chi nhánh:</Box> */}
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
            <Flex gap={1}>
              <AppButton
                size={'md'}
                onClick={() => setOpenModalUpdateSizeTotalRack(true)}
                bg={'yellow.100'}
              >
                <Flex justify={'center'} align={'start'} gap={1}>
                  Cập nhật
                </Flex>
              </AppButton>
              <AppButton
                size={'md'}
                onClick={() => setOpenModalAddDrugToTotalRack(true)}
              >
                <Flex justify={'center'} align={'start'} gap={1}>
                  <AddIcon />
                  Thêm thuốc
                </Flex>
              </AppButton>
            </Flex>
          </Flex>
        </Box>

        <Box mt={10} className="category-container">
          <AppDataTable
            requestParams={params}
            fetchData={getDataTable}
            renderBody={_renderContentTable}
            renderHeader={_renderHeaderTable}
            size={10}
          />
        </Box>
        {openModalAddDrugToTotalRack && (
          <ModalAddDrugToTotalRack
            open={openModalAddDrugToTotalRack}
            onClose={() => setOpenModalAddDrugToTotalRack(false)}
            onReload={onReload}
          />
        )}
        {openModalUpdateSizeTotalRack && (
          <ModalUpdateSizeTotalRack
            open={openModalUpdateSizeTotalRack}
            onClose={() => setOpenModalUpdateSizeTotalRack(false)}
            onReload={onReload}
          />
        )}
      </Box>
    </BaseAdminPage>
  );
};

export default TotalRackManagementPage;
