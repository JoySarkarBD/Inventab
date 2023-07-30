const KpiInvoice = () => {
  return (
    <div className='col-xl-6 col-lg-6 col-xxl-6 col-md-12 col-sm-12'>
      <div className='card rounded-0 h-auto'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item bg-primary rounded-0 text-white d-flex justify-content-between'>
            <span className='mb-0 fs-4'>KPI-INVOICE </span>
            <span className='fs-4'>Total:22.48 Cr.</span>
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
                <tr>
                  <td className='ps-4'>SLS-KAM-NORTH</td>
                  <td className='ps-4'>0.11 Cr.</td>
                </tr>
                <tr>
                  <td className='ps-4'>SLS-KAM-SOUTH</td>
                  <td className='ps-4'>4.62 Cr.</td>
                </tr>
                <tr>
                  <td className='ps-4'>SLS-KAM-WEST</td>
                  <td className='ps-4'>17.75 Cr.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiInvoice;
