import { useState } from "react";
import {
    // AiOutlineCamera,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import ErrorMsg from "./ErrorMsg";
import FormButton from "./FormButton";
import TextInput from "./TextInput";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
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
        <div onClick={togglePasswordVisibility} className="eyeIcon">
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      </div>
      {/* show error msg */}
      <ErrorMsg subject="Password not match" />
      <div className="form-row d-flex justify-content-between mt-4 mb-2">
        <div className="mb-4">
          <div className="form-check custom-checkbox mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="customCheckBox1"
              required
            />
            <label className="form-check-label mt-1" htmlFor="customCheckBox1">
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
  );
};

export default LoginForm;
