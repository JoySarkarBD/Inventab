import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className='dlabnav'>
        <div className='dlabnav-scroll'>
          <ul className='metismenu' id='menu'>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <i className='flaticon-025-dashboard' />
                <span className='nav-text'>Sales</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <NavLink to='sales-leads'>Leads</NavLink>
                </li>
                <li>
                  <NavLink to='sales-orders'>Orders</NavLink>
                </li>
                <li>
                  <NavLink to='sales-invoices'>Invoices</NavLink>
                </li>
                <li>
                  <NavLink to='ar'>AR</NavLink>
                </li>
                <li>
                  <a href='index-5.html'>
                    Dashboard 5
                    <span className='badge badge-xs badge-danger ms-3'>
                      New
                    </span>
                  </a>
                </li>
                <li>
                  <a href='index-6.html'>
                    Dashboard 6
                    <span className='badge badge-xs badge-danger ms-3'>
                      New
                    </span>
                  </a>
                </li>
                <li>
                  <a href='index-7.html'>
                    Dashboard 7
                    <span className='badge badge-xs badge-danger ms-3'>
                      New
                    </span>
                  </a>
                </li>
                <li>
                  <a href='index-8.html'>
                    Dashboard 8
                    <span className='badge badge-xs badge-danger ms-3'>
                      New
                    </span>
                  </a>
                </li>
                <li>
                  <a href='my-wallet.html'>My Wallet</a>
                </li>
                <li>
                  <a href='page-invoices.html'>Invoices</a>
                </li>
                <li>
                  <a href='cards-center.html'>Cards Center</a>
                </li>
                <li>
                  <a href='page-transaction.html'>Transaction</a>
                </li>
                <li>
                  <a href='transaction-details.html'>Transaction Details</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <i className='fa-solid fa-gear fw-bold' />
                <span className='nav-text'>CMS</span>
                <span className='badge badge-xs badge-danger ms-3'>New</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='content.html'>Content</a>
                </li>
                <li>
                  <a href='menu.html'>Menu</a>
                </li>
                <li>
                  <a href='email-template.html'>Email Template</a>
                </li>
                <li>
                  <a href='blog.html'>Blog</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <i className='flaticon-050-info' />
                <span className='nav-text'>Apps</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='app-profile.html'>Profile</a>
                </li>
                <li>
                  <a href='post-details.html'>Post Details</a>
                </li>
                <li>
                  <a
                    className='has-arrow'
                    href='javascript:void()'
                    aria-expanded='false'>
                    Email
                  </a>
                  <ul aria-expanded='false'>
                    <li>
                      <a href='email-compose.html'>Compose</a>
                    </li>
                    <li>
                      <a href='email-inbox.html'>Inbox</a>
                    </li>
                    <li>
                      <a href='email-read.html'>Read</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href='app-calender.html'>Calendar</a>
                </li>
                <li>
                  <a
                    className='has-arrow'
                    href='javascript:void()'
                    aria-expanded='false'>
                    Shop
                  </a>
                  <ul aria-expanded='false'>
                    <li>
                      <a href='ecom-product-grid.html'>Product Grid</a>
                    </li>
                    <li>
                      <a href='ecom-product-list.html'>Product List</a>
                    </li>
                    <li>
                      <a href='ecom-product-detail.html'>Product Details</a>
                    </li>
                    <li>
                      <a href='ecom-product-order.html'>Order</a>
                    </li>
                    <li>
                      <a href='ecom-checkout.html'>Checkout</a>
                    </li>
                    <li>
                      <a href='ecom-invoice.html'>Invoice</a>
                    </li>
                    <li>
                      <a href='ecom-customers.html'>Customers</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <i className='flaticon-041-graph' />
                <span className='nav-text'>Charts</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='chart-flot.html'>Flot</a>
                </li>
                <li>
                  <a href='chart-morris.html'>Morris</a>
                </li>
                <li>
                  <a href='chart-chartjs.html'>Chartjs</a>
                </li>
                <li>
                  <a href='chart-chartist.html'>Chartist</a>
                </li>
                <li>
                  <a href='chart-sparkline.html'>Sparkline</a>
                </li>
                <li>
                  <a href='chart-peity.html'>Peity</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <i className='flaticon-086-star' />
                <span className='nav-text'>Bootstrap</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='ui-accordion.html'>Accordion</a>
                </li>
                <li>
                  <a href='ui-alert.html'>Alert</a>
                </li>
                <li>
                  <a href='ui-badge.html'>Badge</a>
                </li>
                <li>
                  <a href='ui-button.html'>Button</a>
                </li>
                <li>
                  <a href='ui-modal.html'>Modal</a>
                </li>
                <li>
                  <a href='ui-button-group.html'>Button Group</a>
                </li>
                <li>
                  <a href='ui-list-group.html'>List Group</a>
                </li>
                <li>
                  <a href='ui-card.html'>Cards</a>
                </li>
                <li>
                  <a href='ui-carousel.html'>Carousel</a>
                </li>
                <li>
                  <a href='ui-dropdown.html'>Dropdown</a>
                </li>
                <li>
                  <a href='ui-popover.html'>Popover</a>
                </li>
                <li>
                  <a href='ui-progressbar.html'>Progressbar</a>
                </li>
                <li>
                  <a href='ui-tab.html'>Tab</a>
                </li>
                <li>
                  <a href='ui-typography.html'>Typography</a>
                </li>
                <li>
                  <a href='ui-pagination.html'>Pagination</a>
                </li>
                <li>
                  <a href='ui-grid.html'>Grid</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <i className='flaticon-045-heart' />
                <span className='nav-text'>Plugins</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='uc-select2.html'>Select 2</a>
                </li>
                <li>
                  <a href='uc-nestable.html'>Nestedable</a>
                </li>
                <li>
                  <a href='uc-noui-slider.html'>Noui Slider</a>
                </li>
                <li>
                  <a href='uc-sweetalert.html'>Sweet Alert</a>
                </li>
                <li>
                  <a href='uc-toastr.html'>Toastr</a>
                </li>
                <li>
                  <a href='map-jqvmap.html'>Jqv Map</a>
                </li>
                <li>
                  <a href='uc-lightgallery.html'>Light Gallery</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <i className='flaticon-045-heart' />
                <span className='nav-text'>Widget</span>
              </a>
              <ul aria-expanded='false' className='mm-collapse' style={{}}>
                <li>
                  <a href='widget-card.html'>Widget Card</a>
                </li>
                <li>
                  <a href='widget-chart.html'>widget Chart</a>
                </li>
                <li>
                  <a href='widget-list.html'>Widget List</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <i className='flaticon-072-printer' />
                <span className='nav-text'>Forms</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='form-element.html'>Form Elements</a>
                </li>
                <li>
                  <a href='form-wizard.html'>Wizard</a>
                </li>
                <li>
                  <a href='form-ckeditor.html'>CkEditor</a>
                </li>
                <li>
                  <a href='form-pickers.html'>Pickers</a>
                </li>
                <li>
                  <a href='form-validation.html'>Form Validate</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <i className='flaticon-043-menu' />
                <span className='nav-text'>Table</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='table-bootstrap-basic.html'>Bootstrap</a>
                </li>
                <li>
                  <a href='table-datatable-basic.html'>Datatable</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <i className='flaticon-022-copy' />
                <span className='nav-text'>Pages</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='page-login.html'>
                    Login
                    <span className='badge badge-xs badge-success ms-3'>
                      Update
                    </span>
                  </a>
                </li>
                <li>
                  <a href='page-register.html'>
                    Register
                    <span className='badge badge-xs badge-success ms-3'>
                      Update
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className='has-arrow'
                    href='javascript:void()'
                    aria-expanded='false'>
                    Error
                    <span className='badge badge-xs badge-success ms-3'>
                      Upadte
                    </span>
                  </a>
                  <ul aria-expanded='false'>
                    <li>
                      <a href='page-error-400.html'>Error 400</a>
                    </li>
                    <li>
                      <a href='page-error-403.html'>Error 403</a>
                    </li>
                    <li>
                      <a href='page-error-404.html'>Error 404</a>
                    </li>
                    <li>
                      <a href='page-error-500.html'>Error 500</a>
                    </li>
                    <li>
                      <a href='page-error-503.html'>Error 503</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href='page-lock-screen.html'>
                    Lock Screen
                    <span className='badge badge-xs badge-success ms-3'>
                      Update
                    </span>
                  </a>
                </li>
                <li>
                  <a href='empty-page.html'>Empty Page</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
