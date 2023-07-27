
import LoginForm from "../../components/Form/LoginForm";
import PageTitle from "../../components/Shared/PageTitle";
import "./Login.css";

const LogIn = () => {
  return (
    <>
      <PageTitle title="Log In" />
      <div className="vh-100">
        <div className="authentication h-100">
          <div className="container-fluid h-100">
            <div className="row h-100 authentication_row shadow-lg">
              <div className="col-lg-12 col-md-12 col-sm-12 mx-auto align-self-center">
                <div className="login-form">
                  <div className="text-center">
                    <h3 className="title">Sign In</h3>
                  </div>

                  {/* Form Area*/}
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
