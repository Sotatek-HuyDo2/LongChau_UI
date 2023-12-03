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
import { useNavigate } from 'react-router-dom';
import { AppDataTable, AppButton } from 'src/components';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { BaseAdminPage } from 'src/components/layouts';
import '../../styles/pages/UserManagementPage.scss';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { toastError, toastSuccess } from 'src/utils/notify';
import rf from 'src/services/RequestFactory';
import ModalChangeActiveConfirm from 'src/components/Modals/ModalChangeActiveConfirm';
import ModalViewUser from 'src/components/Modals/ModalViewUser';
import ModalEditUser from 'src/components/Modals/ModalEditUser';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  branchId: number;
  phone: string;
  status: string;
}

const UserManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IUser[]>([]);
  const [status, setStatus] = useState('active');
  const [id, setId] = useState<number>(NaN);
  const [openModalChangeActiveConfirm, setOpenModalChangeActiveConfirm] =
    useState<boolean>(false);
  const [openModalViewUser, setOpenModalViewUser] = useState<boolean>(false);
  const [openModalEditUser, setOpenModalEditUser] = useState<boolean>(false);

  const dataRef = useRef<IUser[]>([]);
  const [dataModal, setDataModal] = useState<IUser>({} as IUser);
  const navigate = useNavigate();
  const [params, setParams] = useState({});

  const handleActive = (id: number, status: string) => {
    if (status === 'active') {
      setStatus('inactive');
    } else {
      setStatus('active');
    }
    setId(id);
    setOpenModalChangeActiveConfirm(true);
  };

  const handleOpenModalViewUser = (id: number) => {
    setId(id);
    setOpenModalViewUser(true);
  };

  const handleOpenModalEditUser = (id: number) => {
    setId(id);
    setOpenModalEditUser(true);
  };

  const changeActive = async () => {
    try {
      if (status === 'inactive') {
        await rf.getRequest('UserRequest').deActiveUser(id);
        toastSuccess('Inactive user successfully!');
        setParams({ ...params });
        setOpenModalChangeActiveConfirm(false);
      } else {
        await rf.getRequest('UserRequest').activeUser(id);
        setParams({ ...params });
        toastSuccess('Active user successfully!');
        setOpenModalChangeActiveConfirm(false);
      }
    } catch (e: any) {
      toastError(e.message || 'Something was wrong!!');
    }
  };

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: IUser) =>
        item.firstName.toLowerCase().includes(valueSearch.toLowerCase()),
      );

      setDataSearch(dataFilter);
    }
    setDataSearch(dataFilter);
  };

  useEffectUnsafe(() => {
    handleSearch();
  }, [valueSearch]);

  const getUser = async () => {
    try {
      const res = await rf.getRequest('UserRequest').getUser();

      dataRef.current = res;
      setDataSearch(res);
      return {
        docs: res,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  // const getUserDetail = async () => {
  //   try {
  //     const res = await rf.getRequest('UserRequest').getProfile();
  //     setDataModal(res);
  //   } catch (error) {
  //     return { docs: [] };
  //   }
  // };

  // useEffectUnsafe(() => {
  //   getUserDetail();
  // }, [id]);

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="user--header-cell-body user--id">ID</Box>
        <Box className="user--header-cell-body user--email">Email</Box>
        <Box className="user--header-cell-body user--name">Tên</Box>
        <Box className="user--header-cell-body user--role">Quyền</Box>
        <Box className="user--header-cell-body user--phone">SDT</Box>
        <Box className="user--header-cell-body user--status">Trạng thái</Box>
        <Box className="user--header-cell-body user--action">Chức năng</Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IUser[]) => {
    return (
      <Box>
        {dataSearch.map((data: IUser, id: number) => {
          return (
            <RowAddressTransactionTable data={data} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: IUser;
  }> = ({ data }) => {
    return (
      <Flex className="user--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="user--cell-body user--id">
            <Box cursor={'pointer'}>{data?.id}</Box>
          </Flex>
          <Box className="user--cell-body user--email">
            {data?.email ? data?.email : '--'}
          </Box>
          <Flex flexDirection="row" className="user--cell-body user--name">
            {data?.firstName} {data?.lastName}
          </Flex>
          <Box className="user--cell-body user--role">
            {data?.role ? data?.role : '--'}
          </Box>
          <Box className="user--cell-body user--phone">
            {data?.phone ? data?.phone : '--'}
          </Box>
          <Box className="user--cell-body user--phone">
            <Box
              className={`user--${data?.status.toLowerCase()}`}
              cursor={'pointer'}
              ml={'35px'}
            >
              {data?.status === 'active' ? (
                <Tooltip
                  className="tooltip-app"
                  label={'Người dùng hoạt động bình thường'}
                  placement="top"
                  hasArrow
                >
                  <UnlockIcon
                    onClick={() => handleActive(data.id, data?.status)}
                  />
                </Tooltip>
              ) : (
                <Tooltip
                  className="tooltip-app"
                  label={'Người dùng bị hạn chế hoạt động'}
                  placement="top"
                  hasArrow
                >
                  <LockIcon
                    onClick={() => handleActive(data.id, data?.status)}
                  />
                </Tooltip>
              )}
            </Box>
          </Box>
          <Box className="user--cell-body user--action" cursor={'pointer'}>
            <AppButton
              size={'sm'}
              // onClick={() => navigate(`/medical/${data.brandID}`)}
              onClick={() => handleOpenModalViewUser(data.id)}
            >
              View
            </AppButton>
            <AppButton
              size={'sm'}
              bg={'yellow.100'}
              ml={'3px'}
              onClick={() => handleOpenModalEditUser(data.id)}
            >
              Edit
            </AppButton>
            {data?.status === 'active' ? (
              <AppButton
                ml={'3px'}
                size={'sm'}
                bg={'red.100'}
                onClick={() => handleActive(data.id, data?.status)}
              >
                Deactivate
              </AppButton>
            ) : (
              <AppButton
                ml={'3px'}
                size={'sm'}
                bg={'green.100'}
                onClick={() => handleActive(data.id, data?.status)}
              >
                Activate
              </AppButton>
            )}
          </Box>
        </Flex>
        {openModalEditUser && (
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
        )}
        {openModalChangeActiveConfirm && (
          <ModalChangeActiveConfirm
            open={openModalChangeActiveConfirm}
            onClose={() => setOpenModalChangeActiveConfirm(false)}
            onConfirm={changeActive}
          />
        )}
      </Flex>
    );
  };

  return (
    <BaseAdminPage>
      <Box className="user" w="full">
        <Flex
          fontSize="24px"
          as="b"
          mr={'30px'}
          alignItems={'center'}
          gap={3}
          color={'#2167df'}
        >
          Quản lý người dùng
        </Flex>
        <Box className={'user__search'}>
          <Flex alignItems={'center'}>
            <Box className={'user__search-title'}>Người dùng:</Box>
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
        </Box>

        <Box mt={10} className="user-container">
          <AppDataTable
            requestParams={params}
            fetchData={getUser}
            renderBody={_renderContentTable}
            renderHeader={_renderHeaderTable}
            size={10}
          />
        </Box>
      </Box>
    </BaseAdminPage>
  );
};

export default UserManagementPage;
