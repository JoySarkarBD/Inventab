/* eslint-disable react/prop-types */
import "./inputForm.css";

const CheckBox = ({ title, ...attributes }) => {
  return (
    <div className='form-check d-flex align-self-center justify-content-start'>
      <input
        className='form-check-input'
        {...attributes}
        id='flexCheckChecked'
      />
      <label
        className='form-check-label ms-2 mb-0 fs-4'
        htmlFor='flexCheckChecked'>
        {title}
      </label>
    </div>
  );
};

export default CheckBox;
