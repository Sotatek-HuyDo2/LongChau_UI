import { Box, Flex, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppDataTable from 'src/components/AppDataTable';
import { MOCK_USER_MANAGEMENT } from 'src/utils/constants';
import {
  formatCommaNumber,
  formatNumber,
  formatShortAddress,
  formatTimestamp,
} from 'src/utils/format';
import 'src/styles/pages/UserManagement.scss';

interface IUser {
  userID: number;
  address: string;
  totalOrder: number;
  totalTradingVolume: string;
  balance: string;
  timestamp: number;
}

const UserList = () => {
  const getUserManagement = async () => {
    try {
      return {
        docs: MOCK_USER_MANAGEMENT,
        // totalPages: 10,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="user-management--header-cell-body user-management--id">
          User ID
        </Box>
        <Box className="user-management--header-cell-body user-management--address">
          Address
        </Box>
        <Box className="user-management--header-cell-body user-management--time">
          Last active time
        </Box>
        <Box className="user-management--header-cell-body user-management--total-order">
          Total orders
        </Box>
        <Box className="user-management--header-cell-body user-management--total-volume">
          Total trading volume
        </Box>
        <Box className="user-management--header-cell-body user-management--balance">
          Balance (in USD)
        </Box>
        <Box className="user-management--header-cell-body user-management--view-detail">
          Action
        </Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IUser[]) => {
    return (
      <Box>
        {data.map((coin: IUser, id: number) => {
          return (
            <RowAddressTransactionTable data={coin} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: IUser;
  }> = ({ data }) => {
    const navigate = useNavigate();

    const navigationAddress = () => {
      if (!data?.address) return;
      return navigate(`/address/${data?.balance}`);
    };

    return (
      <Flex className="user-management--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="user-management--cell-body user-management--id">
            <Box cursor={'pointer'}>{data.userID}</Box>
          </Flex>
          <Box className="user-management--cell-body user-management--address">
            <Tooltip
              className="tooltip-app"
              label={data?.address}
              placement="top"
              hasArrow
            >
              <Box cursor="pointer">
                {formatShortAddress(data?.address || '', 8, 8)}
              </Box>
            </Tooltip>
          </Box>
          <Flex
            flexDirection="row"
            className="user-management--cell-body user-management--time"
          >
            {formatTimestamp(data?.timestamp, 'MMM DD YYYY HH:mm:ss')}
          </Flex>

          <Box className="user-management--cell-body user-management--total-order">
            <Box>{data.totalOrder}</Box>
          </Box>
          <Box className="user-management--cell-body user-management--total-volume">
            <Box
              className={`user-management--${data?.totalTradingVolume?.toLocaleLowerCase()}`}
              textTransform={'capitalize'}
            >
              <Tooltip
                className="tooltip-app"
                label={
                  !!+data?.totalTradingVolume
                    ? formatCommaNumber(data?.totalTradingVolume || 0)
                    : ''
                }
                placement="top"
                hasArrow
              >
                <Box cursor={'pointer'}>
                  {data?.totalTradingVolume
                    ? `$${formatNumber(data.totalTradingVolume, 4)}`
                    : '--'}
                </Box>
              </Tooltip>
            </Box>
          </Box>
          <Flex
            justifyContent="space-between"
            className="user-management--cell-body user-management--balance"
          >
            <Tooltip
              className="tooltip-app"
              label={
                !!+data?.balance ? formatCommaNumber(data?.balance || 0) : ''
              }
              placement="top"
              hasArrow
            >
              <Box cursor={'pointer'}>
                {data?.balance ? `$${formatNumber(data?.balance, 4)}` : '--'}
              </Box>
            </Tooltip>
          </Flex>
          <Box
            className="user-management--cell-body user-management--view-detail link"
            cursor={'pointer'}
            onClick={() => navigate(`/user/${data?.userID}`)}
          >
            View details
          </Box>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box>
      <AppDataTable
        fetchData={getUserManagement}
        renderBody={_renderContentTable}
        renderHeader={_renderHeaderTable}
        size={10}
      />
    </Box>
  );
};

export default UserList;
