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
import { AppDataTable, AppButton } from 'src/components';
import { BaseAdminPage } from 'src/components/layouts';
import '../../../styles/pages/UserManagementPage.scss';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { toastError, toastSuccess } from 'src/utils/notify';
import rf from 'src/api/RequestFactory';
import ModalChangeActiveConfirm from 'src/components/Modals/User/ModalChangeActiveConfirm';
import ModalViewUser from 'src/components/Modals/User/ModalViewUser';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';

export interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
}

const CustomerManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IUser[]>([]);
  const [status, setStatus] = useState('active');
  const [userId, setUserId] = useState<number>(NaN);
  const [openModalChangeActiveConfirm, setOpenModalChangeActiveConfirm] =
    useState<boolean>(false);
  const [openModalViewUser, setOpenModalViewUser] = useState<boolean>(false);
  const dataRef = useRef<IUser[]>([]);
  const [dataModal, setDataModal] = useState<IUser>({} as IUser);

  const [params, setParams] = useState({});

  const handleActive = (userId: number, status: string) => {
    if (status === 'active') {
      setStatus('inactive');
    } else {
      setStatus('active');
    }
    setUserId(userId);
    setOpenModalChangeActiveConfirm(true);
  };

  const handleOpenModalViewUser = async (userId: number) => {
    try {
      const res = await rf.getRequest('UserRequest').getCustomerByID(userId);
      setDataModal(res);
      setOpenModalViewUser(true);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const changeActive = async () => {
    try {
      if (status === 'inactive') {
        await rf.getRequest('UserRequest').deActiveUser(userId);
        toastSuccess('Khóa tài khoản thành công!');
        setParams({ ...params });
        setOpenModalChangeActiveConfirm(false);
      } else {
        await rf.getRequest('UserRequest').activeUser(userId);
        setParams({ ...params });
        toastSuccess('Mở khóa tài khoàn thành công!');
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
      const res = await rf.getRequest('UserRequest').getCustomer();
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
        <Box className="user--header-cell-body user--id">ID</Box>
        <Box className="user--header-cell-body user--name">Tên</Box>
        <Box className="user--header-cell-body user--phone">SDT</Box>
        <Box className="user--header-cell-body user--status">Trạng thái</Box>
        <Box className="user--header-cell-body user--action">Chức năng</Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IUser[]) => {
    return (
      <Box>
        {dataSearch.map((data: IUser, userId: number) => {
          return (
            <RowAddressTransactionTable
              data={data}
              key={`${userId}-coin-table`}
            />
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
            <Box cursor={'pointer'}>{data?.userId}</Box>
          </Flex>
          <Flex flexDirection="row" className="user--cell-body user--name">
            {data?.lastName} {data?.firstName}
          </Flex>
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
                    onClick={() => handleActive(data.userId, data?.status)}
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
                    onClick={() => handleActive(data.userId, data?.status)}
                  />
                </Tooltip>
              )}
            </Box>
          </Box>
          <Box className="user--cell-body user--action" cursor={'pointer'}>
            <AppButton
              size={'sm'}
              onClick={() => handleOpenModalViewUser(data.userId)}
            >
              Xem
            </AppButton>
            {data?.status === 'active' ? (
              <AppButton
                ml={'3px'}
                size={'sm'}
                bg={'red.100'}
                onClick={() => handleActive(data.userId, data?.status)}
              >
                Khóa tài khoản
              </AppButton>
            ) : (
              <AppButton
                ml={'3px'}
                size={'sm'}
                bg={'green.100'}
                onClick={() => handleActive(data.userId, data?.status)}
              >
                Mở khóa tài khoản
              </AppButton>
            )}
          </Box>
        </Flex>
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

export default CustomerManagementPage;
