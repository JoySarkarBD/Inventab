/* eslint-disable no-dupe-keys */
import { useEffect, useState } from "react";
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
import { useChart } from "../../hooks/useChart";
import { kpiEachTotal } from "../../utils/utilityFunc/utilityFunc";

/* [
  {
    name: "jan",
    "SLS-KAM-NORTH": 18900000,
    "SLS-KAM-WEST": 18900000,
    "SLS-KAM-SOUTH": 18900000,
  },
  {
    name: "feb",
    "SLS-KAM-NORTH": 18900000,
    "SLS-KAM-WEST": 18900000,
    "SLS-KAM-SOUTH": 18900000,
  },
  {
    name: "mar",
    "SLS-KAM-NORTH": 18900000,
    "SLS-KAM-WEST": 18900000,
    "SLS-KAM-SOUTH": 18900000,
  },
]; */

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const RevenueChart = () => {
  const [kpiPoChartData, setKpiPoChartData] = useState([]);
  const { kpiPoChart } = useChart();

  useEffect(() => {
    if (kpiPoChart?.length && kpiPoChart?.length > 0) {
      let kpiArr = [];
      kpiPoChart.forEach((kpi) => {
        let entryKpi = kpiArr.find((k) => k?.department === kpi?.department);
        if (!entryKpi) {
          entryKpi = {
            department: kpi?.department,
            jan: kpi?.jan,
            feb: kpi?.feb,
            mar: kpi?.mar,
            apr: kpi?.apr,
            may: kpi?.may,
            jun: kpi?.jun,
            jul: kpi?.jul,
            aug: kpi?.aug,
            sep: kpi?.sep,
            oct: kpi?.oct,
            nov: kpi?.nov,
            dec: kpi?.dec,
            total: kpiEachTotal(kpi),
          };

          kpiArr.push(entryKpi);
        }
      });

      let transformedArray = [];
      let months = Object.keys(kpiArr[0]).filter(
        (key) => key !== "department" && key !== "total"
      );
      // Loop through each month and create the desired format
      months.forEach((month) => {
        let newObj = { name: month };
        kpiArr.forEach((item) => {
          newObj[item.department] = item[month] ? item[month] : 0;
        });
        transformedArray.push(newObj);
      });

      // console.log(transformedArray);
      let totalByMonth = [];

      for (let monthObj of transformedArray) {
        let monthTotal = 0;

        for (let department in monthObj) {
          if (department !== "name") {
            monthTotal += monthObj[department];
          }
        }

        totalByMonth.push({ [monthObj.name]: monthTotal });
      }

      // console.log(totalByMonth);
    }
  }, [kpiPoChart?.length, kpiPoChart]);
  return (
    <>
      <h2 className='text-center mb-4'>Revenue Chart 2023-2024</h2>

      <ResponsiveContainer width='100%' height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='pv' stackId='a' fill='#8884d8' />
          <Bar dataKey='uv' stackId='a' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default RevenueChart;
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
