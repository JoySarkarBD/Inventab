import { useEffect, useState } from "react";
import axios from "../../../utils/axios/axios";

export default function MetricPO() {
  const [metricPo, setMetricPo] = useState([]);
  const [loading, setLoading] = useState(false);

  const metricFunc = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "invoices/fetch/all/invoices/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
      );
      setMetricPo(data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  // load leads
  useEffect(() => {
    metricFunc();
  }, []);

  console.log(metricPo);

  return (
    <>
      <h2 className="text-center mb-4">Actual-PO</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Department</th>
            <th scope="col">Apr-23</th>
            <th scope="col">May-23</th>
            <th scope="col">Jun-23</th>
            <th scope="col">Jul-23</th>
            <th scope="col">Aug-23</th>
            <th scope="col">Sep-23</th>
            <th scope="col">Oct-23</th>
            <th scope="col">Nov-23</th>
            <th scope="col">Dec-23</th>
            <th scope="col">Jan-24</th>
            <th scope="col">Feb-24</th>
            <th scope="col">Mar-24</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <p className="text-dark">Department-1</p>
            </th>
            <td>
              <p className="text-dark">Mark</p>
            </td>
            <td>
              <p className="text-dark">Mark</p>
            </td>
            <td>
              <p className="text-dark">Mark</p>
            </td>
            <td>
              <p className="text-dark">Mark</p>
            </td>
            <td>
              <p className="text-dark">Otto</p>
            </td>
            <td>
              <p className="text-dark">Otto</p>
            </td>
            <td>
              <p className="text-dark">Otto</p>
            </td>
            <td>
              <p className="text-dark">Otto</p>
            </td>
            <td>
              <p className="text-dark">@mdo</p>
            </td>
            <td>
              <p className="text-dark">@mdo</p>
            </td>
            <td>
              <p className="text-dark">@mdo</p>
            </td>
            <td>
              <p className="text-dark">@mdo</p>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p className="text-dark">Department-2</p>
            </th>
            <td>
              <p className="text-dark">Jacob</p>
            </td>
            <td>
              <p className="text-dark">Jacob</p>
            </td>
            <td>
              <p className="text-dark">Jacob</p>
            </td>
            <td>
              <p className="text-dark">Jacob</p>
            </td>
            <td>
              <p className="text-dark">Thornton</p>
            </td>
            <td>
              <p className="text-dark">Thornton</p>
            </td>
            <td>
              <p className="text-dark">Thornton</p>
            </td>
            <td>
              <p className="text-dark">Thornton</p>
            </td>
            <td>
              <p className="text-dark">@fat</p>
            </td>
            <td>
              <p className="text-dark">@fat</p>
            </td>
            <td>
              <p className="text-dark">@fat</p>
            </td>
            <td>
              <p className="text-dark">@fat</p>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p className="text-dark">Department-3</p>
            </th>
            <td>
              <p className="text-dark">@fat</p>
            </td>
            <td>
              <p className="text-dark">@fat</p>
            </td>
            <td>
              <p className="text-dark">@fat</p>
            </td>
            <td>
              <p className="text-dark">@fat</p>
            </td>
            <td>
              <p className="text-dark">Larry Bird</p>
            </td>
            <td>
              <p className="text-dark">Larry Bird</p>
            </td>
            <td>
              <p className="text-dark">Larry Bird</p>
            </td>
            <td>
              <p className="text-dark">Larry Bird</p>
            </td>
            <td>
              <p className="text-dark">@twitter</p>
            </td>
            <td>
              <p className="text-dark">@twitter</p>
            </td>
            <td>
              <p className="text-dark">@twitter</p>
            </td>
            <td>
              <p className="text-dark">@twitter</p>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
