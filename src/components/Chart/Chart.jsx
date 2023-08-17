import React from "react";
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

const StackedBarChartExample = ({ data }) => {
  const months = [
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
    "jan",
    "feb",
    "mar",
  ];

  // Generate a random color code
  const generateRandomColor = () => {
    const colorOptions = ["#2e75b5", "#333333", "#87CEEB"]; // Dark blue, dark gray, sky blue
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[randomIndex];
  };

  const calculateTotal = (data, month) => {
    let total = 0;
    data?.forEach((department) => {
      if (department[month] !== null) {
        total += department[month];
      }
    });
    return total;
  };

  const formattedDataWithTotal = months.map((month) => {
    const entry = { month };
    data?.forEach((department) => {
      entry[department.department] = department[month];
    });
    entry.total = calculateTotal(data, month) || 0; // Add the total for the month
    return entry;
  });

  console.log(formattedDataWithTotal);

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
        {data?.map((department, index) => (
          <>
            <Bar
              key={index}
              dataKey={department?.department}
              stackId='a'
              fill={generateRandomColor()}
            />
          </>
        ))}
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

export default StackedBarChartExample;
