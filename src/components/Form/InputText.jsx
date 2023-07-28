/* eslint-disable react/prop-types */
import "./inputForm.css";

const InputText = ({ title, ...attributes }) => {
  return (
    <>
      <label className='mb-2 text-dark text-capitalize'>{title}</label>
      <br />
      <input className='new_input_class form-control' {...attributes} />
    </>
  );
};

export default InputText;
