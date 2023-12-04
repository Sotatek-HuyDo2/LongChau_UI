/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Table, TableContainer } from '@chakra-ui/react';
import { debounce } from 'lodash';
import {
  forwardRef,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import 'src/styles/components/AppDataTable.scss';
import { AppPagination } from 'src/components';

interface DataTableProps {
  requestParams?: any; // if requestParams are not passed, only fetchs API in didMount
  size?: number;
  wrapperClassName?: string;
  fetchData: (requestParams: any) => Promise<any>;
  renderBody: (tableData: any[]) => ReactNode;
  renderHeader?: () => ReactNode;
  renderNoData?: () => ReactNode;
  dataSortTable?: any;
  loading?: boolean;
  isNotShowNoData?: boolean;
  hidePagination?: boolean;
  isLoadingOnce?: boolean;
}

export interface DataTableRef {
  tableData: any[];
  fetchTableData: any;
}

export interface Pagination {
  size: number; // the limit item of page
  page: number; // the current page
  sortBy?: string;
  sortType?: 'asc' | 'desc'; // Available values : asc, desc
}

const AppDataTable = forwardRef((props: DataTableProps, ref: Ref<any>) => {
  const DEFAULT_LIMIT = 20;
  const DEBOUNCE_TIME = 1000;
  const CONSTANT = 'CONSTANT';

  // make requestParams not change => call at the first load
  const defaultRequestParams = useMemo(() => ({}), [CONSTANT]);

  const {
    size = DEFAULT_LIMIT,
    requestParams = defaultRequestParams,
    fetchData,
    dataSortTable,
    renderBody,
    renderHeader,
    renderNoData,
    isNotShowNoData = false,
    hidePagination = false,
    isLoadingOnce = false,
  } = props;
  const initialPagination: Pagination = { size, page: 1 };
  const [tableData, setTableData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { accessToken } = useSelector((state: RootState) => state.user);

  useImperativeHandle(ref, () => ({
    tableData,
    fetchTableData,
    pagination,
  }));

  const fetchTableData = async (params: any, tablePagination: Pagination) => {
    if (!isLoadingOnce) {
      setIsLoading(true);
    }
    const response: any = await fetchData({
      ...params,
      ...tablePagination,
    });

    setIsLoading(false);
    if (response) {
      setTableData(response?.docs);
      setPagination({ ...tablePagination });
      setTotalPages(response?.totalPages || 0);
      setTotalRecords(response?.totalItem || 0);
    } else setTableData([]);
  };

  const debounceFetchTableData = useCallback(
    debounce(fetchTableData, DEBOUNCE_TIME),
    [requestParams, accessToken],
  );

  const onRefreshData = async () => {
    const response: any = await fetchData({
      ...requestParams,
      ...pagination,
    });
    if (response) {
      setTableData(response?.docs);
      setTotalPages(response?.totalPages || 0);
      setTotalRecords(response?.totalItem || 0);
    } else setTableData([]);
  };

  const debounceRefreshTableData = useCallback(
    debounce(onRefreshData, DEBOUNCE_TIME),
    [],
  );

  const onChangePagination = (event: { selected: number }) => {
    window.scrollTo(0, 0);
    fetchTableData(requestParams, {
      ...pagination,
      page: event.selected + 1,
    });
  };

  const _renderLoading = () => {
    return <div className="data-loading">Loading...</div>;
  };

  const onChangeLimit = (size: string) => {
    window.scrollTo(0, 0);
    fetchTableData(requestParams, {
      ...pagination,
      size: +size,
      page: 1,
    });
  };

  const _renderPagination = () => {
    return (
      <Flex justifyContent={'space-between'} mt={'25px'} alignItems="flex-end">
        {totalPages > 1 && (
          <AppPagination
            pageCount={totalPages}
            forcePage={pagination.page - 1}
            onPageChange={onChangePagination}
          />
        )}
      </Flex>
    );
  };

  const _renderFooter = () => {
    if (isLoading || props.loading || hidePagination) {
      return null;
    }
    return _renderPagination();
  };

  const _renderNoResultOrLoading = () => {
    if (isLoading || props.loading) {
      return _renderLoading();
    }

    if (!tableData?.length && !isNotShowNoData) {
      return renderNoData ? (
        renderNoData()
      ) : (
        <div className="data-loading">No data...</div>
      );
    }
  };

  const _renderBody = () => {
    if (!tableData?.length || isLoading || props.loading) {
      return;
    }
    return <>{renderBody(tableData)}</>;
  };

  const _renderTable = () => {
    return (
      <>
        {renderHeader && renderHeader()}
        {_renderBody()}
      </>
    );
  };

  useEffect(() => {
    debounceFetchTableData(requestParams, { ...pagination, page: 1 });
    return () => {
      debounceFetchTableData.cancel();
    };
  }, [debounceFetchTableData]);

  useEffect(() => {
    if (dataSortTable) {
      setTableData(dataSortTable);
    }
  }, [dataSortTable]);

  return (
    <>
      <TableContainer overflowX="inherit" overflowY="inherit" as={Box}>
        <Table colorScheme="gray" as={Box}>
          {_renderTable()}
        </Table>
      </TableContainer>
      {_renderNoResultOrLoading()}
      {_renderFooter()}
    </>
  );
});

export default AppDataTable;
