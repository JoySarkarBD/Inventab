import { LiaChartBarSolid, LiaHandsHelpingSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className='dlabnav'>
        <div className='dlabnav-scroll'>
          <ul className='metismenu' id='menu'>
            {/* Sales Dashboard */}
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <LuLayoutDashboard className='fs-2' />
                <span className='nav-text fs-4'> Dashboard</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <NavLink to='/dashboard' className='fs-4'>
                    Sales Dashboard
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* sales */}
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <LiaChartBarSolid className='fs-2' />
                <span className='nav-text fs-4'>Sales</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <NavLink to='sales-leads' className='fs-4'>
                    Leads
                  </NavLink>
                </li>
                <li>
                  <NavLink to='sales-orders' className='fs-4'>
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to='sales-invoices' className='fs-4'>
                    Invoices
                  </NavLink>
                </li>
                <li>
                  <NavLink to='ar' className='fs-4'>
                    AR
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* Support */}
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'>
                <LiaHandsHelpingSolid className='fs-2' />
                <span className='nav-text fs-4'>Support</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <NavLink to='attendance' className='fs-4'>
                    Attendance
                  </NavLink>
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
