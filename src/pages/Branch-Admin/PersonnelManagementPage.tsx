import React, { useEffect, useRef, useState } from 'react';
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
import { MOCK_DATA_USER } from 'src/utils/constants';
import { AppDataTable, AppButton } from 'src/components';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { BaseBranchAdminPage } from 'src/components/layouts';
import '../../styles/pages/UserManagementPage.scss';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { toastError, toastSuccess } from 'src/utils/notify';
import ModalDelistConfirm from 'src/components/Modals/ModalDelistConfirm';

interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  brandID: number;
  phone: string;
  status: string;
}

const BranchAdminPersonnelManagementPage = () => {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<IUser[]>(MOCK_DATA_USER);
  const [status, setStatus] = useState('block');
  const [openModalDelistConfirm, setOpenModalDelistConfirm] =
    useState<boolean>(false);

  const onToggleOpenModalDelistConfirm = () =>
    setOpenModalDelistConfirm((prevState) => !prevState);

  const dataRef = useRef<IUser[]>([]);

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

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      dataRef.current = MOCK_DATA_USER;
      setDataSearch(MOCK_DATA_USER);
      return {
        docs: dataSearch,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  const handleSetStatus = () => {
    if (status === 'block') {
      toastSuccess('Welcome to LongChau!');
      setStatus('unlock');
    } else {
      setStatus('block');
    }
  };

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
            <Box className={`user--${data?.status.toLowerCase()}`}>
              {data?.status === status ? (
                <LockIcon onClick={handleSetStatus} />
              ) : (
                <UnlockIcon onClick={handleSetStatus} />
              )}
            </Box>
          </Box>
          <Box className="user--cell-body user--action" cursor={'pointer'}>
            <AppButton
              size={'sm'}
              onClick={() => navigate(`/medical/${data.brandID}`)}
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
          table
          <AppDataTable
            fetchData={getUser}
            renderBody={_renderContentTable}
            renderHeader={_renderHeaderTable}
            size={10}
          />
        </Box>
      </Box>
    </BaseBranchAdminPage>
  );
};

export default BranchAdminPersonnelManagementPage;
