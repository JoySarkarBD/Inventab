/* eslint-disable react/prop-types */
const ErrorMsg = ({ subject }) => {
  return (
    <>
      <p className='error'>
        {subject || ""}
      </p>
    </>
  );
};

export default ErrorMsg;