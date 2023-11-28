import React, { useState, useRef } from 'react';
import { BaseAdminPage } from 'src/components/layouts';
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
import { MOCK_MEDICAL_LIST } from 'src/utils/constants';
import {
  formatCommaNumber,
  formatNumber,
  formatTimestamp,
} from 'src/utils/format';
import { AppDataTable, AppButton } from 'src/components';
import ModalDelistConfirm from 'src/components/Modals/ModalDelistConfirm';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import rf from 'src/services/RequestFactory';

interface IMedical {
  barcode: number;
  createdAt: string;
  description: string;
  dueDate: string;
  id: number;
  name: string;
  price: number;
  sensitiveIngredients: null;
  size: number;
  soldAsDose: false;
  supplierId: number;
  typeId: number;
  unit: string;
}

const MedicalManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [openModalDelistConfirm, setOpenModalDelistConfirm] =
    useState<boolean>(false);

  const [dataSearch, setDataSearch] = useState<IMedical[]>([]);

  const onToggleOpenModalDelistConfirm = () =>
    setOpenModalDelistConfirm((prevState) => !prevState);

  const navigate = useNavigate();

  const dataRef = useRef<IMedical[]>([]);

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: IMedical) =>
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
      const res = await rf.getRequest('ProductRequest').getProduct();
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

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="delist--header-cell-body delist--id">ID</Box>
        <Box className="delist--header-cell-body delist--name">Tên</Box>
        <Box className="delist--header-cell-body delist--quality">số lượng</Box>
        {/* <Box className="delist--header-cell-body delist--visit">Vị trí</Box> */}
        <Box className="delist--header-cell-body delist--time">
          Thời gian nhập
        </Box>
        <Box className="delist--header-cell-body delist--price">Giá (VND)</Box>
        <Box className="delist--header-cell-body delist--action">Action</Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IMedical[]) => {
    return (
      <Box>
        {dataSearch.map((data: IMedical, id: number) => {
          return (
            <RowAddressTransactionTable data={data} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: IMedical;
  }> = ({ data }) => {
    return (
      <Flex className="delist--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="delist--cell-body delist--id">
            <Box cursor={'pointer'}>{data.id}</Box>
          </Flex>
          <Box className="delist--cell-body delist--name">
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
                maxW="250px"
                cursor="pointer"
              >
                {data.name ? data.name : '--'}
              </Box>
            </Tooltip>
          </Box>
          <Flex
            flexDirection="row"
            className="delist--cell-body delist--quality"
          >
            {data?.size ? data?.size : '--'}
          </Flex>
          {/* <Box className="delist--cell-body delist--visit">
            <Box>{data?.visit ? data?.visit : '--'}</Box>
          </Box> */}
          <Flex flexDirection="row" className="delist--cell-body delist--time">
            {/* {formatTimestamp(data?.createdAt, 'MMM DD YYYY HH:mm:ss')} */}
          </Flex>
          <Box className="delist--cell-body delist--price">
            <Tooltip
              hasArrow
              placement="top"
              className="tooltip-app"
              label={!!data?.price ? formatCommaNumber(data?.price) : ''}
            >
              <Box cursor={'pointer'}>
                {!!data?.price ? `${formatNumber(data?.price)} (VND)` : '--'}
              </Box>
            </Tooltip>
          </Box>
          <Box className="delist--cell-body delist--action" cursor={'pointer'}>
            <AppButton
              size={'sm'}
              onClick={() => navigate(`/medical/${data.id}`)}
            >
              View
            </AppButton>
            <AppButton
              size={'sm'}
              bg={'yellow.100'}
              ml={'3px'}
              onClick={onToggleOpenModalDelistConfirm}
            >
              Edit
            </AppButton>
            <AppButton
              ml={'3px'}
              size={'sm'}
              bg={'red.100'}
              onClick={onToggleOpenModalDelistConfirm}
            >
              Del
            </AppButton>
          </Box>
        </Flex>
        {openModalDelistConfirm && (
          <ModalDelistConfirm
            open={openModalDelistConfirm}
            onClose={onToggleOpenModalDelistConfirm}
          />
        )}
      </Flex>
    );
  };

  return (
    <BaseAdminPage>
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
          <Flex alignItems={'center'}>
            <Box className={'delist__search-title'}>Danh sách thuốc:</Box>
            <Box className="delist__search-input">
              <InputGroup>
                <AppInput
                  color={'black'}
                  placeholder="Search for pair"
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
        </Box>

        <Box mt={10} className="delist-container">
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

export default MedicalManagementPage;
