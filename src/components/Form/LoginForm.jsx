import { useFormik } from "formik";
import { useState } from "react";
import {
  // AiOutlineCamera,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "../../utils/axios/axios";
import ErrorMsg from "./ErrorMsg";
import FormButton from "./FormButton";
import TextInput from "./TextInput";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //login submition
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          "accounts/login",
          JSON.stringify(
            { email: values.email, password: values.password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
        );

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
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
  );
};

export default LoginForm;
