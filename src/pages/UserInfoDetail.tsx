import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CopyIcon } from 'src/assets/icons';
import RowTransactionInfo from 'src/components/RowTransactionInfo';
import { BasePage } from 'src/components/layouts';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { formatTimestamp } from 'src/utils/format';
import { copyToClipboard } from 'src/utils/helpers';

const MOCK_INFO_USER = {
  userID: '1234566',
  userWallet: '0x75d9B6254D4AA0f9765b5FA1E48E2Fe9B8840B69',
  userTier: 'VIP 1',
  userBalance: '15006789',
  crossChainLiquidityPoolBalance: '15006789',
  firstTimeActive: 1697151091000,
  lastTimeActive: 1697151091000,
  totalOrders: 50,
  totalTradingVolume: '15006789',
  totalRefID: 20,
  totalReferees: 10,
  totalReferralRewards: '15006789',
  totalSharedRewards: '15006789',
  unclaimedRewards: '696789',
};

interface IUserInfoDetail {
  userID: string;
  userWallet: string;
  userTier: string;
  userBalance: string;
  crossChainLiquidityPoolBalance: string;
  firstTimeActive: number;
  lastTimeActive: number;
  totalOrders: number;
  totalTradingVolume: string;
  totalRefID: number;
  totalReferees: number;
  totalReferralRewards: string;
  totalSharedRewards: string;
  unclaimedRewards: string;
}
const UserInformationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [userInfoDetail, setUserInfoDetail] = useState<IUserInfoDetail>(null!);

  const handleNavigateToUserManagement = () => {
    navigate(-1);
  };

  const getUserInformationDetail = async () => {
    try {
      setUserInfoDetail(MOCK_INFO_USER);
      setIsLoading(false);
    } catch (error) {
      return { docs: [] };
    }
  };

  useEffectUnsafe(() => {
    getUserInformationDetail().then();
  }, [id]);

  const _renderContent = () => {
    if (isLoading) {
      return <Flex className={'box-loading'}>Loading...</Flex>;
    }

    if (!userInfoDetail) {
      return <Flex className={'box-loading'}>No data</Flex>;
    }

    return (
      <Box px={'40px'} mt={10} className="explorer-table">
        <RowTransactionInfo
          label="User ID"
          content={userInfoDetail?.userID || '--'}
        />
        <RowTransactionInfo
          label="User wallet"
          content={
            userInfoDetail?.userWallet ? (
              <Flex alignItems={'center'} color={'#5367FE'} gap={2}>
                <Box
                  cursor={'pointer'}
                  onClick={() =>
                    navigate(`/address/${userInfoDetail?.userWallet}`)
                  }
                >
                  {userInfoDetail?.userWallet}
                </Box>
                <span
                  onClick={() => copyToClipboard(userInfoDetail?.userWallet)}
                >
                  <CopyIcon className="copy-icon" />
                </span>
              </Flex>
            ) : (
              <Box>---</Box>
            )
          }
        />
        <RowTransactionInfo
          label="User tier"
          content={userInfoDetail?.userTier || '--'}
        />
        <RowTransactionInfo
          label="User’s balance"
          content={
            userInfoDetail?.userBalance
              ? `$${userInfoDetail?.userBalance} (value in USD)`
              : '--'
          }
        />
        <RowTransactionInfo
          label="Cross chain liquidity pool balance"
          content={
            userInfoDetail?.crossChainLiquidityPoolBalance
              ? `$${userInfoDetail?.crossChainLiquidityPoolBalance} (value in USD)`
              : '--'
          }
        />
        <RowTransactionInfo
          label="First time active"
          content={`${formatTimestamp(
            userInfoDetail?.firstTimeActive,
            'MMM DD YYYY HH:mm:ss',
          )}`}
        />
        <RowTransactionInfo
          label="Last time active"
          content={`${formatTimestamp(
            userInfoDetail?.lastTimeActive,
            'MMM DD YYYY HH:mm:ss',
          )}`}
        />
        <RowTransactionInfo
          label="Total orders"
          content={userInfoDetail?.totalOrders || '--'}
        />
        <RowTransactionInfo
          label="Total trading volume"
          content={
            userInfoDetail?.totalTradingVolume
              ? `$${userInfoDetail?.totalTradingVolume}`
              : '--'
          }
        />
        <RowTransactionInfo
          label="Total ref ID"
          content={userInfoDetail?.totalRefID || '--'}
        />
        <RowTransactionInfo
          label="Total referrees"
          content={userInfoDetail?.totalReferees || '--'}
        />
        <RowTransactionInfo
          label="Total referral rewards"
          content={
            userInfoDetail?.totalReferralRewards
              ? `$${userInfoDetail?.totalReferralRewards} (value in USD)`
              : '--'
          }
        />
        <RowTransactionInfo
          label="Total shared rewards"
          content={
            userInfoDetail?.totalSharedRewards
              ? `$${userInfoDetail?.totalSharedRewards} (value in USD)`
              : '--'
          }
        />
        <RowTransactionInfo
          label="Unclaimed rewards"
          content={
            userInfoDetail?.unclaimedRewards
              ? `$${userInfoDetail?.unclaimedRewards} (value in USD)`
              : '--'
          }
        />
      </Box>
    );
  };
  return (
    <BasePage>
      <Box>
        <Box className="container-explorer">
          <Flex fontSize="24px" flexDirection="row" alignItems="center">
            <Flex
              pb={'20px'}
              fontSize="24px"
              as="b"
              mr={'30px'}
              alignItems={'center'}
              gap={3}
            >
              <Text cursor={'pointer'} onClick={handleNavigateToUserManagement}>
                User Management
              </Text>
              <Box transform="rotate(180deg)">
                <ArrowLeftIcon />
              </Box>
              <Text fontSize="20px">User information details</Text>
            </Flex>
          </Flex>
          {_renderContent()}
        </Box>
      </Box>
    </BasePage>
  );
};

export default UserInformationDetail;
