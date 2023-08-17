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
  const generateRandomColor = () => {
    const colorOptions = ["#2e75b5", "#333333", "#87CEEB"]; // Dark blue, dark gray, sky blue
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[randomIndex];
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
              fill={generateRandomColor()}
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
