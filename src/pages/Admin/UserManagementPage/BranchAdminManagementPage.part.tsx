import React, { useRef, useState } from 'react';
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
import '../../../styles/pages/UserManagementPage.scss';
import { AddIcon } from '@chakra-ui/icons';
import rf from 'src/api/RequestFactory';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import ModalAddNewBranchAdmin from 'src/components/Modals/User/ModalAddNewBranchAdmin';
import ModalViewBranchAdmin from 'src/components/Modals/User/ModalViewBranchAdmin';

export interface IAdmin {
  userId: number;
  firstName: string;
  lastName: string;
  branchId: number;
  phone: string;
  status: string;
  email: string;
  branchName: string;
}

const BranchAdminManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IAdmin[]>([]);
  const [openModalAddNewUser, setOpenModalAddNewUser] =
    useState<boolean>(false);
  const [openModalViewBranchAdmin, setOpenModalViewBranchAdmin] =
    useState<boolean>(false);
  const dataRef = useRef<IAdmin[]>([]);
  const [dataModal, setDataModal] = useState<IAdmin>({} as IAdmin);
  const [params, setParams] = useState({});

  const handleOpenModalViewBranchAdmin = async (userId: number) => {
    try {
      const res = await rf.getRequest('UserRequest').getBranchAdminByID(userId);
      setOpenModalViewBranchAdmin(true);
      setDataModal(res);
    } catch (error) {
      return { docs: [] };
    }
  };

  const onReload = () => {
    setParams({ ...params });
  };

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: IAdmin) =>
        item?.firstName.toLowerCase().includes(valueSearch?.toLowerCase()),
      );

      setDataSearch(dataFilter);
    }
    setDataSearch(dataFilter);
  };

  useEffectUnsafe(() => {
    handleSearch();
  }, [valueSearch]);

  const getBranchAdmin = async () => {
    try {
      const res = await rf.getRequest('UserRequest').getBranchAdmin();

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
        <Box className="user--header-cell-body user--id">Stt</Box>
        <Box className="user--header-cell-body user--id">ID</Box>
        <Box className="user--header-cell-body user--name">Tên</Box>
        <Box className="user--header-cell-body user--phone">Tên chi nhánh</Box>
        <Box className="user--header-cell-body user--phone">SDT</Box>
        <Box className="user--header-cell-body user--action">Chức năng</Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IAdmin[]) => {
    return (
      <Box>
        {dataSearch.map((data: IAdmin, index: number) => {
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
    data: IAdmin;
    id: number;
  }> = ({ data, id }) => {
    return (
      <Flex className="user--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="user--cell-body user--id">
            <Box cursor={'pointer'}>{id}</Box>
          </Flex>
          <Flex className="user--cell-body user--id">
            <Box cursor={'pointer'}>{data?.branchId}</Box>
          </Flex>
          <Flex flexDirection="row" className="user--cell-body user--name">
            {data?.lastName} {data?.firstName}
          </Flex>
          <Flex flexDirection="row" className="user--cell-body user--phone">
            {data?.branchName}
          </Flex>

          <Box className="user--cell-body user--phone">
            {data?.phone ? data?.phone : '--'}
          </Box>
          <Box className="user--cell-body user--action" cursor={'pointer'}>
            <AppButton
              size={'sm'}
              onClick={() => handleOpenModalViewBranchAdmin(data.userId)}
            >
              Xem
            </AppButton>
          </Box>
        </Flex>

        {openModalViewBranchAdmin && (
          <ModalViewBranchAdmin
            open={openModalViewBranchAdmin}
            onClose={() => setOpenModalViewBranchAdmin(false)}
            data={dataModal}
          />
        )}
      </Flex>
    );
  };

  return (
    <Box className="user" w="full">
      <Box className={'user__search'}>
        <Flex justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Box className="user__search-input">
              <InputGroup>
                <AppInput
                  color={'black'}
                  placeholder="Nhập để tìm kiếm..."
                  size="md"
                  value={valueSearch}
                  onChange={(e: any) => setValueSearch(e.target.value)}
                />
                <InputRightElement top={4}>
                  <SearchExplorer />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Flex>
          <AppButton size={'md'} onClick={() => setOpenModalAddNewUser(true)}>
            <Flex justify={'center'} align={'start'} gap={1}>
              <AddIcon />
              Thêm Branch Admin
            </Flex>
          </AppButton>
        </Flex>
      </Box>

      <Box mt={10} className="user-container">
        <AppDataTable
          requestParams={params}
          fetchData={getBranchAdmin}
          renderBody={_renderContentTable}
          renderHeader={_renderHeaderTable}
          size={10}
        />
      </Box>
      {openModalAddNewUser && (
        <ModalAddNewBranchAdmin
          onReload={onReload}
          open={openModalAddNewUser}
          onClose={() => setOpenModalAddNewUser(false)}
        />
      )}
    </Box>
  );
};

export default BranchAdminManagementPage;
