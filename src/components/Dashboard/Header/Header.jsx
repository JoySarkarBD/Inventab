import { AiOutlineLogout } from "react-icons/ai";
// import { BsSun, BsMoon } from "react-icons/bs";
import avatar from "../../../assets/images/avatar.png";
import DarkModeSwitcher from "./DarkModeSwitcher";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">
                <div className="dashboard_bar">Welcome Mukund Sutrave</div>
              </div>
              <ul className="navbar-nav header-right">
                <li className="nav-item dropdown notification_dropdown">
                  <a className="nav-link bell dz-theme-mode p-0">
                    <DarkModeSwitcher />
                  </a>
                </li>

                {/* User Profile */}
                <li className="nav-item dropdown header-profile">
                  <a
                    className="nav-link"
                    href="javascript:void(0);"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={avatar}
                      className="img-fluid rounded-circle avatar-profile"
                      width={60}
                      alt
                    />
                  </a>

                  {/* Log out */}
                  <div className="dropdown-menu dropdown-menu-end">
                    <a href="#" className="dropdown-item ai-icon">
                      <AiOutlineLogout className="text-primary fs-4" />
                      <span className="ms-2 fs-4">Logout </span>
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
