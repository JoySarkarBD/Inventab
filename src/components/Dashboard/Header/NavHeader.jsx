import tabLogo from "../../../assets/images/tab-logo.png";

const NavHeader = () => {
  return (
    <>
      <div className='nav-header'>
        {/* logo */}
        <a href='#' className='brand-logo'>
          <img src={tabLogo} className='logo-abbr' alt='logo' width='95px' />
        </a>
        {/* burger menu */}
        <div className='nav-control'>
          <div className='hamburger'>
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavHeader;
