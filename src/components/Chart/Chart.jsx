import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

  const formattedData = months.map((month) => {
    const entry = { month };
    data?.forEach((department) => {
      entry[department.department] = department[month];
    });
    return entry;
  });

  // Generate a random color code
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <ResponsiveContainer width='100%' height={400}>
      <BarChart
        width={800}
        height={400}
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map((department, index) => (
          <Bar
            key={index}
            dataKey={department.department}
            stackId='a'
            fill={generateRandomColor()}
          />
        ))}
      </BarChart>
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
