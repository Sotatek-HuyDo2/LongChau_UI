import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { BasePage } from 'src/components/layouts';
import AppButton from '../components/AppButton';
import 'src/styles/pages/MarketingPage.scss';
import 'src/styles/pages/DelistPage.scss';
import { useNavigate } from 'react-router-dom';
import { MOCK_MAKETING } from 'src/utils/constants';
import { formatTimestamp } from 'src/utils/format';
import { AppDataTable } from 'src/components';
import { EditIcon } from 'src/assets/icons';

interface IMaketing {
  type: string;
  title: string;
  fromTime: number;
  toTime: number;
  status: string;
}

const MarketingPage = () => {
  const navigate = useNavigate();

  const getListing = async () => {
    try {
      return {
        docs: MOCK_MAKETING,
        // totalPages: 10,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="delist--header-cell-body delist--type">Type</Box>
        <Box className="delist--header-cell-body delist--pair">Title</Box>
        <Box className="delist--header-cell-body delist--time">Time stamp</Box>
        <Box className="delist--header-cell-body delist--status">Status</Box>
        <Box className="delist--header-cell-body delist--action">Edit</Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: IMaketing[]) => {
    return (
      <Box>
        {data.map((data: IMaketing, id: number) => {
          return (
            <RowAddressTransactionTable data={data} key={`${id}-coin-table`} />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: IMaketing;
  }> = ({ data }) => {
    return (
      <Flex className="delist--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="delist--cell-body delist--type">
            <Box cursor={'pointer'}>{data?.type}</Box>
          </Flex>
          <Box className="delist--cell-body delist--pair">
            <Box
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxW="145px"
            >
              {data?.title ? `$${data?.title}` : '--'}
            </Box>
          </Box>
          <Flex flexDirection="row" className="delist--cell-body delist--time">
            {formatTimestamp(data?.fromTime, 'YYYY-MM-DD HH:mm:ss')} to{' '}
            {formatTimestamp(data?.fromTime, 'HH:mm:ss')}
          </Flex>
          <Box className="delist--cell-body delist--status">
            <Box>{data?.status ? data?.status : '--'}</Box>
          </Box>
          <Box
            className={`delist--cell-body delist--action ${
              data?.status === 'Published' ? 'edit' : ''
            }`}
          >
            <Box cursor={'pointer'} mr={3}>
              <EditIcon />
            </Box>
          </Box>
        </Flex>
      </Flex>
    );
  };
  return (
    <BasePage>
      <Box className="marketing">
        <Box pb="30px">
          <Text fontSize="24px" as="b" mr={'30px'}>
            Marketing
          </Text>
        </Box>

        <Box className="marketing__action">
          <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            pb={'30px'}
            borderBottom={'1px solid #282A38'}
            width="500px"
          >
            <Box className="marketing__action-title" mr={20}>
              Create a new notification
            </Box>

            <Box>
              <AppButton
                size={'sm'}
                onClick={() => navigate('/create-notification')}
              >
                Create
              </AppButton>
            </Box>
          </Flex>

          <Flex
            alignItems={'center'}
            pt={'30px'}
            width="500px"
            justifyContent={'space-between'}
          >
            <Box className="marketing__action-title" mr={20}>
              Create a new push notification
            </Box>

            <Box>
              <AppButton
                size={'sm'}
                onClick={() => navigate('/create-push-notification')}
              >
                Create
              </AppButton>
            </Box>
          </Flex>
        </Box>

        <Box className="marketing__title">List notifications</Box>
        <Box mt={10} className="delist-container">
          <AppDataTable
            fetchData={getListing}
            renderBody={_renderContentTable}
            renderHeader={_renderHeaderTable}
            size={10}
          />
        </Box>
      </Box>
    </BasePage>
  );
};

export default MarketingPage;
