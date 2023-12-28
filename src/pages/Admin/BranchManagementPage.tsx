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
import ModalAddNewBranch from 'src/components/Modals/Branch/ModalAddNewBranch';
import ModalEditBranch from 'src/components/Modals/Branch/ModalEditBranch';
import ModalDistributionDrugFromTotalRack from 'src/components/Modals/Rack/ModalDistributionDrugFromTotalRack';

export interface IBranch {
  id: string;
  name: string;
  address: string;
}

interface IBranch2 {
  branch: {
    id: string;
    name: string;
    address: string;
  };
  capacity: number;
  capacityUsed: number;
  rackId: number;
}

const BranchManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IBranch2[]>([]);
  const [openModalAddNewBranch, setOpenModalAddNewBranch] =
    useState<boolean>(false);
  const [openModalEditBranch, setOpenModalEditBranch] =
    useState<boolean>(false);
  const [
    openModalDistributionDrugFromTotalRack,
    setOpenModalDistributionDrugFromTotalRack,
  ] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState();
  const [params, setParams] = useState({});
  const [id, setId] = useState<string>('');
  const [capacity, setCapacity] = useState<number>(NaN);
  const [rackId, setRackId] = useState<number>(NaN);

  const dataRef = useRef<IBranch2[]>([]);

  const onReload = () => {
    setParams({ ...params });
  };

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: IBranch2) =>
        item.branch.name.toLowerCase().includes(valueSearch.toLowerCase()),
      );
      setDataSearch(dataFilter);
    }
    setDataSearch(dataFilter);
  };

  const handleDistibuted = (rackId: number) => {
    setRackId(rackId);
    setOpenModalDistributionDrugFromTotalRack(true);
  };

  const handleUpdate = async (id: string, capacity: number, rackId: number) => {
    setId(id);
    setRackId(rackId);
    setCapacity(capacity);
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
      const res = await rf.getRequest('RackRequest').getRackBranch();
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
        <Box className="category--header-cell-body category--id">ID</Box>
        <Box className="category--header-cell-body category--id">Tên</Box>
        <Box className="category--header-cell-body category--quality">
          Địa chỉ
        </Box>
        <Box className="category--header-cell-body category--quality">
          Trạng thái
        </Box>

        <Box className="category--header-cell-body category--action">
          Action
        </Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IBranch2[]) => {
    return (
      <Box>
        {dataSearch.map((data: IBranch2, index: number) => {
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
    data: IBranch2;
    id: number;
  }> = ({ data, id }) => {
    return (
      <Flex className="category--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="category--cell-body category--id">
            <Box cursor={'pointer'}>{data.branch.id}</Box>
          </Flex>
          <Box className="category--cell-body category--id">
            <Tooltip
              hasArrow
              className="tooltip-app"
              label={data.branch.name ? data.branch.name : ''}
              placement="top"
            >
              <Box
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxW="550px"
                cursor="pointer"
              >
                {data.branch.name ? data.branch.name : '--'}
              </Box>
            </Tooltip>
          </Box>
          <Flex
            flexDirection="row"
            className="category--cell-body category--quality"
          >
            {data?.branch.address ? data?.branch.address : '--'}
          </Flex>
          <Flex
            flexDirection="row"
            className="category--cell-body category--quality"
          >
            {data?.capacity
              ? `${data?.capacityUsed} / ${data?.capacity}`
              : '--'}
          </Flex>
          <Box
            className="category--cell-body category--action"
            cursor={'pointer'}
          >
            <AppButton
              size={'sm'}
              bg={'yellow.100'}
              ml={'3px'}
              onClick={() =>
                handleUpdate(data.branch.id, data.capacity, data.rackId)
              }
            >
              Sửa
            </AppButton>
            <AppButton
              size={'sm'}
              ml={'3px'}
              // onClick={() => navigate(`/medical/${data.branch.id}`)}
              onClick={() => handleDistibuted(data.rackId)}
            >
              Phân phối thuốc
            </AppButton>
          </Box>
        </Flex>
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
            <AppButton
              size={'md'}
              onClick={() => setOpenModalAddNewBranch(true)}
            >
              <Flex justify={'center'} align={'start'} gap={1}>
                <AddIcon />
                Thêm chi nhánh
              </Flex>
            </AppButton>
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
        {openModalAddNewBranch && (
          <ModalAddNewBranch
            open={openModalAddNewBranch}
            onClose={() => setOpenModalAddNewBranch(false)}
            onReload={onReload}
          />
        )}
        {openModalEditBranch && (
          <ModalEditBranch
            open={openModalEditBranch}
            onClose={() => setOpenModalEditBranch(false)}
            data={dataModal}
            id={id}
            capacity={capacity}
            onReload={onReload}
            rackId={rackId}
          />
        )}
        {openModalDistributionDrugFromTotalRack && (
          <ModalDistributionDrugFromTotalRack
            open={openModalDistributionDrugFromTotalRack}
            onClose={() => setOpenModalDistributionDrugFromTotalRack(false)}
            onReload={onReload}
            rackId2={rackId}
          />
        )}
      </Box>
    </BaseAdminPage>
  );
};

export default BranchManagementPage;
