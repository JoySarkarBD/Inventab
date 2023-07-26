import avatar1 from "../../../assets/images/avatar/3.jpg";
import profile1 from "../../../assets/images/profile/pic1.jpg";

const Header = () => {
  return (
    <>
      <div className='header'>
        <div className='header-content'>
          <nav className='navbar navbar-expand'>
            <div className='collapse navbar-collapse justify-content-between'>
              <div className='header-left'>
                <div className='dashboard_bar'>Dashboard</div>
              </div>
              <ul className='navbar-nav header-right'>
                <li className='nav-item dropdown notification_dropdown'>
                  <a
                    className='nav-link bell dz-theme-mode p-0'
                    href='javascript:void(0);'>
                    <i id='icon-light' className='fas fa-sun' />
                    <i id='icon-dark' className='fas fa-moon' />
                  </a>
                </li>
                <li className='nav-item dropdown notification_dropdown'>
                  <a
                    className='nav-link  ai-icon'
                    href='javascript:void(0);'
                    role='button'
                    data-bs-toggle='dropdown'>
                    <svg
                      width={28}
                      height={28}
                      viewBox='0 0 28 28'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M12.638 4.9936V2.3C12.638 1.5824 13.2484 1 14.0006 1C14.7513 1 15.3631 1.5824 15.3631 2.3V4.9936C17.3879 5.2718 19.2805 6.1688 20.7438 7.565C22.5329 9.2719 23.5384 11.5872 23.5384 14V18.8932L24.6408 20.9966C25.1681 22.0041 25.1122 23.2001 24.4909 24.1582C23.8709 25.1163 22.774 25.7 21.5941 25.7H15.3631C15.3631 26.4176 14.7513 27 14.0006 27C13.2484 27 12.638 26.4176 12.638 25.7H6.40705C5.22571 25.7 4.12888 25.1163 3.50892 24.1582C2.88759 23.2001 2.83172 22.0041 3.36039 20.9966L4.46268 18.8932V14C4.46268 11.5872 5.46691 9.2719 7.25594 7.565C8.72068 6.1688 10.6119 5.2718 12.638 4.9936ZM14.0006 7.5C12.1924 7.5 10.4607 8.1851 9.18259 9.4045C7.90452 10.6226 7.18779 12.2762 7.18779 14V19.2C7.18779 19.4015 7.13739 19.6004 7.04337 19.7811C7.04337 19.7811 6.43703 20.9381 5.79662 22.1588C5.69171 22.3603 5.70261 22.6008 5.82661 22.7919C5.9506 22.983 6.16996 23.1 6.40705 23.1H21.5941C21.8298 23.1 22.0492 22.983 22.1732 22.7919C22.2972 22.6008 22.3081 22.3603 22.2031 22.1588C21.5627 20.9381 20.9564 19.7811 20.9564 19.7811C20.8624 19.6004 20.8133 19.4015 20.8133 19.2V14C20.8133 12.2762 20.0953 10.6226 18.8172 9.4045C17.5391 8.1851 15.8073 7.5 14.0006 7.5Z'
                        fill='#4f7086'
                      />
                    </svg>
                    <span className='badge light text-white bg-primary rounded-circle'>
                      12
                    </span>
                  </a>
                  <div className='dropdown-menu dropdown-menu-end'>
                    <div
                      id='dlab_W_Notification1'
                      className='widget-media dlab-scroll p-3'
                      style={{ height: 380 }}>
                      <ul className='timeline'>
                        <li>
                          <div className='timeline-panel'>
                            <div className='media me-2'>
                              <img alt='image' width={50} src={avatar1} />
                            </div>
                            <div className='media-body'>
                              <h6 className='mb-1'>
                                Dr sultads Send you Photo
                              </h6>
                              <small className='d-block'>
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='timeline-panel'>
                            <div className='media me-2 media-info'>KG</div>
                            <div className='media-body'>
                              <h6 className='mb-1'>
                                Resport created successfully
                              </h6>
                              <small className='d-block'>
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='timeline-panel'>
                            <div className='media me-2 media-success'>
                              <i className='fa fa-home' />
                            </div>
                            <div className='media-body'>
                              <h6 className='mb-1'>
                                Reminder : Treatment Time!
                              </h6>
                              <small className='d-block'>
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='timeline-panel'>
                            <div className='media me-2'>
                              <img alt='image' width={50} src={avatar1} />
                            </div>
                            <div className='media-body'>
                              <h6 className='mb-1'>
                                Dr sultads Send you Photo
                              </h6>
                              <small className='d-block'>
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='timeline-panel'>
                            <div className='media me-2 media-danger'>KG</div>
                            <div className='media-body'>
                              <h6 className='mb-1'>
                                Resport created successfully
                              </h6>
                              <small className='d-block'>
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className='timeline-panel'>
                            <div className='media me-2 media-primary'>
                              <i className='fa fa-home' />
                            </div>
                            <div className='media-body'>
                              <h6 className='mb-1'>
                                Reminder : Treatment Time!
                              </h6>
                              <small className='d-block'>
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <a
                      className='all-notification text-primary'
                      href='javascript:void(0);'>
                      See all notifications <i className='ti-arrow-right' />
                    </a>
                  </div>
                </li>
                <li className='nav-item dropdown header-profile'>
                  <a
                    className='nav-link'
                    href='javascript:void(0);'
                    role='button'
                    data-bs-toggle='dropdown'>
                    <img
                      src={profile1}
                      className='img-fluid rounded-circle'
                      width={60}
                      alt
                    />
                    {/* <div className="header-info ms-3">
											<span className="font-w600 ">Hi,<b>William</b></span>
											<small className="text-end font-w400">william@gmail.com</small>
										</div> */}
                  </a>
                  <div className='dropdown-menu dropdown-menu-end'>
                    <a
                      href='app-profile.html'
                      className='dropdown-item ai-icon'>
                      <svg
                        id='icon-user1'
                        xmlns='http://www.w3.org/2000/svg'
                        className='text-primary'
                        width={18}
                        height={18}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                      <span className='ms-2'>Profile </span>
                    </a>
                    <a
                      href='email-inbox.html'
                      className='dropdown-item ai-icon'>
                      <svg
                        id='icon-inbox'
                        xmlns='http://www.w3.org/2000/svg'
                        className='text-success'
                        width={18}
                        height={18}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
                        <polyline points='22,6 12,13 2,6' />
                      </svg>
                      <span className='ms-2'>Inbox </span>
                    </a>
                    <a href='page-login.html' className='dropdown-item ai-icon'>
                      <svg
                        id='icon-logout'
                        xmlns='http://www.w3.org/2000/svg'
                        className='text-danger'
                        width={18}
                        height={18}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'>
                        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
                        <polyline points='16 17 21 12 16 7' />
                        <line x1={21} y1={12} x2={9} y2={12} />
                      </svg>
                      <span className='ms-2'>Logout </span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
