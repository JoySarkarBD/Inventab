import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  return (
    <>
      <h2 className='text-center mb-4'>Revenue Chart 2023-2024</h2>

      <ResponsiveContainer width='100%' height={400}>
        <ComposedChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis yAxisId='left' />
          <YAxis yAxisId='right' orientation='right' />
          <Tooltip />

          <Bar dataKey='uv' fill='#8884d8' yAxisId='left'>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={"#2e75b5"} />
            ))}
          </Bar>
          <Bar dataKey='pv' fill='#f6b26b' yAxisId='left'>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={"#f6b26b"} />
            ))}
          </Bar>

          <Line
            type='monotone'
            dataKey='uv'
            stroke='#809499'
            strokeWidth={3}
            yAxisId='right'
          />
          <Line
            type='monotone'
            dataKey='pv'
            stroke='#ffd966'
            strokeWidth={3}
            yAxisId='right'
          />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default RevenueChart;
