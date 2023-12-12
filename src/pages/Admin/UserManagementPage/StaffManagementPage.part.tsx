import { useRef, useState } from 'react';
import { AppInput } from 'src/components';
import { SearchExplorer } from 'src/assets/icons';
import {
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AppDataTable, AppButton } from 'src/components';
import { BaseAdminPage } from 'src/components/layouts';
import '../../../styles/pages/UserManagementPage.scss';
import { AddIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { toastError, toastSuccess } from 'src/utils/notify';
import rf from 'src/api/RequestFactory';
import ModalChangeActiveConfirm from 'src/components/Modals/User/ModalChangeActiveConfirm';
import ModalViewUser from 'src/components/Modals/User/ModalViewUser';
import ModalEditUser from 'src/components/Modals/User/ModalEditUser';
import ModalAddNewUser from 'src/components/Modals/User/ModalAddNewUser';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import ModalAddNewBranchAdmin from 'src/components/Modals/User/ModalAddNewBranchAdmin';

export interface IAdmin {
  id: number;
  firstName: string;
  lastName: string;
  branchId: number;
  phone: string;
  status: string;
}

const StaffManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IAdmin[]>([]);
  const [openModalViewUser, setOpenModalViewUser] = useState<boolean>(false);
  const [openModalEditUser, setOpenModalEditUser] = useState<boolean>(false);
  const dataRef = useRef<IAdmin[]>([]);
  const [dataModal, setDataModal] = useState<IAdmin>({} as IAdmin);
  const [params, setParams] = useState({});

  const handleOpenModalViewUser = (id: number) => {
    setOpenModalViewUser(true);
  };

  const handleOpenModalEditUser = (id: number) => {
    setOpenModalEditUser(true);
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

  // const getBranchAdminDetail = async () => {
  //   try {
  //     const res = await rf.getRequest('UserRequest').getProfile();
  //     setDataModal(res);
  //   } catch (error) {
  //     return { docs: [] };
  //   }
  // };

  // useEffectUnsafe(() => {
  //   getBranchAdminDetail();
  // }, [id]);

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
              // onClick={() => navigate(`/medical/${data.brandID}`)}
              onClick={() => handleOpenModalViewUser(data.id)}
            >
              Xem
            </AppButton>
            <AppButton
              size={'sm'}
              bg={'yellow.100'}
              ml={'3px'}
              onClick={() => handleOpenModalEditUser(data.id)}
            >
              Sửa
            </AppButton>
          </Box>
        </Flex>
        {/* {openModalEditUser && (
          <ModalEditUser
            open={openModalEditUser}
            onClose={() => setOpenModalEditUser(false)}
            data={dataModal}
          />
        )}
        {openModalViewUser && (
          <ModalViewUser
            open={openModalViewUser}
            onClose={() => setOpenModalViewUser(false)}
            data={dataModal}
          />
        )} */}
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
  );
};

export default StaffManagementPage;
