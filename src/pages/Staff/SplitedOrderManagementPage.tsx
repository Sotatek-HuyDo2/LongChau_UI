import { useState, useRef } from 'react';
import { BaseAdminPage, BaseStaffPage } from 'src/components/layouts';
import { AppInput } from 'src/components';
import { SearchExplorer } from 'src/assets/icons';
import 'src/styles/pages/MedicalManagementPage.scss';
import {
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  formatCommaNumber,
  formatNumber,
  formatTimestamp,
} from 'src/utils/format';
import { AppDataTable, AppButton } from 'src/components';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import rf from 'src/api/RequestFactory';
import moment from 'moment';
import ModalEditMedical from 'src/components/Modals/Medical/ModalEditMedical';
import { AddIcon } from '@chakra-ui/icons';
import ModalAddNewMedical from 'src/components/Modals/Medical/ModalAddNewMedical';

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

const CreatedOrderManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<number>();
  const [openModalEditMedical, setOpenModalEditMedical] =
    useState<boolean>(false);
  const [openModalAddNewMedical, setOpenModalAddNewMedical] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const [dataSearch, setDataSearch] = useState<IData[]>([]);
  const dataRef = useRef<IData[]>([]);
  const [id, setId] = useState<number>(NaN);
  const [params, setParams] = useState<any>();
  const [dataModal, setDataModal] = useState<IData>({} as IData);

  const handleUpdate = async (id: number) => {
    setId(id);
    try {
      const res = await rf.getRequest('ProductRequest').getProductDetail(id);
      setDataModal(res);
      setOpenModalEditMedical(true);
      return res;
    } catch (error) {
      return [];
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
      const res = await rf.getRequest('OrderRequest').getCreatedOrder();
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
        {/* <Box className="delist--header-cell-body delist--name">Tên</Box> */}
        <Box className="delist--header-cell-body delist--quality">
          Kích Thước
        </Box>
        <Box className="delist--header-cell-body delist--time">
          Thời gian nhập
        </Box>
        <Box className="delist--header-cell-body delist--price">Giá (VND)</Box>
        <Box className="delist--header-cell-body delist--price">
          Bán theo đơn
        </Box>
        <Box className="delist--header-cell-body delist--price">Định dạng</Box>
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
          {/* <Box className="delist--cell-body delist--name">
            <Box
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxW="250px"
              cursor="pointer"
            >
              {data.name ? data.name : '--'}
            </Box>
          </Box> */}
          <Flex
            flexDirection="row"
            className="delist--cell-body delist--quality"
          >
            {data?.status ? data?.status : '--'}
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
            <AppButton
              size={'sm'}
              onClick={() => navigate(`/medical/${data.id}`)}
            >
              Xem
            </AppButton>
            <AppButton
              size={'sm'}
              bg={'yellow.100'}
              ml={'3px'}
              onClick={() => handleUpdate(data.id)}
            >
              Sửa
            </AppButton>
            {/* <AppButton
              ml={'3px'}
              size={'sm'}
              bg={'red.100'}
              onClick={() => handleDelete(data.id)}
            >
              Xóa
            </AppButton> */}
          </Box>
        </Flex>
        {/* {openModalDeleteConfirm && (
          <ModalDeleteConfirm
            open={openModalDeleteConfirm}
            onClose={() => setOpenModalDeleteConfirm(false)}
            onConfirm={deleteMedical}
          />
        )} */}
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
          Quản lý thuốc
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
            <Box>tesst</Box>
            <AppButton
              size={'md'}
              onClick={() => setOpenModalAddNewMedical(true)}
            >
              <Flex justify={'center'} align={'start'} gap={1}>
                <AddIcon />
                Thêm Thuốc
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
      {openModalAddNewMedical && (
        <ModalAddNewMedical
          open={openModalAddNewMedical}
          onClose={() => setOpenModalAddNewMedical(false)}
          onReload={onReload}
        />
      )}
      {openModalEditMedical && (
        <ModalEditMedical
          open={openModalEditMedical}
          onClose={() => setOpenModalEditMedical(false)}
          data={dataModal}
          onReload={onReload}
        />
      )}
    </BaseStaffPage>
  );
};

export default CreatedOrderManagementPage;
