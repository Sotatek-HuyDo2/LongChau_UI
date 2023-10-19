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
  pairID: number;
  currencyId: number;
  networkId: number;
  timestamp: number;
  status: string;
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
        <Box className="delist--header-cell-body delist--id">Pair ID</Box>
        <Box className="delist--header-cell-body delist--pair">Pair</Box>
        <Box className="delist--header-cell-body delist--time">Time</Box>
        <Box className="delist--header-cell-body delist--status">Status</Box>
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
            <Box cursor={'pointer'}>{data.pairID}</Box>
          </Flex>
          <Box className="delist--cell-body delist--pair">BTC/USDT</Box>
          <Flex flexDirection="row" className="delist--cell-body delist--time">
            {formatTimestamp(data?.timestamp, 'MMM DD YYYY HH:mm:ss')}
          </Flex>
          <Box className="delist--cell-body delist--status">
            <Box>{data.status}</Box>
          </Box>
          <Box className="delist--cell-body delist--action" cursor={'pointer'}>
            <AppButton size={'sm'} onClick={onToggleOpenModalDelistConfirm}>
              Delist
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
            <Box className={'delist__search-title'}>Listed pair:</Box>
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
