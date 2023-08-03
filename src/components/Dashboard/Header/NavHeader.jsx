import tabLogo from "../../../assets/images/tab-logo.png";

// eslint-disable-next-line react/prop-types
const NavHeader = ({handleSidebarToggle,isSidebarOpen}) => {

  return (
    <>
      <div className="nav-header">
        {/* logo */}
        <a href="#" className="brand-logo">
          <img src={tabLogo} className="logo-abbr" alt="logo" width="95px" />
        </a>
        {/* burger menu */}
        <div className="nav-control">
          <div className={`hamburger ${isSidebarOpen ? "is-active" : ""}`} onClick={handleSidebarToggle}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavHeader;
