import { useFormik } from "formik";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  // AiOutlineCamera,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { axiosInstance } from "../../utils/axios/axios";
import ErrorMsg from "./ErrorMsg";
import FormButton from "./FormButton";
import TextInput from "./TextInput";

const LoginForm = () => {
  const { setAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // password show & hide
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //login submition
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "Mukund.vs.atpl@autopeepal.com",
      password: "Welcome2@ATPL",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axiosInstance.post(
          "accounts/login",
          JSON.stringify({ username: values.email, password: values.password })
        );

        if (data.success) {
          toast.success("Logged in successfull");
          const results = data?.data;
          const userObj = {
            accessToken: results?.auth_token?.access,
            userId: results?.user_id,
            orgId: results?.org.id,
            firstname: results?.first_name,
            lastname: results?.last_name,
            phone: results?.mobile,
            email: results?.email,
            isLoggedIn: true,
          };
          setAuth(userObj);
          localStorage.setItem("userInfo", JSON.stringify(userObj));

          // set userObj  into localstorage
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error(error?.message, { duration: 2000 });
        console.log(error);
      }
    },
  });

  return (
    <>
      <Toaster />
      <form className='form' onSubmit={handleSubmit}>
        {/* Email */}
        <div className='mb-4'>
          <TextInput
            type='email'
            title='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
        </div>
        {/* Password */}
        <div className='mb-4 '>
          <div className='password_field'>
            <TextInput
              type={`${showPassword ? "text" : "password"}`}
              title='password'
              name='password'
              placeholder='Enter your password'
              value={values.password}
              onChange={handleChange}
            />
            <div onClick={togglePasswordVisibility} className='eyeIcon'>
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>
          <div className='mt-2 d-flex justify-content-between gap-4 d-none'>
            <ErrorMsg subject='Password not match' />
            <Link to='forget-password'>
              <p>Forget Password?</p>
            </Link>
          </div>
        </div>
        {/* show error msg */}

        {/* Login Button */}
        <div className='mb-2'>
          <FormButton type='submit' title='Sign In' />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
