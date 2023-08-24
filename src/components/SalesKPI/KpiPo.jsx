import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../ui/Loader";
import {
  kpiEachTotal,
  numDifferentiation,
} from "../../utils/utilityFunc/utilityFunc";

const KpiPo = () => {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [kpiPoList, setKpiList] = useState([]);
  const [kpiTotal, setKpiTotal] = useState([]);

  // load kpi PO list
  useEffect(() => {
    // get KPI  PO List
    let isMount = true;
    const controller = new AbortController();

    const getKpiPo = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `pipo/kpi/list/?org=${auth?.orgId}&metric=PO`,
          { signal: controller.signal }
        );
        setLoading(false);
        isMount && setKpiList(data?.results);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getKpiPo();

    return () => {
      (isMount = false), controller.abort();
    };
  }, [axios, auth?.orgId]);

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
      {!loading ? (
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default KpiPo;
