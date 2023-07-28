// eslint-disable-next-line react/prop-types
const TextInput = ({ title, ...attributes }) => {
  return (
    <>
      <label className='mb-2 text-dark text-capitalize'>{title}</label>
      <input
        className='form-control'
        defaultValue='hello@example.com'
        {...attributes}
      />
    </>
  );
};

export default TextInput;
