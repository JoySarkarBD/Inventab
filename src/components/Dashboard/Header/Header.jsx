import {
  AiOutlineBell,
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
// import { BsSun, BsMoon } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
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
                <div className='dashboard_bar'>Welcome Mukund Sutrave</div>
              </div>
              <ul className='navbar-nav header-right'>
                <li className='nav-item dropdown notification_dropdown'>
                  <a
                    className='nav-link bell dz-theme-mode p-0'
                    href='javascript:void(0);'>
                    <i id='icon-light' className='fas fa-sun' />
                    <i id='icon-dark' className='fas fa-moon' />
                    {/* <BsSun /> */}
                    {/* <BsMoon /> */}
                  </a>
                </li>
                <li className='nav-item dropdown notification_dropdown'>
                  <a
                    className='nav-link  ai-icon'
                    href='javascript:void(0);'
                    role='button'
                    data-bs-toggle='dropdown'>
                    <AiOutlineBell className='fs-2 ' />
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
                      className='all-notification fs-4 text-primary'
                      href='javascript:void(0);'>
                      See all notifications <BsArrowRight className='fs-4' />
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
                  </a>
                  <div className='dropdown-menu dropdown-menu-end'>
                    <a
                      href='#'
                      className='dropdown-item ai-icon d-flex align-items-center'>
                      <AiOutlineUser className='text-primary fs-4' />
                      <span className='ms-2  fs-4'>Profile </span>
                    </a>
                    <a
                      href='#'
                      className='dropdown-item ai-icon d-flex align-items-center'>
                      <AiOutlineMail className='text-primary fs-4' />
                      <span className='ms-2  fs-4'>Inbox </span>
                    </a>
                    <a href='#' className='dropdown-item ai-icon'>
                      <AiOutlineLogout className='text-primary fs-4' />
                      <span className='ms-2 fs-4'>Logout </span>
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
