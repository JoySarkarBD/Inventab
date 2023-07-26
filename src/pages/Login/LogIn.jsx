import { useState } from "react";
import {
  // AiOutlineCamera,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import FormButton from "../../components/Form/FormButton";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";
import "./Login.css";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
                  <form className="form">
                    {/* Email */}
                    <div className="mb-4">
                      <TextInput
                        type="email"
                        title="email"
                        placeholder="Enter your email"
                        defaultValue="hello@example.com"
                      />
                    </div>
                    {/* Password */}
                    <div className="mb-4 password_field">
                      <TextInput
                        type={`${showPassword ? "text" : "password"}`}
                        title="password"
                        placeholder="Enter your password"
                        defaultValue="Password"
                      />

                      {/* @TODO:  Use Password Show hide icon */}
                      <div
                        onClick={togglePasswordVisibility}
                        className="eyeIcon"
                      >
                        {showPassword ? (
                          <AiOutlineEye />
                          ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </div>
                    </div>
                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                      <div className="mb-4">
                        <div className="form-check custom-checkbox mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheckBox1"
                            required
                          />
                          <label
                            className="form-check-label mt-1"
                            htmlFor="customCheckBox1"
                          >
                            Remember my preference
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Login Button */}
                    <FormButton type="submit" title="Sign In" />
                    <p className="text-center">
                      Not registered?
                      <Link to="/register" className="btn-link text-primary">
                        Register
                      </Link>
                    </p>
                  </form>
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
