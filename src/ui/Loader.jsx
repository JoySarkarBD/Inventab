/* eslint-disable react/prop-types */
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ height, width }) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <ThreeDots
        height={height || 80}
        width={width || 80}
        radius='9'
        color='#307BBD'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClassName=''
        visible={true}
      />
    </div>
  );
};

export default Loader;
