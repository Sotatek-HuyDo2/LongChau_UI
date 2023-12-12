import { useRef, useState } from 'react';
import { AppInput } from 'src/components';
import { SearchExplorer } from 'src/assets/icons';
import { Box, Flex, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AppDataTable, AppButton } from 'src/components';
import { BaseBranchAdminPage } from 'src/components/layouts';
import '../../styles/pages/UserManagementPage.scss';
import { AddIcon } from '@chakra-ui/icons';
import rf from 'src/api/RequestFactory';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import ModalAddNewStaff from 'src/components/Modals/User/ModalAddNewStaff';
import ModalViewStaff from 'src/components/Modals/User/ModalViewStaff';

export interface IAdmin {
  userId: number;
  firstName: string;
  lastName: string;
  branchId: number;
  phone: string;
  status: string;
}

const BranchAdminPersonnelManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IAdmin[]>([]);
  const [openModalViewUser, setOpenModalViewUser] = useState<boolean>(false);
  const [openModalAddNewStaff, setOpenModalAdddNewStaff] =
    useState<boolean>(false);
  const dataRef = useRef<IAdmin[]>([]);
  const [dataModal, setDataModal] = useState<IAdmin>({} as IAdmin);
  const [params, setParams] = useState({});

  const handleOpenModalViewUser = async (id: number) => {
    try {
      const res = await rf.getRequest('UserRequest').getStaffByID(id);
      setOpenModalViewUser(true);
      setDataModal(res);
    } catch (e: any) {
      console.log(e.message);
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
      const res = await rf.getRequest('UserRequest').getStaff();
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
          <Box className="user--cell-body user--phone">
            {data?.phone ? data?.phone : '--'}
          </Box>
          <Box className="user--cell-body user--action" cursor={'pointer'}>
            <AppButton
              size={'sm'}
              onClick={() => handleOpenModalViewUser(data.userId)}
            >
              Xem
            </AppButton>
          </Box>
        </Flex>
        {openModalViewUser && (
          <ModalViewStaff
            open={openModalViewUser}
            onClose={() => setOpenModalViewUser(false)}
            data={dataModal}
          />
        )}
      </Flex>
    );
  };

  return (
    <BaseBranchAdminPage>
      <Box className="user" w="full">
        <Flex
          fontSize="24px"
          as="b"
          mr={'30px'}
          alignItems={'center'}
          gap={3}
          color={'#2167df'}
        >
          Quản lý Staff
        </Flex>
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
            <AppButton
              size={'md'}
              onClick={() => setOpenModalAdddNewStaff(true)}
            >
              <Flex justify={'center'} align={'start'} gap={1}>
                <AddIcon />
                Thêm Staff
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
      </Box>
      {openModalAddNewStaff && (
        <ModalAddNewStaff
          open={openModalAddNewStaff}
          onClose={() => setOpenModalAdddNewStaff(false)}
          onReload={onReload}
        />
      )}
    </BaseBranchAdminPage>
  );
};

export default BranchAdminPersonnelManagementPage;
