import { Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BaseBranchAdminPage } from 'src/components/layouts';
import 'src/styles/pages/ManageCategoryListPage.scss';

import rf from 'src/api/RequestFactory';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts';

interface IDataInsight {
  branchId: number;
  branchName: string;
  total: number;
}

const BranchStatistical = () => {
  const [dataChart, setDataChart] = useState<IDataInsight[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await rf.getRequest('InsightRequest').insightIsBranchAdmin();
      console.log('res: ', res);
      setDataChart(res);
    };

    fetchData();
  }, []);

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#4EFFEF',
    '#73A6AD',
    '#9B97B2',
    '#D8A7CA',
    '#C7B8EA',
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // const _renderPieChart = () => {
  //   return (
  //     <PieChart width={800} height={800}>
  //       <Pie
  //         data={dataChart.map((item) => ({ ...item, total: 100 }))}
  //         cx={200}
  //         cy={200}
  //         labelLine={false}
  //         label={renderCustomizedLabel}
  //         outerRadius={200}
  //         fill="#8884d8"
  //         dataKey="total"
  //       >
  //         {dataChart
  //           .map((item) => ({ ...item, total: 100 }))
  //           .map((entry, index) => (
  //             <Cell
  //               key={`cell-${index}`}
  //               fill={COLORS[index % COLORS.length]}
  //             />
  //           ))}
  //       </Pie>
  //     </PieChart>
  //   );
  // };

  // const _renderTinyChart = () => {
  //   return (
  //     <ResponsiveContainer width="100%" height="100%">
  //       <BarChart
  //         width={500}
  //         height={300}
  //         data={dataChart}
  //         margin={{
  //           top: 20,
  //           right: 30,
  //           left: 20,
  //           bottom: 5,
  //         }}
  //       >
  //         <CartesianGrid strokeDasharray="3 3" />
  //         <XAxis dataKey="branchName" />
  //         <YAxis />
  //         <Tooltip />
  //         <Legend />
  //         <Bar dataKey="total" stackId="a" fill="#2167df" />
  //       </BarChart>
  //     </ResponsiveContainer>
  //   );
  // };

  return (
    <BaseBranchAdminPage>
      <Box overflow={'auto'} pt={0}>
        <Box>
          <Text fontSize="24px" as="b" mr={'30px'} color={'#2167df'}>
            Thống kê
          </Text>
        </Box>
        <Box mt={10}>
          <Box h={400} mb={100}>
            <Text color={'#2167df'}>Insight Order</Text>
            {/* {_renderTinyChart()} */}
          </Box>
          <Box h={400} w={400}>
            <Text color={'#2167df'}>Insight Order</Text>
            {/* {_renderPieChart()} */}
          </Box>
        </Box>
      </Box>
    </BaseBranchAdminPage>
  );
};

export default BranchStatistical;
