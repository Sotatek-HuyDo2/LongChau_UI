import { useState, useRef } from 'react';
import { BaseStaffPage } from 'src/components/layouts';
import { AppInput } from 'src/components';
import { SearchExplorer } from 'src/assets/icons';
import 'src/styles/pages/MedicalManagementPage.scss';
import { Box, Flex, InputGroup, InputRightElement } from '@chakra-ui/react';
import { formatTimestamp } from 'src/utils/format';
import { AppDataTable, AppButton } from 'src/components';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import rf from 'src/api/RequestFactory';
import moment from 'moment';
import ModalSplitedOrder from 'src/components/Modals/Order/ModalSplitedOrder';
import ModalServeOrder from 'src/components/Modals/Order/ModalServeOrder';
import ModalViewOrder from 'src/components/Modals/Order/ModalViewOrder';
import { toastError, toastSuccess } from 'src/utils/notify';
import ModalRejectOrder from 'src/components/Modals/Order/ModalRejectOrder';
import { AddIcon } from '@chakra-ui/icons';
import ModalAddNewOrder from 'src/components/Modals/Order/ModalAddNewOrder';

export interface IData {
  id: number;
  status: string;
  isSplitted: boolean;
  userId: number;
  createdAt: string;
  drugsWithQuantity: [
    {
      orderId: number;
      drugId: number;
      quantity: number;
    },
  ];
}

const typeStatus: { [key: string]: string } = {
  approved: 'Đã xác nhận',
  created: 'Đã được tạo',
};

const CreatedOrderManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<number>();
  const [dataSearch, setDataSearch] = useState<IData[]>([]);
  const dataRef = useRef<IData[]>([]);
  const [id, setId] = useState<number>(NaN);
  const [params, setParams] = useState<any>();
  const [openModalRejectOrder, setOpenModalRejectOrder] =
    useState<boolean>(false);
  const [openModalViewOrder, setOpenModalViewOrder] = useState<boolean>(false);
  const [openModalAddNewOrder, setOpenModalAddNewOrder] =
    useState<boolean>(false);

  const handleViewOrder = (id: number) => {
    setId(id);
    setOpenModalViewOrder(true);
  };

  const handleRejectOrder = (id: number) => {
    setId(id);
    setOpenModalRejectOrder(true);
  };

  const handleRejectConfirmOrder = async () => {
    try {
      await rf
        .getRequest('OrderRequest')
        .changeStatusOrder(id, { status: 'rejected' });
      toastSuccess('Đơn hàng đã bị hủy');
    } catch (err: any) {
      toastError(err.message);
    }
  };

  const handleChangeStatusOrder = async (id: number) => {
    try {
      await rf
        .getRequest('OrderRequest')
        .changeStatusOrder(id, { status: 'approved' });
      toastSuccess('Đơn hàng đã được xác nhận');
    } catch (err: any) {
      toastError(err.message);
    }
  };

  const onReload = () => {
    setParams({ ...params });
  };

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: IData) => (item.id = valueSearch));
      setDataSearch(dataFilter);
    }
    setDataSearch(dataFilter);
  };

  const getDataTable = async () => {
    try {
      const res = await rf.getRequest('OrderRequest').getApprovedOrder();
      dataRef.current = res;
      setDataSearch(res);
      return {
        docs: res,
        // totalPages: 10,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  useEffectUnsafe(() => {
    handleSearch();
  }, [valueSearch]);

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="delist--header-cell-body delist--id">ID</Box>
        <Box className="delist--header-cell-body delist--quality">
          Trạng thái
        </Box>
        <Box className="delist--header-cell-body delist--time">
          Thời gian tạo
        </Box>
        <Box className="delist--header-cell-body delist--price">Chia đơn</Box>
        <Box className="delist--header-cell-body delist--price">
          Số lượng thuốc
        </Box>
        <Box className="delist--header-cell-body delist--action">Action</Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IData[]) => {
    return (
      <Box>
        {dataSearch.map((data: IData, id: number) => {
          return (
            <RowAddressTransactionTable data={data} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: IData;
  }> = ({ data }) => {
    return (
      <Flex className="delist--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="delist--cell-body delist--id">
            <Box cursor={'pointer'}>{data.id}</Box>
          </Flex>
          <Flex
            flexDirection="row"
            className="delist--cell-body delist--quality"
          >
            {data?.status ? typeStatus[data?.status] : '--'}
          </Flex>
          <Flex flexDirection="row" className="delist--cell-body delist--time">
            {formatTimestamp(
              moment(data?.createdAt).valueOf(),
              'DD-MM-YYYY HH:mm:ss',
            )}
          </Flex>
          <Box className="delist--cell-body delist--price">
            {data?.isSplitted ? 'Có' : 'Không'}
          </Box>
          <Box className="delist--cell-body delist--price">
            {data?.drugsWithQuantity.length > 0
              ? data?.drugsWithQuantity.length
              : '--'}
          </Box>

          <Box className="delist--cell-body delist--action" cursor={'pointer'}>
            <AppButton size={'sm'} onClick={() => handleViewOrder(data.id)}>
              Xem
            </AppButton>

            <AppButton
              size={'sm'}
              bg={'green.100'}
              ml={'3px'}
              onClick={() => handleChangeStatusOrder(data.id)}
            >
              Xác nhận
            </AppButton>
            <AppButton
              size={'sm'}
              bg={'red.100'}
              ml={'3px'}
              onClick={() => handleRejectOrder(data.id)}
            >
              Hủy
            </AppButton>
          </Box>
        </Flex>
      </Flex>
    );
  };

  return (
    <BaseStaffPage>
      <Box className="delist">
        <Flex
          fontSize="24px"
          as="b"
          mr={'30px'}
          alignItems={'center'}
          gap={3}
          color={'#2167df'}
        >
          Quản lý đơn hàng đã được tạo
        </Flex>
        <Box className={'delist__search'}>
          <Flex justifyContent={'space-between'}>
            <Flex alignItems={'center'}>
              <Box className="delist__search-input">
                <InputGroup>
                  <AppInput
                    color={'black'}
                    placeholder="Nhập để tìm kiếm..."
                    size="md"
                    value={valueSearch}
                    onChange={(e: any) => setValueSearch(e.target.value.trim())}
                  />
                  <InputRightElement top="4px">
                    <SearchExplorer />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Flex>
            <AppButton
              size={'md'}
              onClick={() => setOpenModalAddNewOrder(true)}
            >
              <Flex justify={'center'} align={'start'} gap={1}>
                <AddIcon />
                Thêm đơn hàng
              </Flex>
            </AppButton>
          </Flex>
        </Box>

        <Box mt={10} className="delist-container">
          <AppDataTable
            requestParams={params}
            fetchData={getDataTable}
            renderBody={_renderContentTable}
            renderHeader={_renderHeaderTable}
            size={10}
          />
        </Box>
      </Box>
      {openModalViewOrder && (
        <ModalViewOrder
          open={openModalViewOrder}
          onClose={() => setOpenModalViewOrder(false)}
          orderId={id}
          onReload={onReload}
        />
      )}
      {openModalRejectOrder && (
        <ModalRejectOrder
          open={openModalRejectOrder}
          onClose={() => setOpenModalRejectOrder(false)}
          onConfirm={handleRejectConfirmOrder}
        />
      )}
      {openModalAddNewOrder && (
        <ModalAddNewOrder
          open={openModalAddNewOrder}
          onClose={() => setOpenModalAddNewOrder(false)}
          onReload={onReload}
        />
      )}
    </BaseStaffPage>
  );
};

export default CreatedOrderManagementPage;
