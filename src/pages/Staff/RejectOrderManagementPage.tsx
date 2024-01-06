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
import ModalViewOrder from 'src/components/Modals/Order/ModalViewOrder';
import { toastError, toastSuccess } from 'src/utils/notify';

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
  delivered: 'Đang vẫn chuyển',
  done: 'Đã hoàn thành',
  rejected: 'Đã bị hủy',
};

const RejectOrderManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<number>();
  const [dataSearch, setDataSearch] = useState<IData[]>([]);
  const dataRef = useRef<IData[]>([]);
  const [id, setId] = useState<number>(NaN);
  const [params, setParams] = useState<any>();
  const [openModalViewOrder, setOpenModalViewOrder] = useState<boolean>(false);

  const handleViewOrder = (id: number) => {
    setId(id);
    setOpenModalViewOrder(true);
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
      const res = await rf.getRequest('OrderRequest').getRejectedOrder();
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
          Quản lý đơn hàng đã bị hủy
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
    </BaseStaffPage>
  );
};

export default RejectOrderManagementPage;
