/* eslint-disable react/prop-types */
import Select from "react-select";

const SelectInput = ({ title, ...attributes }) => {
  return (
    <>
      <label className='mb-2 text-dark text-capitalize'>{title}</label>
      <Select {...attributes} className='' />
    </>
  );
};

export default SelectInput;
