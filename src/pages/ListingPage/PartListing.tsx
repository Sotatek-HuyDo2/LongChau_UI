import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppDataTable, AppInput } from 'src/components';
import { SearchExplorer } from 'src/assets/icons';
import 'src/styles/pages/DelistPage.scss';
import {
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import rf from 'src/api/RequestFactory';
import { formatTimestamp } from 'src/utils/format';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { filterParams } from 'src/utils/helpers';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';

interface IListing {
  id: number;
  symbol: string;
  baseCurrencyId: number;
  baseCurrencySymbol: string;
  quoteCurrencyId: number;
  quoteCurrencySymbol: string;
  makerFee: string;
  takerFee: string;
  pricePrecision: number;
  quantityPrecision: number;
  minimumQty: string;
  maximumQty: string;
}

const PartListing = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IListing[]>([]);
  const dataRef = useRef<IListing[]>([]);

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: IListing) =>
        item.symbol.toLowerCase().includes(valueSearch.toLowerCase()),
      );
    }

    setDataSearch(dataFilter);
  };

  useEffectUnsafe(() => {
    handleSearch();
  }, [valueSearch]);

  const getListing = async (payload?: any) => {
    try {
      const res = await rf
        .getRequest('MarketDataRequest')
        .getAllPair(filterParams({ ...payload }));
      dataRef.current = res?.data;
      setDataSearch(res?.data);
      return {
        docs: res?.data,
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
        <Box className="delist--header-cell-body delist--action">Creator</Box>
      </Flex>
    );
  };

  const _renderContentTable = () => {
    if (!dataSearch.length) {
      return (
        <Flex justifyContent={'center'} fontSize={'14px'} mt={10}>
          No data...
        </Flex>
      );
    }

    return (
      <Box>
        {dataSearch.map((data: IListing, id: number) => {
          return (
            <RowAddressTransactionTable data={data} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: IListing;
  }> = ({ data }) => {
    const { currencies } = useSelector((state: RootState) => state.metadata);

    const baseCurrency = useMemo(() => {
      return currencies.find(
        (item) => item.refSymbol === data?.baseCurrencySymbol,
      );
    }, [currencies, data?.baseCurrencySymbol]);

    return (
      <Flex className="delist--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="delist--cell-body delist--id">
            <Box cursor={'pointer'}>{data.id}</Box>
          </Flex>
          <Box className="delist--cell-body delist--pair">
            <Box className={baseCurrency?.icon}></Box>
            <Text ml={2}>
              {data.baseCurrencySymbol}/{data.quoteCurrencySymbol}
            </Text>
          </Box>
          <Flex flexDirection="row" className="delist--cell-body delist--time">
            {/* {formatTimestamp(data?.timestamp, 'MMM DD YYYY HH:mm:ss')} */}
            Oct 10 2023 23:59:59
          </Flex>
          <Box className="delist--cell-body delist--status">
            {/* <Box>{data?.status ? data?.status : '--'}</Box> */}
            Listed
          </Box>
          <Box className="delist--cell-body delist--action">
            {/* <Box>{data?.creator ? data?.creator : '--'}</Box> */}
            abc@sotatek.com
          </Box>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box className={'delist__search'} mt={20}>
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

      <Box mt={10} className="delist-container">
        <AppDataTable
          fetchData={getListing}
          renderBody={_renderContentTable}
          renderHeader={_renderHeaderTable}
        />
      </Box>
    </Box>
  );
};

export default PartListing;
