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
      <div className="mb-4 ">
        <div className="password_field">
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
        <div className="mt-2 d-flex justify-content-between gap-4">
          <ErrorMsg subject="Password not match" />
          <Link to="forget-password">
            <p>Forget Password?</p>
          </Link>
        </div>
      </div>
      {/* show error msg */}

      {/* Login Button */}
      <div className="mb-2">
        <FormButton type="submit" title="Sign In" />
      </div>
    </form>
  );
};

export default LoginForm;
