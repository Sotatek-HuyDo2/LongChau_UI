import { Box, Flex } from '@chakra-ui/react';
import { AppDateRangePicker, AppSelect } from 'src/components';
import { useState } from 'react';
import rf from 'src/api/RequestFactory';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import { fillFullResolution, filterParams } from 'src/utils/helpers';
import moment from 'moment';
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatTimestamp } from 'src/utils/format';
import BigNumber from 'bignumber.js';

interface IParams {
  endTime?: number | null;
  startTime?: number | null;
  pair?: string;
}

interface IPairOption {
  value: string;
  label: string;
}

interface CustomTooltipProps {
  active?: boolean;
  type?: 'address' | 'balance';
  payload?: Array<{
    value: number;
    payload: any;
  }>;
}

interface IPair {
  id: number;
  symbol: string;
  baseCurrencyId: number;
  baseCurrencySymbol: string;
  quoteCurrencyId: number;
  quoteCurrencySymbol: string;
  makerFee: string;
  takerFee: string;
  pricePrecision: number;
  quantityPrecision: number;
  minimumQty: string;
  maximumQty: string;
}

const startTime = moment().utc().subtract(90, 'days').startOf('day').valueOf();
const endTime = moment().utc().subtract(1, 'days').startOf('day').valueOf();

const getXTicks = () => {
  const result: number[] = [];
  for (let i = 0; i < 45; i++) {
    result.push(
      moment()
        .utc()
        .subtract(90, 'days')
        .startOf('day')
        .add(i * 2, 'days')
        .valueOf(),
    );
  }
  return result;
};

const CustomTooltip = ({ active, payload, type }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Box className="custom-tooltip-explorer-chart">
        {formatTimestamp(
          payload[0]?.payload?.timestamp,
          'dddd, MMM DD, YYYY',
          true,
        )}{' '}
        <br />
        {payload.map((item: any, index) => {
          return (
            <span key={index}>
              {item?.name}:{' '}
              <b>
                {type === 'balance' ? '$' : ''}
                {BigNumber(item?.value).toFormat()}
              </b>
            </span>
          );
        })}
      </Box>
    );
  }

  return null;
};

const CustomBarShape = (props: any) => {
  const { width, ...rest } = props;

  return <rect width={13} {...rest} />;
};

const PairVolumeChart = () => {
  const [params, setParams] = useState<IParams>({});
  const [pairs, setPairs] = useState<IPairOption[]>([]);
  const [data, setData] = useState<
    {
      volume: number;
      timestamp: number;
    }[]
  >([]);

  const getData = async (payload: IParams) => {
    try {
      const res = await rf.getRequest('TradeRequest').getTradingVolume(
        filterParams({
          from: payload.startTime,
          to: payload.endTime,
          pairId: payload.pair,
          resolution: 86400000,
        }),
      );
      if (res.data) {
        let dataFormat = res.data.map((item: any) => {
          const pair = item.pairs[0];
          const volume = new BigNumber(pair.baseFactor)
            .multipliedBy(new BigNumber(pair.baseVolume))
            .toNumber();
          return {
            volume,
            timestamp: +item.timestamp,
          };
        });

        dataFormat = fillFullResolution(
          payload?.startTime || 0,
          payload?.endTime || 0,
          86400,
          dataFormat,
          {
            volume: 0,
          },
        );

        setData(dataFormat);
      }
    } catch (error) {
      setData([]);
    }
  };

  const getPairs = async () => {
    try {
      const res = await rf.getRequest('MarketDataRequest').getAllPair();
      if (res.data) {
        const pairs = res.data.map((item: IPair) => {
          return {
            value: item.id,
            label: `${item.baseCurrencySymbol}/${item.quoteCurrencySymbol}`,
          };
        });
        setPairs(pairs);
        setParams({
          ...params,
          startTime,
          endTime,
          pair: pairs[0].value,
        });
      }
    } catch (error) {
      setPairs([]);
    }
  };

  useEffectUnsafe(() => {
    getPairs().then();
  }, []);

  useEffectUnsafe(() => {
    if (!!params.pair) {
      getData(params).then();
    }
  }, [params]);

  const Chart = () => {
    return (
      <ResponsiveContainer height="100%" width="100%">
        <BarChart
          margin={{
            top: 10,
          }}
          barGap={2}
          data={data}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="timestamp"
            type="number"
            tick={{
              fill: '#6C7080',
              fontSize: 12,
              fontWeight: 400,
            }}
            padding={{ left: 20, right: 20 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(time) => formatTimestamp(time, 'MMM DD')}
            domain={[params?.startTime || 0, params?.endTime || 0]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#414558' }} />
          <Bar
            dataKey="volume"
            name="Volume"
            fill="#5367FE"
            shape={<CustomBarShape />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Box>
      <Flex justifyContent={'flex-end'} mb={3}>
        <AppSelect
          width={'120px'}
          options={pairs}
          value={params?.pair || ''}
          onChange={(value: string) => {
            setParams({
              ...params,
              pair: value,
            });
          }}
        />
        <Box ml={10}>
          <AppDateRangePicker params={params} setParams={setParams} />
        </Box>
      </Flex>

      <Box w={'full'} h={'300px'}>
        <Chart />
      </Box>

      <Flex justifyContent={'center'} mt={3}>
        Pair Volume
      </Flex>
    </Box>
  );
};

export default PairVolumeChart;
