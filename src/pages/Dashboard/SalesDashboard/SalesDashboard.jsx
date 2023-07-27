import RevenueChart from "../../../components/Chart/Chart";
import PageTitle from "../../../components/Shared/PageTitle";

const SalesDashboard = () => {
  return (
    <>
      <PageTitle title='Sales Dashboard' />
      <div className='row'>
        {/* Chart section */}
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              {/* <div className='row align-items-center'>
                <div className='col-xl-6'>
                  <div className='card-bx bg-blue'>
                    <img
                      className='pattern-img'
                      src='images/pattern/pattern6.png'
                      alt
                    />
                    <div className='card-info text-white'>
                      <img
                        src='images/pattern/circle.png'
                        className='mb-4'
                        alt
                      />
                      <h2 className='text-white card-balance'>$824,571.93</h2>
                      <p className='fs-16'>Wallet Balance</p>
                      <span>+0,8% than last week</span>
                    </div>
                    <a className='change-btn' href='javascript:void(0);'>
                      <i className='fa fa-caret-up up-ico' />
                      Change
                      <span className='reload-icon'>
                        <i className='fas fa-sync-alt reload active' />
                      </span>
                    </a>
                  </div>
                </div>
                <div className='col-xl-6'>
                  <div className='row align-items-center  mt-xl-0 mt-4'>
                    <div className='col-md-6'>
                      <h4 className='card-title'>Cards Overview</h4>
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        psu olor
                      </span>
                      <ul className='card-list mt-4'>
                        <li>
                          <span className='bg-blue circle' />
                          Account<span>20%</span>
                        </li>
                        <li>
                          <span className='bg-success circle' />
                          Services<span>40%</span>
                        </li>
                        <li>
                          <span className='bg-warning circle' />
                          Restaurant<span>15%</span>
                        </li>
                        <li>
                          <span className='bg-light circle' />
                          Others<span>15%</span>
                        </li>
                      </ul>
                    </div>
                    <div className='col-md-6' style={{ height: 200 }}>
                      <canvas id='polarChart' />
                    </div>
                  </div>
                </div>
              </div> */}
              <RevenueChart />
            </div>
          </div>
        </div>
        {/*  */}
        <div className='col-xl-6 col-xxl-12 my-4'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='card progress-card'>
                <div className='card-body d-flex'>
                  <div className='me-auto'>
                    <h4 className='card-title'>Total Transactions</h4>
                    <div className='d-flex align-items-center'>
                      <h2 className='fs-38 mb-0'>98k</h2>
                      <div className='text-success transaction-caret'>
                        <i className='fas fa-sort-up' />
                        <p className='mb-0'>+0.5%</p>
                      </div>
                    </div>
                  </div>
                  {/* <div
                    className='progress progress-vertical-bottom'
                    style={{ minHeight: 110, minWidth: 10 }}>
                    <div
                      className='progress-bar bg-primary'
                      style={{ width: 10, height: "40%" }}
                      role='progressbar'>
                      <span className='sr-only'>40% Complete</span>
                    </div>
                  </div>
                  <div
                    className='progress progress-vertical-bottom'
                    style={{ minHeight: 110, minWidth: 10 }}>
                    <div
                      className='progress-bar bg-primary'
                      style={{ width: 10, height: "55%" }}
                      role='progressbar'>
                      <span className='sr-only'>55% Complete</span>
                    </div>
                  </div>
                  <div
                    className='progress progress-vertical-bottom'
                    style={{ minHeight: 110, minWidth: 10 }}>
                    <div
                      className='progress-bar bg-primary'
                      style={{ width: 10, height: "80%" }}
                      role='progressbar'>
                      <span className='sr-only'>80% Complete</span>
                    </div>
                  </div>
                  <div
                    className='progress progress-vertical-bottom'
                    style={{ minHeight: 110, minWidth: 10 }}>
                    <div
                      className='progress-bar bg-primary'
                      style={{ width: 10, height: "50%" }}
                      role='progressbar'>
                      <span className='sr-only'>50% Complete</span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='card-title'>Invoice Remaining</h4>
                  {/* <div className='d-flex align-items-center'>
                    <div className='me-auto'>
                      <div className='progress mt-4' style={{ height: 10 }}>
                        <div
                          className='progress-bar bg-primary progress-animated'
                          style={{ width: "45%", height: 10 }}
                          role='progressbar'>
                          <span className='sr-only'>60% Complete</span>
                        </div>
                      </div>
                      <p className='fs-16 mb-0 mt-2'>
                        <span className='text-danger'>-0,8% </span>from last
                        month
                      </p>
                    </div>
                    <h2 className='fs-38'>854</h2>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;
