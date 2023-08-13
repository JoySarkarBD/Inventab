import { useEffect } from "react";
import { toast } from "react-hot-toast";
import LoginForm from "../../components/Form/LoginForm";
import PageTitle from "../../components/Shared/PageTitle";
import { useAuth } from "../../hooks/useAuth";
import Logo from "./../../assets/images/main-logo.png";
import "./Login.css";

const LogIn = () => {
  // session expired message ['it's not necessary , if user don't want to show the S.E. msg then remove useAuth & useEffect hook']
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    if (auth?.sessionStatus === false) {
      // setExpire(true);
      toast.error("Session Expired", { duration: 2000 });
      delete auth?.sessionStatus;
      setAuth(auth);
      localStorage.setItem("userInfo", JSON.stringify(auth));
    }
  }, []);

  // login page dark mood switcher
  useEffect(() => {
    let theme = localStorage.getItem("theme");
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
      document.body.setAttribute("data-theme-version", "dark");
    } else {
      document.body.setAttribute("data-theme-version", "light");
    }
  }, []);

  return (
    <>
      <PageTitle title='Log In' />
      <div className='vh-100 bg-white'>
        <div className='authentication h-100'>
          <div className='container-fluid h-100'>
            <div className='row h-100 authentication_row shadow-lg'>
              <div className='col-lg-12 col-md-12 col-sm-12 mx-auto align-self-center'>
                <div className='login-form'>
                  <div className='logo'>
                    {/* <h3 className="title">Sign In</h3> */}
                    <img src={Logo} alt='Logo' />
                  </div>

                  {/* Form Area*/}
                  <LoginForm />
                </div>
              </div>

              {/* Version */}
              <div className='text-center mt-5 version'>
                <p>Version 1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
