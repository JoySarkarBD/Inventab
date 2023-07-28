// eslint-disable-next-line react/prop-types
const TextInput = ({ title, ...attributes }) => {
  return (
    <>
      <label className='mb-2 text-dark text-capitalize'>{title}</label>
      <input className='form-control form-control' {...attributes} />
    </>
  );
};

export default TextInput;
