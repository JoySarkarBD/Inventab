import PageTitle from "../../../components/Shared/PageTitle";

const SalesDashboard = () => {
  return (
    <>
      <PageTitle title='Sales Dashboard' />
      <div className='row'>
        <div className='col-xl-9 col-xxl-12'>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesDashboard;
