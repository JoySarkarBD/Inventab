/* eslint-disable react/prop-types */

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RevenueChart = ({ chartData }) => {
  const { data, formattedDataWithTotal } = chartData;

  // Generate a random color code
  const generateRandomColorCode = () => {
    const letters = "0123456789ABCDEF";
    let colorCode = "#";

    for (let i = 0; i < 6; i++) {
      colorCode += letters[Math.floor(Math.random() * 16)];
    }

    return colorCode;
  };
  return (
    <ResponsiveContainer width='100%' height={400}>
      <ComposedChart
        width={800}
        height={400}
        data={formattedDataWithTotal}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />
        <Legend />
        {data?.map((department, index) => {
          return (
            <Bar
              key={index}
              dataKey={department?.department}
              stackId='a'
              fill={generateRandomColorCode()}
            />
          );
        })}
        <Line
          type='monotone'
          dataKey='total'
          stroke='#f39c12'
          strokeWidth={4}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
