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
import { getColorForDepartment } from "../../utils/utilityFunc/utilityFunc";

const RevenueChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <ComposedChart
        width={800}
        height={400}
        data={chartData?.formattedDataWithTotal}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />
        <Legend />
        {chartData?.data?.map((department, index) => {
          return (
            <Bar
              key={index}
              dataKey={department?.department}
              stackId='a'
              fill={getColorForDepartment(index)}
            />
          );
        })}
        <Line type='linear' dataKey='total' stroke='#f39c12' strokeWidth={4} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
