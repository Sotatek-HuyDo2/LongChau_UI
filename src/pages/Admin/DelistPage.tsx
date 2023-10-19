import React, { useState } from 'react';
import { BasePage } from 'src/components/layouts';
import { AppInput } from 'src/components';
import { SearchExplorer } from 'src/assets/icons';
import 'src/styles/pages/DelistPage.scss';
import { Box, Flex, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MOCK_DeList } from 'src/utils/constants';
import { formatTimestamp } from 'src/utils/format';
import { AppDataTable, AppButton } from 'src/components';
import ModalDelistConfirm from 'src/components/Modals/ModalDelistConfirm';

interface IDelist {
  medicineID: string;
  name: string;
  quality: number;
  visit: string;
  timestamp: number;
}

const DelistPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [openModalDelistConfirm, setOpenModalDelistConfirm] =
    useState<boolean>(false);

  const onToggleOpenModalDelistConfirm = () =>
    setOpenModalDelistConfirm((prevState) => !prevState);

  const navigate = useNavigate();

  const getDelist = async () => {
    try {
      return {
        docs: MOCK_DeList,
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
        <Box className="delist--header-cell-body delist--visit">Vị trí</Box>
        <Box className="delist--header-cell-body delist--time">
          Thời gian nhập
        </Box>
        <Box className="delist--header-cell-body delist--action">Action</Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IDelist[]) => {
    return (
      <Box>
        {data.map((data: IDelist, id: number) => {
          return (
            <RowAddressTransactionTable data={data} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: IDelist;
  }> = ({ data }) => {
    return (
      <Flex className="delist--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="delist--cell-body delist--id">
            <Box cursor={'pointer'}>{data.medicineID}</Box>
          </Flex>
          <Box className="delist--cell-body delist--name">
            {data.name ? data.name : '--'}
          </Box>
          <Flex
            flexDirection="row"
            className="delist--cell-body delist--quality"
          >
            {data?.quality ? data?.quality : '--'}
          </Flex>
          <Box className="delist--cell-body delist--visit">
            <Box>{data.visit}</Box>
          </Box>
          <Flex flexDirection="row" className="delist--cell-body delist--time">
            {formatTimestamp(data?.timestamp, 'MMM DD YYYY HH:mm:ss')}
          </Flex>
          <Box className="delist--cell-body delist--action" cursor={'pointer'}>
            <AppButton size={'sm'} onClick={onToggleOpenModalDelistConfirm}>
              Edit
            </AppButton>
            <AppButton
              ml={'3px'}
              size={'sm'}
              onClick={onToggleOpenModalDelistConfirm}
            >
              Del
            </AppButton>
            <AppButton
              ml={'3px'}
              size={'sm'}
              onClick={onToggleOpenModalDelistConfirm}
            >
              View
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
    <BasePage>
      <Box className="delist">
        <Flex fontSize="24px" as="b" mr={'30px'} alignItems={'center'} gap={3}>
          Delist
        </Flex>

        <Box className={'delist__search'}>
          <Flex alignItems={'center'}>
            <Box className={'delist__search-title'}>Danh sách thuốc:</Box>
            <Box className="delist__search-input">
              <InputGroup>
                <AppInput
                  placeholder="Search for pair"
                  size="md"
                  value={valueSearch}
                  onChange={(e) => setValueSearch(e.target.value.trim())}
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
            fetchData={getDelist}
            renderBody={_renderContentTable}
            renderHeader={_renderHeaderTable}
            size={10}
          />
        </Box>
      </Box>
    </BasePage>
  );
};

export default DelistPage;
