import { useEffect, useState } from "react";
import axios from "../../utils/axios/axios";
import {
  kpiEachTotal,
  numDifferentiation,
} from "../../utils/utilityFunc/utilityFunc";

const KpiPo = () => {
  const [loading, setLoading] = useState(false);
  const [kpiPoList, setKpiList] = useState([]);
  const [kpiTotal, setKpiTotal] = useState([]);

  // get KPI  PO List
  const getKpiPo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `pipo/kpi/list/?org=0a055b26-ae15-40a9-8291-25427b94ebb3&metric=PO`
      );
      setLoading(false);
      setKpiList(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // load kpi PO list
  useEffect(() => {
    getKpiPo();
  }, []);

  //kpi PO each sub total
  useEffect(() => {
    if (kpiPoList.length > 0) {
      const kpiPoTotalArr = [];

      kpiPoList.forEach((kpi) => {
        // find the specific obj
        let findKpiEntry = kpiPoTotalArr.find((entry) => {
          entry?.department === kpi?.department;
        });
        // if not found then add
        if (!findKpiEntry) {
          findKpiEntry = {
            department: kpi?.department,
            total: kpiEachTotal(kpi),
          };
          kpiPoTotalArr.push(findKpiEntry);
          // console.log(findKpiEntry);
        }
      });

      setKpiTotal(kpiPoTotalArr);
    }
  }, [kpiPoList]);

  // kpi po total
  let kpiTotalSub = 0;
  for (let i of kpiTotal) {
    kpiTotalSub += i?.total;
  }
  return (
    <>
      {!loading && (
        <div className='col-xl-6 col-lg-6 col-xxl-6 col-md-12 col-sm-12'>
          <div className='card rounded-0 h-auto'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item bg-primary rounded-0 text-white d-flex justify-content-between'>
                <span className='mb-0 fs-4'>KPI-PO </span>
                <span className='fs-4'>
                  Total: {numDifferentiation(kpiTotalSub)}
                </span>
              </li>
            </ul>
            <div className='card-body p-0 rounded-0'>
              <div className='table-responsive'>
                <table className='table table-bordered'>
                  <thead style={{ background: "#343A40" }}>
                    <tr>
                      <th className='text-light ps-4 fs-5'>Department</th>
                      <th className='text-light ps-4 fs-5'>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpiTotal.length > 0 &&
                      kpiTotal.map((kpi) => {
                        return (
                          <tr key={kpi.department}>
                            <td className='ps-4'>{kpi.department}</td>
                            <td className='ps-4'>
                              {numDifferentiation(kpi?.total)}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KpiPo;
