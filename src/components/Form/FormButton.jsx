// eslint-disable-next-line react/prop-types
const FormButton = ({ title, ...attributes }) => {
  return (
    <div className='text-center mb-4'>
      <button className='btn btn-primary btn-block' {...attributes}>
        {title}
      </button>
    </div>
  );
};

export default FormButton;
