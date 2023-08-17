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
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
    entry.total = calculateTotal(data, month); // Add the total for the month
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
              dataKey={department.department}
              stackId='a'
              fill={generateRandomColor()}
            />
          </>
        ))}
        <Line
          type='monotone'
          dataKey='total'
          stroke='#8884d8'
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChartExample;

/* let arr = [
  {
    apr: 4000000,
    aug: 9300000,
    dec: 19900000,
    department: "SLS-KAM-WEST",
    feb: 26100000,
    jan: 18900000,
    jul: 20300000,
    jun: 7550000,
    mar: 7800000,
    may: 9700000,
    nov: 14900000,
    oct: 21100000,
    sep: 15400000,
    total: 174950000,
  },
  {
    apr: 4000000,
    aug: 9300000,
    dec: 19900000,
    department: "SLS-KAM-SOUTH",
    feb: 26100000,
    jan: 18900000,
    jul: 20300000,
    jun: 7550000,
    mar: 7800000,
    may: 9700000,
    nov: 14900000,
    oct: 21100000,
    sep: 15400000,
    total: 174950000,
  },
  {
    apr: 4000000,
    aug: 9300000,
    dec: 19900000,
    department: "SLS-KAM-NORTH",
    feb: 26100000,
    jan: 18900000,
    jul: 20300000,
    jun: 7550000,
    mar: 7800000,
    may: 9700000,
    nov: 14900000,
    oct: 21100000,
    sep: 15400000,
    total: 174950000,
  },
]; */
