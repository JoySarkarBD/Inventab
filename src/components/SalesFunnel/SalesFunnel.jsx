import { useEffect, useState } from "react";
import { Funnel, FunnelChart, LabelList, Tooltip } from "recharts";
import axios from "../../utils/axios/axios";

export default function SalesFunnel() {
  const [loading, setLoading] = useState(false);
  const [salesFunnel, setSalesFunnel] = useState([]);

  // Create an object to store the counts for each status

  const getSalesFunnelData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "pipo/sales/lead/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
      );
      // console.log(data);

      const statusCounts = {};
      data?.results.forEach((lead) => {
        const status = lead.status;
        if (statusCounts.hasOwnProperty(status)) {
          statusCounts[status]++;
        } else {
          statusCounts[status] = 1;
        }
      });

      // Create the final data array
      const finalData = [
        { status: "Prospect", count: statusCounts["Prospect"] || 0 },
        { status: "Approach", count: statusCounts["Approach"] || 0 },
        { status: "Qualify", count: statusCounts["Qualify"] || 0 },
        { status: "Pitch", count: statusCounts["Pitch"] || 0 },
        {
          status: "Handle Objections",
          count: statusCounts["Handle Objections"] || 0,
        },
        {
          status: "Close the Deal",
          count: statusCounts["Close the Deal"] || 0,
        },
        { status: "Lost Deal", count: statusCounts["Lost Deal"] || 0 },
      ];
      setLoading(false);
      setSalesFunnel(finalData);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  console.log(salesFunnel);

  // load leads
  useEffect(() => {
    getSalesFunnelData();
  }, []);

  const data = [
    {
      value: 100,
      name: "展现",
      fill: "#8884d8",
    },
    {
      value: 80,
      name: "点击",
      fill: "#83a6ed",
    },
    {
      value: 50,
      name: "访问",
      fill: "#8dd1e1",
    },
    {
      value: 40,
      name: "咨询",
      fill: "#82ca9d",
    },
    {
      value: 26,
      name: "订单",
      fill: "#a4de6c",
    },
  ];

  return (
    <div>
      <FunnelChart width={730} height={250}>
        <Tooltip />
        <Funnel dataKey='value' data={data} isAnimationActive>
          <LabelList
            position='right'
            fill='#000'
            stroke='none'
            dataKey='name'
          />
        </Funnel>
      </FunnelChart>
    </div>
  );
}
