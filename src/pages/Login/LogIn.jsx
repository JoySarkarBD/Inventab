const LogIn = () => {
  return (
    <div className='vh-100'>
      <div className='authincation h-100'>
        <div className='container-fluid h-100'>
          <div className='row h-100'>
            <div className='col-lg-6 col-md-12 col-sm-12 mx-auto align-self-center'>
              <div className='login-form'>
                <div className='text-center'>
                  <h3 className='title'>Sign In</h3>
                  <p>Sign in to your account to start using Dompact</p>
                </div>
                <form action='https://dompet.dexignlab.com/xhtml/index.html'>
                  <div className='mb-4'>
                    <label className='mb-1 text-dark'>Email</label>
                    <input
                      type='email'
                      className='form-control form-control'
                      defaultValue='hello@example.com'
                    />
                  </div>
                  <div className='mb-4 position-relative'>
                    <label className='mb-1 text-dark'>Password</label>
                    <input
                      type='password'
                      id='dlab-password'
                      className='form-control form-control'
                      defaultValue='Password'
                    />
                    <span className='show-pass eye'>
                      <i className='fa fa-eye-slash' />
                      <i className='fa fa-eye' />
                    </span>
                  </div>
                  <div className='form-row d-flex justify-content-between mt-4 mb-2'>
                    <div className='mb-4'>
                      <div className='form-check custom-checkbox mb-3'>
                        <input
                          type='checkbox'
                          className='form-check-input'
                          id='customCheckBox1'
                          required
                        />
                        <label
                          className='form-check-label mt-1'
                          htmlFor='customCheckBox1'>
                          Remember my preference
                        </label>
                      </div>
                    </div>
                    <div className='mb-4'>
                      <a
                        href='page-forgot-password.html'
                        className='btn-link text-primary'>
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <div className='text-center mb-4'>
                    <button type='submit' className='btn btn-primary btn-block'>
                      Sign In
                    </button>
                  </div>
                  <h6 className='login-title'>
                    <span>Or continue with</span>
                  </h6>
                  <div className='mb-3'>
                    <ul className='d-flex align-self-center justify-content-center'>
                      <li>
                        <a
                          target='_blank'
                          href=''
                          className='fab fa-facebook-f btn-facebook'
                        />
                      </li>
                      <li>
                        <a
                          target='_blank'
                          href=''
                          className='fab fa-google-plus-g btn-google-plus mx-2'
                        />
                      </li>
                      <li>
                        <a
                          target='_blank'
                          href=''
                          className='fab fa-linkedin-in btn-linkedin me-2'
                        />
                      </li>
                      <li>
                        <a
                          target='_blank'
                          href=''
                          className='fab fa-twitter btn-twitter'
                        />
                      </li>
                    </ul>
                  </div>
                  <p className='text-center'>
                    Not registered?
                    <a
                      className='btn-link text-primary'
                      href='page-register.html'>
                      Register
                    </a>
                  </p>
                </form>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6'>
              <div className='pages-left h-100'>
                <div className='login-content'>
                  <a href='index.html'>
                    <img src='images/logo-full.png' className='mb-3' alt />
                  </a>
                  <p>
                    Your true value is determined by how much more you give in
                    value than you take in payment. ...
                  </p>
                </div>
                <div className='login-media text-center'>
                  <img src='images/login.png' alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
