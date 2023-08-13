/* eslint-disable react/prop-types */
const ErrorMsg = ({ subject }) => {
  return (
    <>
      <p className='error mt-2'>
        {subject || ""}
      </p>
    </>
  );
};

export default ErrorMsg;